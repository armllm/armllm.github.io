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
          open ? 'max-h-[80rem] opacity-100' : 'max-h-0 opacity-0'
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
            aria-current={i === active}
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
