import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'

interface NavLink {
  to: string
  label: string
  external?: boolean
  hash?: string
}

interface HeaderProps {
  title?: string
  navLinks?: NavLink[]
}

const defaultNavLinks: NavLink[] = [
  { to: '/', label: 'Home' },
  { to: '/2026', label: '2026' },
  { to: '/2026/competition', label: 'Competition' },
  { to: '/2026/competition/results', label: 'Results' },
  { to: '/2025', label: '2025' },
  { to: '/2024', label: '2024' },
  { to: '/2026', label: 'FAQ', hash: 'faq' },
  { to: '/media', label: 'Media' },
]

const APPLY_URL = 'https://forms.gle/1HnZ4BLitQkXo2reA'

export default function Header({ title = 'LLM Summer School', navLinks = defaultNavLinks }: HeaderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scrollToHash = (hash: string) => {
    const element = document.getElementById(hash)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleHashClick = (to: string, hash: string) => {
    setMenuOpen(false)
    if (location.pathname === to) {
      scrollToHash(hash)
    } else {
      navigate(to)
      setTimeout(() => scrollToHash(hash), 100)
    }
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-glass border-b border-white/10 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center px-5 sm:px-8 py-4">
        <Link to="/" className="flex items-center gap-3 sm:gap-4 group">
          <img
            src="/images/logo_armllm_bg_removed.png"
            alt="ARMLLM Logo"
            width={40}
            height={40}
            className="h-10 w-auto drop-shadow-[0_0_8px_rgba(129,140,248,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(129,140,248,0.7)] transition-all"
          />
          <span className="text-xl sm:text-2xl font-bold text-white text-shadow-glow hidden sm:block">
            {title}
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.to + link.label}
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ) : link.hash ? (
              <button
                key={link.to + link.hash}
                onClick={() => handleHashClick(link.to, link.hash!)}
                className="text-white font-medium relative group cursor-pointer bg-transparent border-none"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
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
          )}

          <a
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-0.5 transition-all"
          >
            Apply
          </a>
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg border border-white/15 bg-white/5"
        >
          <span
            className={clsx(
              'block w-5 h-0.5 bg-white transition-all duration-300',
              menuOpen && 'translate-y-2 rotate-45'
            )}
          />
          <span
            className={clsx(
              'block w-5 h-0.5 bg-white transition-all duration-300',
              menuOpen && 'opacity-0'
            )}
          />
          <span
            className={clsx(
              'block w-5 h-0.5 bg-white transition-all duration-300',
              menuOpen && '-translate-y-2 -rotate-45'
            )}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={clsx(
          'md:hidden overflow-hidden bg-secondary/95 backdrop-blur-lg border-t border-white/10 transition-[max-height,opacity] duration-300 ease-in-out',
          menuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="flex flex-col px-5 py-4 gap-1">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.to + link.label}
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="text-white font-medium py-3 px-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            ) : link.hash ? (
              <button
                key={link.to + link.hash}
                onClick={() => handleHashClick(link.to, link.hash!)}
                className="text-left text-white font-medium py-3 px-3 rounded-lg hover:bg-white/10 transition-colors bg-transparent border-none"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  'text-white font-medium py-3 px-3 rounded-lg hover:bg-white/10 transition-colors',
                  location.pathname === link.to && 'text-accent bg-white/5'
                )}
              >
                {link.label}
              </Link>
            )
          )}

          <a
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 text-center px-5 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg shadow-lg shadow-accent/30"
          >
            Apply
          </a>
        </div>
      </div>
    </header>
  )
}
