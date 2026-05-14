import { Link } from 'react-router-dom'

export function Overview() {
  return (
    <article className="page page-stack start-page">
      <section className="hero">
        <h1>Bitcoin has a size.</h1>
        <p className="lead">
          Every layer eventually depends on Bitcoin when users need to settle disputes. This research
          measures how many exit units can enforce claims through that finite settlement surface.
        </p>
        <p className="lead">Layers do not create blockspace. They coordinate trust around it.</p>
        <p>
          This site is centered on the paper{' '}
          <Link to="/paper">
            <em>Credible Exit and the Law of Conservation of Blockspace</em>
          </Link>
          . The paper is the technical proof; the site is the learning path around it.
        </p>
        <div className="hero-actions">
          <Link className="button-link" to="/toy">
            Try the model
          </Link>
          <Link className="button-link secondary" to="/paper">
            Read the paper
          </Link>
        </div>
      </section>

      <section className="argument-list" aria-label="Core argument">
        <p className="eyebrow">The argument</p>
        <ol>
          <li>
            <span className="numeral">01</span>
            <div className="argument-body">
              <h3>Settlement is scarce.</h3>
              <p>
                Blocks have finite weight. Enforcement windows have finite time. Any system that settles
                disputes on Bitcoin inherits both limits.
              </p>
            </div>
          </li>
          <li>
            <span className="numeral">02</span>
            <div className="argument-body">
              <h3>Layers move the common path.</h3>
              <p>
                Normal payments can be routed, batched, netted, refreshed, or coordinated off-chain while
                everyone keeps participating.
              </p>
            </div>
          </li>
          <li>
            <span className="numeral">03</span>
            <div className="argument-body">
              <h3>Failure returns to Bitcoin.</h3>
              <p>
                The non-custodial test is whether users can enforce alone when peers, operators, or
                coordinators stop cooperating.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className="heading-group">
        <h2>What scales is coordination.</h2>
        <p>
          If the exit path is finite, mass usage depends on fewer exit units needing it at once. That is not
          magic cryptography. It is trust, policy, timing, reputation, operators, credit, netting, and
          coordination.
        </p>
      </section>

      <section className="equation-callout">
        <div>
          <p className="eyebrow">Law of Conservation of Blockspace</p>
          <h2>The proof is demand versus supply.</h2>
          <p>The left side is exit demand. The right side is usable block weight inside the safety window.</p>
        </div>
        <span className="equation">
          Σ<sub>i</sub> N<sub>i</sub> e<sub>i</sub> ≤ ρ · C<sub>max</sub>(W′)
        </span>
      </section>

      <section className="split-section">
        <div className="heading-group">
          <h2>The window is the tradeoff.</h2>
          <p>
            One day is the fast-exit stress case. Fourteen days is the main cross-layer benchmark.
            Twenty-eight days is the slow-settlement runway. Layers scale credible exit by stretching
            time, not by creating more blockspace.
          </p>
        </div>
        <aside className="number-card">
          <p className="eyebrow">14-day layer benchmark</p>
          <strong>~1.1M to ~2.7M</strong>
          <span>
            simultaneous Lightning active exits as ρ ranges from 0.60 to 0.95. Fourteen days moves
            credible exit into the low millions, but only by delaying finality.
          </span>
        </aside>
      </section>

      <section className="section-stack">
        <h2>Follow the argument</h2>
        <div className="journey-grid">
          <Link to="/toy" className="journey-card">
            <strong>Play with the model</strong>
            <span>Change ρ, W′, per-exit-unit weight, and demand. See where the envelope binds.</span>
          </Link>
          <Link to="/trust-network" className="journey-card">
            <strong>Understand explicit trust</strong>
            <span>See why Lightning is already a trust network and why that matters for products.</span>
          </Link>
          <Link to="/protocols" className="journey-card">
            <strong>Compare rails</strong>
            <span>Lightning, Ark, factories, and operator-assisted systems through one lens.</span>
          </Link>
          <Link to="/paper" className="journey-card">
            <strong>Read the paper</strong>
            <span>Full paper, window tables, and protocol assumptions.</span>
          </Link>
        </div>
      </section>
    </article>
  )
}
