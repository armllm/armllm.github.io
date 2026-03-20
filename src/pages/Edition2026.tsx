import { memo } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/ui/SectionTitle'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import OrganizerCard from '../components/OrganizerCard'
import FAQ from '../components/FAQ'
import SEO from '../components/SEO'
import { organizers2025 } from '../data/organizers'
import { faq2026 } from '../data/faq2026'

const Edition2026 = memo(function Edition2026() {
  return (
    <div>
      <SEO
        title="2026 Edition"
        description="LLM Summer School 2026 (August 3-7) at AI9 Startup Campus, Yerevan, Armenia. Applications now open! In-person and online tracks available."
        url="/2026"
        keywords={['LLM Summer School 2026', 'Armenia AI 2026', 'AI9 Startup Campus', 'LLM Training Armenia']}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center py-32">
        <div className="container mx-auto px-8 text-center">
          <img
            src="/images/logo_armllm_bg_removed.png"
            alt="ARMLLM Logo"
            width={192}
            height={192}
            className="w-48 mx-auto mb-8 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]"
            loading="eager"
          />
          <span className="inline-block bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-full text-lg font-semibold uppercase tracking-widest mb-8 animate-pulse-glow">
            Applications Open
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            LLM Summer School 2026
          </h1>
          <p className="text-2xl text-white font-semibold mb-2 text-shadow-glow">
            AI9 Startup Campus • Yerevan, Armenia
          </p>
          <p className="text-xl text-accent font-medium mb-6">
            August 3–7, 2026
          </p>
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-10">
            An intensive week of lectures and hands-on sessions on Large Language Models — with an online track and a 24-hour hackathon organized by AI9.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="https://forms.gle/1HnZ4BLitQkXo2reA" target="_blank">
              Apply Now
            </Button>
            <Button href="https://forms.gle/NMMsdenubnoGkRJ87" target="_blank" variant="secondary">
              Fee Waiver
            </Button>
          </div>
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
              The Armenia LLM Summer School is an annual event dedicated to exploring the latest
              advancements in Large Language Models (LLMs). The program features comprehensive lectures,
              hands-on workshops, and an exciting hackathon where participants can apply their knowledge
              to innovative projects.
            </p>
            <p>
              In 2026 we welcome participants in Yerevan at AI9 Startup Campus, with a Zoom-based online track for theoretical sessions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">📚 Format</h3>
              <p className="text-white/80">In-person + online track</p>
              <p className="text-white/60 text-sm mt-2">Hackathon: Aug 8 (24-hour)</p>
            </Card>
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">📍 Location</h3>
              <p className="text-white/80">AI9 Startup Campus</p>
              <p className="text-white/60 text-sm mt-2">9 Isahakyan St, Yerevan, Armenia</p>
            </Card>
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">📅 Dates</h3>
              <p className="text-white/80">Aug 3–7, 2026</p>
              <p className="text-white/60 text-sm mt-2">Hackathon starts Aug 8 at 00:00</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-20 bg-secondary/70 border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Featured Speakers"
            subtitle="To be announced"
          />
          <div className="grid md:grid-cols-1 gap-8 max-w-md mx-auto">
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">🎤 Speakers</h3>
              <p className="text-accent italic">To be announced</p>
              <p className="text-white/60 text-sm mt-2">We'll announce speakers closer to the event.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" className="py-20 bg-glass border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Apply"
            subtitle="Applications are reviewed competitively (two-stage process)"
          />
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">🗓️ Deadline</h3>
              <p className="text-white font-bold">May 15, 2026</p>
              <p className="text-white/60 text-sm mt-2">Submit the form and upload your CV</p>
            </Card>
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">🧪 Technical Assessment</h3>
              <p className="text-white/80">Test link sent by email</p>
              <p className="text-white/60 text-sm mt-2">Watch for it on <strong>May 28, 2026</strong>. Answers by <strong>June 5</strong>.</p>
            </Card>
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">✉️ Questions?</h3>
              <p className="text-white/80">Contact us</p>
              <p className="text-white/60 text-sm mt-2">
                <a href="mailto:armeniallm@gmail.com" className="text-white/90 underline hover:text-white">
                  armeniallm@gmail.com
                </a>
              </p>
            </Card>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button href="https://forms.gle/1HnZ4BLitQkXo2reA" target="_blank">
              Apply Now
            </Button>
            <Button href="https://forms.gle/NMMsdenubnoGkRJ87" target="_blank" variant="secondary">
              Fee Waiver
            </Button>
            <Button href="#faq" variant="secondary">
              FAQ
            </Button>
          </div>
        </div>
      </section>

      {/* Fees Section */}
      <section id="fees" className="py-20 bg-secondary/70 border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Fees & Financial Aid"
            subtitle="Fees depend on participation mode. Financial aid is available for students."
          />
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">🎟️ In-person</h3>
              <p className="text-white font-bold">100,000 AMD</p>
              <p className="text-white/60 text-sm mt-2">Includes theoretical + practical sessions and GPU access</p>
            </Card>
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">💻 Online</h3>
              <p className="text-white font-bold">$200</p>
              <p className="text-white/60 text-sm mt-2">Theoretical sessions via Zoom (typically no shared GPU access)</p>
            </Card>
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">🧾 Financial Aid</h3>
              <p className="text-white/80">Student waivers up to <strong className="text-white">90%</strong></p>
              <p className="text-white/60 text-sm mt-2">Apply using the fee waiver form. Discounts may be available for others.</p>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button href="https://forms.gle/NMMsdenubnoGkRJ87" target="_blank" variant="secondary">
              Fee Waiver Application
            </Button>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 bg-glass border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Sponsors"
            subtitle="We thank our sponsors and partners for making the school possible."
          />
          
          <div className="flex justify-center">
            <a
              href="https://www.ai9.am/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 rounded-xl p-10 border border-white/10 flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20 hover:bg-white/10"
            >
              <img
                src="/images/ai9-square.svg"
                alt="AI9"
                className="w-36 h-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <div className="text-center">
                <p className="text-white/70 text-sm uppercase tracking-wider font-semibold">Venue Sponsor</p>
                <p className="text-white font-bold text-lg">AI9 Startup Campus</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-secondary/70 border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="FAQ"
            subtitle="All frequently asked questions for the 2026 edition."
          />
          <FAQ categories={faq2026} />
        </div>
      </section>

      {/* Past Editions */}
      <section id="past-editions" className="py-20 bg-glass border-t border-white/10">
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

      {/* Organizers Section */}
      <section id="organizers" className="py-20 bg-secondary/70 border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Organizers" />
          <div className="flex flex-wrap justify-center gap-8">
            {organizers2025.map((organizer) => (
              <OrganizerCard key={organizer.name} organizer={organizer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
})

export default Edition2026
