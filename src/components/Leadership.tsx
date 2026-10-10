import { awards, certifications, leadership } from '../data/profile.config'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function Leadership() {
  return (
    <section className="section" id="leadership">
      <div className="container">
        <SectionHead id="leadership" />
        <div className="lead-grid">
          {leadership.map((l, i) => (
            <Reveal key={l.id} delay={Math.min(i * 0.05, 0.2)}>
              <article className="lead-card">
                <div>
                  <span className="tl-period">{l.period}</span>
                  <h3>{l.role}</h3>
                  <p className="lead-org">{l.org}</p>
                </div>
                <p className="lead-summary">{l.summary}</p>
                <div className="metric-row">
                  {l.metrics.map((m) => (
                    <div className="metric" key={m.label}>
                      <strong>{m.value}</strong>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="two-col">
          <Reveal>
            <div className="list-card">
              <h3>Awards and recognition</h3>
              <ul className="proof">
                {awards.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="list-card">
              <h3>Certifications and training</h3>
              <ul className="proof">
                {certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
