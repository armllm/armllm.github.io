import { useEffect, useState, useMemo, memo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const GRADIENT = 'radial-gradient(circle at center, #4f46e5 0%, #1e1b4b 100%)'

// Memoized to prevent unnecessary re-renders
const ParticlesBackground = memo(function ParticlesBackground() {
  const [init, setInit] = useState(false)

  // Detect environment once: skip particles entirely for users who prefer
  // reduced motion, and scale down particle density on small / touch screens.
  const { enabled, isMobile } = useMemo(() => {
    if (typeof window === 'undefined') {
      return { enabled: true, isMobile: false }
    }
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const mobile = window.matchMedia('(max-width: 768px)').matches
    return { enabled: !prefersReducedMotion, isMobile: mobile }
  }, [])

  useEffect(() => {
    if (!enabled) return
    // Defer engine init so it never blocks first paint.
    const timer = setTimeout(() => {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine)
      }).then(() => {
        setInit(true)
      })
    }, 200)

    return () => clearTimeout(timer)
  }, [enabled])

  // Reduced-motion users (or SSR) just get the static gradient.
  if (!enabled || !init) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{ background: GRADIENT }}
      />
    )
  }

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 -z-10"
      style={{ background: GRADIENT }}
      options={{
        fpsLimit: isMobile ? 30 : 60,
        particles: {
          number: {
            value: isMobile ? 22 : 50,
            density: {
              enable: true,
            },
          },
          color: {
            value: ['#818cf8', '#4f46e5', '#ffffff'],
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: { min: 0.1, max: 0.5 },
          },
          size: {
            value: { min: 1, max: 3 },
          },
          links: {
            enable: true,
            distance: isMobile ? 110 : 150,
            color: '#818cf8',
            opacity: 0.15,
            width: 1,
          },
          move: {
            enable: true,
            speed: isMobile ? 1 : 1.5,
            direction: 'none',
            random: true,
            straight: false,
            outModes: {
              default: 'out',
            },
          },
        },
        interactivity: {
          detectsOn: 'window',
          events: {
            // Disable hover interactivity on touch devices (no benefit, costs CPU).
            onHover: {
              enable: !isMobile,
              mode: 'grab',
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            grab: {
              distance: 120,
              links: {
                opacity: 0.3,
              },
            },
          },
        },
        detectRetina: true,
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
      }}
    />
  )
})

export default ParticlesBackground
