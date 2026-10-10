import { integrations } from '../data/profile.config'

/**
 * Optional, privacy-light analytics. Does nothing unless
 * integrations.eventsEndpoint is set. Sends no cookies or personal data.
 */
export function track(type: 'visit' | 'view', payload: Record<string, string> = {}) {
  const url = integrations.eventsEndpoint
  if (!url) return
  try {
    const body = JSON.stringify({ type, ref: document.referrer.slice(0, 200), ...payload })
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }))
    } else {
      void fetch(url, { method: 'POST', body, headers: { 'Content-Type': 'application/json' }, keepalive: true })
    }
  } catch {
    /* analytics must never break the site */
  }
}
