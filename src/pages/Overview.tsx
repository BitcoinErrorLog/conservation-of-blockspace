import { Link } from 'react-router-dom'

export function Overview() {
  return (
    <article className="page">
      <h1>Bitcoin layers inherit Layer&nbsp;1 enforcement limits</h1>
      <p className="lead">
        Payment throughput claims often skip the same constraint: unilateral enforcement consumes weight on
        the base chain inside a safety window <code>W′</code>. This site accompanies the paper{' '}
        <em>Credible Exit and the Law of Conservation of Blockspace</em> — a static bound tying simultaneous
        exits to <code>ρ</code> (usable fraction of blockspace after friction), window length, and per-user
        enforcement weight <code>e</code>. The toy stresses{' '}
        <strong>worst-case simultaneous cohorts</strong>, not typical daily volume.
      </p>

      <div className="callout">
        <p style={{ margin: 0 }}>
          <strong>Core inequality:</strong>{' '}
          <span className="equation" style={{ display: 'inline-block', marginTop: '0.5rem' }}>
            Σ<sub>i</sub> N<sub>i</sub> e<sub>i</sub> ≤ ρ · C<sub>max</sub>(W′)
          </span>
        </p>
      </div>

      <h2>Who this is for</h2>
      <ul>
        <li>
          <strong>Lightning</strong> implementers and operators — HTLC state and CSV windows drive{' '}
          <code>e</code> and <code>W′</code>.
        </li>
        <li>
          <strong>Ark</strong> and covenant-like stacks — timeout trees change amortization but not the shared
          L1 envelope for disjoint unilateral paths.
        </li>
        <li>
          <strong>Spark-like</strong> or operator-assisted designs — cooperative paths may dominate; the toy
          uses an <em>illustrative</em> per-user weight until you substitute measured footprints.
        </li>
      </ul>

      <h2>How to read the toy</h2>
      <p>
        Presets mirror tables in the paper. Adjust <code>ρ</code>, <code>W′</code>, and <code>e</code>, then
        compare a hypothetical simultaneous exit count to <strong>headline</strong> (1-day Lightning
        cross-state) zones and <strong>scenario</strong> bands at your current weight.
      </p>
      <p>
        <Link to="/toy">Open the interactive toy</Link> from the nav or here. For pushback you expect from
        protocol reviewers, see <Link to="/objections">Objections</Link>.
      </p>
    </article>
  )
}
