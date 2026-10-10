import type { SectionId } from '../data/profile.config'
import { sectionMeta } from '../data/profile.config'
import Reveal from './Reveal'

export default function SectionHead({ id }: { id: SectionId }) {
  const m = sectionMeta[id]
  return (
    <Reveal className="section-head">
      <span className="eyebrow">{m.eyebrow}</span>
      <h2>{m.title}</h2>
      <p>{m.intro}</p>
    </Reveal>
  )
}
