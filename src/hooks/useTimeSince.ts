import { useEffect, useState } from 'react'

export interface TimeSinceValue {
  /** عدد الأيام الكامل من التاريخ لحد دلوقتي (أو لحد التاريخ لو لسه مجاش) */
  totalDays: number
  hours: number
  minutes: number
  seconds: number
  /** true لو التاريخ لسه في المستقبل */
  isFuture: boolean
}

function calculate(from: Date): TimeSinceValue {
  const diff = Date.now() - from.getTime()
  const abs = Math.abs(diff)
  return {
    totalDays: Math.floor(abs / 86_400_000),
    hours: Math.floor((abs / 3_600_000) % 24),
    minutes: Math.floor((abs / 60_000) % 60),
    seconds: Math.floor((abs / 1000) % 60),
    isFuture: diff < 0,
  }
}

/**
 * بيعدّ من تاريخ معيّن لحد دلوقتي — مستخدم في عدّاد «بقالنا كام يوم مع بعض».
 * بيتحدّث كل ثانية، ولو التاريخ لسه في المستقبل بيقولك isFuture = true
 * (ساعتها العدّاد بيتصرّف كعدّ تنازلي عادي).
 */
export function useTimeSince(isoDateTime: string): TimeSinceValue {
  const [value, setValue] = useState<TimeSinceValue>(() => calculate(new Date(isoDateTime)))

  useEffect(() => {
    const from = new Date(isoDateTime)
    setValue(calculate(from))
    const interval = setInterval(() => setValue(calculate(from)), 1000)
    return () => clearInterval(interval)
  }, [isoDateTime])

  return value
}
