export function References() {
  return (
    <article className="page">
      <h1>References &amp; further reading</h1>
      <p className="lead">
        The paper&apos;s bibliography cites Lightning, Flood&amp;Loot, mass-exit simulations, Ark, BIP-431,
        mempool tooling, and queueing texts. Key URLs are inlined in{' '}
        <code>blockspace-conservation-may-2026.tex</code>.
      </p>

      <h2>Reproducibility</h2>
      <ul>
        <li>
          <code>scripts/numerics.mjs</code> reproduces the published table figures from the same arithmetic
          exposed in the toy.
        </li>
        <li>
          <code>docs/HOSTILE_REVIEW.md</code> captures anticipated reviewer objections and the current
          response framing.
        </li>
        <li>
          <code>public/blockspace-conservation-may-2026.pdf</code> is compiled from{' '}
          <code>blockspace-conservation-may-2026.tex</code> so the site can render the full paper without
          converting LaTeX to HTML.
        </li>
      </ul>
    </article>
  )
}
