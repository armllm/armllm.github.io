import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

interface NavLink {
  to: string
  label: string
  external?: boolean
}

interface HeaderProps {
  title?: string
  navLinks?: NavLink[]
}

const defaultNavLinks: NavLink[] = [
  { to: '/', label: 'Home' },
  { to: '/2026', label: '2026' },
  { to: '/2025', label: '2025' },
  { to: '/2024', label: '2024' },
  { to: '/media', label: 'Media' },
]

export default function Header({ title = 'LLM Summer School', navLinks = defaultNavLinks }: HeaderProps) {
  const location = useLocation()

  return (
    <header className="fixed top-0 w-full z-50 bg-glass border-b border-white/10 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center px-8 py-4">
        <Link to="/" className="flex items-center gap-4 group">
          <img
            src="/images/logo_armllm_bg_removed.png"
            alt="ARMLLM Logo"
            className="h-10 w-auto drop-shadow-[0_0_8px_rgba(129,140,248,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(129,140,248,0.7)] transition-all"
          />
          <span className="text-2xl font-bold text-white text-shadow-glow hidden sm:block">
            {title}
          </span>
        </Link>
        
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            link.external ? (
              <a
                key={link.to}
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={clsx(
                  'text-white font-medium relative group',
                  location.pathname === link.to && 'text-accent'
                )}
              >
                {link.label}
                <span 
                  className={clsx(
                    'absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300',
                    location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                  )} 
                />
              </Link>
            )
          ))}
        </div>
      </nav>
    </header>
  )
}
