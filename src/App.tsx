import { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import { lazyWithRetry } from './utils/lazyWithRetry'

// Lazy load pages for code splitting (with retry/reload on stale chunks)
const Home = lazyWithRetry(() => import('./pages/Home'))
const Edition2024 = lazyWithRetry(() => import('./pages/Edition2024'))
const Edition2025 = lazyWithRetry(() => import('./pages/Edition2025'))
const Edition2026 = lazyWithRetry(() => import('./pages/Edition2026'))
const Competition2026 = lazyWithRetry(() => import('./pages/Competition2026'))
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

function App() {
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
            <Route path="/media" element={<Media />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  )
}

export default App
