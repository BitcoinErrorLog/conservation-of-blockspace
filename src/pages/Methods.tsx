export function Methods() {
  return (
    <article className="page">
      <h1>Methods &amp; reproducibility</h1>

      <h2>Definitions</h2>
      <ul>
        <li>
          <code>C_max(W′) = (4,000,000 − w_cb) · W′</code> weight units (coinbase overhead <code>w_cb</code>{' '}
          ≈ 2,000 wu by default).
        </li>
        <li>
          <code>ρ</code> — model coefficient for the fraction of physical capacity usable by the relevant
          enforcement packages after relay, policy, fee-bumping, miner selection, and congestion friction.
        </li>
        <li>
          <code>N_max = ⌊ ρ · C_max(W′) / e ⌋</code> — simultaneous exits bound for homogeneous cohort weight{' '}
          <code>e</code>.
        </li>
      </ul>

      <h2>Window benchmarks</h2>
      <p>
        The paper uses three named windows: <strong>fast exit</strong> at <code>W′ = 137</code> blocks,{' '}
        <strong>layer benchmark</strong> at <code>W′ = 2016</code> blocks, and{' '}
        <strong>slow settlement</strong> at <code>W′ = 4032</code> blocks. The 14-day row is the main
        cross-layer benchmark; the one-day row is a stress case.
      </p>

      <h2>Fast-exit envelope</h2>
      <p>
        The rounded &quot;~66k–232k&quot; envelope is only the one-day Lightning stress case. Lower threshold uses{' '}
        <code>ρ = 0.7</code> with <strong>HTLC-stress</strong> Lightning weight; upper uses{' '}
        <code>ρ = 1.0</code> with <strong>idle</strong> weight.
      </p>

      <h2>Scenario bands (same e)</h2>
      <p>
        The second classifier fixes your current <code>e</code> and <code>W′</code>, then compares{' '}
        <code>N</code> to <code>N_max</code> at ρ ∈ {'{0.7, 1.0}'}. That answers &quot;how far can I stress ρ
        holding path weight fixed?&quot;
      </p>

      <h2>Observed ρ</h2>
      <p>
        <code>ρ_obs</code> can be estimated from an explicit loss decomposition, but the theorem only needs a
        chosen <code>ρ</code>. Any empirical <code>ρ_obs</code> claim must publish the dataset, parser,
        checksums, and intermediate results.
      </p>

      <h2>Reproducibility</h2>
      <p>
        The table arithmetic is exposed in the interactive toy, so readers can change the window, efficiency,
        or per-user exit weight and verify how the ceiling moves.
      </p>
    </article>
  )
}
