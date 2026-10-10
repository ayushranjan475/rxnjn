import { integrations, profile } from '../data/profile.config'

export function mailto(subject: string, body = ''): string {
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const recommendationHref = mailto(
  'Request for recommendation contacts',
  `Hi ${profile.firstName},\n\nI'd like to request recommendation contacts.\n\nName / organisation:\nPurpose:\n\nThanks,`,
)

export const bookingHref: string =
  integrations.bookingUrl ||
  mailto('Book a call', `Hi ${profile.firstName},\n\nI'd like to book a call. A few times that work for me:\n\n`)

export const bookingIsExternal = Boolean(integrations.bookingUrl)
