import { memo } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/ui/SectionTitle'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import SEO from '../components/SEO'

const Edition2026 = memo(function Edition2026() {
  return (
    <div>
      <SEO
        title="2026 Edition - Coming Soon"
        description="LLM Summer School 2026 in Yerevan, Armenia - The 3rd edition is coming soon! Stay tuned for announcements about speakers, schedule, and applications."
        url="/2026"
        keywords={['LLM Summer School 2026', 'Armenia AI 2026', 'Upcoming AI Events Armenia']}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center py-32">
        <div className="container mx-auto px-8 text-center">
          <span className="inline-block bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-8 animate-pulse-glow">
            Coming Soon
          </span>
          <img
            src="/images/logo_armllm_bg_removed.png"
            alt="ARMLLM Logo"
            width={192}
            height={192}
            className="w-48 mx-auto mb-8 animate-float drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]"
            loading="eager"
          />
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            LLM Summer School 2026
          </h1>
          <p className="text-2xl text-white font-semibold mb-2 text-shadow-glow">
            Yerevan, Armenia
          </p>
          <p className="text-xl text-accent font-medium mb-6 italic">
            Dates to be announced
          </p>
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-10">
            The 3rd edition of the LLM Summer School is coming! An intensive program for students
            and researchers exploring the latest advancements in Large Language Models.
          </p>
          <Button to="/2025" variant="secondary">
            View 2025 Edition
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-glass border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="About the Program"
            subtitle="Building on the success of previous editions"
          />
          
          <div className="max-w-4xl mx-auto text-center text-white/90 space-y-6 mb-12">
            <p>
              The LLM Summer School in Armenia is an annual event dedicated to exploring the latest
              advancements in Large Language Models (LLMs). The program features comprehensive lectures,
              hands-on workshops, and an exciting hackathon where participants can apply their knowledge
              to innovative projects.
            </p>
            <p>
              Stay tuned for announcements about speakers, schedule, and application details for the 2026 edition.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">📚 Format</h3>
              <p className="text-white/80">
                Combination of lectures, workshops, and practical sessions
              </p>
              <p className="text-white/60 text-sm mt-2">Followed by a hackathon</p>
            </Card>
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">📍 Location</h3>
              <p className="text-white/80">Yerevan, Armenia</p>
              <p className="text-white/60 text-sm mt-2">Venue to be announced</p>
            </Card>
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">📅 Dates</h3>
              <p className="text-accent italic">To be announced</p>
              <p className="text-white/60 text-sm mt-2">Expected: Summer 2026</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Past Editions */}
      <section id="past-editions" className="py-20 bg-secondary/70 border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Past Editions"
            subtitle="Explore our previous summer schools"
          />
          
          <div className="flex flex-wrap justify-center gap-8">
            <Link
              to="/2025"
              className="bg-white/5 p-8 rounded-xl border border-white/10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20 hover:bg-white/10"
            >
              <h3 className="text-accent text-2xl font-bold mb-2">2025</h3>
              <p className="text-white/80">2nd Edition</p>
              <p className="text-white/50 text-sm mt-2">Jul 24 - Jul 30, 2025</p>
            </Link>
            <Link
              to="/2024"
              className="bg-white/5 p-8 rounded-xl border border-white/10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20 hover:bg-white/10"
            >
              <h3 className="text-accent text-2xl font-bold mb-2">2024</h3>
              <p className="text-white/80">1st Edition</p>
              <p className="text-white/50 text-sm mt-2">Inaugural Summer School</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
})

export default Edition2026
