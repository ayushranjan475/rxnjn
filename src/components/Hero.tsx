import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import type { Kpi, SectionId } from '../data/profile.config'
import { kpis, profile } from '../data/profile.config'
import { useCountUp } from '../hooks/useCountUp'
import { bookingHref, bookingIsExternal } from '../lib/contact'

function KpiItem({ kpi }: { kpi: Kpi }) {
  const { ref, value } = useCountUp(kpi.value ?? 0)
  return (
    <div className="kpi" ref={ref}>
      <div className="kpi-value">
        {kpi.value !== undefined ? (
          <>
            {kpi.prefix}
            {Math.round(value)}
            {kpi.suffix}
          </>
        ) : (
          kpi.text
        )}
      </div>
      <div className="kpi-label">{kpi.label}</div>
    </div>
  )
}

function Portrait() {
  const [failed, setFailed] = useState(false)
  return (
    <div className="portrait" aria-label={`Portrait of ${profile.name}`}>
      {failed ? (
        <span className="portrait-mono" aria-hidden="true">
          {profile.initials}
        </span>
      ) : (
        <img src={profile.photo} alt={profile.name} onError={() => setFailed(true)} />
      )}
    </div>
  )
}

export default function Hero({ first }: { first: SectionId }) {
  const reduce = useReducedMotion()
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.7, ease: 'easeOut' as const },
        }

  return (
    <header className="hero" id="top">
      <div className="container">
        <div className="hero-grid">
          <div>
            <motion.span className="eyebrow" {...fade(0)}>
              Impact Dashboard
            </motion.span>
            <motion.h1 {...fade(0.1)}>{profile.name}</motion.h1>
            <motion.p className="hero-position" {...fade(0.2)}>
              {profile.positioning}
            </motion.p>
            <motion.p className="hero-bio" {...fade(0.3)}>
              {profile.bio}
            </motion.p>
            <motion.div className="hero-actions" {...fade(0.4)}>
              <a className="btn btn-primary" href={`#${first}`}>
                Explore the work
              </a>
              <a className="btn" href="#resume">
                Resume
              </a>
              <a
                className="btn"
                href={bookingHref}
                {...(bookingIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                Book a call
              </a>
            </motion.div>
          </div>
          <motion.div {...fade(0.3)}>
            <Portrait />
          </motion.div>
        </div>

        <div className="kpi-strip" role="list" aria-label="Key figures">
          {kpis.map((k) => (
            <KpiItem key={k.label} kpi={k} />
          ))}
        </div>
      </div>
    </header>
  )
}
