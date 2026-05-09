import { BlockspaceToy } from '../components/BlockspaceToy'
import { Link } from 'react-router-dom'

export function ToyPage() {
  return (
    <article className="page">
      <section className="callout">
        <p className="eyebrow">Use this first</p>
        <h1>Stress the fallback, not the happy path.</h1>
        <p>
          Start with <strong>Retail Panic</strong> for a short Lightning window, then compare Ark and
          Spark-like presets. The model is asking: if this many users must exit together, does their L1
          enforcement demand fit inside the safety window?
        </p>
        <p>
          Need the conceptual frame first? Read <Link to="/trust-network">Lightning as a trust network</Link>.
        </p>
      </section>
      <BlockspaceToy />
    </article>
  )
}
