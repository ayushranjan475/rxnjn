/**
 * profile.config.ts — the single source of truth for the whole site.
 *
 * Every component reads from this file. Content below was extracted from the
 * resume. Anything marked `placeholder: true` or "TODO" is waiting for details
 * only you can provide (goals, target schools, photo, etc.).
 *
 * CONFIDENTIALITY: client names are intentionally absent. Before publishing,
 * re-read every figure and confirm you are comfortable making it public.
 */

export type SectionId =
  | 'engagements'
  | 'timeline'
  | 'range'
  | 'goals'
  | 'leadership'
  | 'numbers'
  | 'resume'

export type ViewerId = 'admissions' | 'recruiter' | 'mentor'

/* ------------------------------------------------------------------ */
/* Basics                                                              */
/* ------------------------------------------------------------------ */

export const profile = {
  name: 'Ayush Ranjan',
  firstName: 'Ayush',
  initials: 'AR',
  location: 'Noida, Uttar Pradesh, India',
  email: 'ayush.ranjan@yahoo.co.in',
  linkedin: 'https://www.linkedin.com/in/ayush-ranjan-232248207',
  // Phone is deliberately NOT shown on the public site. Add it here only if you want it public.
  positioning: 'Commerce graduate turned digital-assets audit leader.',
  bio: 'I lead audit work over digital assets and stablecoins at Deloitte USI: coordinating teams across continents, translating risk into decisions for senior leadership, and building the controls and tooling that make engagements faster and safer.',
  focus: 'Blockchain & digital assets',
  careerStart: '2023-09-01', // Deloitte start date, used to compute "years at Deloitte"
  gmat: 'GMAT Focus Edition: 665',
  /** Optional portrait. Drop a file at public/assets/ayush.jpg (or change the path). Falls back to initials. */
  photo: '/assets/ayush.jpg',
  /** Drop your PDF at public/assets/Ayush_Ranjan_Resume.pdf */
  resumePdf: '/assets/Ayush_Ranjan_Resume.pdf',
}

export const theme = {
  /** Dark cinematic theme. Change the accent to anything you like. */
  accent: '#d9a441',
}

/* ------------------------------------------------------------------ */
/* Optional backend (leave empty to fall back to mailto links)         */
/* ------------------------------------------------------------------ */

export const integrations = {
  /** e.g. '/api/events' once netlify/functions/events.mjs is deployed */
  eventsEndpoint: '',
  /** Calendly / Cal.com / Google Calendar booking link. Empty = opens a pre-filled email instead. */
  bookingUrl: '',
}

/* ------------------------------------------------------------------ */
/* Opening sequence + viewer profiles                                  */
/* ------------------------------------------------------------------ */

export const opening = {
  studioLabel: 'A career in digital assets',
  title: 'AYUSH RANJAN',
  subtitle: 'Impact Dashboard',
}

export interface Viewer {
  id: ViewerId
  label: string
  blurb: string
  /** Order in which sections appear for this viewer */
  order: SectionId[]
}

export const viewers: Viewer[] = [
  {
    id: 'admissions',
    label: 'Admissions Committee',
    blurb: 'Leadership, impact, progression and clarity of goals.',
    order: ['timeline', 'leadership', 'goals', 'engagements', 'range', 'numbers', 'resume'],
  },
  {
    id: 'recruiter',
    label: 'Recruiter',
    blurb: 'Hard outcomes, scope and the skills behind them.',
    order: ['engagements', 'range', 'numbers', 'timeline', 'leadership', 'goals', 'resume'],
  },
  {
    id: 'mentor',
    label: 'Mentor',
    blurb: 'The story so far, what I lead, and where I want to go.',
    order: ['goals', 'timeline', 'leadership', 'range', 'engagements', 'numbers', 'resume'],
  },
]

/** Toggle whole sections on or off. */
export const sectionsEnabled: Record<SectionId, boolean> = {
  engagements: true,
  timeline: true,
  range: true,
  goals: true,
  leadership: true,
  numbers: true,
  resume: true,
}

export const sectionMeta: Record<SectionId, { nav: string; eyebrow: string; title: string; intro: string }> = {
  engagements: {
    nav: 'Engagements',
    eyebrow: 'Engagements',
    title: 'Situation, action, result',
    intro: 'Selected audit engagements, anonymised. Each one shows what was at stake, what I did, and what changed.',
  },
  timeline: {
    nav: 'Timeline',
    eyebrow: 'Career timeline',
    title: 'Progression and growing scope',
    intro: 'From a Delhi University commerce degree to leading digital-asset audit work, one level of responsibility at a time.',
  },
  range: {
    nav: 'Range',
    eyebrow: 'Range',
    title: 'What I can do, with the proof',
    intro: 'Skills grouped by domain. Every group points to real work, not adjectives.',
  },
  goals: {
    nav: 'Why MBA',
    eyebrow: 'Why MBA / Goals',
    title: 'Where this is heading',
    intro: 'The next step, and the reasoning behind it.',
  },
  leadership: {
    nav: 'Leadership',
    eyebrow: 'Leadership & impact',
    title: 'Teams, communities, outcomes',
    intro: 'Leading people and building things outside of audit work too.',
  },
  numbers: {
    nav: 'Numbers',
    eyebrow: 'Numbers',
    title: 'The figures behind the story',
    intro: 'Every number here comes from the resume.',
  },
  resume: {
    nav: 'Resume',
    eyebrow: 'Resume & contact',
    title: "Let's talk",
    intro: 'View or download the resume, ask for recommendation contacts, or book a call.',
  },
}

/* ------------------------------------------------------------------ */
/* Hero KPI strip                                                      */
/* ------------------------------------------------------------------ */

export interface Kpi {
  /** numeric part is animated; leave undefined for text-only KPIs */
  value?: number
  prefix?: string
  suffix?: string
  text?: string
  label: string
}

export const kpis: Kpi[] = [
  { value: 3, suffix: ' yrs', label: 'at Deloitte USI, Audit Assistant to Audit In-Charge' },
  { text: 'Digital assets', label: 'Blockchain and stablecoin audit focus' },
  { prefix: '$', value: 70, suffix: 'B+', label: 'stablecoins attested monthly across 35+ blockchains' },
  { value: 12, suffix: '-member', label: 'team led across 15,000+ audit hours' },
]

/* ------------------------------------------------------------------ */
/* Engagements (anonymised case studies)                               */
/* ------------------------------------------------------------------ */

export interface Engagement {
  id: string
  title: string
  area: string
  period: string
  role: string
  situation: string
  action: string
  result: string
  headline: { value: string; label: string }
}

export const engagements: Engagement[] = [
  {
    id: 'stablecoin-attestation',
    title: 'Stablecoin attestations at global scale',
    area: 'Digital assets',
    period: 'Jun 2026 – Present',
    role: 'Audit In-Charge',
    situation:
      'A client needed monthly attestations over stablecoins held across 35+ blockchains, with stakeholders in seven jurisdictions.',
    action:
      'Collaborated with the client’s stablecoin operations, banks and internal engineering teams across the USA, France, Netherlands, Germany, Singapore, UK and Hong Kong.',
    result: 'Monthly attestations performed for $70B+ of stablecoins.',
    headline: { value: '$70B+', label: 'stablecoins attested' },
  },
  {
    id: 'account-matrix',
    title: 'Digital asset account matrix and a $20M finding',
    area: 'Digital assets',
    period: 'Jun 2026 – Present',
    role: 'Audit In-Charge',
    situation: 'A $1.5B+ digital asset account matrix required an end-to-end audit strategy.',
    action:
      'Built consensus on the strategy across stakeholders and uncovered a $20M inter-company misclassification.',
    result:
      'Influenced client C-suite executives to overhaul financial disclosures and reporting controls.',
    headline: { value: '$20M', label: 'misclassification uncovered' },
  },
  {
    id: 'group-audit',
    title: 'Group audit across six regions',
    area: 'Digital assets',
    period: 'Jun 2026 – Present',
    role: 'Group auditor',
    situation:
      'Digital-asset risk assessment and testing scope had to be set consistently across component teams in Singapore, UK, US, Middle East, India and Japan.',
    action:
      'Served as group auditor, directed the component audit teams, identified gaps and directed teams to adjust.',
    result: 'Component teams across six regions adjusted their approach based on the gaps identified.',
    headline: { value: '6', label: 'regions directed' },
  },
  {
    id: 'engagement-leadership',
    title: 'Running engagement economics and mentoring',
    area: 'Leadership',
    period: 'Jun 2026 – Present',
    role: 'Audit In-Charge',
    situation:
      'A 12-member team, 15,000+ audit hours and 5+ high-risk financial statement line items needed to be managed efficiently, while AI-driven reporting changes were affecting engagement risk.',
    action:
      'Steered engagement economics, mentored 2 full-time associates, and drove scoping discussions with senior leadership on the AI-driven reporting changes.',
    result: 'Improved engagement efficiency across 5+ high-risk line items.',
    headline: { value: '15,000+', label: 'audit hours managed' },
  },
  {
    id: 'power-bi',
    title: 'From legacy Excel to automated Power BI',
    area: 'Data & tools',
    period: 'Jun 2025 – May 2026',
    role: 'Audit Senior Assistant',
    situation: 'A $1.5B+ digital asset portfolio was being managed through legacy Excel workflows.',
    action:
      'Instituted automated Power BI frameworks, led the transition and standardised engagement-wide risk protocols.',
    result: 'Reclaimed 30+ manual hours for the team and received the Applause Award.',
    headline: { value: '30+ hrs', label: 'manual work reclaimed' },
  },
  {
    id: 'rapid-response',
    title: 'Rapid response on a payment services engagement',
    area: 'Payments',
    period: 'Jun 2025 – May 2026',
    role: 'Audit Senior Assistant',
    situation: 'Critical data bottlenecks were slowing a $29B payment services engagement.',
    action: 'Mobilised as a rapid-response resource to resolve them.',
    result:
      'Bottlenecks addressed for 50+ global product lines across the USA, Latin America, the Middle East, Europe and Asia-Pacific.',
    headline: { value: '50+', label: 'product lines unblocked' },
  },
  {
    id: 'debt-turnaround',
    title: 'Debt portfolio audit turnaround',
    area: 'Finance & risk',
    period: 'Sep 2023 – May 2025',
    role: 'Audit Assistant',
    situation: 'A $500M debt portfolio audit needed a turnaround.',
    action: 'Led the effort and analysed 50+ credit agreements.',
    result: 'Final delivery accelerated from 3 weeks to 1 week.',
    headline: { value: '3 → 1 wk', label: 'delivery time' },
  },
  {
    id: 'student-lending',
    title: 'Risk assessment for a student lending engagement',
    area: 'Finance & risk',
    period: 'Sep 2023 – May 2025',
    role: 'Audit Assistant',
    situation: 'A $300M student lending engagement required a clear risk assessment of the loan lifecycle.',
    action:
      'Deciphered the loan lifecycle for risk assessment and persuaded Senior Partners to agree on the approach.',
    result: 'Directly influenced critical audit testing decisions.',
    headline: { value: '$300M', label: 'lending book assessed' },
  },
  {
    id: 'whistleblower',
    title: 'First whistleblower control framework',
    area: 'Regulation & compliance',
    period: 'Sep 2023 – May 2025',
    role: 'Audit Assistant',
    situation: 'The expense logic of a $100K prepaid reward structure had to be validated.',
    action:
      'Convinced internal leadership and negotiated with stakeholders using operational models to validate the logic.',
    result: 'Instituted the engagement’s first whistleblower control framework from scratch.',
    headline: { value: 'First', label: 'whistleblower framework on the engagement' },
  },
]

/* ------------------------------------------------------------------ */
/* Career timeline                                                     */
/* ------------------------------------------------------------------ */

export interface TimelineItem {
  id: string
  kind: 'education' | 'work'
  period: string
  title: string
  org: string
  scope: string
  points: string[]
}

export const timeline: TimelineItem[] = [
  {
    id: 'du',
    kind: 'education',
    period: '2020 – 2023',
    title: 'B.Com (Honours)',
    org: 'Shaheed Bhagat Singh College, University of Delhi',
    scope: '8.45 / 10 CGPA',
    points: [
      'President & Campus Director, Hult Prize chapter',
      'Senior Coordinator, Placement Cell',
      'Winner, National Social Summit Policy Case Competition 2022 (IIT Roorkee)',
    ],
  },
  {
    id: 'hilti',
    kind: 'work',
    period: 'Jun – Aug 2022',
    title: 'Business Process Expert, Intern',
    org: 'Hilti India Pvt. Ltd.',
    scope: '100+ business controls',
    points: [
      'Negotiated with 5+ cross-functional process owners and team leads to optimise operational efficiency.',
      'Assessed automation levels of existing controls and identified opportunities to automate manual workflows.',
    ],
  },
  {
    id: 'aa',
    kind: 'work',
    period: 'Sep 2023 – May 2025',
    title: 'Audit Assistant',
    org: 'Deloitte USI',
    scope: 'Portfolios from $100K to $500M',
    points: [
      'Turned around a $500M debt portfolio audit, from 3 weeks to 1.',
      'Influenced Senior Partners on risk assessment for a $300M student lending engagement.',
      'Instituted the engagement’s first whistleblower control framework.',
    ],
  },
  {
    id: 'asa',
    kind: 'work',
    period: 'Jun 2025 – May 2026',
    title: 'Audit Senior Assistant',
    org: 'Deloitte USI',
    scope: '$1.5B+ digital assets, $29B payments engagement',
    points: [
      'Moved the team from legacy Excel to automated Power BI frameworks; Applause Award.',
      'Rapid-response resource on a $29B payment services engagement.',
    ],
  },
  {
    id: 'aic',
    kind: 'work',
    period: 'Jun 2026 – Present',
    title: 'Audit In-Charge',
    org: 'Deloitte USI',
    scope: '12-member team, $70B+ stablecoins',
    points: [
      'Leads a 12-member team across 15,000+ audit hours and mentors 2 full-time associates.',
      'Group auditor directing component teams across six regions.',
      'Monthly attestations for $70B+ of stablecoins across 35+ blockchains.',
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Range (skills grouped by domain, each with proof)                   */
/* ------------------------------------------------------------------ */

export interface RangeGroup {
  id: string
  title: string
  skills: string[]
  proof: string[]
}

export const rangeGroups: RangeGroup[] = [
  {
    id: 'finance-risk',
    title: 'Finance & Risk',
    skills: ['Audit risk assessment', 'Debt and lending', 'Group audit', 'Financial statement analysis'],
    proof: [
      'Turned around a $500M debt portfolio audit across 50+ credit agreements.',
      'Assessed risk across a $300M student lending lifecycle.',
      'Managed 5+ high-risk financial statement line items.',
    ],
  },
  {
    id: 'digital-assets',
    title: 'Blockchain & Digital Assets',
    skills: ['Stablecoin attestation', 'Multi-chain coverage', 'Digital asset account matrices'],
    proof: [
      'Monthly attestations over $70B+ of stablecoins on 35+ blockchains.',
      'End-to-end audit strategy for a $1.5B+ digital asset account matrix.',
    ],
  },
  {
    id: 'regulation',
    title: 'Regulation & Compliance',
    skills: ['Internal controls', 'Financial disclosures', 'Whistleblower frameworks', 'Control automation'],
    proof: [
      'Built the engagement’s first whistleblower control framework.',
      'Prompted a client overhaul of financial disclosures and reporting controls.',
      'Assessed 100+ business controls for automation potential.',
    ],
  },
  {
    id: 'data-tools',
    title: 'Data & Tools',
    skills: ['Power BI', 'Excel', 'Data science foundations (IIT Madras)', 'AI-driven reporting risk'],
    proof: [
      'Replaced legacy Excel workflows with Power BI, reclaiming 30+ manual hours.',
      'Scoped the engagement risk of AI-driven reporting changes with senior leadership.',
    ],
  },
  {
    id: 'leadership',
    title: 'Leadership',
    skills: ['Team leadership', 'Mentoring', 'Stakeholder negotiation', 'Cross-functional coordination'],
    proof: [
      'Led a 12-member audit team and mentored 2 full-time associates.',
      'Directed teams across seven jurisdictions for stablecoin attestations.',
      'Recruited and led a 50-member Hult Prize campus team.',
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Why MBA / Goals  (PLACEHOLDER — fill these in)                       */
/* ------------------------------------------------------------------ */

export const goals = {
  /** Set to false once you've written real content below. */
  placeholder: true,
  shortTerm: 'TODO: your short-term goal (what you want to do right after the MBA).',
  longTerm: 'TODO: your long-term goal (where you want to be in 10 to 15 years).',
  why: 'TODO: why an MBA, and why now. Connect the dots between audit, digital assets and what you want next.',
  schools: [
    // { name: 'School name', program: 'Program', note: 'Why this school (optional school-specific variant)' },
  ] as { name: string; program: string; note?: string }[],
  testStatus: 'GMAT Focus Edition: 665',
}

/* ------------------------------------------------------------------ */
/* Leadership & impact                                                 */
/* ------------------------------------------------------------------ */

export interface LeadershipItem {
  id: string
  role: string
  org: string
  period: string
  summary: string
  metrics: { value: string; label: string }[]
}

export const leadership: LeadershipItem[] = [
  {
    id: 'hult',
    role: 'President & Campus Director',
    org: 'Hult Prize, SBSC, University of Delhi',
    period: 'May 2022 – May 2023',
    summary:
      'Directed the campus chapter of the world’s largest student social-entrepreneurship competition. Orchestrated a nationwide case competition through Hult Prize for the first time and hosted a founder webinar with Peyush Bansal (Co-Founder, Lenskart).',
    metrics: [
      { value: '50', label: 'member team recruited' },
      { value: '200+', label: 'case competition participants' },
      { value: '16,000+', label: 'impressions generated' },
      { value: '500+', label: 'webinar participants' },
    ],
  },
  {
    id: 'placement',
    role: 'Senior Coordinator, Placement Cell',
    org: 'SBSC, University of Delhi',
    period: 'May 2022 – May 2023',
    summary:
      'Negotiated recruitment terms with HR leaders and streamlined logistics for campus hiring drives, from pre-placement talks to written assessments and final interviews.',
    metrics: [
      { value: '100+', label: 'HR leaders engaged' },
      { value: '800+', label: 'students with opportunities' },
      { value: '10+', label: 'hiring drives run' },
    ],
  },
  {
    id: 'community',
    role: 'Deloitte Community Impact Initiative',
    org: 'Deloitte USI',
    period: 'Nov 2023 – Nov 2025',
    summary:
      'Designed student learning modules, workbooks and course structures across subjects as part of Deloitte’s community-impact initiative.',
    metrics: [{ value: '2 yrs', label: 'sustained contribution' }],
  },
  {
    id: 'girlup',
    role: 'Club Welfare Manager',
    org: 'GirlUp Hiraeth (UN-affiliated initiative)',
    period: 'Dec 2021 – Nov 2022',
    summary:
      'Co-headed operations and streamlined workflows between the marketing and research teams to run advocacy campaigns, including awareness drives on mental health.',
    metrics: [
      { value: '10+', label: 'advocacy campaigns' },
      { value: '150+', label: 'attendees engaged' },
    ],
  },
  {
    id: 'vishalakshi',
    role: 'Community Service',
    org: 'Vishalakshi Foundation',
    period: 'May – Jul 2020',
    summary:
      'Built digital growth strategies during remote, pandemic-era operations and ran zero-budget grassroots campaigns that generated direct monetary contributions for the NGO.',
    metrics: [{ value: '200+', label: 'new followers, organically' }],
  },
]

export const awards: string[] = [
  'Applause Award, Deloitte USI',
  'Winner, National Social Summit Policy Case Competition 2022 (IIT Roorkee)',
  'Principal’s Appreciation, SBSC, for contribution to college awards and achievements',
  'Times NIE Student of the Year',
  'Rotary District President’s Community Services Certificate',
  'Scholar Badge (4+ years) and Scholarship (2019-20)',
  'Provisional Asteroid Discoverer (2016)',
  'Secretary General, Model United Nations (school)',
]

export const certifications: string[] = [
  'Foundational Certificate in Data Science & Programming (IIT Madras)',
  'Strategy Consulting Virtual Experience (BCG / Forage, 2021)',
  'Accounting Fundamentals & Reading Financial Statements (CFI, 2021)',
]

/* ------------------------------------------------------------------ */
/* Numbers panel (all values come from the resume)                      */
/* ------------------------------------------------------------------ */

/** Largest figure cited for each role, in USD millions. Measures differ, see caption. */
export const scaleByRole = [
  { label: 'Audit Assistant', sub: '$500M debt portfolio', valueM: 500, display: '$500M' },
  { label: 'Audit Senior Assistant', sub: '$29B payments engagement', valueM: 29000, display: '$29B' },
  { label: 'Audit In-Charge', sub: '$70B+ stablecoins attested', valueM: 70000, display: '$70B+' },
]

export const reach = [
  { label: 'Students with placement opportunities', value: 800 },
  { label: 'Webinar participants (Hult Prize)', value: 500 },
  { label: 'Case competition participants', value: 200 },
  { label: 'Organic follower growth (NGO)', value: 200 },
  { label: 'Advocacy attendees engaged', value: 150 },
]

/* ------------------------------------------------------------------ */
/* Resume sheet content                                                */
/* ------------------------------------------------------------------ */

export const resumeSummaryLine = 'GMAT Focus Edition 665 · B.Com (Hons), University of Delhi, 8.45/10 CGPA'
