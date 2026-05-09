#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import { copyFileSync, existsSync } from 'node:fs'

const paperBase = 'blockspace-conservation-may-2026'
const paperTex = `${paperBase}.tex`
const paperPdf = `${paperBase}.pdf`
const publicTex = `public/${paperTex}`
const publicPdf = `public/${paperPdf}`

copyFileSync(paperTex, publicTex)
copyFileSync('docs/HOSTILE_REVIEW.md', 'public/hostile-review.md')

const tectonic = spawnSync('tectonic', ['--version'], { encoding: 'utf8' })

if (tectonic.status === 0) {
  const result = spawnSync('tectonic', ['--outdir', 'public', paperTex], {
    encoding: 'utf8',
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
} else if (!existsSync(publicPdf)) {
  console.error(
    `Missing ${publicPdf} and no \`tectonic\` binary found. Install Tectonic or add a compiled PDF before building.`,
  )
  process.exit(1)
} else {
  console.warn(`No \`tectonic\` binary found; using existing ${publicPdf}.`)
}
