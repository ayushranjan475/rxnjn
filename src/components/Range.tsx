import { rangeGroups } from '../data/profile.config'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function Range() {
  return (
    <section className="section" id="range">
      <div className="container">
        <SectionHead id="range" />
        <div className="range-grid">
          {rangeGroups.map((g, i) => (
            <Reveal key={g.id} delay={Math.min(i * 0.05, 0.25)}>
              <article className="range-card">
                <h3>{g.title}</h3>
                <div className="chips">
                  {g.skills.map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
                <p className="proof-label">Proof</p>
                <ul className="proof">
                  {g.proof.map((p) => (
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
