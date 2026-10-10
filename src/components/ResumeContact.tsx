import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { integrations, profile } from '../data/profile.config'
import { bookingHref, bookingIsExternal, mailto, recommendationHref } from '../lib/contact'
import Reveal from './Reveal'
import ResumeSheet from './ResumeSheet'
import SectionHead from './SectionHead'

export default function ResumeContact() {
  const [showResume, setShowResume] = useState(false)
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const website = String(data.get('website') ?? '') // honeypot
    if (!name || !email || !message) {
      setStatus('Please fill in all fields.')
      return
    }

    if (!integrations.eventsEndpoint) {
      window.location.href = mailto(`Message from ${name}`, `${message}\n\nReply to: ${email}`)
      setStatus('Opening your email app…')
      return
    }

    setSending(true)
    setStatus('')
    try {
      const res = await fetch(integrations.eventsEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', name, email, message, website }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('Thanks, your message was sent.')
      form.reset()
    } catch {
      setStatus(`Could not send. Please email ${profile.email} directly.`)
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="section" id="resume">
      <div className="container">
        <SectionHead id="resume" />
        <div className="contact-grid">
          <Reveal>
            <div className="panel">
              <h3>Resume</h3>
              <p>Read it here, or download the PDF.</p>
              <div className="btn-stack">
                <button className="btn btn-primary" onClick={() => setShowResume(true)}>
                  View resume
                </button>
                <a className="btn" href={profile.resumePdf} download>
                  Download PDF
                </a>
              </div>
              <h3 style={{ marginTop: 28 }}>Connect</h3>
              <p>Happy to share references and talk through the work.</p>
              <div className="btn-stack">
                <a className="btn" href={recommendationHref}>
                  Request recommendation contacts
                </a>
                <a
                  className="btn"
                  href={bookingHref}
                  {...(bookingIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  Book a call
                </a>
                <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="panel">
              <h3>Send a message</h3>
              <p>{integrations.eventsEndpoint ? 'I reply personally.' : 'This opens your email app.'}</p>
              <form onSubmit={onSubmit} noValidate>
                <div className="field">
                  <label htmlFor="c-name">Name</label>
                  <input id="c-name" name="name" autoComplete="name" required />
                </div>
                <div className="field">
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="field">
                  <label htmlFor="c-msg">Message</label>
                  <textarea id="c-msg" name="message" rows={4} required />
                </div>
                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                />
                <button className="btn btn-primary" type="submit" disabled={sending}>
                  {sending ? 'Sending…' : 'Send'}
                </button>
                {status && (
                  <p className="form-status" role="status">
                    {status}
                  </p>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
      <AnimatePresence>{showResume && <ResumeSheet onClose={() => setShowResume(false)} />}</AnimatePresence>
    </section>
  )
}
