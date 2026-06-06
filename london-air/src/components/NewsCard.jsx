import { useState } from 'react'

export default function NewsCard({ news = [] }) {
  const [index, setIndex] = useState(0)

  const safeNews = Array.isArray(news) ? news : []

  if (!safeNews.length) {
    return (
      <div className="card newsCard fixedNewsCard">
        Loading news...
      </div>
    )
  }

  const item = safeNews[index]

  const next = () => {
    setIndex((i) => (i + 1) % safeNews.length)
  }

  const prev = () => {
    setIndex((i) => (i - 1 + safeNews.length) % safeNews.length)
  }

  const openNews = () => {
    if (item?.link) {
      window.open(item.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div
      className="card newsCard fixedNewsCard"
      onClick={openNews}
    >

      <h2>📰 London News</h2>

      {/* CONTENT */}
      <div className="newsContent">
        <h3>{item?.title}</h3>

        <p
          dangerouslySetInnerHTML={{
            __html: item?.description || ''
          }}
        />

        {item?.date && (
          <small>
            {new Date(item.date).toLocaleDateString()}
          </small>
        )}
      </div>

      {/* LEFT BUTTON */}
      <button
        className="navBtn left"
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
      >
        ‹
      </button>

      {/* RIGHT BUTTON */}
      <button
        className="navBtn right"
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
      >
        ›
      </button>

      {/* DOTS */}
      <div className="dots">
        {safeNews.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
          />
        ))}
      </div>

    </div>
  )
}