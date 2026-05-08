#!/usr/bin/env node
import { copyFileSync, existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

copyFileSync('cred10.tex', 'public/cred10.tex')
copyFileSync('docs/HOSTILE_REVIEW.md', 'public/hostile-review.md')

const pdfPath = 'public/cred10.pdf'
const tectonic = spawnSync('tectonic', ['--version'], { encoding: 'utf8' })

if (tectonic.status === 0) {
  const result = spawnSync('tectonic', ['--outdir', 'public', 'cred10.tex'], {
    encoding: 'utf8',
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
} else if (!existsSync(pdfPath)) {
  console.error(
    'Missing public/cred10.pdf and no `tectonic` binary found. Install Tectonic or add a compiled PDF before building.',
  )
  process.exit(1)
} else {
  console.warn('No `tectonic` binary found; using existing public/cred10.pdf.')
}
