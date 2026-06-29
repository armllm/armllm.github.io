/**
 * Deterministic, dependency-free matrix-completion engine for the in-browser
 * Matrix Arena demo. Mirrors the real competition at toy scale: a hidden
 * low-rank matrix is partially observed through a mask, and a method must
 * reconstruct the hidden entries. Everything is seeded so results are stable.
 */

export type Matrix = number[][]
export type Mask = boolean[][]

/** Small, fast, seedable PRNG (mulberry32). Returns floats in [0, 1). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Standard-normal sample via Box–Muller, driven by a uniform generator. */
function randn(rng: () => number): number {
  let u = 0
  let v = 0
  while (u === 0) u = rng()
  while (v === 0) v = rng()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

export interface GenerateOptions {
  n: number
  rank: number
  /** 0 = clean, ~0.3 = noticeably noisy. */
  noise: number
}

/**
 * Generate a hidden ground-truth matrix Y = U Vᵀ + noise, normalized to roughly
 * zero mean / unit standard deviation — the same shape of structure the real
 * competition's low-rank regime produces.
 */
export function generateMatrix(seed: number, opts: GenerateOptions): Matrix {
  const { n, rank, noise } = opts
  const rng = mulberry32(seed)
  const U: Matrix = Array.from({ length: n }, () =>
    Array.from({ length: rank }, () => randn(rng) / Math.sqrt(rank))
  )
  const V: Matrix = Array.from({ length: n }, () =>
    Array.from({ length: rank }, () => randn(rng) / Math.sqrt(rank))
  )
  const Y: Matrix = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      let s = 0
      for (let l = 0; l < rank; l++) s += U[i][l] * V[j][l]
      return s + noise * randn(rng)
    })
  )
  return normalize(Y)
}

/** Center to zero mean and scale to unit standard deviation. */
function normalize(Y: Matrix): Matrix {
  const flat = Y.flat()
  const mean = flat.reduce((a, b) => a + b, 0) / flat.length
  let variance = 0
  for (const v of flat) variance += (v - mean) * (v - mean)
  variance /= flat.length
  const std = Math.sqrt(variance) || 1
  return Y.map((row) => row.map((v) => (v - mean) / std))
}

/**
 * Build an observation mask with exactly `k` observed entries per row (columns
 * chosen at random). A toy stand-in for the competition's k-regular masks —
 * enough to convey "you only see a sparse slice of the matrix".
 */
export function buildMask(seed: number, n: number, k: number): Mask {
  const rng = mulberry32(seed ^ 0x9e3779b9)
  const kk = Math.max(1, Math.min(k, n))
  return Array.from({ length: n }, () => {
    const cols = Array.from({ length: n }, (_, j) => j)
    // Fisher–Yates partial shuffle to pick kk distinct columns.
    for (let i = 0; i < kk; i++) {
      const r = i + Math.floor(rng() * (n - i))
      const tmp = cols[i]
      cols[i] = cols[r]
      cols[r] = tmp
    }
    const chosen = new Set(cols.slice(0, kk))
    return Array.from({ length: n }, (_, j) => chosen.has(j))
  })
}

export interface ReconResult {
  prediction: Matrix
  nrmse: number
  observedCount: number
  hiddenCount: number
}

/** Baseline: fill every hidden entry with the mean of observed entries. */
export function meanFill(Y: Matrix, mask: Mask): Matrix {
  const n = Y.length
  let sum = 0
  let count = 0
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      if (mask[i][j]) {
        sum += Y[i][j]
        count++
      }
  const mean = count > 0 ? sum / count : 0
  return Array.from({ length: n }, () => Array.from({ length: n }, () => mean))
}

/** Solve a small linear system A x = b (Gaussian elimination, partial pivot). */
function solve(A: Matrix, b: number[]): number[] {
  const r = b.length
  // Work on copies.
  const M = A.map((row) => row.slice())
  const y = b.slice()
  for (let col = 0; col < r; col++) {
    // Pivot.
    let piv = col
    for (let row = col + 1; row < r; row++)
      if (Math.abs(M[row][col]) > Math.abs(M[piv][col])) piv = row
    if (piv !== col) {
      ;[M[col], M[piv]] = [M[piv], M[col]]
      ;[y[col], y[piv]] = [y[piv], y[col]]
    }
    const diag = M[col][col] || 1e-9
    for (let row = col + 1; row < r; row++) {
      const factor = M[row][col] / diag
      for (let c = col; c < r; c++) M[row][c] -= factor * M[col][c]
      y[row] -= factor * y[col]
    }
  }
  // Back-substitution.
  const x = new Array(r).fill(0)
  for (let row = r - 1; row >= 0; row--) {
    let s = y[row]
    for (let c = row + 1; c < r; c++) s -= M[row][c] * x[c]
    x[row] = s / (M[row][row] || 1e-9)
  }
  return x
}

/**
 * Low-rank reconstruction via alternating least squares with ridge
 * regularization, fit on observed entries only. Deterministic init.
 */
export function lowRankALS(
  Y: Matrix,
  mask: Mask,
  rank: number,
  lambda = 0.1,
  iters = 40
): Matrix {
  const n = Y.length
  const rng = mulberry32(12345)
  const P: Matrix = Array.from({ length: n }, () =>
    Array.from({ length: rank }, () => randn(rng) * 0.1)
  )
  const Q: Matrix = Array.from({ length: n }, () =>
    Array.from({ length: rank }, () => randn(rng) * 0.1)
  )

  const eye = (scale: number): Matrix =>
    Array.from({ length: rank }, (_, i) =>
      Array.from({ length: rank }, (_, j) => (i === j ? scale : 0))
    )

  for (let it = 0; it < iters; it++) {
    // Update each row of P given Q.
    for (let i = 0; i < n; i++) {
      const A = eye(lambda)
      const bVec = new Array(rank).fill(0)
      let any = false
      for (let j = 0; j < n; j++) {
        if (!mask[i][j]) continue
        any = true
        for (let a = 0; a < rank; a++) {
          for (let b = 0; b < rank; b++) A[a][b] += Q[j][a] * Q[j][b]
          bVec[a] += Q[j][a] * Y[i][j]
        }
      }
      if (any) P[i] = solve(A, bVec)
    }
    // Update each row of Q given P.
    for (let j = 0; j < n; j++) {
      const A = eye(lambda)
      const bVec = new Array(rank).fill(0)
      let any = false
      for (let i = 0; i < n; i++) {
        if (!mask[i][j]) continue
        any = true
        for (let a = 0; a < rank; a++) {
          for (let b = 0; b < rank; b++) A[a][b] += P[i][a] * P[i][b]
          bVec[a] += P[i][a] * Y[i][j]
        }
      }
      if (any) Q[j] = solve(A, bVec)
    }
  }

  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      let s = 0
      for (let l = 0; l < rank; l++) s += P[i][l] * Q[j][l]
      return s
    })
  )
}

/** Normalized RMSE on hidden (mask === false) entries — the scoring metric. */
export function nrmseHidden(Yhat: Matrix, Y: Matrix, mask: Mask): number {
  const n = Y.length
  const errs: number[] = []
  const vals: number[] = []
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      if (!mask[i][j]) {
        errs.push(Yhat[i][j] - Y[i][j])
        vals.push(Y[i][j])
      }
  if (errs.length === 0) return 0
  const mse = errs.reduce((a, e) => a + e * e, 0) / errs.length
  const mean = vals.reduce((a, v) => a + v, 0) / vals.length
  let varr = 0
  for (const v of vals) varr += (v - mean) * (v - mean)
  varr /= vals.length
  const std = Math.sqrt(varr) + 1e-8
  return Math.sqrt(mse) / std
}

export type ReconMethod = 'mean' | 'lowrank'

/** Run a method end to end and report the hidden-entry NRMSE. */
export function reconstruct(
  Y: Matrix,
  mask: Mask,
  method: ReconMethod,
  rank: number
): ReconResult {
  const prediction = method === 'mean' ? meanFill(Y, mask) : lowRankALS(Y, mask, rank)
  const n = Y.length
  let observedCount = 0
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (mask[i][j]) observedCount++
  return {
    prediction,
    nrmse: nrmseHidden(prediction, Y, mask),
    observedCount,
    hiddenCount: n * n - observedCount,
  }
}

/* ----------------------------- color mapping ----------------------------- */

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * Diverging blue→white→red colormap for signed values, clamped to [-vmax, vmax].
 * Mirrors the RdBu_r palette used by the offline renderer.
 */
export function signedColor(value: number, vmax: number): string {
  const v = Math.max(-1, Math.min(1, value / (vmax || 1)))
  // Endpoints: blue (59,76,192), white (245,245,245), red (180,4,38).
  let r: number, g: number, b: number
  if (v < 0) {
    const t = v + 1 // 0..1 from blue to white
    r = lerp(59, 245, t)
    g = lerp(76, 245, t)
    b = lerp(192, 245, t)
  } else {
    const t = v // 0..1 from white to red
    r = lerp(245, 180, t)
    g = lerp(245, 4, t)
    b = lerp(245, 38, t)
  }
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
}

/** Sequential dark→bright colormap for non-negative error magnitudes. */
export function errorColor(value: number, vmax: number): string {
  const t = Math.max(0, Math.min(1, value / (vmax || 1)))
  // magma-ish: near-black → purple → orange → pale yellow.
  const stops = [
    [13, 8, 30],
    [84, 15, 109],
    [187, 55, 84],
    [249, 142, 9],
    [252, 253, 191],
  ]
  const seg = Math.min(stops.length - 2, Math.floor(t * (stops.length - 1)))
  const localT = t * (stops.length - 1) - seg
  const c0 = stops[seg]
  const c1 = stops[seg + 1]
  const r = lerp(c0[0], c1[0], localT)
  const g = lerp(c0[1], c1[1], localT)
  const b = lerp(c0[2], c1[2], localT)
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
}

/** 99th-percentile absolute value, a robust color limit for a matrix. */
export function robustScale(Y: Matrix): number {
  const abs = Y.flat()
    .map((v) => Math.abs(v))
    .sort((a, b) => a - b)
  if (abs.length === 0) return 1
  const idx = Math.min(abs.length - 1, Math.floor(0.99 * abs.length))
  return abs[idx] || 1
}
