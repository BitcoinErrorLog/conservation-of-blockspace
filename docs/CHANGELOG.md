# Changelog

## 1.10.0

- Paper: reframed Security Slope around enforcement-window length; added primary 1-day / 14-day / 28-day capacity table; made 14 days the main cross-layer benchmark and one day the fast-exit stress case.
- Toy: added named window constants and presets for fast exit, 14-day benchmark, and 28-day slow settlement; updated numerics script and tests for the new table.
- Microsite: updated Start, Toy, Methods, Protocols, FAQ, Review Packet, References, README, source map, and hostile-review memo so the one-day envelope is no longer the main layer headline.
- Presentation: to be synced separately with the same 1-day / 14-day / 28-day framing.

## 1.9.0

- Paper: rewrote abstract/proof around direct finite-window byte accounting; removed unused SLO/probability framing; split model `ρ` from illustrative `ρ_obs`; reframed disjointness as a positive unilateral-footprint requirement; demoted fee-market claims to scope notes.
- Paper: replaced weak/dead citation chain with BOLT 3, BIP-431/TRUC, Bitcoin Core 28/package policy, Ark docs, cluster mempool, and corrected mass-exit/channel-factory references; removed unused bibliography entries.
- Paper numerics: updated Lightning active HTLC-stress profile to `e=5,848 wu`, yielding the v1.9 one-day envelope of 65,562 active stress exits at `ρ=0.7` and 232,087 idle exits at `ρ=1`.
- Microsite: synchronized copy across Start, Toy, Methods, Protocols, FAQ, Review packet, References, README, source map, and hostile-review memo.
- Engineering: updated constants, scenario tests, numerics script, and Vercel deploy documentation for the v1.9 paper/site consistency release.

## 1.8.0

- Microsite: React Router pages (guided Start page, Trust Network, Paper with embedded PDF viewer, Toy, Protocols, Methods, FAQ, Review packet, References).
- Toy: simultaneous-exit demand input; headline vs same-e security slope zones; Spark-like illustrative presets; richer JSON export (formulas, thresholds).
- Paper (`blockspace-conservation-may-2026.tex`): renamed canonical source from working filename `cred10.tex`; corrected idle column floor for ρ=0.7 (162,461); fixed Security Slope typography; fixed LaTeX compile issue in `Policy \& State`; expanded headline zones with exact floors; added Limitations section; softened unverified snapshot hash prose; BIP-431 bib cleaned to title-first citation.
- Engineering: `scripts/numerics.mjs` reproducibility; `scripts/prepare-public.mjs` copies public assets and compiles `public/blockspace-conservation-may-2026.pdf` with Tectonic when available; Vitest ignore AppleDouble `._*` files; ESLint ignore `._*`; GitHub Actions copies `404.html` for SPA routing on Pages.
- Docs: `docs/SOURCE_MAP.md`, `docs/HOSTILE_REVIEW.md`.

## Earlier

- v1.7.0 — Paper manuscript dated Nov 2025 (before canonical May 2026 filename).
