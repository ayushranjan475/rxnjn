# Ayush Ranjan — Impact Dashboard

A cinematic, dark-themed personal site that presents a career as an **impact dashboard**: engagements as case studies, a career timeline, a skills "range" with proof, MBA goals, leadership, and a numbers panel.

Structure and interaction ideas are inspired by [Sushmitadasari/Portfolio_series](https://github.com/Sushmitadasari/Portfolio_series). All code, text and content here are original to this project. Credit to the original author for the idea of a streaming-style portfolio.

## Run it

Requires Node.js 18+.

```bash
npm install
npm run dev        # local dev server
npm run typecheck  # TypeScript check
npm run build      # production build into dist/
```

Deploy `dist/` to Netlify, Vercel, GitHub Pages or any static host.

## Edit the content

Everything lives in **`src/data/profile.config.ts`**.

| To change | Edit |
| --- | --- |
| Name, bio, links, positioning line | `profile` |
| Accent colour | `theme.accent` |
| Hero KPI strip | `kpis` |
| Case studies | `engagements` (situation / action / result / role) |
| Career timeline | `timeline` |
| Skill groups and proof | `rangeGroups` |
| MBA goals and target schools | `goals` (set `placeholder: false` when done) |
| Leadership, awards, certifications | `leadership`, `awards`, `certifications` |
| Charts | `scaleByRole`, `reach`, and `rangeGroups` |
| Viewer views (section order) | `viewers` |
| Turn a section off | `sectionsEnabled` |
| Booking link (Calendly etc.) | `integrations.bookingUrl` |

Files to add in `public/assets/`: `ayush.jpg` (portrait) and `Ayush_Ranjan_Resume.pdf`.

## Optional backend

`netlify/functions/events.mjs` is a small serverless function for the contact form and privacy-light visit counts. It is off by default; the site falls back to `mailto:` links. To enable it on Netlify, set `RESEND_API_KEY`, `CONTACT_TO` and `CONTACT_FROM`, then set `integrations.eventsEndpoint` to `'/api/events'`.

## Before you publish

- The phone number is intentionally not shown on the site.
- Client names are intentionally absent. Re-read every figure in `profile.config.ts` and confirm you are comfortable making it public.
- Charts use only numbers from the resume. The "scale by role" chart mixes different measures, which its caption says.

## Accessibility

`prefers-reduced-motion` is respected, overlays close with Esc, and the opening can be skipped with Enter, Esc or the Skip button.

This is a personal site and is not affiliated with any streaming service.
