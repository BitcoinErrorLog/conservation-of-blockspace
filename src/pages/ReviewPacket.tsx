import { Link } from 'react-router-dom'

export function ReviewPacket() {
  return (
    <article className="page">
      <h1>Peer review packet</h1>
      <p className="lead">
        Checklist for researchers and protocol reviewers — what to verify first.
      </p>

      <h2>Claims map</h2>
      <ul>
        <li>
          <strong>Conservation inequality</strong> — assumptions (A1)–(A3), positive unilateral footprint,
          definition of model <code>ρ</code>.
        </li>
        <li>
          <strong>Numeric tables</strong> — verify the 1-day, 14-day, and 28-day rows against the toy.
        </li>
        <li>
          <strong>Instantiations</strong> — Lightning <code>e</code> profile vs your measured closes; Ark and
          operator-assisted presets marked illustrative unless a concrete transaction trace is supplied.
        </li>
        <li>
          <strong>Window framing</strong> — one day is a fast-exit stress case; 14 days is the cross-layer
          benchmark; 28 days is slow settlement.
        </li>
        <li>
          <strong>Observed ρ methodology</strong> — verify any loss decomposition against the stated archive,
          parser, checksums, and intermediate results before treating it as empirical.
        </li>
      </ul>

      <h2>Changelog</h2>
      <p>
        Current release: v1.10.0, centered on the 1-day / 14-day / 28-day enforcement-window framing.
      </p>

      <h2>Limitations (see paper §Limitations)</h2>
      <ul>
        <li>Static finite-window bound — not a fee equilibrium or mempool simulator.</li>
        <li>
          <code>ρ</code> endogeneity near saturation — acknowledge coupling when stress-testing worst cases.
        </li>
        <li>Cooperative paths excluded unless each user can still force a spendable L1 claim alone.</li>
      </ul>

      <h2>Hostile-read memo</h2>
      <p>
        <Link to="/objections">Objections</Link> collects the strongest expected challenges and short answers.
      </p>

      <h2>BibTeX (minimal)</h2>
      <pre className="equation" style={{ whiteSpace: 'pre-wrap' }}>
        {`@misc{carvalho2026conservation,
  title={Credible Exit and the Law of Conservation of Blockspace},
  author={Carvalho, John},
  year={2026},
  note={Manuscript v1.10.0; source blockspace-conservation-may-2026.tex}
}`}
      </pre>
    </article>
  )
}
