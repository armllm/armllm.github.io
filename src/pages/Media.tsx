import { memo } from 'react'
import SectionTitle from '../components/ui/SectionTitle'
import SEO from '../components/SEO'
import { mediaItems } from '../data/media'

const Media = memo(function Media() {
  return (
    <div>
      <SEO
        title="Media Coverage"
        description="Press coverage, articles, videos, and podcasts about the Armenia LLM Summer School. See how the media covered our events."
        url="/media"
        keywords={['LLM Summer School Media', 'Armenia AI News', 'LLM Summer School Press']}
      />

      {/* Hero Section */}
      <section className="py-32 text-center">
        <div className="container mx-auto px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
            Media Coverage
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Press coverage and media appearances from the Armenia LLM Summer School
          </p>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-20 bg-glass border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Featured Coverage"
            subtitle="Articles, videos, and podcasts about the summer school"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaItems.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/20"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    width={400}
                    height={224}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-accent/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {item.source}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-white text-lg font-semibold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-white/60 text-sm line-clamp-3">
                      {item.description}
                    </p>
                  )}
                  <span className="inline-block mt-4 text-accent font-semibold text-sm">
                    Read more →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
})

export default Media
