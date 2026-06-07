import { useEffect, useState } from 'react'

export function useAirQuality() {
  const [air, setAir] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=51.5072&longitude=-0.1276&hourly=pm2_5,pm10,nitrogen_dioxide,ozone'
        )

        const data = await res.json()

        const latestIndex = data.hourly.time.length - 1

        setAir({
          pm25: data.hourly.pm2_5[latestIndex],
          pm10: data.hourly.pm10[latestIndex],
          no2: data.hourly.nitrogen_dioxide[latestIndex],
          o3: data.hourly.ozone[latestIndex],
        })
      } catch (err) {
        console.log(err)
      }
    }

    load()
  }, [])

  return air
}