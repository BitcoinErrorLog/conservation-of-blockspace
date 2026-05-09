import { Link } from 'react-router-dom'

export function TrustNetwork() {
  return (
    <article className="page">
      <h1>Lightning as a trust network</h1>
      <p className="lead">
        Lightning does not make Bitcoin bigger. It lets people coordinate off-chain promises because they
        believe the fallback still works. When that fallback becomes scarce, the hidden trust model becomes
        the product model.
      </p>

      <section className="callout">
        <h2>Make trust explicit.</h2>
        <p>
          The problem is not trust. The problem is unmanaged trust. Wallets and payment protocols need to name
          the counterparty, the assumption, the failure mode, and the policy that controls exposure.
        </p>
      </section>

      <section>
        <h2>Five trust layers already do the work</h2>
        <div className="story-grid">
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

      <section>
        <h2>Trust has dimensions</h2>
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
            </tbody>
          </table>
        </div>
      </section>

      <section className="split-section">
        <div>
          <h2>Every L2 has the same pattern</h2>
          <p>
            Common path: cooperation. Rare path: unilateral enforcement. Lightning has liquidity and uptime
            assumptions. Ark has ASP rounds and refresh windows. Spark-like systems have operator signatures
            and cooperative flow. Federations and BitVM systems have named operators, quorums, and challenge
            windows.
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
