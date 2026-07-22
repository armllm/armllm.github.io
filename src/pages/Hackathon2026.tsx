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

const FORM_VIEW = 'https://forms.gle/SzbxuvProoqwbpVJ6'
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
  { when: 'Sat 10:00', title: 'Kickoff & briefing', text: 'Welcome, the theme walkthrough, and logistics.' },
  { when: 'Sat 11:00', title: 'Teams form & plan', text: 'Form a team of 3–4, then scope your approach and data.' },
  { when: 'Sat–Sun', title: 'Build — with mentors', text: 'Prototype end-to-end early; iterate with 8–15 senior AI mentors.' },
  { when: 'Sun 10:00', title: 'Code freeze', text: 'Lock the repo and prepare your demo and pitch.' },
  { when: 'Sun 11:00', title: 'Demo Day', text: 'Present to an expert jury — a short demo plus questions.' },
  { when: 'Sun 13:00', title: 'Awards & close', text: 'The jury names the winners; prizes for the top teams.' },
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
    text: 'Form a team of 3–4 at kickoff — 15–20 teams in all. Registration is handled by the organizers.',
  },
]

const hackathonFAQ: FAQCategory[] = [
  {
    title: 'The basics',
    items: [
      {
        question: 'Is this the same as the Matrix Arena entrance competition?',
        answer:
          'No. <strong>Matrix Arena</strong> is the Summer School entrance test. <strong>Hack Armenia</strong> is a separate 24-hour build sprint on <strong>August 8–9</strong>, organized by the <strong>Armenia LLM Summer School</strong>, <strong>AI9</strong> and <strong>YerevaNN</strong>, with its own registration.',
      },
      {
        question: 'When and where is it?',
        answer:
          'It runs <strong>August 8–9, 2026</strong> — Saturday 10:00 to Sunday 13:00, with 24 hours of building — at the <strong>AI9 Startup Campus</strong> in Yerevan.',
      },
      {
        question: 'How do we register?',
        answer:
          'Through the registration form linked on this page (the "Register" button). Registration is run by the organizers — the Armenia LLM Summer School, AI9 and YerevaNN.',
      },
    ],
  },
  {
    title: 'What we build',
    items: [
      {
        question: 'What are we expected to build?',
        answer:
          'An LLM-powered system for an Armenian public-interest problem — evaluating evidence, reasoning under uncertainty, and generalizing — with a working prototype and a real (even lightweight) evaluation. The example projects on this page guide the theme; bring your own idea or adapt one.',
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
        description="Hack Armenia: a 24-hour LLM build sprint on August 8–9, 2026 after the Armenia LLM Summer School. Build an LLM system for an Armenian public-interest problem — across domains like urban development, public systems, healthcare, education, security, food & agriculture, environment & energy, finance, or disaster response."
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
            real-world cases — for a real-world Armenian public-interest problem you care about.
          </p>
          <p className="text-accent font-medium mb-8">
            August 8–9, 2026 · Sat 10:00 → Sun 13:00 · 24 hours of building · AI9 Startup Campus, Yerevan
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="#register">Register</Button>
            <Button href="#tracks" variant="secondary">
              Explore the Domains
            </Button>
            <Button href="#submit" variant="secondary">
              Submission Requirements
            </Button>
          </div>
          <p className="mt-8 inline-block bg-white/5 border border-accent/30 text-white/70 text-sm px-4 py-2 rounded-full">
            🎯 Themed around Armenia's public-interest problems.
          </p>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-16 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <h3 className="text-accent text-lg font-semibold mb-2">🗓️ When</h3>
              <p className="text-white/80 text-sm">August 8–9, 2026 — Sat 10:00 to Sun 13:00 (24 hours of building).</p>
            </Card>
            <Card>
              <h3 className="text-accent text-lg font-semibold mb-2">📍 Where</h3>
              <p className="text-white/80 text-sm">AI9 Startup Campus, 9 Isahakyan St, Yerevan.</p>
            </Card>
            <Card>
              <h3 className="text-accent text-lg font-semibold mb-2">🤝 Who runs it</h3>
              <p className="text-white/80 text-sm">
                Organized by the Armenia LLM Summer School, AI9 and YerevaNN.
              </p>
            </Card>
            <Card>
              <h3 className="text-accent text-lg font-semibold mb-2">🎯 What</h3>
              <p className="text-white/80 text-sm">
                LLM systems for Armenia's public interest — the example domains guide the theme.
              </p>
            </Card>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <Card>
              <h3 className="text-accent text-lg font-semibold mb-2">👥 60–80</h3>
              <p className="text-white/80 text-sm">participants, hand-picked from the Summer School pool.</p>
            </Card>
            <Card>
              <h3 className="text-accent text-lg font-semibold mb-2">🧩 15–20 teams</h3>
              <p className="text-white/80 text-sm">small, focused teams of 3–4.</p>
            </Card>
            <Card>
              <h3 className="text-accent text-lg font-semibold mb-2">🧑‍🏫 8–15 mentors</h3>
              <p className="text-white/80 text-sm">senior AI mentors, hands-on all sprint.</p>
            </Card>
            <Card>
              <h3 className="text-accent text-lg font-semibold mb-2">🏆 Demo Day</h3>
              <p className="text-white/80 text-sm">present to an expert jury; top teams win prizes.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* The challenge in one minute */}
      <section className="py-20 bg-secondary/70 border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="The Challenge in One Minute"
            subtitle="A themed sprint for Armenia's public interest — judged by one rubric"
          />
          <div className="max-w-4xl mx-auto text-white/85 space-y-5 text-lg leading-relaxed">
            <p>
              Build an <strong>LLM-powered system</strong> that can <strong>evaluate</strong>{' '}
              evidence, <strong>reason</strong> through uncertainty, and <strong>generalize</strong>{' '}
              across real-world cases — for an Armenian public-interest problem you care about.
            </p>
            <p>
              Ship a working prototype, and — crucially — <em>measure</em> it. The projects that stand
              out are the ones that tested the system, understood where the model breaks, and could
              plausibly work outside a demo.
            </p>
          </div>
          <div className="max-w-4xl mx-auto mt-8 bg-accent/10 border border-accent/40 rounded-xl p-6">
            <p className="text-white/90">
              <span className="text-accent font-bold">The shape.</span> One theme — Armenia's public
              interest. The domains and example projects below guide you; bring your own idea or start
              from one. A single rubric keeps judging fair and coherent.
            </p>
          </div>
        </div>
      </section>

      {/* Themes & example projects */}
      <section id="tracks" className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Themes & Example Projects"
            subtitle="These Armenian public-interest domains and example projects set the theme — build one, or bring your own idea in the same spirit. Click any idea to explore."
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
            subtitle="Saturday 10:00 to Sunday 13:00 — 24 hours of building, then Demo Day"
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
              <h3 className="text-accent text-xl font-semibold mb-2">🏆 Prizes for the top teams</h3>
              <p className="text-white/75 text-sm">
                An expert jury picks the top teams on Demo Day, and they win prizes. The exact prizes
                are announced closer to the event.
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
            subtitle="Registration is run by the organizers — sign up through the form below"
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
