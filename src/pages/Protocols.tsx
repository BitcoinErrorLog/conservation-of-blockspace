import { Link } from 'react-router-dom'

export function Protocols() {
  return (
    <article className="page">
      <h1>Protocols at a glance</h1>
      <p className="lead">
        The conservation inequality applies to any layer where users sometimes need disjoint unilateral L1
        packages inside <code>W′</code>. Cooperation can reduce contention; it does not increase consensus
        weight.
      </p>

      <h2>Lightning</h2>
      <p>
        <code>e</code> grows with HTLC count; <code>W′</code> follows <code>to_self_delay</code> and routing
        policy. Presets &quot;Retail Panic&quot; and &quot;Quiet Exit&quot; mirror published scenario rows.
      </p>

      <h2>Ark-style (timeout trees)</h2>
      <p>
        Trees amortize coordination overhead but unilateral claims still consume per-user leaves under the
        modeled policy surface. The toy uses <strong>3,200 wu</strong> per user as in the paper&apos;s
        composed estimate — replace with your construction&apos;s measured path if it differs.
      </p>

      <h2>Spark-like / operator-assisted</h2>
      <p>
        Cooperative settlement can dominate user experience; worst-case unilateral enforcement still maps to
        an <code>e</code>. Spark presets use <strong>3,400 wu</strong> as an illustrative footprint — adjust
        the slider after you pin down witness sizes for your review target.
      </p>

      <p>
        <Link to="/toy">Try the toy</Link> · <Link to="/methods">Methods</Link> ·{' '}
        <Link to="/faq">FAQ</Link>
      </p>
    </article>
  )
}
