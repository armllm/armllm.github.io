import fs from 'node:fs/promises'
import path from 'node:path'

async function main() {
  const src = path.resolve('2026', 'funding-request-slides-2026.html')
  const outDir = path.resolve('dist', '2026')
  const dest = path.join(outDir, 'funding-request-slides-2026.html')

  await fs.mkdir(outDir, { recursive: true })
  await fs.copyFile(src, dest)

  // Optional: also publish the aggregate metrics as a simple text file for reference.
  const metricsSrc = path.resolve('2026', 'funding-request-metrics.md')
  const metricsDest = path.join(outDir, 'funding-request-metrics.md')
  try {
    await fs.copyFile(metricsSrc, metricsDest)
  } catch {
    // ignore if missing
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

