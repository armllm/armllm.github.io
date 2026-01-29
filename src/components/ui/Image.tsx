import { useState, useRef, useEffect, memo } from 'react'
import clsx from 'clsx'

interface ImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean // Load immediately without lazy loading
  placeholder?: 'blur' | 'empty'
}

const Image = memo(function Image({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  placeholder = 'empty'
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before visible
        threshold: 0
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  return (
    <div
      ref={imgRef}
      className={clsx(
        'relative overflow-hidden',
        !isLoaded && placeholder === 'blur' && 'bg-white/5 animate-pulse',
        className
      )}
      style={{ width, height }}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={clsx(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
    </div>
  )
})

export default Image
