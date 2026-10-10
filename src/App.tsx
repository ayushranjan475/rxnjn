import { AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import type { ComponentType } from 'react'
import Engagements from './components/Engagements'
import Goals from './components/Goals'
import Hero from './components/Hero'
import Leadership from './components/Leadership'
import Navbar from './components/Navbar'
import Numbers from './components/Numbers'
import Opening from './components/Opening'
import ProfileSelector from './components/ProfileSelector'
import Range from './components/Range'
import ResumeContact from './components/ResumeContact'
import Timeline from './components/Timeline'
import type { SectionId, ViewerId } from './data/profile.config'
import { profile, sectionsEnabled, theme, viewers } from './data/profile.config'
import { track } from './lib/track'

type Stage = 'opening' | 'picker' | 'home'

const sectionComponents: Record<SectionId, ComponentType> = {
  engagements: Engagements,
  timeline: Timeline,
  range: Range,
  goals: Goals,
  leadership: Leadership,
  numbers: Numbers,
  resume: ResumeContact,
}

export default function App() {
  const [stage, setStage] = useState<Stage>('opening')
  const [viewerId, setViewerId] = useState<ViewerId>('recruiter')

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', theme.accent)
  }, [])

  const viewer = viewers.find((v) => v.id === viewerId) ?? viewers[0]
  const order = useMemo(() => viewer.order.filter((id) => sectionsEnabled[id]), [viewer])

  function choose(id: ViewerId) {
    setViewerId(id)
    setStage('home')
    window.scrollTo(0, 0)
    track('visit', { viewer: id })
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === 'opening' && <Opening key="opening" onDone={() => setStage('picker')} />}
        {stage === 'picker' && <ProfileSelector key="picker" onSelect={choose} />}
      </AnimatePresence>

      {stage === 'home' && (
        <>
          <Navbar sections={order} viewerLabel={viewer.label} onChangeViewer={() => setStage('picker')} />
          <main>
            <Hero first={order[0] ?? 'resume'} />
            {order.map((id) => {
              const Section = sectionComponents[id]
              return <Section key={`${viewerId}-${id}`} />
            })}
          </main>
          <footer className="footer">
            <div className="container">
              © {new Date().getFullYear()} {profile.name} · {profile.location}
            </div>
          </footer>
        </>
      )}
    </>
  )
}
