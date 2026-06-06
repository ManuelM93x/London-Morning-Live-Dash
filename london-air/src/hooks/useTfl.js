import { useEffect, useState } from 'react'

export function useTfL() {
  const [lines, setLines] = useState([])

  useEffect(() => {
    async function load() {
      try {
        const [tubeRes, overgroundRes] = await Promise.all([
          fetch('https://api.tfl.gov.uk/Line/Mode/tube/Status'),
          fetch('https://api.tfl.gov.uk/Line/Mode/overground/Status'),
        ])

        const tubeData = await tubeRes.json()
        const overgroundData = await overgroundRes.json()

        const format = (data, mode) =>
          data.map((line) => ({
            name: line.name,
            status: line.lineStatuses?.[0]?.statusSeverityDescription || 'Unknown',
            mode,
          }))

        const combined = [
          ...format(tubeData, 'tube'),
          ...format(overgroundData, 'overground'),
        ]

        setLines(combined)
      } catch (err) {
        console.log('TfL error:', err)
        setLines([])
      }
    }

    load()
  }, [])

  return lines
}