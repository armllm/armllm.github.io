import clsx from 'clsx'

export interface Sponsor {
  name: string
  logo: string
  url: string
  description?: string
}

interface SponsorCardProps {
  sponsor: Sponsor
  className?: string
}

export default function SponsorCard({ sponsor, className }: SponsorCardProps) {
  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'flex flex-col items-center justify-center p-10',
        'w-72 h-64 text-center',
        'bg-white/5 rounded-xl border border-white/10',
        'transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20 hover:bg-white/10',
        className
      )}
    >
      {sponsor.description && (
        <p className="text-white font-semibold mb-4">{sponsor.description}</p>
      )}
      <img
        src={sponsor.logo}
        alt={sponsor.name}
        className="h-28 w-auto max-w-60 object-contain mb-5"
      />
      <h3 className="text-white text-lg font-semibold">{sponsor.name}</h3>
    </a>
  )
}
