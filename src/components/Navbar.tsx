import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { SectionId } from '../data/profile.config'
import { profile, sectionMeta } from '../data/profile.config'

interface Props {
  sections: SectionId[]
  viewerLabel: string
  onChangeViewer: () => void
}

export default function Navbar({ sections, viewerLabel, onChangeViewer }: Props) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > last && y > 160)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className="nav"
      animate={{ y: hidden ? -72 : 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Primary"
    >
      <div className="container nav-inner">
        <a href="#top" className="nav-brand">
          {profile.initials}
        </a>
        <div className="nav-links">
          {sections.map((id) => (
            <a key={id} href={`#${id}`}>
              {sectionMeta[id].nav}
            </a>
          ))}
        </div>
        <button className="nav-viewer" onClick={onChangeViewer} title="Switch view">
          Viewing as: {viewerLabel}
        </button>
      </div>
    </motion.nav>
  )
}
