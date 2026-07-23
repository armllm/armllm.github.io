import { memo } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/ui/SectionTitle'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import OrganizerCard from '../components/OrganizerCard'
import SpeakerCard from '../components/SpeakerCard'
import FAQ from '../components/FAQ'
import SEO from '../components/SEO'
import { organizers2025 } from '../data/organizers'
import { speakers2026 } from '../data/speakers'
import { schedule2026 } from '../data/schedule2026'
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
            An intensive week of lectures and hands-on sessions on Large Language Models and Physical AI — with an online track and a 24-hour hackathon organized by the Armenia LLM Summer School, AI9 and YerevaNN.
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

      {/* Competition Banner */}
      <section className="py-12 bg-gradient-to-r from-primary/20 to-accent/20 border-t border-white/10">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl mx-auto bg-white/[0.04] border border-accent/30 rounded-2xl p-8 md:flex md:items-center md:justify-between gap-6">
            <div className="md:flex-1 mb-6 md:mb-0">
              <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3">
                Entrance Competition
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Matrix Arena: Adversarial Matrix Completion
              </h3>
              <p className="text-white/80">
                Reconstruct hidden matrices from sparse observations and outwit opponents in
                adversarial duels — the entrance test for ARMLLM 2026. Explore the challenge and the
                live demo, or see the final leaderboard.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
              <Button to="/2026/competition">The Challenge →</Button>
              <Button to="/2026/competition/results" variant="secondary">Results →</Button>
            </div>
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
              advancements in Large Language Models (LLMs) and Physical AI. The program features comprehensive lectures,
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
              <p className="text-white/60 text-sm mt-2">Hackathon: Aug 8–9 (24-hour)</p>
            </Card>
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">📍 Location</h3>
              <p className="text-white/80">AI9 Startup Campus</p>
              <p className="text-white/60 text-sm mt-2">9 Isahakyan St, Yerevan, Armenia</p>
            </Card>
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">📅 Dates</h3>
              <p className="text-white/80">Aug 3–7, 2026</p>
              <p className="text-white/60 text-sm mt-2">Hackathon: Aug 8–9 (Sat 10:00 – Sun 13:00)</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-20 bg-secondary/70 border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Featured Speakers"
            subtitle="Confirmed lecturers for 2026"
          />
          
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {speakers2026.map((speaker) => (
              <SpeakerCard key={speaker.name} speaker={speaker} />
            ))}
          </div>

          <div className="text-center">
            <p className="text-white/70 text-lg">
              More speakers to be announced soon.
            </p>
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      <section id="agenda" className="py-20 bg-glass border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Agenda"
            subtitle="Five days of intensive learning"
          />
          
          <div className="max-w-4xl mx-auto space-y-6">
            {schedule2026.map((day) => (
              <Card key={day.date} className="!text-left">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="md:w-32 flex-shrink-0">
                    <p className="text-accent font-bold text-lg">{day.date}</p>
                    <p className="text-white/60 text-sm">{day.day}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-xl font-semibold mb-2">{day.topic}</h3>
                    {day.description && (
                      <p className="text-white/70 mb-3">{day.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {day.speakers.map((speaker, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-sm ${
                            speaker === 'TBD'
                              ? 'bg-white/10 text-white/50 italic'
                              : 'bg-accent/20 text-accent'
                          }`}
                        >
                          {speaker}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-white/60">
              <strong className="text-accent">August 8–9:</strong> 24-hour Hackathon (organized by ARMLLM, AI9 &amp; YerevaNN) —{' '}
              <Link to="/2026/hackathon" className="text-accent underline hover:text-white">
                explore Hack Armenia →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Hackathon Banner */}
      <section className="py-12 bg-gradient-to-r from-accent/20 to-primary/20 border-t border-white/10">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl mx-auto bg-white/[0.04] border border-accent/30 rounded-2xl p-8 md:flex md:items-center md:justify-between gap-6">
            <div className="md:flex-1 mb-6 md:mb-0">
              <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3">
                24-Hour Hackathon · Aug 8–9
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Hack Armenia: build LLMs for Armenia
              </h3>
              <p className="text-white/80">
                A 24-hour build sprint after the school — one umbrella challenge across Armenian
                public-interest domains, from urban systems and healthcare to security, food, and
                disaster response. Explore the tracks and register.
              </p>
              <p className="text-white/55 text-sm mt-2">
                Organized by the Armenia LLM Summer School, AI9 &amp; YerevaNN.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button to="/2026/hackathon">Explore Hack Armenia →</Button>
            </div>
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
              <h3 className="text-accent text-xl font-semibold mb-3">🗓️ Final Deadline</h3>
              <p className="text-white font-bold text-xl">June 10, 2026</p>
              <p className="text-white/60 text-sm mt-2">Submit the form and upload your CV</p>
              <p className="text-accent/80 text-xs mt-2 font-semibold uppercase tracking-wide">Final Application Deadline</p>
            </Card>
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">🧪 Technical Assessment</h3>
              <p className="text-white/80">Test link sent by email</p>
              <p className="text-white/60 text-sm mt-2">After application review. Expect answers within 2 weeks.</p>
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
              <p className="text-white font-bold">150,000 AMD</p>
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

      {/* Partners Section */}
      <section id="partners" className="py-20 bg-glass border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Partners"
            subtitle="We thank our partners for making the school possible."
          />
          
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="https://www.ai9.am/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 rounded-xl p-10 border border-white/10 flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20 hover:bg-white/10"
            >
              <div className="h-24 flex items-center justify-center">
                <img
                  src="/images/ai9-square.svg"
                  alt="AI9"
                  loading="lazy"
                  decoding="async"
                  className="h-20 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <div className="text-center">
                <p className="text-white/70 text-sm uppercase tracking-wider font-semibold">Venue Partner</p>
                <p className="text-white font-bold text-lg">AI9 Startup Campus</p>
              </div>
            </a>

            <a
              href="https://arcs.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 rounded-xl p-10 border border-white/10 flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20 hover:bg-white/10"
            >
              <div className="h-24 flex items-center justify-center bg-white rounded-lg px-6">
                <img
                  src="/images/arcs_ai_logo.jpg"
                  alt="ARCS.ai"
                  loading="lazy"
                  decoding="async"
                  className="h-20 w-auto"
                />
              </div>
              <div className="text-center">
                <p className="text-white/70 text-sm uppercase tracking-wider font-semibold">Partner</p>
                <p className="text-white font-bold text-lg">ARCS.ai</p>
              </div>
            </a>

            <a
              href="https://www.pmiscience.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 rounded-xl p-10 border border-white/10 flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20 hover:bg-white/10"
            >
              <div className="h-24 flex items-center justify-center">
                <img
                  src="/images/pmi_science_white_logo.jpg"
                  alt="PMI Science R&D Center Armenia"
                  loading="lazy"
                  decoding="async"
                  className="h-20 w-auto object-contain rounded-lg"
                />
              </div>
              <div className="text-center">
                <p className="text-white/70 text-sm uppercase tracking-wider font-semibold">Partner</p>
                <p className="text-white font-bold text-lg">PMI Science R&D Armenia</p>
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
