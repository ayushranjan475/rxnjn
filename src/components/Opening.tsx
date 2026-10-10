import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { opening } from '../data/profile.config'

export default function Opening({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (reduce) {
      setStep(3)
      return
    }
    const timers = [
      window.setTimeout(() => setStep(1), 500),
      window.setTimeout(() => setStep(2), 2300),
      window.setTimeout(() => setStep(3), 4300),
    ]
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [reduce])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape') onDone()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onDone])

  return (
    <motion.div
      className="opening"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      role="dialog"
      aria-label="Introduction"
    >
      <div className="opening-glow" aria-hidden="true" />
      <div style={{ position: 'relative' }}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.p
              key="studio"
              className="opening-studio"
              initial={{ opacity: 0, letterSpacing: '0.8em' }}
              animate={{ opacity: 1, letterSpacing: '0.4em' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            >
              {opening.studioLabel}
            </motion.p>
          )}
          {step >= 2 && (
            <motion.div
              key="title"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1 }}
            >
              <h1 className="opening-title">{opening.title}</h1>
              {step >= 3 && (
                <motion.p
                  className="opening-sub"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9 }}
                >
                  {opening.subtitle}
                </motion.p>
              )}
              {step >= 3 && (
                <motion.div
                  style={{ marginTop: 36 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <button className="btn btn-primary" onClick={onDone} autoFocus>
                    Enter
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {step < 3 && (
        <button className="opening-skip" onClick={onDone}>
          Skip
        </button>
      )}
    </motion.div>
  )
}
