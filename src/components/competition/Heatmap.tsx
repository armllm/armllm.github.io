import { memo } from 'react'
import type { Matrix, Mask } from '../../utils/matrixDemo'
import { signedColor, errorColor } from '../../utils/matrixDemo'

type HeatmapMode = 'signed' | 'masked' | 'error'

interface HeatmapProps {
  /** For 'signed'/'masked' this is the value matrix; for 'error' it is |Ŷ − Y|. */
  matrix: Matrix
  mask?: Mask
  mode?: HeatmapMode
  /** Color limit. signed: symmetric ±vmax; error: 0..vmax. */
  vmax: number
  title?: string
  caption?: string
  /** Pixel size of each cell. */
  cell?: number
}

const HIDDEN = '#cbd5e1' // slate-300, the "you can't see this" gray

function Heatmap({ matrix, mask, mode = 'signed', vmax, title, caption, cell = 14 }: HeatmapProps) {
  const n = matrix.length

  const colorOf = (i: number, j: number): string => {
    const observed = mask ? mask[i][j] : true
    if (mode === 'masked') {
      // Show observed values; hide the rest.
      return observed ? signedColor(matrix[i][j], vmax) : HIDDEN
    }
    if (mode === 'error') {
      // Error is scored on hidden cells only; observed cells are grayed out.
      return observed ? HIDDEN : errorColor(matrix[i][j], vmax)
    }
    return signedColor(matrix[i][j], vmax)
  }

  return (
    <figure className="flex flex-col items-center">
      {title && (
        <figcaption className="text-white/85 text-sm font-semibold mb-2 text-center">
          {title}
        </figcaption>
      )}
      <div
        className="grid rounded-lg overflow-hidden border border-white/10 shadow-lg shadow-black/30"
        style={{
          gridTemplateColumns: `repeat(${n}, ${cell}px)`,
          gridTemplateRows: `repeat(${n}, ${cell}px)`,
        }}
        role="img"
        aria-label={title || 'matrix heatmap'}
      >
        {matrix.map((row, i) =>
          row.map((_, j) => (
            <div
              key={`${i}-${j}`}
              style={{ backgroundColor: colorOf(i, j), width: cell, height: cell }}
            />
          ))
        )}
      </div>
      {caption && <p className="text-white/55 text-xs mt-2 text-center max-w-[14rem]">{caption}</p>}
    </figure>
  )
}

export default memo(Heatmap)
