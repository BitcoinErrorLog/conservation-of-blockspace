export function Paper() {
  const base = import.meta.env.BASE_URL || '/'
  const texHref = `${base}cred10.tex`
  const pdfHref = `${base}cred10.pdf`

  return (
    <article className="page">
      <h1>Paper</h1>
      <p className="lead">
        <strong>Credible Exit and the Law of Conservation of Blockspace</strong> — formalizes necessary
        byte accounting for unilateral exits under stated relay and topology assumptions, with Lightning and
        Ark-style instantiations and scenario tables.
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

      <p>
        The readable version above is the compiled PDF, not a LaTeX-to-HTML conversion. That keeps equations,
        tables, theorem labels, and bibliography rendering faithful to the source.
      </p>

      <h2>Executable table check</h2>
      <p>
        From the repo root run <code>node scripts/numerics.mjs</code> to print figures aligned with Tables 1
        and 2 and Ark-style examples — same arithmetic as{' '}
        <code>src/lib/math.ts</code>.
      </p>

      <h2>Version</h2>
      <p>
        Paper front matter lists v1.8.0 (Nov 2025). The interactive toy tracks a separate{' '}
        <code>TOY_VERSION</code> string for export metadata when UX or presets change. The build step
        refreshes <code>public/cred10.pdf</code> from <code>cred10.tex</code> when Tectonic is installed.
      </p>
    </article>
  )
}
