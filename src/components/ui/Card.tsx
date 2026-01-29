import clsx from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
  as?: 'div' | 'a'
  href?: string
  target?: string
}

export default function Card({ 
  children, 
  className, 
  hoverable = false,
  onClick,
  as = 'div',
  href,
  target
}: CardProps) {
  const baseStyles = clsx(
    'bg-white/5 p-8 rounded-xl border border-white/10 text-center',
    'shadow-lg transition-all duration-300',
    hoverable && 'cursor-pointer hover:-translate-y-1 hover:shadow-accent/20 hover:bg-white/10',
    className
  )

  if (as === 'a' && href) {
    return (
      <a href={href} target={target} className={baseStyles} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <div className={baseStyles} onClick={onClick}>
      {children}
    </div>
  )
}
