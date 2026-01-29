import clsx from 'clsx'

export interface Organizer {
  name: string
  affiliation: string
  image: string
}

interface OrganizerCardProps {
  organizer: Organizer
  className?: string
}

export default function OrganizerCard({ organizer, className }: OrganizerCardProps) {
  return (
    <div className={clsx('text-center max-w-36', className)}>
      <img
        src={organizer.image}
        alt={organizer.name}
        className="w-24 h-24 rounded-full object-cover border-2 border-white/70 mb-3 mx-auto"
      />
      <h3 className="text-white text-base font-semibold mb-1">
        {organizer.name}
      </h3>
      <p className="text-white/80 text-sm">
        {organizer.affiliation}
      </p>
    </div>
  )
}
