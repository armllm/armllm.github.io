import { useEffect, useState, memo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

// Memoized to prevent unnecessary re-renders
const ParticlesBackground = memo(function ParticlesBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    // Only initialize particles after initial page load
    const timer = setTimeout(() => {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine)
      }).then(() => {
        setInit(true)
      })
    }, 100) // Small delay to prioritize main content

    return () => clearTimeout(timer)
  }, [])

  // Show gradient background immediately, particles load after
  if (!init) {
    return (
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: 'radial-gradient(circle at center, #4f46e5 0%, #1e1b4b 100%)'
        }}
      />
    )
  }

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 -z-10"
      style={{
        background: 'radial-gradient(circle at center, #4f46e5 0%, #1e1b4b 100%)'
      }}
      options={{
        fpsLimit: 60,
        particles: {
          number: {
            value: 50, // Reduced for better performance
            density: {
              enable: true,
            }
          },
          color: {
            value: ['#818cf8', '#4f46e5', '#ffffff']
          },
          shape: {
            type: 'circle'
          },
          opacity: {
            value: { min: 0.1, max: 0.5 },
          },
          size: {
            value: { min: 1, max: 3 },
          },
          links: {
            enable: true,
            distance: 150,
            color: '#818cf8',
            opacity: 0.15,
            width: 1
          },
          move: {
            enable: true,
            speed: 1.5, // Slower for less CPU usage
            direction: 'none',
            random: true,
            straight: false,
            outModes: {
              default: 'out'
            }
          }
        },
        interactivity: {
          detectsOn: 'window',
          events: {
            onHover: {
              enable: true,
              mode: 'grab'
            },
            resize: {
              enable: true
            }
          },
          modes: {
            grab: {
              distance: 120,
              links: {
                opacity: 0.3
              }
            }
          }
        },
        detectRetina: true,
        pauseOnBlur: true, // Pause when tab not visible
        pauseOnOutsideViewport: true
      }}
    />
  )
})

export default ParticlesBackground
