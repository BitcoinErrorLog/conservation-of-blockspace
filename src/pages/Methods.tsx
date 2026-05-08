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
          <code>ρ</code> — usable fraction of <code>C_max</code> after deadweight loss (RBF, orphans, dust,
          policy rejects).
        </li>
        <li>
          <code>N_max = ⌊ ρ · C_max(W′) / e ⌋</code> — simultaneous exits bound for homogeneous cohort weight{' '}
          <code>e</code>.
        </li>
      </ul>

      <h2>Headline security slope bands</h2>
      <p>
        For the paper&apos;s rounded &quot;~83k–232k&quot; story at <code>W′ = 137</code>: lower threshold uses{' '}
        <code>ρ = 0.7</code> with <strong>active</strong> Lightning weight; upper uses <code>ρ = 1.0</code>{' '}
        with <strong>idle</strong> weight. The toy&apos;s &quot;paper headline&quot; classifier compares your
        demand <code>N</code> to those two floors.
      </p>

      <h2>Scenario bands (same e)</h2>
      <p>
        The second classifier fixes your current <code>e</code> and <code>W′</code>, then compares{' '}
        <code>N</code> to <code>N_max</code> at ρ ∈ {'{0.7, 1.0}'}. That answers &quot;how far can I stress ρ
        holding path weight fixed?&quot;
      </p>

      <h2>Scripts</h2>
      <p>
        Run <code>node scripts/numerics.mjs</code> for table parity. Run <code>npm test</code> for Vitest
        anchors tied to the same helpers as the UI.
      </p>
    </article>
  )
}
