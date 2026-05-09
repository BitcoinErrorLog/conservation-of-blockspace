export function Paper() {
  const base = import.meta.env.BASE_URL || '/'
  const texHref = `${base}blockspace-conservation-may-2026.tex`
  const pdfHref = `${base}blockspace-conservation-may-2026.pdf`

  return (
    <article className="page">
      <h1>Paper</h1>
      <p className="lead">
        <strong>Credible Exit and the Law of Conservation of Blockspace</strong> — formalizes a necessary
        finite-window byte-accounting bound for unilateral exits, with 1-day, 14-day, and 28-day window
        examples.
      </p>

      <div className="paper-actions">
        <a className="button-link" href={pdfHref} download>
          Download PDF
        </a>
        <a className="button-link secondary" href={texHref} download>
          Download TeX source
        </a>
      </div>

      <section className="paper-viewer" aria-label="Full paper PDF viewer">
        <iframe src={`${pdfHref}#view=FitH`} title="Full paper PDF" className="paper-object" />
      </section>
      <p className="paper-fallback">
        If your browser blocks embedded PDFs, <a href={pdfHref}>open the full paper PDF</a> or{' '}
        <a href={texHref}>download the TeX source</a>.
      </p>

      <h2>What to look for</h2>
      <p>
        The key table compares 1-day, 14-day, and 28-day enforcement windows. The proof states a necessary
        byte-accounting bound; the protocol sections show how Lightning, Ark-style, and operator-assisted
        designs substitute their own exit weight and window.
      </p>
    </article>
  )
}
