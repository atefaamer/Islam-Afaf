import { useEffect, useState } from 'react'

export interface CountdownValue {
  days: number
  hours: number
  minutes: number
  seconds: number
  isComplete: boolean
}

function calculate(target: Date): CountdownValue {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true }
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds, isComplete: false }
}

export function useCountdown(isoDateTime: string): CountdownValue {
  const target = new Date(isoDateTime)
  const [value, setValue] = useState<CountdownValue>(() => calculate(target))

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(calculate(target))
    }, 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isoDateTime])

  return value
}
