import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/** Counts from 0 to `to` once the returned ref scrolls into view. */
export function useCountUp(to: number, duration = 1.4) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setValue(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
  }, [inView, reduce, to, duration])

  return { ref, value }
}
