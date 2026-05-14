import { Link } from 'react-router-dom'

export function TrustNetwork() {
  return (
    <article className="page page-stack">
      <section className="heading-group">
        <h1>Trust is the scaling layer</h1>
        <p className="lead">
          Layers do not make Bitcoin bigger. They make cooperation easier, cheaper, and more frequent because
          users believe the fallback still works. When that fallback becomes scarce, the hidden trust model
          becomes the product model.
        </p>
      </section>

      <section className="callout heading-group">
        <h2>Layers scale coordination, not Bitcoin.</h2>
        <p>
          Lightning is one example of the general pattern. The common path is cooperative. The rare path is
          unilateral enforcement. The system scales in practice when users rarely need the rare path at the
          same time.
        </p>
      </section>

      <section className="split-section">
        <div className="heading-group">
          <h2>Cryptography-first hides the real design problem.</h2>
          <p>
            Cryptography defines rights, commitments, proofs, and fallback transactions. It can make trust
            smaller and more enforceable. It cannot create blockspace or guarantee that every user fits through
            the exit path inside the same window.
          </p>
        </div>
        <div className="number-card">
          <p className="eyebrow">Design target</p>
          <strong>Expose the assumption.</strong>
          <span>Name who coordinates, what they can affect, how much is exposed, how long it lasts, and how a user exits.</span>
        </div>
      </section>

      <section className="section-stack">
        <h2>Five coordination layers already do the work</h2>
        <div className="card-grid">
          <article className="story-card">
            <h3>Liquidity coordination</h3>
            <p>LSPs, routing nodes, swaps, splices, channel opens, and markets allocate scarce liquidity.</p>
          </article>
          <article className="story-card">
            <h3>Routing reputation</h3>
            <p>Paths are selected by uptime, fee history, liquidity, success rates, and operator behavior.</p>
          </article>
          <article className="story-card">
            <h3>Service dependence</h3>
            <p>Hosted channels, watchtowers, default LSPs, backups, and fallback services change outcomes.</p>
          </article>
          <article className="story-card">
            <h3>Default policy</h3>
            <p>Fees, <code>to_self_delay</code>, channel sizes, minimum HTLCs, and reserve choices set risk.</p>
          </article>
          <article className="story-card">
            <h3>Uptime assumptions</h3>
            <p>A peer, watchtower, wallet, or LSP has to be online when timing matters most.</p>
          </article>
        </div>
      </section>

      <section className="section-stack">
        <h2>Trust has to become explicit</h2>
        <p>
          “I trust X” is too vague to build with. The wallet needs to represent trust in operational terms:
        </p>
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Dimension</th>
                <th>Question</th>
                <th>Product implication</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Whom</td>
                <td>Which peer, operator, LSP, ASP, federation, or merchant?</td>
                <td>Identity, reputation, and revocation must be visible.</td>
              </tr>
              <tr>
                <td>What</td>
                <td>Payment, subscription, payroll, SaaS, marketplace, loan?</td>
                <td>Different contexts deserve different failure tolerances.</td>
              </tr>
              <tr>
                <td>How much</td>
                <td>Absolute amount and fraction of user balance?</td>
                <td>Caps and allowances should bound loss.</td>
              </tr>
              <tr>
                <td>How long</td>
                <td>One-shot, recurring, indefinite, or until revoked?</td>
                <td>Time limits and settlement triggers should be policy objects.</td>
              </tr>
              <tr>
                <td>Terms</td>
                <td>Fallback rail, recourse, renewal, receipt, proof?</td>
                <td>Coordination belongs above individual rails.</td>
              </tr>
              <tr>
                <td>Exit path</td>
                <td>What can the user do alone when coordination fails?</td>
                <td>Fallback rights should be visible before users rely on them.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="split-section">
        <div className="heading-group">
          <h2>Every L2 has the same pattern</h2>
          <p>
            Common path: cooperation. Rare path: unilateral enforcement. Lightning has liquidity and uptime
            assumptions. Ark has ASP rounds and refresh windows. Operator-assisted systems have signatures and
            cooperative flow. Federations and BitVM-class systems have named operators, quorums, and challenge
            windows.
          </p>
          <p>
            The work is not to remove trust. The work is to bound it, expose it, and make it enforceable.
          </p>
        </div>
        <div className="number-card">
          <p className="eyebrow">Key line</p>
          <strong>Bitcoin does not need one perfect rail.</strong>
          <span>It needs explicit payment coordination above every rail.</span>
        </div>
      </section>

      <p>
        Next: <Link to="/protocols">compare protocols</Link>, then <Link to="/toy">stress the model</Link>.
      </p>
    </article>
  )
}
