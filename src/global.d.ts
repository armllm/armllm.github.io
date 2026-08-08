/**
 * Google Analytics (gtag.js) is loaded by the snippet in index.html, so it is
 * only present at runtime. Declare it here so app code can call it safely.
 */
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetOrEventName: string | Date,
      params?: Record<string, unknown>
    ) => void
    dataLayer?: unknown[]
  }
}

export {}
