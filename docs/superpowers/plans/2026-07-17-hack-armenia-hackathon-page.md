# Hack Armenia Hackathon Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an interactive, preview-mode public page at `/2026/hackathon` for the Hack Armenia 24-hour LLM build sprint, built from the approved spec.

**Architecture:** A `Competition2026`-style page (`src/pages/Hackathon2026.tsx`) composed of the existing design-system components (`SEO`, `SectionTitle`, `Card`, `Button`, `FAQ`) plus one extracted interactive component (`DomainExplorer`) driven by a typed data file (`hackathonDomains.ts`). Linked from a banner on the 2026 edition page — not the top nav.

**Tech Stack:** React 18 + TypeScript (strict), React Router v7, Tailwind CSS, `clsx`, Vite. No test runner in this repo.

## Global Constraints

- **Verification = typecheck + build.** This repo has no test framework. The gate for every task is `npm run build` (runs `tsc && vite build`) completing with no errors, plus the render check described in the task. Do **not** add vitest/jest.
- **TypeScript is strict** with `noUnusedLocals` and `noUnusedParameters`: never leave an unused import or variable — the build fails on it.
- **Preview framing:** the page is a preview. Include the pill text "Challenge details are being finalized — subject to change." No invented prize amounts, judging weights, exact compute figures, team sizes, or minute-accurate final schedule. Compute is "planned … details announced closer to the event"; prizes are "to be announced"; the timeline is "indicative."
- **Do not surface internal draft artifacts** (owner names, "open decisions", the 23 July approval date).
- **Registration URL (verbatim):**
  - `FORM_VIEW` = `https://docs.google.com/forms/d/e/1FAIpQLSfnxFoPMmU_k6sE_V_kCSiCh-AMgf9VnbDkyrxqzH395xHrng/viewform?usp=sharing`
  - `FORM_EMBED` = `https://docs.google.com/forms/d/e/1FAIpQLSfnxFoPMmU_k6sE_V_kCSiCh-AMgf9VnbDkyrxqzH395xHrng/viewform?embedded=true`
- **Linking:** add the page to routing and a banner on `/2026`; **do not** add it to the top nav (`Header.tsx`), matching commit `e54778b`.
- Follow `src/pages/Competition2026.tsx` for section rhythm: alternating `bg-glass` / `bg-secondary/70` backgrounds, `border-b border-white/10`, `container mx-auto px-8`, `SectionTitle` per section.

## File Structure

- Create `src/data/hackathonDomains.ts` — typed track/idea content (Task 1).
- Create `src/components/hackathon/DomainExplorer.tsx` — interactive tabbed explorer (Task 2).
- Create `src/pages/Hackathon2026.tsx` — the page (Task 3).
- Modify `src/App.tsx` — lazy import + route (Task 4).
- Modify `src/pages/Edition2026.tsx` — hackathon banner + agenda link (Task 5).
- Modify `src/data/faq2026.ts` — link the two hackathon answers to the page (Task 6).
- Full integration verification (Task 7).

---

### Task 1: Domain data (`hackathonDomains.ts`)

**Files:**
- Create: `src/data/hackathonDomains.ts`

**Interfaces:**
- Produces: `interface ProjectIdea { title, hook, problem, data, whyLLM, evaluate, impact: string }`; `interface Domain { key, icon, name, tagline: string; ideas: ProjectIdea[] }`; `export const hackathonDomains: Domain[]` (4 domains, 4 ideas each).

- [ ] **Step 1: Create the file with complete content**

```ts
export interface ProjectIdea {
  title: string
  /** One-line teaser shown on the collapsed card. */
  hook: string
  problem: string
  /** "Realistic data" */
  data: string
  /** "Why an LLM" */
  whyLLM: string
  /** "How to evaluate" */
  evaluate: string
  /** "Impact for Armenia" */
  impact: string
}

export interface Domain {
  key: string
  icon: string
  name: string
  tagline: string
  ideas: ProjectIdea[]
}

export const hackathonDomains: Domain[] = [
  {
    key: 'urban',
    icon: '🏙️',
    name: 'Urban development',
    tagline:
      'LLM and VLM agents that reason over city reports, citizen requests, maps, and planning documents.',
    ideas: [
      {
        title: 'Traffic-signal calibration copilot',
        hook: 'Turn traffic counts and citizen complaints into auditable signal-timing changes.',
        problem:
          "Yerevan intersections run largely static signal timings that don't adapt to real congestion, and retiming is slow and manual.",
        data: 'Traffic counts, the OpenStreetMap road network, and municipal complaint logs (or synthetic stand-ins).',
        whyLLM:
          'Reasons jointly over count tables, free-text complaints, and map context, and proposes timing changes with an auditable written justification.',
        evaluate:
          'Replay historical congestion windows; measure agreement with expert retiming and/or simulated average-delay reduction in a simple traffic sim.',
        impact: 'Shorter commutes and data-driven traffic operations for the municipality.',
      },
      {
        title: 'Curbside parking finder (VLM)',
        hook: 'Read the street and tell drivers where the open spots are.',
        problem: 'Drivers cruise for parking, adding congestion and emissions.',
        data: 'Street-level imagery (dashcam or phone) plus OSM parking tags, and a small labeled occupancy set.',
        whyLLM:
          'A VLM reads unstructured street scenes to judge free vs. occupied and phrases a suggestion ("2 spots ~80m ahead on the right").',
        evaluate:
          'Precision/recall on a labeled occupancy test set; report the false-positive rate — sending drivers to full spots is worse than nothing.',
        impact: 'Less cruising, smoother traffic, and lower emissions in dense districts.',
      },
      {
        title: 'Construction-permit pre-check assistant',
        hook: 'Flag likely code and zoning issues before an application is filed.',
        problem: 'Permit applications bounce repeatedly over avoidable code and zoning issues.',
        data: 'Published Armenian building codes and Yerevan zoning rules, plus sample or synthetic applications.',
        whyLLM:
          'Cross-references free-text applications against long, cross-referencing regulations and explains why something fails.',
        evaluate:
          'Rubric on an expert-annotated set — did it catch the real issues, with correct citations? Report the false-flag rate.',
        impact: 'Faster, more transparent permitting and fewer rejected filings for citizens and staff.',
      },
      {
        title: 'Citizen-request triage & routing',
        hook: 'Sort, locate, and de-duplicate messy city service requests automatically.',
        problem:
          'City service requests arrive as messy free text and get mis-routed or duplicated, slowing response.',
        data: 'Municipal request logs (or synthetic) plus a department taxonomy.',
        whyLLM:
          'Classifies intent, extracts location and urgency, de-duplicates near-identical reports, and routes to the right unit.',
        evaluate:
          'Routing accuracy vs. labeled department; dedupe precision/recall; location-extraction accuracy.',
        impact: 'Faster municipal response and cleaner analytics on recurring problems.',
      },
    ],
  },
  {
    key: 'public',
    icon: '🏛️',
    name: 'Public systems & policy',
    tagline:
      'Tools that help institutions evaluate options, extract evidence, or explain decisions.',
    ideas: [
      {
        title: 'SME tax-filing copilot',
        hook: 'Walk a small business through declarations and pre-fill the forms.',
        problem: 'Sole proprietors and small firms struggle with declaration paperwork and misfile.',
        data: 'The public Armenian tax code, official form schemas, and synthetic receipts/invoices.',
        whyLLM:
          'Maps messy receipt text to the right fields and explains category choices in plain language.',
        evaluate:
          'Field-level accuracy on a labeled receipt-to-form test set; it must surface failure modes (ambiguous categories) rather than silently guess.',
        impact: "Lower compliance burden and fewer errors for the country's many small businesses.",
      },
      {
        title: 'e-Invoicing extraction & reconciliation',
        hook: 'Turn scanned invoices into valid structured payloads, reconciled to declarations.',
        problem:
          'Businesses hand-key invoice data into e-invoicing systems, causing errors and delays.',
        data: 'Scanned or synthetic invoices, the target e-invoice schema, and public tax references.',
        whyLLM:
          'Extracts structured line items from varied invoice layouts, produces a schema-valid payload, and reconciles totals against declarations.',
        evaluate:
          'Line-item extraction F1 plus the share of schema-valid outputs; flag mismatches instead of silently accepting them.',
        impact: 'Less manual data entry and fewer filing errors for businesses and tax authorities.',
      },
      {
        title: 'Policy-evidence extractor & explainer',
        hook: 'Explain who a draft law affects — with every claim cited to the text.',
        problem:
          "Draft laws and budgets are long and opaque; the public and even staff can't quickly see what changes and who is affected.",
        data: 'Published draft legislation and budget documents (Armenian).',
        whyLLM:
          'Extracts discrete provisions, grounds each in a cited passage, and writes a plain-Armenian "who is affected and how" summary.',
        evaluate:
          'Grounding check — does every claim cite a real supporting passage (no hallucinated provisions)? Plus a human clarity/accuracy rubric.',
        impact: 'More transparent policy and more informed public debate.',
      },
      {
        title: 'Public-procurement anomaly assistant',
        hook: 'Surface odd clauses and single-bidder patterns in public tenders.',
        problem: 'Suspicious tender patterns (odd clauses, single-bidder awards) are hard to spot at scale.',
        data: 'Public procurement portal documents (or synthetic tenders).',
        whyLLM:
          'Reads long tender text and flags unusual clauses and risk patterns with an explanation and citation.',
        evaluate: 'Precision on a labeled "flagged/normal" set and the false-flag rate.',
        impact: 'Stronger oversight and anti-corruption tooling for watchdogs and auditors.',
      },
    ],
  },
  {
    key: 'health',
    icon: '🩺',
    name: 'Healthcare',
    tagline:
      'Safety-first: safe triage, knowledge retrieval, patient education, and administrative automation.',
    ideas: [
      {
        title: 'Guarded symptom-triage assistant (Armenian)',
        hook: 'Route symptoms to the right level of care — with hard safety rails, not diagnosis.',
        problem:
          'People struggle to know whether a symptom needs self-care, a GP, or urgent help — worse in rural areas.',
        data: 'Public clinical triage guidelines and a small set of vignettes.',
        whyLLM:
          'Conducts an adaptive structured interview and explains the routing in plain Armenian. Not diagnosis.',
        evaluate:
          'Agreement with a nurse-authored triage rubric on vignettes; explicitly measure over- and under-triage rates and document failure modes and safety rails.',
        impact:
          'Better navigation of the health system, especially for underserved regions — without pretending to diagnose.',
      },
      {
        title: 'Clinic scheduling & no-show reduction agent',
        hook: 'Fill the schedule and cut no-shows for under-staffed clinics.',
        problem: 'Under-staffed clinics lose capacity to no-shows and inefficient scheduling.',
        data: 'Synthetic scheduling logs and clinic constraints.',
        whyLLM:
          'Reasons over cancellations and constraints to propose schedules and generate tailored reminders.',
        evaluate: 'Simulated utilization / no-show reduction against a baseline scheduler.',
        impact: 'More patients seen with the same staff.',
      },
      {
        title: 'Medical-coding & insurance-dispute drafter',
        hook: 'Code a visit and draft a policy-cited appeal for a denied claim.',
        problem: 'Claims get denied over coding issues, and appealing is slow, manual admin work.',
        data: 'Public coding standards, insurer/ArMed-style policy docs, and synthetic visit summaries.',
        whyLLM:
          'Maps a visit summary to diagnosis/procedure codes and drafts a policy-cited appeal letter for denied claims.',
        evaluate:
          'Coding accuracy vs. labels plus human review of appeal quality and faithfulness to policy.',
        impact: 'Fewer wrongly denied claims and less administrative burden on clinicians.',
      },
      {
        title: 'Patient-education explainer',
        hook: 'Rewrite discharge notes and lab results into plain, safe Armenian.',
        problem: 'Discharge summaries and lab results are written for clinicians, not patients.',
        data: 'Sample or synthetic discharge summaries and lab panels, plus public patient-education references.',
        whyLLM:
          'Rewrites clinical text into plain Armenian at a chosen reading level, with safety caveats and "when to seek care."',
        evaluate:
          'Factual-consistency check against the source plus a readability target; flag anything it cannot ground.',
        impact: 'Better health literacy and follow-through, especially for older and rural patients.',
      },
    ],
  },
  {
    key: 'education',
    icon: '🎓',
    name: 'Education',
    tagline:
      'Personalized learning, assessment tools, and Armenian-language support (a major plus).',
    ideas: [
      {
        title: 'Armenian-language Socratic tutor',
        hook: 'Scaffold a student to the answer instead of handing it over.',
        problem:
          "Students need help that scaffolds thinking, not answer keys, and teachers can't be everywhere.",
        data: 'Open Armenian curriculum materials for a chosen unit.',
        whyLLM: 'Runs a grounded, Socratic dialogue that hints and probes without revealing the answer.',
        evaluate:
          "On a problem set, measure how often it stays grounded, doesn't leak the answer, and doesn't hallucinate; a small student-facing pilot if possible.",
        impact: 'Personalized, Armenian-language learning support at scale.',
      },
      {
        title: 'Auto-grading assistant for teachers',
        hook: 'Grade short answers against a rubric, with feedback and human-review flags.',
        problem: 'Teachers spend hours grading and giving feedback in large classes.',
        data: 'Rubrics plus anonymized or synthetic student answers (Armenian preferred).',
        whyLLM:
          'Applies a rubric consistently, writes feedback, and flags borderline cases instead of overruling the teacher.',
        evaluate:
          'Agreement with teacher grades (e.g., quadratic-weighted kappa) plus calibration; show where it is unreliable.',
        impact: 'Frees teacher time and gives students faster feedback, in Armenian.',
      },
      {
        title: 'Grounded material adaptation',
        hook: 'Adapt one lesson to many reading levels without drifting from the source.',
        problem:
          'One lesson has to serve students at different levels, and manual differentiation is time-consuming.',
        data: 'A source lesson plus target reading levels or learner profiles.',
        whyLLM:
          'Rewrites and adapts material to a level or specific gaps while staying faithful to the source.',
        evaluate:
          'Factual consistency with the source plus hitting the target reading level; catch drift or added claims.',
        impact: 'Inclusive, multi-level classrooms without doubling teacher prep.',
      },
      {
        title: 'Knowledge-assessment generator',
        hook: 'Generate a valid quiz and answer key from source materials.',
        problem: 'Making good, aligned quizzes from materials is slow.',
        data: 'A set of source materials (Armenian preferred).',
        whyLLM:
          'Generates questions, an answer key, and difficulty labels, each answerable from the source.',
        evaluate:
          'Item validity (answerable from text), answer-key correctness, and distractor quality; human spot-check.',
        impact: 'Faster, source-aligned assessment for teachers and self-learners.',
      },
    ],
  },
]
```

- [ ] **Step 2: Typecheck + build**

Run: `npm run build`
Expected: builds with no errors (no unused-symbol or type errors from the new file).

- [ ] **Step 3: Commit**

```bash
git add src/data/hackathonDomains.ts
git commit -m "Add Hack Armenia domain/track content data"
```

---

### Task 2: Domain Explorer component (`DomainExplorer.tsx`)

**Files:**
- Create: `src/components/hackathon/DomainExplorer.tsx`

**Interfaces:**
- Consumes: `hackathonDomains`, `ProjectIdea` from `src/data/hackathonDomains.ts`.
- Produces: `export default function DomainExplorer()` — no props; renders track tabs + expandable idea cards.

- [ ] **Step 1: Create the component with complete content**

```tsx
import { useState } from 'react'
import clsx from 'clsx'
import { hackathonDomains, type ProjectIdea } from '../../data/hackathonDomains'

const FIELDS: { key: keyof ProjectIdea; label: string }[] = [
  { key: 'problem', label: 'Problem' },
  { key: 'data', label: 'Realistic data' },
  { key: 'whyLLM', label: 'Why an LLM' },
  { key: 'evaluate', label: 'How to evaluate' },
  { key: 'impact', label: 'Impact for Armenia' },
]

function IdeaCard({ idea }: { idea: ProjectIdea }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 hover:bg-white/[0.06] transition-colors"
      >
        <span>
          <span className="block text-white font-semibold">{idea.title}</span>
          <span className="block text-white/60 text-sm mt-1">{idea.hook}</span>
        </span>
        <span className="text-accent text-xl font-bold shrink-0 leading-6">{open ? '−' : '+'}</span>
      </button>
      <div
        className={clsx(
          'transition-all duration-300 overflow-hidden',
          open ? 'max-h-[44rem] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <dl className="px-5 pb-5 space-y-3">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <dt className="text-accent text-xs font-semibold uppercase tracking-wide">{f.label}</dt>
              <dd className="text-white/80 text-sm mt-0.5">{idea[f.key]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export default function DomainExplorer() {
  const [active, setActive] = useState(0)
  const domain = hackathonDomains[active]

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {hackathonDomains.map((d, i) => (
          <button
            key={d.key}
            type="button"
            onClick={() => setActive(i)}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-semibold transition-colors border',
              i === active
                ? 'bg-gradient-to-r from-primary to-accent text-white border-transparent'
                : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
            )}
          >
            <span className="mr-1.5">{d.icon}</span>
            {d.name}
          </button>
        ))}
      </div>

      <p className="text-white/70 text-center max-w-3xl mx-auto mb-8">{domain.tagline}</p>

      <div className="grid md:grid-cols-2 gap-4">
        {domain.ideas.map((idea) => (
          <IdeaCard key={idea.title} idea={idea} />
        ))}
      </div>

      <p className="text-white/50 text-sm text-center mt-8 max-w-3xl mx-auto">
        These ideas are starting points, not requirements — bring your own, as long as it serves an
        Armenian public-interest domain. Every track is judged by the same rubric.
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Typecheck + build**

Run: `npm run build`
Expected: builds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/hackathon/DomainExplorer.tsx
git commit -m "Add interactive DomainExplorer for Hack Armenia tracks"
```

---

### Task 3: The page (`Hackathon2026.tsx`)

**Files:**
- Create: `src/pages/Hackathon2026.tsx`

**Interfaces:**
- Consumes: `SEO`, `SectionTitle`, `Card`, `Button`, `FAQ`, `FAQCategory` (type), `DomainExplorer`.
- Produces: `export default Hackathon2026` (a `memo` component) — rendered by the route added in Task 4.

- [ ] **Step 1: Create the page with complete content**

```tsx
import { memo, useState } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/ui/SectionTitle'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import SEO from '../components/SEO'
import FAQ from '../components/FAQ'
import type { FAQCategory } from '../data/faq2026'
import DomainExplorer from '../components/hackathon/DomainExplorer'

const FORM_VIEW =
  'https://docs.google.com/forms/d/e/1FAIpQLSfnxFoPMmU_k6sE_V_kCSiCh-AMgf9VnbDkyrxqzH395xHrng/viewform?usp=sharing'
const FORM_EMBED =
  'https://docs.google.com/forms/d/e/1FAIpQLSfnxFoPMmU_k6sE_V_kCSiCh-AMgf9VnbDkyrxqzH395xHrng/viewform?embedded=true'
const CONTACT_EMAIL = 'armeniallm@gmail.com'

const JUDGES_LOOK_FOR = [
  {
    title: 'A working prototype',
    text: 'Judges want to see it run, not just slides. A rough end-to-end demo beats a polished idea deck.',
  },
  {
    title: 'An evaluation method — even if lightweight',
    text: 'Show a test set, rubric, or benchmark and report numbers. "It seems to work" is not evidence.',
  },
  {
    title: 'Failure modes & safety risks',
    text: 'Name where it breaks and who it could harm — especially in healthcare and public-sector use. Show your guardrails.',
  },
  {
    title: 'Realistic data',
    text: 'Use or be compatible with real Armenian data — public sources, or data we provide. Toy data that ignores messy reality will not convince.',
  },
  {
    title: 'The LLM must earn its place',
    text: 'Show why an LLM is the right tool here, not decoration. If a regex or a plain form would do the job, use that instead.',
  },
]

const SUBMISSIONS = [
  { icon: '🎬', title: 'Demo', text: 'Live or recorded, under 3 minutes.' },
  { icon: '🎤', title: 'Pitch', text: '3–5 minutes plus questions.' },
  {
    icon: '📦',
    title: 'Artifact',
    text: 'A repo with fully reproducible code, an app link if any, or a packaged prototype.',
  },
  { icon: '📊', title: 'Evaluation', text: 'A test set, rubric, examples, or benchmark.' },
  { icon: '🎯', title: 'Impact note', text: 'Who uses it, and what changes if it works.' },
]

const RUBRIC = [
  {
    title: 'Idea quality & fit',
    text: 'Does it target a real Armenian public-interest problem worth solving?',
  },
  {
    title: 'Evaluation & evidence',
    text: 'Did the team actually test the system and show results — not just assert them?',
  },
  {
    title: 'Model-limits & safety awareness',
    text: 'Do they understand where the model fails, and how they mitigate it?',
  },
  {
    title: 'Real-world plausibility',
    text: 'Could this work outside the demo — realistic data, reproducible, deployable?',
  },
]

const TIMELINE = [
  { when: 'Hour 0', title: 'Kickoff & challenge brief', text: 'The umbrella challenge and the four tracks are presented.' },
  { when: 'Hour 0–1', title: 'Team formation & pick your track', text: 'Form a team and choose the domain you care about.' },
  { when: 'Hour 1–2', title: 'Scope your problem & data', text: 'Narrow to one problem and line up realistic data.' },
  { when: 'Hours 2–12', title: 'Build — with mentor checkpoints', text: 'Prototype end-to-end early; iterate with mentors.' },
  { when: '~Hour 12', title: 'Mid-point evaluation gut-check', text: 'Have a working slice and the start of an evaluation.' },
  { when: 'Hours 12–20', title: 'Build continues', text: 'Harden the prototype, strengthen the evaluation, handle failure modes.' },
  { when: 'Hours 20–22', title: 'Code freeze & demo prep', text: 'Lock the repo, record the demo, prepare the pitch.' },
  { when: 'Hours 22–24', title: 'Demos, pitches & awards', text: '3–5 minute pitches plus questions, then judging and awards.' },
]

const RULES = [
  {
    icon: '🧠',
    title: 'Any model or API',
    text: 'Use anything — open or closed, local or hosted. Bring your own keys where you can.',
  },
  {
    icon: '🔓',
    title: 'Open source required',
    text: 'Projects must be open source with full reproducibility. No closed black boxes.',
  },
  {
    icon: '🇦🇲',
    title: 'Armenian language encouraged',
    text: 'Not required, but Armenian-language support is a real plus — especially in education.',
  },
  {
    icon: '🗂️',
    title: 'Use real data',
    text: 'Anything publicly available, or data we provide before or during the event, is fair game.',
  },
  {
    icon: '⚙️',
    title: 'Compute support (planned)',
    text: 'We plan to provide compute — GPU access or API credits. Details are announced closer to the event.',
  },
  {
    icon: '👥',
    title: 'Build in teams',
    text: 'Form a team at kickoff and pick one track. Registration is handled by AI9.',
  },
]

const hackathonFAQ: FAQCategory[] = [
  {
    title: 'The basics',
    items: [
      {
        question: 'Is this the same as the Matrix Arena entrance competition?',
        answer:
          'No. <strong>Matrix Arena</strong> is the Summer School entrance test. <strong>Hack Armenia</strong> is a separate 24-hour build sprint on <strong>August 8</strong>, organized by <strong>AI9</strong> with the Armenia LLM Summer School co-organizing the content, with its own registration.',
      },
      {
        question: 'When and where is it?',
        answer:
          'It starts on <strong>August 8, 2026 at 00:00</strong> and runs for a full <strong>24 hours</strong> at the <strong>AI9 Startup Campus</strong> in Yerevan.',
      },
      {
        question: 'How do we register?',
        answer:
          'Through the registration form linked on this page (the "Register" button). Registration is run by <strong>AI9</strong>.',
      },
    ],
  },
  {
    title: 'What we build',
    items: [
      {
        question: 'What are we expected to build?',
        answer:
          'An LLM-powered system in one Armenian public-interest domain that can evaluate evidence, reason under uncertainty, and generalize — with a working prototype and a real (even lightweight) evaluation.',
      },
      {
        question: 'Can we use any model or API?',
        answer: 'Yes — anything goes: open or closed, local or hosted.',
      },
      {
        question: 'Does the project have to be open source?',
        answer: 'Yes. Winning projects must be <strong>open source with full reproducibility</strong>.',
      },
      {
        question: 'Do we have to work in Armenian?',
        answer:
          'It is encouraged and a real plus — especially for education — but not required.',
      },
      {
        question: 'What data can we use?',
        answer:
          'Anything publicly available, or data the organizers provide before or during the event.',
      },
      {
        question: 'Is compute provided?',
        answer:
          'Compute support (GPU access or API credits) is planned; the specifics are announced closer to the event.',
      },
    ],
  },
]

const Hackathon2026 = memo(function Hackathon2026() {
  const [openReq, setOpenReq] = useState<number | null>(0)

  return (
    <div>
      <SEO
        title="Hack Armenia — 2026 Hackathon"
        description="Hack Armenia: a 24-hour LLM build sprint after the Armenia LLM Summer School 2026. Build an LLM-powered system for one Armenian public-interest domain — urban development, public systems, healthcare, or education."
        url="/2026/hackathon"
        keywords={[
          'Hack Armenia',
          'Armenia LLM hackathon',
          'ARMLLM 2026 hackathon',
          'LLM for Armenia',
          'AI9 hackathon',
        ]}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 border-b border-white/10 overflow-hidden">
        <div className="container mx-auto px-8 text-center">
          <span className="inline-block bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-6">
            ARMLLM 2026 · Hackathon
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">Hack Armenia</h1>
          <p className="text-xl md:text-2xl text-white font-semibold mb-6 text-shadow-glow">
            A 24-hour LLM build sprint for Armenia
          </p>
          <p className="text-lg text-white/85 max-w-3xl mx-auto mb-8">
            Build an LLM-powered system that can <strong>evaluate</strong> evidence,{' '}
            <strong>reason</strong> through uncertainty, and <strong>generalize</strong> across
            real-world cases — in one Armenian public-interest domain.
          </p>
          <p className="text-accent font-medium mb-8">
            August 8, 2026 · starts 00:00 · 24 hours · AI9 Startup Campus, Yerevan
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="#register">Register</Button>
            <Button href="#tracks" variant="secondary">
              Explore the Tracks
            </Button>
            <Button href="#submit" variant="secondary">
              Submission Requirements
            </Button>
          </div>
          <p className="mt-8 inline-block bg-white/5 border border-accent/30 text-white/70 text-sm px-4 py-2 rounded-full">
            🚧 Challenge details are being finalized — subject to change.
          </p>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-16 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <h3 className="text-accent text-lg font-semibold mb-2">🗓️ When</h3>
              <p className="text-white/80 text-sm">August 8, 2026 — a full 24-hour hack day, starting at 00:00.</p>
            </Card>
            <Card>
              <h3 className="text-accent text-lg font-semibold mb-2">📍 Where</h3>
              <p className="text-white/80 text-sm">AI9 Startup Campus, 9 Isahakyan St, Yerevan.</p>
            </Card>
            <Card>
              <h3 className="text-accent text-lg font-semibold mb-2">🤝 Who runs it</h3>
              <p className="text-white/80 text-sm">
                Organized by AI9; the Armenia LLM Summer School co-organizes the content.
              </p>
            </Card>
            <Card>
              <h3 className="text-accent text-lg font-semibold mb-2">🎯 What</h3>
              <p className="text-white/80 text-sm">
                One umbrella challenge across four Armenian public-interest tracks.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* The challenge in one minute */}
      <section className="py-20 bg-secondary/70 border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="The Challenge in One Minute"
            subtitle="One umbrella challenge, four domains, one rubric"
          />
          <div className="max-w-4xl mx-auto text-white/85 space-y-5 text-lg leading-relaxed">
            <p>
              Build an <strong>LLM-powered system</strong> that can <strong>evaluate</strong>{' '}
              evidence, <strong>reason</strong> through uncertainty, and <strong>generalize</strong>{' '}
              across real-world cases — in one Armenian public-interest domain you care about.
            </p>
            <p>
              Pick a track, ship a working prototype, and — crucially — <em>measure</em> it. The
              projects that stand out are the ones that tested the system, understood where the model
              breaks, and could plausibly work outside a demo.
            </p>
          </div>
          <div className="max-w-4xl mx-auto mt-8 bg-accent/10 border border-accent/40 rounded-xl p-6">
            <p className="text-white/90">
              <span className="text-accent font-bold">The shape.</span> One challenge with several
              Armenian public-interest domains, judged under a single umbrella — so you choose a
              domain you care about while judging stays fair and coherent.
            </p>
          </div>
        </div>
      </section>

      {/* Choose your track */}
      <section id="tracks" className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Choose Your Track"
            subtitle="Four domains where LLMs can be genuinely useful to Armenia — click any idea to expand it"
          />
          <DomainExplorer />
        </div>
      </section>

      {/* What judges look for */}
      <section className="py-20 bg-secondary/70 border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="What Judges Look For"
            subtitle="Five things every strong submission shows — click to expand"
          />
          <div className="max-w-3xl mx-auto space-y-3">
            {JUDGES_LOOK_FOR.map((item, i) => {
              const isOpen = openReq === i
              return (
                <div
                  key={item.title}
                  className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenReq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.06] transition-colors"
                  >
                    <span className="text-white font-semibold">
                      <span className="text-accent mr-2">✓</span>
                      {item.title}
                    </span>
                    <span className="text-accent text-xl font-bold shrink-0">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div
                    className={clsx(
                      'transition-all duration-300 overflow-hidden',
                      isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <p className="px-5 pb-4 text-white/80 text-sm">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Submission requirements */}
      <section id="submit" className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Submission Requirements"
            subtitle="Keep it simple — five things to hand in"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
            {SUBMISSIONS.map((s) => (
              <div key={s.title} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 text-center">
                <div className="text-2xl mb-2">{s.icon}</div>
                <h3 className="text-white font-semibold mb-1">{s.title}</h3>
                <p className="text-white/65 text-sm">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Judging rubric */}
      <section className="py-20 bg-secondary/70 border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="How Judging Works"
            subtitle="The challenge is built to make evaluation visible"
          />
          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {RUBRIC.map((r) => (
              <Card key={r.title} className="!text-left">
                <h3 className="text-accent text-lg font-semibold mb-2">{r.title}</h3>
                <p className="text-white/75 text-sm">{r.text}</p>
              </Card>
            ))}
          </div>
          <p className="text-white/55 text-center mt-8 max-w-3xl mx-auto text-sm">
            Judges compare not only idea quality, but whether you tested the system, understood the
            model's limits, and built something that could work outside a demo.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="The 24 Hours"
            subtitle="An indicative rhythm — the final schedule is shared at kickoff"
          />
          <div className="max-w-3xl mx-auto space-y-4">
            {TIMELINE.map((t) => (
              <div
                key={t.title}
                className="flex gap-4 bg-white/[0.03] border border-white/10 rounded-xl p-5"
              >
                <div className="w-24 shrink-0 text-accent font-bold text-sm">{t.when}</div>
                <div>
                  <h3 className="text-white font-semibold">{t.title}</h3>
                  <p className="text-white/65 text-sm mt-1">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules & tools */}
      <section className="py-20 bg-secondary/70 border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Rules & Tools" subtitle="What's allowed, what's required, what's provided" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {RULES.map((r) => (
              <div key={r.title} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <div className="text-2xl mb-2">{r.icon}</div>
                <h3 className="text-white font-semibold mb-1">{r.title}</h3>
                <p className="text-white/65 text-sm">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Prizes" subtitle="Recognition for the strongest builds" />
          <div className="max-w-2xl mx-auto">
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-2">🏆 To be announced</h3>
              <p className="text-white/75 text-sm">
                Prizes and awards will be announced closer to the event. Check back, or register to be
                notified.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-secondary/70 border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Hackathon FAQ" subtitle="Quick answers before you register" />
          <FAQ categories={hackathonFAQ} />
        </div>
      </section>

      {/* Register */}
      <section id="register" className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Register"
            subtitle="Registration is run by AI9 — sign up through the form below"
          />
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3 md:p-4 mb-6">
              <iframe
                src={FORM_EMBED}
                title="Hack Armenia registration form"
                className="w-full rounded-xl bg-white"
                style={{ height: '900px' }}
                loading="lazy"
              >
                Loading…
              </iframe>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-sm mb-4">Form not loading? Open it in a new tab.</p>
              <Button href={FORM_VIEW} target="_blank">
                Open Registration Form ↗
              </Button>
              <p className="text-white/50 text-sm mt-6">
                Questions?{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="py-16 bg-secondary/70">
        <div className="container mx-auto px-8 text-center">
          <p className="text-white/70 mb-6">
            Hack Armenia caps the Armenia LLM Summer School 2026 week.
          </p>
          <Link
            to="/2026"
            className="inline-block bg-white/5 px-8 py-4 rounded-xl border border-white/10 text-white font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg hover:shadow-accent/20"
          >
            ← Back to the 2026 Edition
          </Link>
        </div>
      </section>
    </div>
  )
})

export default Hackathon2026
```

- [ ] **Step 2: Typecheck + build**

Run: `npm run build`
Expected: builds with no errors (strict + `noUnusedLocals`: confirm every import — `memo, useState, clsx, Link, SectionTitle, Card, Button, SEO, FAQ, FAQCategory, DomainExplorer` — is used).

- [ ] **Step 3: Commit**

```bash
git add src/pages/Hackathon2026.tsx
git commit -m "Add Hack Armenia hackathon page"
```

---

### Task 4: Route wiring (`App.tsx`)

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `Hackathon2026` default export from Task 3.
- Produces: a working `/2026/hackathon` route.

- [ ] **Step 1: Add the lazy import**

After the `CompetitionResults2026` lazy import line, add:

```tsx
const Hackathon2026 = lazyWithRetry(() => import('./pages/Hackathon2026'))
```

- [ ] **Step 2: Add the route**

After the `<Route path="/2026/competition/results" ... />` line, add:

```tsx
            <Route path="/2026/hackathon" element={<Hackathon2026 />} />
```

- [ ] **Step 3: Typecheck + build**

Run: `npm run build`
Expected: builds with no errors.

- [ ] **Step 4: Render check**

Run: `npm run dev`, open `http://localhost:5173/2026/hackathon`. Verify: hero renders; the three hero buttons scroll to their sections; the track tabs switch domains; clicking an idea card expands the five fields; the registration iframe loads (or the fallback button opens the form). Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "Route /2026/hackathon to the Hack Armenia page"
```

---

### Task 5: Banner + agenda link on the 2026 page (`Edition2026.tsx`)

**Files:**
- Modify: `src/pages/Edition2026.tsx`

**Interfaces:**
- Consumes: `Button`, `Link` (both already imported in `Edition2026.tsx`), the `/2026/hackathon` route.

- [ ] **Step 1: Update the agenda "August 8" note to link to the page**

Replace:

```tsx
          <div className="text-center mt-8">
            <p className="text-white/60">
              <strong className="text-accent">August 8:</strong> 24-hour Hackathon (organized by AI9)
            </p>
          </div>
```

with:

```tsx
          <div className="text-center mt-8">
            <p className="text-white/60">
              <strong className="text-accent">August 8:</strong> 24-hour Hackathon (organized by AI9) —{' '}
              <Link to="/2026/hackathon" className="text-accent underline hover:text-white">
                explore Hack Armenia →
              </Link>
            </p>
          </div>
```

- [ ] **Step 2: Add a Hackathon banner section**

Immediately after the closing `</section>` of the Agenda section (the one that contains the note edited in Step 1) and before `{/* Apply Section */}`, insert:

```tsx
      {/* Hackathon Banner */}
      <section className="py-12 bg-gradient-to-r from-accent/20 to-primary/20 border-t border-white/10">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl mx-auto bg-white/[0.04] border border-accent/30 rounded-2xl p-8 md:flex md:items-center md:justify-between gap-6">
            <div className="md:flex-1 mb-6 md:mb-0">
              <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3">
                24-Hour Hackathon · Aug 8
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Hack Armenia: build LLMs for Armenia
              </h3>
              <p className="text-white/80">
                A 24-hour build sprint after the school — one umbrella challenge across four Armenian
                public-interest domains: urban development, public systems, healthcare, and education.
                Explore the tracks and register.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button to="/2026/hackathon">Explore Hack Armenia →</Button>
            </div>
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Typecheck + build**

Run: `npm run build`
Expected: builds with no errors.

- [ ] **Step 4: Render check**

Run: `npm run dev`, open `http://localhost:5173/2026`. Verify the Hackathon banner appears under the Agenda section and its button navigates to `/2026/hackathon`; the agenda "August 8" link also navigates there. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Edition2026.tsx
git commit -m "Link the 2026 page to Hack Armenia (banner + agenda note)"
```

---

### Task 6: Link the hackathon FAQ answers to the page (`faq2026.ts`)

**Files:**
- Modify: `src/data/faq2026.ts`

- [ ] **Step 1: Append a page link to the "Will there be a hackathon?" answer**

Replace the answer string:

```ts
        answer: "Yes. The hackathon starts on <strong>August 8 at 00:00</strong> and runs for a full <strong>24-hour hack day</strong>. It is organized by <strong>AI9</strong>, and Armenia LLM Summer School is a co-organizer for hackathon content."
```

with:

```ts
        answer: "Yes. The hackathon starts on <strong>August 8 at 00:00</strong> and runs for a full <strong>24-hour hack day</strong>. It is organized by <strong>AI9</strong>, and Armenia LLM Summer School is a co-organizer for hackathon content. See the <a href=\"/2026/hackathon\" class=\"text-accent underline\">Hack Armenia challenge page</a> for tracks, requirements, and registration."
```

- [ ] **Step 2: Append a page link to the "How do I register for the hackathon?" answer**

Replace:

```ts
        answer: "There will be a separate registration for participation in the hackathon. The hackathon is organized by <strong>AI9</strong>, while <strong>Armenia LLM Summer School</strong> is a co-organizer for hackathon content."
```

with:

```ts
        answer: "There will be a separate registration for participation in the hackathon. The hackathon is organized by <strong>AI9</strong>, while <strong>Armenia LLM Summer School</strong> is a co-organizer for hackathon content. Register and see the tracks on the <a href=\"/2026/hackathon\" class=\"text-accent underline\">Hack Armenia challenge page</a>."
```

- [ ] **Step 3: Typecheck + build**

Run: `npm run build`
Expected: builds with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/faq2026.ts
git commit -m "Link hackathon FAQ answers to the Hack Armenia page"
```

---

### Task 7: Full integration verification

**Files:** none (verification only).

- [ ] **Step 1: Clean build**

Run: `npm run build`
Expected: `tsc` passes and `vite build` completes with the new `Hackathon2026` chunk listed in the output.

- [ ] **Step 2: End-to-end render walkthrough**

Run: `npm run preview` (serves the production build). Then verify in a browser:
- `/2026/hackathon` renders all sections top to bottom with alternating backgrounds.
- Track tabs (Urban / Public systems / Healthcare / Education) switch content; every idea card expands to show Problem / Realistic data / Why an LLM / How to evaluate / Impact for Armenia.
- "What Judges Look For" rows expand/collapse; only sensible content shows.
- Hero buttons anchor to `#register`, `#tracks`, `#submit`.
- The registration iframe loads; the fallback button opens `FORM_VIEW` in a new tab.
- From `/2026`, the Hackathon banner and the agenda link both navigate to `/2026/hackathon`.
- Mobile width (~375px): tabs wrap, grids collapse to one column, nothing overflows.

- [ ] **Step 3: Confirm no top-nav change**

Run: `git diff --stat main` (or review the branch). Expected: `src/components/layout/Header.tsx` is **not** modified.

- [ ] **Step 4: Final commit (only if Step 2 required tweaks)**

```bash
git add -A
git commit -m "Polish Hack Armenia page after verification"
```

---

## Self-Review

**Spec coverage** (every spec section maps to a task):
- §3 data types → Task 1. DomainExplorer → Task 2. Page + all sections (§4) → Task 3. Route (§3) → Task 4. Banner + agenda link (§3) → Task 5. FAQ links (§3, §6) → Task 6. Verification (§9) → Task 7.
- Fleshed-out content (§5, all 16 ideas × 5 fields) → Task 1 verbatim.
- FAQ content (§6) → Task 3 `hackathonFAQ`.
- Constants (§7) → Task 3 (`FORM_VIEW`, `FORM_EMBED`, `CONTACT_EMAIL`); `&ouid` dropped as specified.
- Hedged items (§8): preview pill (Task 3 hero), prizes "to be announced" (Task 3), compute "planned" (Task 3 RULES), timeline "indicative" (Task 3), no top-nav (Task 7 Step 3).

**Placeholder scan:** No placeholder markers remain. Every code block is complete and paste-ready; the strict-mode build gate after each task catches any unused import or undefined symbol. "To be announced" (prizes) and "planned"/"indicative" (compute, timeline) are intentional preview copy, not spec gaps.

**Type consistency:** `ProjectIdea` fields (`title, hook, problem, data, whyLLM, evaluate, impact`) are defined in Task 1 and consumed identically by `FIELDS` and `IdeaCard` in Task 2. `Domain` (`key, icon, name, tagline, ideas`) is consumed by `DomainExplorer` in Task 2. `FAQCategory` (`title`, `items[].question/answer`) matches the existing `faq2026.ts` interface used in Task 3. `Button`/`Card`/`SectionTitle`/`SEO`/`FAQ` props match their component signatures.
