import { getAQIColor, getAQILevel, getHealthAdvice } from '../utils/aqiHelpers'

export default function StationCard({ station, rank }) {
  const color = getAQIColor(station.aqi)

  return (
    <div style={{
      border: `1px solid ${color}`,
      borderRadius: '12px',
      padding: '1rem',
      background: '#0b1220'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>{rank}. {station.name}</h3>
        <span style={{ color }}>{station.aqi}</span>
      </div>

      <p style={{ margin: '0.5rem 0', color }}>
        {getAQILevel(station.aqi)}
      </p>

      <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
        Main pollutant: {station.pollutant}
      </p>

      <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#6b7280' }}>
        {getHealthAdvice(station.aqi)}
      </p>
    </div>
  )
}