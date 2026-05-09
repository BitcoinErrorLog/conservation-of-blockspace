# Source map — Conservation of Blockspace project

Use this index to navigate the standalone paper, interactive toy, tests, and deploy files.

## Paper

| Path | Role |
|------|------|
| [`blockspace-conservation-may-2026.tex`](../blockspace-conservation-may-2026.tex) | Canonical LaTeX source: *Credible Exit and the Law of Conservation of Blockspace* |
| [`scripts/numerics.mjs`](../scripts/numerics.mjs) | Reproduces Table 1 and Table 2 figures from the paper (Node, no deps) |
| [`scripts/prepare-public.mjs`](../scripts/prepare-public.mjs) | Copies TeX/memo assets and compiles `public/blockspace-conservation-may-2026.pdf` when Tectonic is available |
| [`public/blockspace-conservation-may-2026.pdf`](../public/blockspace-conservation-may-2026.pdf) | Browser-readable/downloadable compiled paper |

## Interactive toy (Vite + React)

| Path | Role |
|------|------|
| [`src/main.tsx`](../src/main.tsx) | Entry |
| [`src/App.tsx`](../src/App.tsx) | React Router routes |
| [`src/pages/`](../src/pages/) | Start, Trust Network, Paper, Toy, Protocols, Methods, FAQ, Review packet, References |
| [`src/components/BlockspaceToy.tsx`](../src/components/BlockspaceToy.tsx) | Calculator UI (presets, sliders, export) |
| [`src/lib/math.ts`](../src/lib/math.ts) | `C_max`, `ρ`, `N_max`, zones, lead time |
| [`src/lib/scenarios.ts`](../src/lib/scenarios.ts) | Presets: Lightning, Ark, Spark (illustrative) |

## Tests and CI

| Path | Role |
|------|------|
| [`src/lib/*.test.ts`](../src/lib/) | Vitest: numeric anchors matching paper tables |
| [`vite.config.ts`](../vite.config.ts) | Vitest jsdom |
| [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) | GitHub Pages: test → build → deploy `dist/` |

## Build output

- Production bundle: `dist/` after `npm run build`.
- Paper TeX and hostile-review markdown for downloads: refreshed in `public/` during build.
