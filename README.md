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
| `/toy` | Interactive calculator (ρ, W′, e, demand N, 1-day / 14-day / 28-day windows) |
| `/trust-network` | Lightning as a trust network; explicit-trust framing |
| `/protocols` | Lightning, Ark, factories, BitVM-class, and operator-assisted framing |
| `/methods` | Definitions, window benchmarks, fast-exit envelope, same-e zones |
| `/faq` | Short answers |
| `/objections` | Hostile-read memo for reviewer objections |
| `/review` | Peer-review checklist + BibTeX stub |
| `/references` | Bibliography and reproducibility pointers |

## Toy behavior

- Presets mirror paper scenarios across the **fast-exit stress case** (137 blocks), **14-day layer benchmark** (2016 blocks), and **28-day slow-settlement runway** (4032 blocks).
- **Fast-exit envelope** compares exit demand to the paper’s 1-day Lightning envelope (HTLC-stress active @ ρ=0.7 vs idle @ ρ=1.0).
- **Same-e zone** compares demand to N\_max at ρ∈{0.7, 1.0} for your current per-exit-unit weight.

## Estimating ρ_obs (field sketch)

1. `C_max = (4_000_000 - w_cb) * W′` (wu).
2. Sum replaced, orphaned, dust, and policy-filtered weight over the window.
3. `ρ_obs = 1 - losses / C_max`.
4. Publish the dataset, parser, checksums, and intermediate outputs before treating the estimate as measured.

## Deploy (Vercel)

The production site is deployed with Vercel. Run the full verification suite before production deploy:

```bash
npm run numerics
npm test -- --run
npm run lint
npm run build
vercel --prod --yes
```

`vercel.json` rewrites all routes to `index.html` for client-side routing.

## Docs

- [`docs/SOURCE_MAP.md`](docs/SOURCE_MAP.md) — file index
- [`docs/HOSTILE_REVIEW.md`](docs/HOSTILE_REVIEW.md) — anticipated objections
- [`docs/CHANGELOG.md`](docs/CHANGELOG.md)

## License

See repository defaults; toy UI code follows project norms.
