import { timeline } from '../data/profile.config'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function Timeline() {
  // Newest first reads as progression upward; chronological reads as a story. Chronological here.
  return (
    <section className="section" id="timeline">
      <div className="container">
        <SectionHead id="timeline" />
        <div className="tl">
          {timeline.map((t, i) => (
            <Reveal key={t.id} delay={Math.min(i * 0.05, 0.2)}>
              <article className={`tl-item ${t.kind === 'education' ? 'edu' : ''}`}>
                <div className="tl-top">
                  <h3>{t.title}</h3>
                  <span className="tl-period">{t.period}</span>
                </div>
                <p className="tl-org">{t.org}</p>
                <span className="tl-scope">{t.scope}</span>
                <ul>
                  {t.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
