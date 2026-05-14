import ReactMarkdown from 'react-markdown'

import hostileReviewMd from '@docs/HOSTILE_REVIEW.md?raw'

export function HostileReview() {
  return (
    <article className="page memo-markdown">
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
          Download the objections memo
        </a>
      </p>
    </article>
  )
}
