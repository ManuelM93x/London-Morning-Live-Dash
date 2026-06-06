import { useState, useEffect } from 'react'

import bg from './assets/pexels-gianluca-pugliese-556984722-16771428.jpg'

import { useWeather } from './hooks/useWeather'
import { useTfL } from './hooks/useTfL'
import { useAirQuality } from './hooks/useAirQuality'
import { useNews } from './hooks/useNews'

import NewsCard from './components/NewsCard'

export default function App() {
  const weather = useWeather()
  const lines = useTfL()
  const air = useAirQuality()
  const { news } = useNews()

  const [showGreeting, setShowGreeting] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false)
    }, 6500)

    return () => clearTimeout(timer)
  }, [])

  const getStatusClass = (status) => {
    const s = status?.toLowerCase()

    if (s?.includes('good service')) return 'good'
    if (s?.includes('part')) return 'partial'
    if (s?.includes('minor')) return 'partial'
    if (s?.includes('planned')) return 'planned'
    if (s?.includes('suspended')) return 'bad'
    if (s?.includes('closed')) return 'bad'
    if (s?.includes('severe')) return 'bad'

    return 'neutral'
  }

  return (
    <div
      className="dashboard"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        color: 'white',
      }}
    >

      {/* NAV */}
      <div className="nav">
        <a href="#home">Home</a>
        <a href="#tfl">TfL Update</a>
        <a href="#about">About</a>
      </div>

      {/* GREETING */}
      {showGreeting && (
        <div className="greeting">
          <span className="greetingText">
            Good morning, London!
          </span>
        </div>
      )}

      {/* HOME */}
      <section id="home">
        <div className="heroTitle">
          London Morning Live Dash
        </div>

        <div className="newsWrapper">
          <NewsCard news={news || []} />
        </div>

        <div className="topSpacer" />
      </section>

      {/* GRID */}
      <div className="content">
        <div className="grid">

          {/* WEATHER */}
          <div className="card">
            <h2>🌦 Weather</h2>

            {weather ? (
              <>
                <p>Temperature: {weather.temperature}°C</p>
                <p>Wind: {weather.windspeed} km/h</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>

          {/* AIR */}
          <div className="card">
            <h2>🌫 Air Quality</h2>

            {air ? (
              <>
                <p>PM2.5: {air.pm25}</p>
                <p>PM10: {air.pm10}</p>
                <p>NO₂: {air.no2}</p>
                <p>O₃: {air.o3}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>

        {/* TFL */}
        <section id="tfl" className="card full">
          <h2>🚇 Transport Status</h2>

          {Array.isArray(lines) && lines.length ? (
            lines.map((l, i) => (
              <div key={i} className="line">
                <span>{l.name}</span>

                <span className={`status ${getStatusClass(l.status)}`}>
                  {l.status}
                </span>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </section>
      </div>

      {/* ABOUT */}
      <footer id="about" className="footer">
        <h2>About this dashboard</h2>

        <p>
          London Quick Dashboard built using live APIs for Weather,
          TfL transport status, air quality, and news.
        </p>

        <p>
          Designed as a personal frontend project to explore real-time data,
          UI design, and modern React architecture.
        </p>
      </footer>

    </div>
  )
}