import { useMemo, useState } from 'react'
import Heatmap from './Heatmap'
import {
  generateMatrix,
  buildMask,
  reconstruct,
  robustScale,
  type Matrix,
  type ReconMethod,
} from '../../utils/matrixDemo'

const N = 16

function errorMatrix(pred: Matrix, truth: Matrix): Matrix {
  return truth.map((row, i) => row.map((v, j) => Math.abs(pred[i][j] - v)))
}

/**
 * A fully client-side, deterministic matrix-completion playground. Visitors
 * adjust the observation budget, the hidden rank, the noise, and the method,
 * and watch the reconstruction and its hidden-entry NRMSE update live — the
 * same loop competitors optimize, at toy scale.
 */
export default function MatrixPlayground() {
  const [seed, setSeed] = useState(7)
  const [k, setK] = useState(8)
  const [rank, setRank] = useState(2)
  const [noise, setNoise] = useState(0.05)
  const [method, setMethod] = useState<ReconMethod>('lowrank')

  const { truth, mask, vmax } = useMemo(() => {
    const truth = generateMatrix(seed, { n: N, rank, noise })
    const mask = buildMask(seed, N, k)
    return { truth, mask, vmax: robustScale(truth) }
  }, [seed, k, rank, noise])

  const result = useMemo(
    () => reconstruct(truth, mask, method, rank),
    [truth, mask, method, rank]
  )

  // Always compute the mean baseline so we can show the improvement factor.
  const meanResult = useMemo(() => reconstruct(truth, mask, 'mean', rank), [truth, mask, rank])

  const errMat = useMemo(() => errorMatrix(result.prediction, truth), [result, truth])
  const errVmax = useMemo(() => robustScale(errMat) || 1, [errMat])

  const beatsMean = result.nrmse < meanResult.nrmse - 1e-9
  const improvement =
    meanResult.nrmse > 1e-9 ? ((meanResult.nrmse - result.nrmse) / meanResult.nrmse) * 100 : 0

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8">
      {/* Controls */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Control label="Observations per row (k)" value={`${k}`}>
          <input
            type="range" min={2} max={12} value={k}
            onChange={(e) => setK(Number(e.target.value))}
            className="w-full accent-accent"
          />
          <p className="text-white/50 text-xs mt-1">{k * N} of {N * N} entries observed</p>
        </Control>

        <Control label="Hidden rank" value={`${rank}`}>
          <input
            type="range" min={1} max={6} value={rank}
            onChange={(e) => setRank(Number(e.target.value))}
            className="w-full accent-accent"
          />
          <p className="text-white/50 text-xs mt-1">structure complexity</p>
        </Control>

        <Control label="Noise" value={noise.toFixed(2)}>
          <input
            type="range" min={0} max={0.4} step={0.05} value={noise}
            onChange={(e) => setNoise(Number(e.target.value))}
            className="w-full accent-accent"
          />
          <p className="text-white/50 text-xs mt-1">harder when higher</p>
        </Control>

        <Control label="Instance seed" value={`#${seed}`}>
          <div className="flex gap-2">
            <button
              onClick={() => setSeed((s) => (s + 1) % 9999)}
              className="flex-1 px-3 py-2 rounded-lg bg-accent/20 text-accent text-sm font-semibold hover:bg-accent/30 transition-colors"
            >
              New instance ↻
            </button>
          </div>
          <p className="text-white/50 text-xs mt-1">regenerate the hidden matrix</p>
        </Control>
      </div>

      {/* Method toggle */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="text-white/70 text-sm font-medium">Reconstruction method:</span>
        <div className="inline-flex rounded-lg border border-white/15 overflow-hidden">
          <MethodButton active={method === 'mean'} onClick={() => setMethod('mean')}>
            Mean fill (baseline)
          </MethodButton>
          <MethodButton active={method === 'lowrank'} onClick={() => setMethod('lowrank')}>
            Low-rank factorization
          </MethodButton>
        </div>
      </div>

      {/* Heatmaps */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
        <Heatmap matrix={truth} vmax={vmax} title="Hidden ground truth" mode="signed"
          caption="What you must reconstruct — never fully revealed." />
        <Heatmap matrix={truth} mask={mask} vmax={vmax} title="What you observe" mode="masked"
          caption="Only the colored cells are given; gray cells are hidden." />
        <Heatmap matrix={result.prediction} vmax={vmax} title="Your prediction" mode="signed"
          caption={`Method: ${method === 'mean' ? 'mean fill' : 'low-rank'}.`} />
        <Heatmap matrix={errMat} mask={mask} vmax={errVmax} title="Error on hidden cells" mode="error"
          caption="Brighter = larger error. Scored on hidden cells only." />
      </div>

      {/* Scoreboard */}
      <div className="grid sm:grid-cols-3 gap-4">
        <ScoreCard
          label="Your NRMSE"
          value={result.nrmse.toFixed(3)}
          hint="lower is better"
          highlight={beatsMean}
        />
        <ScoreCard
          label="Mean-baseline NRMSE"
          value={meanResult.nrmse.toFixed(3)}
          hint="the bar to beat (≈ 1.0)"
        />
        <ScoreCard
          label={beatsMean ? 'You beat the baseline' : 'Not beating baseline'}
          value={beatsMean ? `−${improvement.toFixed(0)}%` : '—'}
          hint={beatsMean ? 'lower error than mean fill' : 'try low-rank, or raise k'}
          highlight={beatsMean}
        />
      </div>

      <p className="text-white/55 text-sm mt-6 leading-relaxed">
        <span className="text-accent font-semibold">Try this:</span> with the mean baseline the
        error map stays uniformly bright — it predicts a constant. Switch to low-rank and the error
        collapses, because the hidden matrix really is low-rank. Now crank up the noise or drop{' '}
        <em>k</em>: the structure gets harder to recover and even the right method struggles. That
        tension — exploiting structure under a tight observation budget — is the whole game.
      </p>
    </div>
  )
}

// eslint helper components ----------------------------------------------------

function Control({
  label,
  value,
  children,
}: {
  label: string
  value: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-white/75 text-xs font-medium uppercase tracking-wide">{label}</span>
        <span className="text-accent font-bold text-sm">{value}</span>
      </div>
      {children}
    </div>
  )
}

function MethodButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={
        'px-4 py-2 text-sm font-semibold transition-colors ' +
        (active ? 'bg-gradient-to-r from-primary to-accent text-white' : 'bg-transparent text-white/70 hover:bg-white/10')
      }
    >
      {children}
    </button>
  )
}

function ScoreCard({
  label,
  value,
  hint,
  highlight,
}: {
  label: string
  value: string
  hint: string
  highlight?: boolean
}) {
  return (
    <div
      className={
        'rounded-xl p-5 border text-center transition-colors ' +
        (highlight ? 'border-accent/60 bg-accent/10' : 'border-white/10 bg-white/[0.03]')
      }
    >
      <p className="text-white/60 text-xs uppercase tracking-wide mb-1">{label}</p>
      <p className={'text-3xl font-bold ' + (highlight ? 'text-accent' : 'text-white')}>{value}</p>
      <p className="text-white/45 text-xs mt-1">{hint}</p>
    </div>
  )
}
