import { goals } from '../data/profile.config'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function Goals() {
  const cls = `goal-card ${goals.placeholder ? 'todo' : ''}`
  return (
    <section className="section" id="goals">
      <div className="container">
        <SectionHead id="goals" />
        <div className="goals-grid">
          <Reveal>
            <div className={cls}>
              <h3>Short-term goal</h3>
              <p>{goals.shortTerm}</p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className={cls}>
              <h3>Long-term goal</h3>
              <p>{goals.longTerm}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className={cls}>
              <h3>Why an MBA, why now</h3>
              <p>{goals.why}</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className={cls}>
              <h3>Target schools</h3>
              {goals.schools.length === 0 ? (
                <p>TODO: add your target schools and programs in src/data/profile.config.ts.</p>
              ) : (
                <ul className="proof">
                  {goals.schools.map((s) => (
                    <li key={s.name}>
                      <strong>{s.name}</strong> · {s.program}
                      {s.note ? ` — ${s.note}` : ''}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </div>
        <p className="draft-note">
          Test status: {goals.testStatus}.
          {goals.placeholder && ' Dashed cards are placeholders: replace them, then set goals.placeholder to false.'}
        </p>
      </div>
    </section>
  )
}
