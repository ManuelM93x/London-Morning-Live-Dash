export function getAQIColor(aqi) {
  if (aqi <= 50) return '#22c55e'      // good
  if (aqi <= 100) return '#eab308'     // moderate
  if (aqi <= 150) return '#f97316'     // unhealthy sensitive
  if (aqi <= 200) return '#ef4444'     // unhealthy
  if (aqi <= 300) return '#a855f7'     // very unhealthy
  return '#7f1d1d'                     // hazardous
}

export function getAQILevel(aqi) {
  if (aqi <= 50) return 'Good'
  if (aqi <= 100) return 'Moderate'
  if (aqi <= 150) return 'Unhealthy (Sensitive)'
  if (aqi <= 200) return 'Unhealthy'
  if (aqi <= 300) return 'Very Unhealthy'
  return 'Hazardous'
}

export function getHealthAdvice(aqi) {
  if (aqi <= 50) return 'Air quality is good. Enjoy outdoor activities.'
  if (aqi <= 100) return 'Acceptable air quality for most people.'
  if (aqi <= 150) return 'Sensitive people should limit outdoor activity.'
  if (aqi <= 200) return 'Reduce prolonged outdoor exertion.'
  if (aqi <= 300) return 'Avoid outdoor activity.'
  return 'Stay indoors and avoid physical activity outside.'
}