import { Link } from 'react-router-dom'

export function FAQ() {
  return (
    <article className="page">
      <h1>FAQ</h1>

      <p className="lead">
        Short answers below; anticipated objections and fuller responses are on the{' '}
        <Link to="/objections">Objections</Link> page (same text as <code>docs/HOSTILE_REVIEW.md</code>).
      </p>

      <h2>Is this saying Lightning &quot;doesn&apos;t scale&quot;?</h2>
      <p>
        It says <strong>unilateral enforcement</strong> throughput is bounded by L1 weight inside{' '}
        <code>W′</code>. The paper&apos;s &quot;trusted credit&quot; language refers to reliance on peers,
        operators, or time windows — not necessarily legal custody. Cooperative operation, explicit custody,
        or deferred settlement change the operational story (and what users must trust).
      </p>

      <h2>Why two zone readings?</h2>
      <p>
        The headline bands match the paper&apos;s one-day Lightning narrative (active lower, idle upper). The
        scenario bands use one <code>e</code> so you can stress-test the slope for Ark-like or custom weights
        without mixing states. Exact floors are documented under <Link to="/methods">Methods</Link>.
      </p>

      <h2>Does package relay / cluster mempool fix this?</h2>
      <p>
        Better policy can improve <code>ρ</code> and shrink stranded bytes. It does not remove{' '}
        <code>Σ N_i e_i ≤ ρ C_max</code> for disjoint unilateral packages under the stated assumptions —
        cluster mempool tightens the best case; it does not mint blockspace.
      </p>

      <h2>Does everyone exit at once in practice?</h2>
      <p>
        The bound is a <strong>simultaneous cohort</strong> envelope, not a forecast of average traffic.
        Worst cases still matter when incentives correlate — liquidity shocks, operator failure, feerate
        spikes.
      </p>

      <h2>What if my protocol shares leaves or batches differently?</h2>
      <p>
        The disjoint-package lemma assumes non-overlapping minimal enforcing packages under the stated policy.
        If your construction genuinely shares leaves across users without custody, that claim deserves explicit
        proof; cooperative batching often trades trust or custody for packing. See{' '}
        <Link to="/objections">Objections</Link>.
      </p>

      <h2>What if reviewers dispute the mempool / telemetry example for ρ?</h2>
      <p>
        The worked example is methodology for estimating <code>ρ</code>, not the theorem. Reproduce loss
        accounting from archives you trust and plug the numbers into the same ratio; the conservation
        inequality stands independently.
      </p>

      <h2>Why cite queueing theory / Little&apos;s law?</h2>
      <p>
        The prose proof is intuition for &quot;backlog exceeds the window.&quot; A minimal counting argument
        suffices: arrivals exceeding cumulative admissible weight cannot all be scheduled inside{' '}
        <code>W′</code>. See <Link to="/objections">Objections</Link> for the short version.
      </p>

      <h2>Where did Spark&apos;s 3,400 wu come from?</h2>
      <p>
        It is an illustrative order-of-magnitude placeholder for peer review — substitute an evidenced
        per-user witness budget for the concrete protocol version you analyze.
      </p>
    </article>
  )
}
