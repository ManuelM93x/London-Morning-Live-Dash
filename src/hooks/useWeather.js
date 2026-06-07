import { useEffect, useState } from 'react'

export function useWeather() {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=-0.1276&current_weather=true'
        )

        const data = await res.json()
        setWeather(data.current_weather)
      } catch (err) {
        console.log(err)
      }
    }

    load()
  }, [])

  return weather
}