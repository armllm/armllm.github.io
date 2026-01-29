import { Link } from 'react-router-dom'
import clsx from 'clsx'

interface EditionCardProps {
  year: number
  dates: string
  description: string
  image: string
  featured?: boolean
  className?: string
}

export default function EditionCard({
  year,
  dates,
  description,
  image,
  featured = false,
  className
}: EditionCardProps) {
  return (
    <Link
      to={`/${year}`}
      className={clsx(
        'relative block rounded-xl overflow-hidden',
        'bg-white/5 border border-white/10',
        'transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20 hover:bg-white/10',
        className
      )}
    >
      {featured && (
        <span className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
          Latest
        </span>
      )}
      <img
        src={image}
        alt={`LLM Summer School ${year}`}
        className="w-full h-48 object-cover border-b border-white/10"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold text-accent mb-2 text-shadow-glow">
          LLM Summer School {year}
        </h2>
        <p className="text-white/80 text-lg mb-4">{dates}</p>
        <p className="text-white/80 mb-6 flex-grow">{description}</p>
        <span className="inline-block bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-semibold text-center shadow-lg shadow-accent/30 hover:shadow-accent/40 transition-all">
          View {year} Website
        </span>
      </div>
    </Link>
  )
}
