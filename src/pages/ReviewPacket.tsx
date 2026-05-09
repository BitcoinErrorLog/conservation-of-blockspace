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
          <strong>Conservation inequality</strong> — assumptions (A1)–(A3), disjoint packages, definition of{' '}
          <code>ρ</code>.
        </li>
        <li>
          <strong>Numeric tables</strong> — reproduce via <code>node scripts/numerics.mjs</code> and{' '}
          <code>npm test</code>.
        </li>
        <li>
          <strong>Instantiations</strong> — Lightning <code>e</code> formula vs your measured closes; Ark{' '}
          composed weight; Spark preset marked illustrative.
        </li>
        <li>
          <strong>Empirical ρ example</strong> — verify loss decomposition methodology against your mempool
          archive if challenging the 0.71 worked example.
        </li>
      </ul>

      <h2>Changelog</h2>
      <p>
        Release notes: <code>docs/CHANGELOG.md</code>.
      </p>

      <h2>Limitations (see paper §Limitations)</h2>
      <ul>
        <li>Static bound — not a fee equilibrium or mempool simulator.</li>
        <li>
          <code>ρ</code> endogeneity near saturation — acknowledge coupling when stress-testing worst cases.
        </li>
        <li>Cooperative paths excluded from the unilateral envelope.</li>
      </ul>

      <h2>Hostile-read memo</h2>
      <p>
        <Link to="/objections">Objections</Link> — full text (renders{' '}
        <code>docs/HOSTILE_REVIEW.md</code>), plus a downloadable <code>hostile-review.md</code> from the
        static build. Same file is in-repo for diffs and PRs.
      </p>

      <h2>BibTeX (minimal)</h2>
      <pre className="equation" style={{ whiteSpace: 'pre-wrap' }}>
        {`@misc{carvalho2026conservation,
  title={Credible Exit and the Law of Conservation of Blockspace},
  author={Carvalho, John},
  year={2026},
  note={Manuscript v1.8.0; source blockspace-conservation-may-2026.tex}
}`}
      </pre>
    </article>
  )
}
