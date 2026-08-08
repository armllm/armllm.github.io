import { Suspense, useEffect, useRef } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import { lazyWithRetry } from './utils/lazyWithRetry'

// Lazy load pages for code splitting (with retry/reload on stale chunks)
const Home = lazyWithRetry(() => import('./pages/Home'))
const Edition2024 = lazyWithRetry(() => import('./pages/Edition2024'))
const Edition2025 = lazyWithRetry(() => import('./pages/Edition2025'))
const Edition2026 = lazyWithRetry(() => import('./pages/Edition2026'))
const Competition2026 = lazyWithRetry(() => import('./pages/Competition2026'))
const CompetitionResults2026 = lazyWithRetry(() => import('./pages/CompetitionResults2026'))
const Hackathon2026 = lazyWithRetry(() => import('./pages/Hackathon2026'))
const Media = lazyWithRetry(() => import('./pages/Media'))

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/60">Loading...</p>
      </div>
    </div>
  )
}

/**
 * Report client-side navigations to Google Analytics.
 *
 * The gtag snippet in index.html only fires a page_view on the initial document
 * load, so in a single-page app every route change after that would go
 * uncounted. The first view is skipped here because the snippet already sent
 * it; the short delay lets the lazily-loaded page's <SEO> effect set
 * document.title before the event goes out.
 */
function usePageViews() {
  const location = useLocation()
  const isInitialView = useRef(true)

  useEffect(() => {
    if (isInitialView.current) {
      isInitialView.current = false
      return
    }

    const timer = window.setTimeout(() => {
      window.gtag?.('event', 'page_view', {
        page_path: location.pathname + location.search + location.hash,
        page_location: window.location.href,
        page_title: document.title,
      })
    }, 50)

    return () => window.clearTimeout(timer)
  }, [location])
}

function App() {
  usePageViews()

  return (
    <Layout>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/2024" element={<Edition2024 />} />
            <Route path="/2025" element={<Edition2025 />} />
            <Route path="/2026" element={<Edition2026 />} />
            <Route path="/2026/competition" element={<Competition2026 />} />
            <Route path="/2026/competition/results" element={<CompetitionResults2026 />} />
            <Route path="/2026/hackathon" element={<Hackathon2026 />} />
            <Route path="/media" element={<Media />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  )
}

export default App
