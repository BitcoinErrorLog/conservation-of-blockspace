import { Link } from 'react-router-dom'

export function FAQ() {
  return (
    <article className="page">
      <h1>FAQ</h1>

      <p className="lead">
        Short answers below. For reviewer-style challenges, see <Link to="/objections">Objections</Link>.
      </p>

      <h2>Is this saying Lightning &quot;doesn&apos;t scale&quot;?</h2>
      <p>
        It says <strong>unilateral enforcement</strong> throughput is bounded by L1 weight inside{' '}
        <code>W′</code>. The paper&apos;s &quot;trusted credit&quot; language refers to reliance on peers,
        operators, or time windows — not necessarily legal custody. Cooperative operation, explicit custody,
        or deferred settlement change the operational story and the trust assumptions.
      </p>

      <h2>Why two zone readings?</h2>
      <p>
        The fast-exit envelope compares two explicit one-day Lightning assumptions: HTLC-stress at{' '}
        <code>ρ = 0.7</code> and idle perfect packing at <code>ρ = 1</code>. The scenario bands use one{' '}
        <code>e</code> so you can stress-test the slope for Ark-like or custom weights without mixing states.
        Exact floors are documented under <Link to="/methods">Methods</Link>.
      </p>

      <h2>Why show one day if many layers use 14–28 days?</h2>
      <p>
        One day is the fast-exit stress case, not the default for all layers. The main cross-layer benchmark is
        14 days, and 28 days shows the slow-settlement runway. The equation is unchanged: longer windows raise
        capacity by delaying settlement, not by creating more blockspace.
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
        Every unilateral user must have some concrete, operator-independent path to a spendable L1 claim. If
        your construction claims zero marginal exit bytes, specify the exact mechanism. See{' '}
        <Link to="/objections">Objections</Link>.
      </p>

      <h2>What if reviewers dispute the ρ example?</h2>
      <p>
        The worked example is illustrative methodology for estimating <code>ρ_obs</code>, not the theorem.
        Reproduce loss accounting from archives you trust and plug the numbers into the same ratio; the
        conservation inequality stands independently.
      </p>

      <h2>Where did the operator-assisted 3,400 wu preset come from?</h2>
      <p>
        It is an illustrative order-of-magnitude placeholder for peer review. Substitute an evidenced
        per-user witness budget for the concrete protocol version you analyze.
      </p>
    </article>
  )
}
