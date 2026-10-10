import { motion } from 'framer-motion'
import {
  certifications,
  leadership,
  profile,
  resumeSummaryLine,
  timeline,
} from '../data/profile.config'
import { useEscape } from '../hooks/useEscape'
import { useScrollLock } from '../hooks/useScrollLock'

export default function ResumeSheet({ onClose }: { onClose: () => void }) {
  useEscape(onClose)
  useScrollLock(true)

  const education = timeline.filter((t) => t.kind === 'education')
  const work = timeline.filter((t) => t.kind === 'work').slice().reverse()

  return (
    <motion.div
      className="modal-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="modal"
        style={{ width: 'min(860px, 100%)', padding: 20 }}
        role="dialog"
        aria-modal="true"
        aria-label="Resume"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="sheet">
          <h2>{profile.name.toUpperCase()}</h2>
          <p className="sheet-meta">
            {profile.location} · {profile.email} · {resumeSummaryLine}
          </p>

          <h4>Education</h4>
          {education.map((e) => (
            <div key={e.id}>
              <div className="sheet-row">
                <span>
                  {e.title}, {e.org}
                </span>
                <span>{e.period}</span>
              </div>
              <p>{e.scope}</p>
            </div>
          ))}

          <h4>Professional experience</h4>
          {work.map((w) => (
            <div key={w.id}>
              <div className="sheet-row">
                <span>
                  {w.title}, {w.org}
                </span>
                <span>{w.period}</span>
              </div>
              <ul>
                {w.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}

          <h4>Leadership and campus involvement</h4>
          {leadership.map((l) => (
            <div key={l.id}>
              <div className="sheet-row">
                <span>
                  {l.role}, {l.org}
                </span>
                <span>{l.period}</span>
              </div>
              <ul>
                <li>{l.summary}</li>
              </ul>
            </div>
          ))}

          <h4>Certifications and training</h4>
          <ul>
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div className="btn-stack" style={{ marginTop: 16 }}>
          <a className="btn btn-primary" href={profile.resumePdf} download>
            Download PDF
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
