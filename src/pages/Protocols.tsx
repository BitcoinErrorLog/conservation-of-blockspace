import { Link } from 'react-router-dom'

export function Protocols() {
  return (
    <article className="page">
      <h1>Protocols through the same enforcement lens</h1>
      <p className="lead">
        The question is not which brand “scales Bitcoin.” The question is what each system does on the common
        path, what users can do unilaterally when cooperation fails, and which trust boundary appears when
        Layer&nbsp;1 enforcement becomes scarce.
      </p>

      <div className="comparison-table">
        <table>
          <thead>
            <tr>
              <th>System</th>
              <th>Common path</th>
              <th>Unilateral path</th>
              <th>Trust boundary</th>
              <th>Toy handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lightning</td>
              <td>Channel updates, routing, liquidity coordination.</td>
              <td>Force close plus HTLC claims before <code>to_self_delay</code>.</td>
              <td>LSP liquidity, routing reliability, watchtower/peer uptime, policy defaults.</td>
              <td><code>e</code> grows with HTLC state; compare 1-day stress to 14-day benchmark.</td>
            </tr>
            <tr>
              <td>Ark-style</td>
              <td>ASP rounds, cooperative exits, refreshes.</td>
              <td>Timeout-tree claims with user-specific leaves.</td>
              <td>ASP availability, round participation, refresh timing, exit windows.</td>
              <td>Use 14- or 28-day presets, then replace <code>e</code> with measured path weight.</td>
            </tr>
            <tr>
              <td>Operator-assisted</td>
              <td>Cooperative payment flow coordinated by named services or signers.</td>
              <td>Protocol-specific L1 enforcement path under operator failure or dispute.</td>
              <td>Operator signing, availability, fallback policy, challenge/exit mechanics.</td>
              <td>Illustrative <code>e</code>; substitute concrete witness budget and window.</td>
            </tr>
            <tr>
              <td>Factories</td>
              <td>Group coordination and off-chain updates.</td>
              <td>Disputes unwind into on-chain branches or per-channel claims.</td>
              <td>Group cooperation until the exit path is needed.</td>
              <td>Model as a custom cohort once branch weights are specified.</td>
            </tr>
            <tr>
              <td>Federations / BitVM-class</td>
              <td>Operator or quorum-managed cooperative flow.</td>
              <td>Challenge, peg-out, or proof path with its own window.</td>
              <td>Named operators, quorum assumptions, challenge timing.</td>
              <td>Custom <code>W′</code> and <code>e</code>; do not treat cooperative throughput as exit capacity.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>How to compare claims</h2>
      <div className="story-grid">
        <article className="story-card">
          <h3>Separate throughput from enforcement</h3>
          <p>Payments can be fast while exit guarantees are scarce. Do not use cooperative flow as proof of unilateral safety.</p>
        </article>
        <article className="story-card">
          <h3>Measure the rare path</h3>
          <p>Each protocol must supply its own <code>e</code>, <code>W′</code>, package policy, and failure assumptions.</p>
        </article>
        <article className="story-card">
          <h3>Name the coordinator</h3>
          <p>If the system survives above the envelope through cooperation, identify who coordinates and what users trust.</p>
        </article>
      </div>

      <p>
        <Link to="/toy">Try the toy</Link> · <Link to="/trust-network">Trust Network</Link> ·{' '}
        <Link to="/methods">Methods</Link> · <Link to="/objections">Objections</Link>
      </p>
    </article>
  )
}
