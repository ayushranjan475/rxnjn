import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { Engagement } from '../data/profile.config'
import { engagements } from '../data/profile.config'
import { useEscape } from '../hooks/useEscape'
import { useScrollLock } from '../hooks/useScrollLock'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

function CaseModal({ item, onClose }: { item: Engagement; onClose: () => void }) {
  useEscape(onClose)
  useScrollLock(true)
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
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <span className="case-area">{item.area}</span>
        <h3>{item.title}</h3>
        <p className="modal-meta">
          {item.role} · {item.period}
        </p>
        <div className="sar">
          <div>
            <h4>Situation</h4>
            <p>{item.situation}</p>
          </div>
          <div>
            <h4>Action</h4>
            <p>{item.action}</p>
          </div>
          <div>
            <h4>Result</h4>
            <p>{item.result}</p>
          </div>
          <div>
            <h4>My role</h4>
            <p>{item.role}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Engagements() {
  const [open, setOpen] = useState<Engagement | null>(null)

  return (
    <section className="section" id="engagements">
      <div className="container">
        <SectionHead id="engagements" />
        <Reveal>
          <div className="rail" tabIndex={0} aria-label="Engagement case studies">
            {engagements.map((e) => (
              <button key={e.id} className="case-card card-btn" onClick={() => setOpen(e)}>
                <span className="case-area">{e.area}</span>
                <h3>{e.title}</h3>
                <span className="case-more">Read the case →</span>
                <div className="case-metric">
                  <strong>{e.headline.value}</strong>
                  <span>{e.headline.label}</span>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
      <AnimatePresence>{open && <CaseModal item={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}
