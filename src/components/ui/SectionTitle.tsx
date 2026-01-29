import clsx from 'clsx'

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
}

export default function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={clsx('text-center mb-12', className)}>
      <h2 className="text-4xl font-bold text-white mb-4 text-shadow-glow">
        {title}
      </h2>
      {subtitle && (
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
