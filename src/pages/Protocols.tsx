import { Link } from 'react-router-dom'

export function Protocols() {
  return (
    <article className="page page-stack">
      <section className="heading-group">
        <h1>Protocols through the same enforcement lens</h1>
        <p className="lead">
          The question is not which brand “scales Bitcoin.” The question is what each system does on the common
          path, what users can do unilaterally when cooperation fails, and which trust boundary appears when
          Layer&nbsp;1 enforcement becomes scarce.
        </p>
        <p>
          A protocol can honestly scale cooperative usage while still failing to scale unilateral settlement.
          Those are different claims.
        </p>
        <p>
          The test is the smallest transaction trace by which each user can force an operator-independent
          Layer&nbsp;1 claim: its weight, its timing, and who can block it.
        </p>
        <p>
          The model counts exit units. Human users, wallets, channels, VTXOs, or accounts map onto those units
          according to protocol topology.
        </p>
      </section>

      <div className="comparison-table">
        <table>
          <thead>
            <tr>
              <th>System</th>
              <th>Common path</th>
              <th>Failure path</th>
              <th>W′</th>
              <th>e</th>
              <th>Trust/coordination dependency</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lightning</td>
              <td>Channel updates, routing, liquidity coordination.</td>
              <td>Force close plus HTLC claims before <code>to_self_delay</code>.</td>
              <td>Often modeled around 14 days; stress-test with 1 day.</td>
              <td>Idle and active exit-unit profiles; active HTLC state raises footprint.</td>
              <td>LSP liquidity, routing reliability, watchtower/peer uptime, policy defaults.</td>
            </tr>
            <tr>
              <td>Ark-style</td>
              <td>ASP rounds, cooperative exits, refreshes.</td>
              <td>Timeout-tree claims with user-specific leaves.</td>
              <td>Usually 14- or 28-day settlement runways.</td>
              <td>Measure the concrete timeout path; toy value is a template.</td>
              <td>ASP availability, round participation, refresh timing, exit windows.</td>
            </tr>
            <tr>
              <td>Operator-assisted</td>
              <td>Cooperative payment flow coordinated by named services or signers.</td>
              <td>Protocol-specific L1 enforcement path under operator failure or dispute.</td>
              <td>Depends on published challenge, exit, or revocation terms.</td>
              <td>Substitute concrete witness budget; toy value is a template.</td>
              <td>Operator signing, availability, fallback policy, challenge/exit mechanics.</td>
            </tr>
            <tr>
              <td>Factories</td>
              <td>Group coordination and off-chain updates.</td>
              <td>Disputes unwind into on-chain branches or per-channel claims.</td>
              <td>Specified by the factory construction and dispute tree.</td>
              <td>Model as a custom cohort once branch weights are specified.</td>
              <td>Group cooperation until the exit path is needed.</td>
            </tr>
            <tr>
              <td>Federations / BitVM-class</td>
              <td>Operator or quorum-managed cooperative flow.</td>
              <td>Challenge, peg-out, or proof path with its own window.</td>
              <td>Custom <code>W′</code>; do not treat cooperative throughput as exit capacity.</td>
              <td>Custom <code>e</code> based on proof, challenge, or peg-out path.</td>
              <td>Named operators, quorum assumptions, challenge timing.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <section className="section-stack">
        <div className="heading-group">
          <h2>How to compare claims</h2>
          <p>
            Ask what the protocol is actually scaling: settlement, coordination, credit, liquidity, or UX. The
            answer can be useful even when it is not settlement capacity.
          </p>
        </div>
        <div className="card-grid">
          <article className="story-card">
            <h3>Separate throughput from enforcement</h3>
            <p>Payments can be fast while exit guarantees are scarce. Do not use cooperative flow as proof of unilateral safety.</p>
          </article>
          <article className="story-card">
            <h3>Measure the rare path</h3>
            <p>Each protocol must supply its own <code>e</code>, <code>W′</code>, package policy, exit-unit mapping, and failure assumptions.</p>
          </article>
          <article className="story-card">
            <h3>Name the coordinator</h3>
            <p>If the system survives above the envelope through cooperation, identify who coordinates and what users trust.</p>
          </article>
        </div>
      </section>

      <p>
        <Link to="/toy">Try the toy</Link> · <Link to="/trust-network">Trust Network</Link> ·{' '}
        <Link to="/methods">Methods</Link> · <Link to="/objections">Objections</Link>
      </p>
    </article>
  )
}
