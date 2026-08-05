import clsx from 'clsx'
import type { Person } from '../../data/hackathonPeople'

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export default function PersonCard({ person }: { person: Person }) {
  const affiliation = [person.position, person.company].filter(Boolean).join(' · ')

  const content = (
    <>
      {person.image ? (
        <img
          src={person.image}
          alt={person.name}
          width={112}
          height={112}
          loading="lazy"
          decoding="async"
          className="w-28 h-28 rounded-full object-cover border-2 border-accent/60 shadow-lg shadow-accent/20 transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div
          aria-hidden="true"
          className="w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-accent border-2 border-accent/60 shadow-lg shadow-accent/20 transition-transform duration-300 group-hover:scale-105"
        >
          <span className="text-white text-2xl font-bold tracking-wide">{initials(person.name)}</span>
        </div>
      )}

      <h4 className="text-white font-semibold mt-4">{person.name}</h4>

      {affiliation && <p className="text-white/70 text-sm mt-1">{affiliation}</p>}

      {person.role && (
        <span className="mt-3 inline-block bg-accent/15 text-accent text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
          {person.role}
        </span>
      )}
    </>
  )

  const styles = clsx(
    'group flex flex-col items-center text-center w-52 p-6',
    'bg-white/[0.03] rounded-xl border border-white/10',
    'transition-all duration-300'
  )

  if (person.linkedin) {
    return (
      <a
        href={person.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(styles, 'hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-accent/20')}
      >
        {content}
      </a>
    )
  }

  return <div className={styles}>{content}</div>
}
