import { Link } from 'react-router-dom'

export function FAQ() {
  return (
    <article className="page page-stack">
      <section className="heading-group">
        <h1>FAQ</h1>
        <p className="lead">
          Short answers below. For reviewer-style challenges, see <Link to="/objections">Objections</Link>.
        </p>
      </section>

      <section className="qa-list">
        <div className="qa-item">
          <h2>Are you saying layers are useless?</h2>
          <p>
            No. Layers can scale coordination, UX, liquidity, netting, routing, and common-path payment flow. They
            do not scale Bitcoin&apos;s unilateral settlement surface. Those are different claims.
          </p>
        </div>

        <div className="qa-item">
          <h2>Is trust bad?</h2>
          <p>
            No. Hidden trust is bad. Explicit trust can be named, bounded, priced, revoked, and audited. The site is
            pushing trust into the design surface instead of pretending it disappears.
          </p>
        </div>

        <div className="qa-item">
          <h2>Is credit the same as custody?</h2>
          <p>
            No. Credit, custody, operator coordination, liquidity dependence, and unilateral settlement are
            different trust surfaces. The important step is to name which surface a protocol uses and what the user
            can do when it fails.
          </p>
        </div>

        <div className="qa-item">
          <h2>Can cryptography remove the need for trust?</h2>
          <p>
            Cryptography can reduce trust and enforce fallback rights. It cannot create blockspace. If many users
            map to exit units that need L1 enforcement inside the same <code>W′</code>, the block-weight
            accounting constraint still applies.
          </p>
        </div>

        <div className="qa-item">
          <h2>Why show one day if many layers use 14–28 days?</h2>
          <p>
            One day is the fast-exit stress case, not the default for all layers. The main cross-layer benchmark is
            14 days, and 28 days shows the slow-settlement runway. The equation is unchanged: longer windows raise
            capacity by delaying settlement, not by creating more blockspace.
          </p>
        </div>

        <div className="qa-item">
          <h2>Are exit units the same as human users?</h2>
          <p>
            No. The model counts unilateral enforcement traces. A human user, wallet, channel, VTXO, or account
            maps onto exit units according to the protocol and wallet topology.
          </p>
        </div>

        <div className="qa-item">
          <h2>Does package relay / cluster mempool fix this?</h2>
          <p>
            Better policy can improve <code>ρ</code> and reduce stranded enforcement weight. Bitcoin Core 31
            removed the CPFP carveout and expanded one-parent-one-child relay behavior beyond TRUC, but it does
            not remove <code>Σ N_i e_i ≤ ρ C_max</code> for disjoint unilateral packages under the stated
            assumptions.
          </p>
        </div>

        <div className="qa-item">
          <h2>Does everyone exit at once in practice?</h2>
          <p>
            The bound is a <strong>simultaneous cohort</strong> envelope, not a forecast of average traffic.
            Worst cases still matter when incentives correlate — liquidity shocks, operator failure, feerate
            spikes.
          </p>
        </div>

        <div className="qa-item">
          <h2>What if my protocol shares leaves or batches differently?</h2>
          <p>
            Every unilateral user must have some concrete, operator-independent path to secure an L1 claim. If
            your construction claims zero marginal exit weight, specify the exact mechanism. See{' '}
            <Link to="/objections">Objections</Link>.
          </p>
        </div>

        <div className="qa-item">
          <h2>What should builders do with this?</h2>
          <p>
            Measure <code>e</code>, choose <code>W′</code>, expose assumptions, make fallback paths explicit, and
            design trust as a first-class object. A useful layer can be honest about what it actually scales.
          </p>
        </div>

        <div className="qa-item">
          <h2>What if reviewers dispute the ρ example?</h2>
          <p>
            The worked example is illustrative methodology for estimating <code>ρ_obs</code>, not the theorem.
            Reproduce loss accounting from archives you trust and plug the numbers into the same ratio; the
            conservation inequality stands independently.
          </p>
        </div>

        <div className="qa-item">
          <h2>Where did the operator-assisted 3,400 wu template come from?</h2>
          <p>
            It is an illustrative positive-footprint template, not a measured claim about every operator-assisted
            design. Substitute an evidenced transaction trace, witness budget, and fallback window for the
            concrete protocol version you analyze.
          </p>
        </div>
      </section>
    </article>
  )
}
