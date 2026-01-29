import { Link } from 'react-router-dom'

interface FooterLink {
  to: string
  label: string
  external?: boolean
}

interface FooterProps {
  links?: FooterLink[]
}

const defaultLinks: FooterLink[] = [
  { to: '/2026', label: '2026 Edition' },
  { to: '/2025', label: '2025 Edition' },
  { to: '/2024', label: '2024 Edition' },
  { to: 'mailto:contact@armllm.org', label: 'Contact Us', external: true },
]

export default function Footer({ links = defaultLinks }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="relative z-10 bg-dark/90 text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/80">
            &copy; {currentYear} Armenia LLM Summer School
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              link.external ? (
                <a
                  key={link.to}
                  href={link.to}
                  className="text-white/80 hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white/80 hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
