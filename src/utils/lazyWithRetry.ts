import { lazy, type ComponentType } from 'react'

const RELOAD_KEY = 'chunk-reload-attempt'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = ComponentType<any>

/**
 * Wraps React.lazy with retry + auto-reload behavior.
 *
 * Dynamic imports can fail when a new version of the site is deployed while a
 * user has an old index.html cached (the hashed chunk filenames change, so the
 * old chunks 404). Without handling, this renders a blank page. Here we retry a
 * couple of times for transient network errors and, if the chunk is genuinely
 * gone, force a single full reload to fetch the fresh index.html + chunks.
 */
export function lazyWithRetry<T extends AnyComponent>(
  importer: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      const module = await importer()
      sessionStorage.removeItem(RELOAD_KEY)
      return module
    } catch (error) {
      // Retry transient failures with a short backoff.
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          await new Promise((resolve) => setTimeout(resolve, 300 * attempt))
          const module = await importer()
          sessionStorage.removeItem(RELOAD_KEY)
          return module
        } catch {
          // keep trying
        }
      }

      // Likely a stale chunk after a deploy. Force a one-time reload.
      const alreadyReloaded = sessionStorage.getItem(RELOAD_KEY)
      if (!alreadyReloaded) {
        sessionStorage.setItem(RELOAD_KEY, '1')
        window.location.reload()
        // Never resolve so nothing flashes before the reload kicks in.
        return new Promise<{ default: T }>(() => {})
      }

      throw error
    }
  })
}
