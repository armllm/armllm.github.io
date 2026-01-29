import clsx from 'clsx'
import { Link } from 'react-router-dom'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
  href?: string
  to?: string
  target?: string
  onClick?: () => void
}

export default function Button({
  children,
  className,
  variant = 'primary',
  href,
  to,
  target,
  onClick
}: ButtonProps) {
  const baseStyles = clsx(
    'inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-300',
    'border border-white/10',
    variant === 'primary' && [
      'bg-gradient-to-r from-primary to-accent text-white',
      'shadow-lg shadow-accent/30',
      'hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40'
    ],
    variant === 'secondary' && [
      'bg-transparent border-2 border-accent text-white',
      'hover:bg-accent/10'
    ],
    className
  )

  if (to) {
    return (
      <Link to={to} className={baseStyles} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target={target} className={baseStyles} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button className={baseStyles} onClick={onClick}>
      {children}
    </button>
  )
}
