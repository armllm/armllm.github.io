import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  keywords?: string[]
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

const BASE_URL = 'https://armllm.github.io'
const DEFAULT_IMAGE = `${BASE_URL}/images/coverllm.png`
const SITE_NAME = 'Armenia LLM Summer School'

export default function SEO({
  title,
  description = 'Armenia LLM Summer School - An intensive program for students and researchers exploring the latest advancements in Large Language Models',
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = 'website',
  keywords = ['LLM', 'Large Language Models', 'AI', 'Machine Learning', 'Armenia', 'Summer School', 'Deep Learning', 'NLP'],
  author = 'Armenia LLM Summer School',
  publishedTime,
  modifiedTime
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`
  const fullImage = image.startsWith('http') ? image : `${BASE_URL}${image}`

  useEffect(() => {
    // Update document title
    document.title = fullTitle

    // Helper to update or create meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, name)
        document.head.appendChild(element)
      }
      element.content = content
    }

    // Basic meta tags
    setMeta('description', description)
    setMeta('keywords', keywords.join(', '))
    setMeta('author', author)
    setMeta('robots', 'index, follow')

    // Open Graph tags
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:image', fullImage, true)
    setMeta('og:url', fullUrl, true)
    setMeta('og:type', type, true)
    setMeta('og:site_name', SITE_NAME, true)
    setMeta('og:locale', 'en_US', true)

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', fullImage)

    // Article specific tags
    if (type === 'article') {
      if (publishedTime) setMeta('article:published_time', publishedTime, true)
      if (modifiedTime) setMeta('article:modified_time', modifiedTime, true)
    }

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = fullUrl

  }, [fullTitle, description, fullImage, fullUrl, type, keywords, author, publishedTime, modifiedTime])

  return null
}

// JSON-LD Structured Data component
interface StructuredDataProps {
  type: 'Event' | 'Organization' | 'WebSite'
  data: Record<string, unknown>
}

export function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const scriptId = `structured-data-${type}`
    let script = document.getElementById(scriptId) as HTMLScriptElement
    
    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    })

    return () => {
      script?.remove()
    }
  }, [type, data])

  return null
}
