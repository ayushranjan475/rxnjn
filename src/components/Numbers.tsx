import { motion, useReducedMotion } from 'framer-motion'
import { rangeGroups, reach, scaleByRole } from '../data/profile.config'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

interface BarProps {
  label: string
  sub?: string
  display: string
  pct: number
}

function Bar({ label, sub, display, pct }: BarProps) {
  const reduce = useReducedMotion()
  const width = `${Math.max(2, Math.min(100, pct))}%`
  return (
    <div className="bar-row">
      <div className="bar-label">
        <span>
          {label}
          {sub && <span className="bar-sub"> · {sub}</span>}
        </span>
        <span>{display}</span>
      </div>
      <div className="bar-track">
        {reduce ? (
          <div className="bar-fill" style={{ width }} />
        ) : (
          <motion.div
            className="bar-fill"
            initial={{ width: 0 }}
            whileInView={{ width }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        )}
      </div>
    </div>
  )
}

export default function Numbers() {
  // Log scale between $100M and the largest figure so a 140x jump stays readable.
  const maxM = Math.max(...scaleByRole.map((s) => s.valueM))
  const floor = Math.log10(100)
  const logPct = (v: number) => ((Math.log10(v) - floor) / (Math.log10(maxM) - floor)) * 100

  const coverage = rangeGroups.map((g) => ({ label: g.title, count: g.proof.length }))
  const maxCover = Math.max(...coverage.map((c) => c.count))
  const maxReach = Math.max(...reach.map((r) => r.value))

  return (
    <section className="section" id="numbers">
      <div className="container">
        <SectionHead id="numbers" />
        <div className="chart-grid">
          <Reveal>
            <div className="chart-card">
              <h3>Scale of responsibility by role</h3>
              <p className="chart-caption">
                Largest figure cited for each role, on a log scale. The measures differ (portfolio audited, engagement
                size, assets attested), so read this as growing scope, not a like-for-like comparison.
              </p>
              {scaleByRole.map((s) => (
                <Bar key={s.label} label={s.label} sub={s.sub} display={s.display} pct={logPct(s.valueM)} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="chart-card">
              <h3>Range coverage</h3>
              <p className="chart-caption">Number of concrete proof points behind each skill group.</p>
              {coverage.map((c) => (
                <Bar key={c.label} label={c.label} display={String(c.count)} pct={(c.count / maxCover) * 100} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="chart-card">
              <h3>Leadership reach</h3>
              <p className="chart-caption">People reached or engaged through campus and community roles. Linear scale.</p>
              {reach.map((r) => (
                <Bar key={r.label} label={r.label} display={`${r.value}${r.value >= 150 ? '+' : ''}`} pct={(r.value / maxReach) * 100} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
