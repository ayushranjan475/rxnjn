// Optional serverless endpoint: contact form + lightweight visit analytics.
// Deploy on Netlify, then set integrations.eventsEndpoint to '/api/events' in src/data/profile.config.ts.
//
// Environment variables (Netlify > Site settings > Environment):
//   RESEND_API_KEY  - API key from resend.com (only needed for the contact form)
//   CONTACT_TO      - the address that should receive messages
//   CONTACT_FROM    - a verified sender, e.g. "Portfolio <onboarding@resend.dev>"
//
// Visits are written to the function log (Netlify > Logs > Functions). No cookies, no personal data.

export const config = { path: '/api/events' }

const clip = (v, n) => String(v ?? '').slice(0, n)

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  let body
  try {
    body = await req.json()
  } catch {
    return new Response('Bad request', { status: 400 })
  }

  if (body.type === 'visit') {
    console.log(JSON.stringify({ type: 'visit', viewer: clip(body.viewer, 20), ref: clip(body.ref, 200), ts: Date.now() }))
    return new Response(null, { status: 204 })
  }

  if (body.type === 'contact') {
    if (body.website) return new Response(null, { status: 204 }) // honeypot
    const name = clip(body.name, 100).trim()
    const email = clip(body.email, 200).trim()
    const message = clip(body.message, 4000).trim()
    if (!name || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return new Response('Invalid input', { status: 400 })
    }

    const key = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO
    const from = process.env.CONTACT_FROM
    if (!key || !to || !from) return new Response('Not configured', { status: 500 })

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `${message}\n\nFrom: ${name} <${email}>`,
      }),
    })
    return new Response(null, { status: res.ok ? 204 : 502 })
  }

  return new Response('Unknown event', { status: 400 })
}
