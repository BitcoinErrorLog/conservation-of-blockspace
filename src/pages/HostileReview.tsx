import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import hostileReviewMd from '@docs/HOSTILE_REVIEW.md?raw'

export function HostileReview() {
  return (
    <article className="page memo-markdown">
      <p className="memo-back">
        <Link to="/faq">FAQ</Link> · <Link to="/review">Review packet</Link>
      </p>
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1>{children}</h1>,
          h2: ({ children }) => <h2>{children}</h2>,
          p: ({ children }) => <p>{children}</p>,
          strong: ({ children }) => <strong>{children}</strong>,
        }}
      >
        {hostileReviewMd}
      </ReactMarkdown>
      <p className="memo-download">
        <a href={`${import.meta.env.BASE_URL}hostile-review.md`} download>
          Download hostile-review.md
        </a>{' '}
        (same text as <code>docs/HOSTILE_REVIEW.md</code> in the repo).
      </p>
    </article>
  )
}
