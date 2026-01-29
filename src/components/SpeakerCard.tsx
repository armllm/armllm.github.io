import clsx from 'clsx'

export interface Speaker {
  name: string
  affiliation: string
  image: string
  scholarUrl?: string
}

interface SpeakerCardProps {
  speaker: Speaker
  className?: string
}

export default function SpeakerCard({ speaker, className }: SpeakerCardProps) {
  const content = (
    <>
      <img
        src={speaker.image}
        alt={speaker.name}
        className={clsx(
          'w-36 h-36 rounded-full object-cover',
          'border-3 border-accent shadow-lg shadow-accent/30',
          'transition-all duration-300 group-hover:scale-105 group-hover:shadow-accent/50'
        )}
      />
      <h3 className="text-accent mt-4 mb-2 text-xl font-semibold text-shadow-glow">
        {speaker.name}
      </h3>
      <p className="text-white/80 text-sm">
        {speaker.affiliation}
      </p>
    </>
  )

  const containerStyles = clsx(
    'group flex flex-col items-center gap-2 p-6',
    'bg-white/5 rounded-xl border border-white/10',
    'transition-all duration-300 cursor-pointer',
    'hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20',
    className
  )

  if (speaker.scholarUrl) {
    return (
      <a
        href={speaker.scholarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={containerStyles}
      >
        {content}
      </a>
    )
  }

  return <div className={containerStyles}>{content}</div>
}
