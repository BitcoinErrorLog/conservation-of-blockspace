# Conservation of Blockspace — paper + interactive microsite

This repository contains **LaTeX source** for *Credible Exit and the Law of Conservation of Blockspace* (`blockspace-conservation-may-2026.tex`), a **Vite + React** microsite (overview, methods, FAQ, review packet), and the **blockspace toy** used to reproduce scenario tables.

## Quick start

```bash
npm install
npm run dev          # local dev server
npm run test -- --run
npm run numerics     # print numeric tables (same math as the paper)
npm run paper:pdf    # compile public/blockspace-conservation-may-2026.pdf with Tectonic
npm run build        # prepares public assets, then tsc + vite build
npm run preview      # serve /dist
```

`npm run build` runs `prebuild`, which copies `blockspace-conservation-may-2026.tex` and `docs/HOSTILE_REVIEW.md` into `public/`, and compiles `public/blockspace-conservation-may-2026.pdf` when `tectonic` is installed. If Tectonic is unavailable, the build requires an existing `public/blockspace-conservation-may-2026.pdf` so the Paper page never ships without a readable document.

## Site map

| Route | Content |
|-------|---------|
| `/` | Guided start page — intuition, core claim, next steps |
| `/paper` | Embedded full-paper PDF, PDF/TeX downloads, reproducibility pointers |
| `/toy` | Interactive calculator (ρ, W′, e, demand N, zones) |
| `/trust-network` | Lightning as a trust network; explicit-trust framing |
| `/protocols` | Lightning, Ark, Spark-like framing |
| `/methods` | Definitions, headline vs same-e zones |
| `/faq` | Short answers |
| `/objections` | Hostile-read memo for reviewer objections |
| `/review` | Peer-review checklist + BibTeX stub |
| `/references` | Bibliography and reproducibility pointers |

## Toy behavior

- Presets mirror paper scenarios (Lightning, Mixed Economy, Institutional, Ark, Spark-like illustrative weights).
- **Headline zone** compares exit demand to the paper’s 1-day Lightning envelope (active @ ρ=0.7 vs idle @ ρ=1.0).
- **Same-e zone** compares demand to N\_max at ρ∈{0.7, 1.0} for your current per-user weight.

## Estimating ρ (field sketch)

1. `C_max = (4_000_000 - w_cb) * W′` (wu).
2. Sum replaced, orphaned, dust, and policy-filtered weight over the window.
3. `ρ = 1 - losses / C_max`.

## Deploy (GitHub Pages)

Workflow `.github/workflows/deploy.yml` runs tests, `npm run build`, copies `dist/index.html` → `dist/404.html` for client-side routing, then publishes `dist/`.

Set `VITE_BASE=/repository-name/` via the workflow env when using project Pages URLs.

## Docs

- [`docs/SOURCE_MAP.md`](docs/SOURCE_MAP.md) — file index
- [`docs/HOSTILE_REVIEW.md`](docs/HOSTILE_REVIEW.md) — anticipated objections
- [`docs/CHANGELOG.md`](docs/CHANGELOG.md)

## License

See repository defaults; toy UI code follows project norms.
