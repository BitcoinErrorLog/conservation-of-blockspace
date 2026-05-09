import { Link } from 'react-router-dom'

export function Overview() {
  return (
    <article className="page start-page">
      <section className="hero">
        <p className="eyebrow">Start here</p>
        <h1>Layers can move payments off-chain. They cannot create more exit room.</h1>
        <p className="lead">
          Bitcoin scaling debates often ask whether a layer can route more payments. This site asks the
          stricter question: how many users can enforce their claims on Layer&nbsp;1 inside the same safety
          window when cooperation fails?
        </p>
        <div className="hero-actions">
          <Link className="button-link" to="/toy">
            Try the model
          </Link>
          <Link className="button-link secondary" to="/trust-network">
            Understand the trust model
          </Link>
          <Link className="button-link secondary" to="/paper">
            Read the paper
          </Link>
        </div>
      </section>

      <section className="story-grid" aria-label="Core argument">
        <article className="story-card">
          <span className="step-number">1</span>
          <h2>The payment moves off-chain.</h2>
          <p>
            Lightning, Ark, Spark, factories, and federations can defer, batch, net, or coordinate payment
            activity outside the base chain.
          </p>
        </article>
        <article className="story-card">
          <span className="step-number">2</span>
          <h2>The enforcement threat stays on-chain.</h2>
          <p>
            Non-custodial guarantees still depend on users being able to publish unilateral transactions before
            a timeout or policy window closes.
          </p>
        </article>
        <article className="story-card">
          <span className="step-number">3</span>
          <h2>The fallback has a size.</h2>
          <p>
            If too many users need the fallback together, enforcement becomes a rationing problem. The protocol
            may keep running; the guarantee does not.
          </p>
        </article>
      </section>

      <section className="callout equation-callout">
        <div>
          <p className="eyebrow">Law of Conservation of Blockspace</p>
          <h2>Demand must fit supply.</h2>
          <p>
            The left side is exit demand. The right side is usable blockspace inside the safety window.
          </p>
        </div>
        <span className="equation">
          Σ<sub>i</sub> N<sub>i</sub> e<sub>i</sub> ≤ ρ · C<sub>max</sub>(W′)
        </span>
      </section>

      <section className="split-section">
        <div>
          <h2>Lightning still works. The story changes.</h2>
          <p>
            The point is not that Lightning, Ark, or Spark are useless. The point is that their safety model is
            conditional on a shared Layer&nbsp;1 envelope. Above the envelope, cooperation, operators,
            liquidity, policy, and reputation do real work. That is trust, and good design should make it
            explicit.
          </p>
        </div>
        <div className="number-card">
          <p className="eyebrow">One-day Lightning reference</p>
          <strong>~83k to ~232k</strong>
          <span>
            simultaneous exits, depending on channel state and relay efficiency. Longer windows buy time, not
            more blockspace.
          </span>
        </div>
      </section>

      <section>
        <h2>Follow the argument</h2>
        <div className="journey-grid">
          <Link to="/toy" className="journey-card">
            <strong>1. Play with the model</strong>
            <span>Change ρ, W′, per-user weight, and demand. See where the envelope binds.</span>
          </Link>
          <Link to="/trust-network" className="journey-card">
            <strong>2. Understand explicit trust</strong>
            <span>See why Lightning is already a trust network and why that matters for products.</span>
          </Link>
          <Link to="/protocols" className="journey-card">
            <strong>3. Compare rails</strong>
            <span>Lightning, Ark, Spark, factories, and federations through the same enforcement lens.</span>
          </Link>
          <Link to="/paper" className="journey-card">
            <strong>4. Read the paper</strong>
            <span>Full compiled PDF, TeX source, and reproducible table checks.</span>
          </Link>
        </div>
      </section>
    </article>
  )
}
