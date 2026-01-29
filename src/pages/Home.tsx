import { memo } from 'react'
import EditionCard from '../components/EditionCard'
import SectionTitle from '../components/ui/SectionTitle'
import SEO, { StructuredData } from '../components/SEO'
import { mediaItems } from '../data/media'

const Home = memo(function Home() {
  return (
    <div>
      <SEO
        title="Home"
        description="Armenia LLM Summer School - Bringing together researchers, students, and experts for an immersive learning experience in Large Language Model technology. Join us in Yerevan, Armenia."
        url="/"
        keywords={['LLM Summer School', 'Armenia AI', 'Machine Learning Education', 'Deep Learning Course', 'NLP Training', 'Yerevan Tech']}
      />
      <StructuredData
        type="Organization"
        data={{
          name: 'Armenia LLM Summer School',
          url: 'https://armllm.github.io',
          logo: 'https://armllm.github.io/images/logo_armllm_bg_removed.png',
          description: 'An intensive summer school program focused on Large Language Models',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Yerevan',
            addressCountry: 'Armenia'
          }
        }}
      />

      {/* Hero Section */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-8">
          <img
            src="/images/logo_armllm_bg_removed.png"
            alt="Armenia LLM Summer School Logo"
            width={192}
            height={192}
            className="w-48 mx-auto mb-8 animate-float drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]"
            loading="eager"
          />
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
            Armenia LLM Summer School
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-shadow-glow">
            Bringing together researchers, students, and experts for an immersive learning
            experience in Large Language Model technology
          </p>
        </div>
      </section>

      {/* Editions Grid */}
      <section className="py-20 bg-glass border-t border-white/10">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EditionCard
              year={2026}
              dates="Coming Soon • Yerevan, Armenia"
              description="The third edition of the Armenia LLM Summer School is coming! Stay tuned for announcements about speakers, schedule, and applications."
              image="/images/coverllm.png"
              featured
            />
            <EditionCard
              year={2025}
              dates="July 24-30, 2025 • Yerevan, Armenia"
              description="The second edition of the Armenia LLM Summer School featured cutting-edge topics in language models with world-class researchers and AI experts."
              image="/images/coverllm.png"
            />
            <EditionCard
              year={2024}
              dates="July 1-7, 2024 • Yerevan, Armenia"
              description="The inaugural Armenia LLM Summer School brought together over 70 students and researchers for an intensive week focused on the fundamentals and applications of large language models."
              image="/images/coverllm.png"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-secondary/70 border-t border-white/10">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="About the Summer School" className="text-left" />
              <div className="space-y-4 text-white/90">
                <p>
                  The Armenia LLM Summer School is a comprehensive program designed to provide
                  participants with in-depth knowledge of large language models through lectures,
                  workshops, and hands-on projects.
                </p>
                <p>
                  Our program covers key topics including model architecture, training techniques,
                  alignment, evaluation, interpretability, safety, vision-language models, and
                  responsible AI applications.
                </p>
                <p>
                  Led by experts from leading research institutions and industry organizations,
                  the summer school fosters collaboration, networking, and the exchange of ideas
                  in the rapidly evolving field of AI language models.
                </p>
              </div>
            </div>
            <img
              src="/images/llm.png"
              alt="LLM Summer School"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl shadow-accent/30"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section className="py-20 bg-glass border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Featured in Media" subtitle="Coverage of the LLM Summer School" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaItems.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover border-b border-white/10"
                  loading="lazy"
                />
                <div className="p-5">
                  <span className="text-accent font-semibold text-sm uppercase tracking-wide">
                    {item.source}
                  </span>
                  <h3 className="text-white font-medium mt-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-secondary/70 border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Our Partners" />
          <div className="flex flex-wrap justify-center gap-12 items-center">
            <img src="/images/aua.png" alt="American University of Armenia" width={64} height={64} className="h-16 w-auto opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all" loading="lazy" />
            <img src="/images/ynn.png" alt="YerevaNN" width={64} height={64} className="h-16 w-auto opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all" loading="lazy" />
            <img src="/images/nebius.png" alt="Nebius AI" width={64} height={64} className="h-16 w-auto opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all" loading="lazy" />
            <img src="/images/picsart.png" alt="Picsart" width={64} height={64} className="h-16 w-auto opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all" loading="lazy" />
          </div>
        </div>
      </section>
    </div>
  )
})

export default Home
