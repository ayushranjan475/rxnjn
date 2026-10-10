import { motion } from 'framer-motion'
import type { ViewerId } from '../data/profile.config'
import { viewers } from '../data/profile.config'

interface Props {
  onSelect: (id: ViewerId) => void
}

export default function ProfileSelector({ onSelect }: Props) {
  return (
    <motion.div
      className="picker"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1>Who’s viewing?</h1>
        <p className="picker-sub">Each view reorders the site around what you care about most.</p>
        <div className="picker-grid">
          {viewers.map((v, i) => (
            <motion.button
              key={v.id}
              className="picker-card"
              onClick={() => onSelect(v.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
            >
              <div className="picker-badge" aria-hidden="true">
                {v.label.charAt(0)}
              </div>
              <h3>{v.label}</h3>
              <p>{v.blurb}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
