export function Paper() {
  const base = import.meta.env.BASE_URL || '/'
  const texHref = `${base}blockspace-conservation-may-2026.tex`
  const pdfHref = `${base}blockspace-conservation-may-2026.pdf`

  return (
    <article className="page page-stack">
      <section className="heading-group">
        <h1>Credible Exit and the Law of Conservation of Blockspace</h1>
        <p className="lead">
          The paper is the technical proof. It defines the bound, states the assumptions, and shows how protocol
          claims reduce to exit units, a window <code>W′</code>, and an enforcement footprint <code>e</code>. The
          rest of this site is the learning path around that proof.
        </p>
        <div className="paper-actions">
          <a className="button-link" href={pdfHref} download>
            Download PDF
          </a>
          <a className="button-link secondary" href={texHref} download>
            Download TeX source
          </a>
        </div>
      </section>

      <section className="paper-viewer" aria-label="Full paper PDF viewer">
        <iframe src={`${pdfHref}#view=FitH`} title="Full paper PDF" className="paper-object" />
      </section>
      <p className="paper-fallback">
        If your browser blocks embedded PDFs, <a href={pdfHref}>open the full paper PDF</a> or{' '}
        <a href={texHref}>download the TeX source</a>.
      </p>

      <section className="section-stack">
        <h2>What to look for</h2>
        <ul>
          <li>The theorem: simultaneous unilateral exit units must fit inside usable block weight.</li>
          <li>The window table: 1-day stress, 14-day benchmark, and 28-day slow-settlement runway.</li>
          <li>The protocol substitution rule: replace <code>W′</code> and <code>e</code> with the real path.</li>
          <li>The limitations: static block-weight accounting, not fee equilibrium or adoption forecasting.</li>
        </ul>
      </section>
    </article>
  )
}
