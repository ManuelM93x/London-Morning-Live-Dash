import { useEffect, useState } from 'react'

export function useNews() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)

        // BBC UK RSS converted to JSON (no API key)
        const res = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/news/uk/rss.xml'
        )

        const data = await res.json()

        const articles = (data.items || []).slice(0, 3).map((item) => ({
          title: item.title,
          description: item.description,
          link: item.link,
          date: item.pubDate,
        }))

        setNews(articles)
      } catch (err) {
        console.log('News error:', err)
        setNews([])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()

    // refresh every 24h
    const interval = setInterval(fetchNews, 1000 * 60 * 60 * 24)

    return () => clearInterval(interval)
  }, [])

  return { news, loading }
}