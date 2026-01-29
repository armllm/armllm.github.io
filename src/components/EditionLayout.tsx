import SectionTitle from './ui/SectionTitle'
import Card from './ui/Card'
import Button from './ui/Button'
import SpeakerCard, { Speaker } from './SpeakerCard'
import SponsorCard, { Sponsor } from './SponsorCard'
import OrganizerCard, { Organizer } from './OrganizerCard'
import { Partner } from '../data/sponsors'
import { ScheduleDay } from '../data/schedule'

interface EditionLayoutProps {
  year: number
  dates: string
  location: string
  locationUrl?: string
  description: string
  aboutText?: string[]
  speakers: Speaker[]
  schedule: ScheduleDay[]
  sponsors?: Sponsor[]
  partners?: Partner[]
  organizers: Organizer[]
  applyUrl?: string
  feeWaiverUrl?: string
  registrationFee?: string
  applicationDeadline?: string
  notificationDate?: string
}

export default function EditionLayout({
  year,
  dates,
  location,
  locationUrl,
  description,
  aboutText,
  speakers,
  schedule,
  sponsors,
  partners,
  organizers,
  applyUrl,
  feeWaiverUrl,
  registrationFee,
  applicationDeadline,
  notificationDate
}: EditionLayoutProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-32 text-center">
        <div className="container mx-auto px-8">
          <img
            src="/images/logo_armllm_bg_removed.png"
            alt="ARMLLM Logo"
            className="w-48 mx-auto mb-8 animate-float drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]"
          />
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            LLM Summer School {year}
          </h1>
          <p className="text-2xl text-white font-semibold mb-2 text-shadow-glow">
            {location}
          </p>
          <p className="text-xl text-accent font-medium mb-6 text-shadow-glow">
            {dates}
          </p>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            {description}
          </p>
          {applyUrl && (
            <Button href={applyUrl} target="_blank" className="mt-10">
              Apply Now
            </Button>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-glass border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="About the Program"
            subtitle="A comprehensive summer school designed for graduate students and researchers interested in Large Language Models"
          />
          
          {aboutText && (
            <div className="max-w-4xl mx-auto text-center text-white/90 space-y-6 mb-12">
              {aboutText.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">⏱️ Duration</h3>
              <p className="text-white/80">{dates}</p>
              <p className="text-white/60 text-sm mt-2">
                One week of intensive learning and hands-on experience
              </p>
            </Card>
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">📚 Format</h3>
              <p className="text-white/80">
                Combination of lectures, workshops, and practical sessions
              </p>
            </Card>
            <Card>
              <h3 className="text-accent text-xl font-semibold mb-3">📍 Location</h3>
              <p className="text-white/80">{location}</p>
              {locationUrl && (
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-sm mt-2 inline-block hover:underline"
                >
                  View on map
                </a>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-20 bg-secondary/70 border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Featured Speakers"
            subtitle="Learn from leading experts in the field"
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {speakers.map((speaker) => (
              <SpeakerCard key={speaker.name} speaker={speaker} />
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-glass border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Program Schedule"
            subtitle={`${dates} - ${location}`}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {schedule.map((day) => (
              <Card
                key={day.date}
                className={
                  day.isHackathon
                    ? 'bg-primary/20 border-accent/30'
                    : day.isBreak
                    ? 'bg-white/3'
                    : ''
                }
              >
                <h3 className="text-accent text-xl font-semibold mb-2">
                  📅 {day.date}
                </h3>
                <h4 className="text-white text-lg mb-2">
                  {day.emoji} {day.title}
                </h4>
                {day.speaker && (
                  <p className="text-white/70 text-sm">Speaker: {day.speaker}</p>
                )}
                {day.description && (
                  <p className="text-white/60 text-sm mt-2">{day.description}</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Section */}
      {applyUrl && (
        <section id="apply" className="py-20 bg-secondary/70 border-t border-white/10">
          <div className="container mx-auto px-8">
            <SectionTitle
              title="Apply Now"
              subtitle="Limited spots available for the program"
            />
            
            <div className="max-w-4xl mx-auto text-center text-white/90 mb-12">
              <p className="mb-4">
                The school will be open to a limited number of qualified and motivated candidates.
                Students (Bachelor, Masters, Ph.D.), researchers (both academic and industrial),
                and academic/industrial professionals are encouraged to apply.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card as="a" href={applyUrl} target="_blank" hoverable>
                <h3 className="text-accent text-xl font-semibold mb-3">🔍 Application Process</h3>
                <p className="text-white/80 mb-4">
                  Submit your application through our online application form
                </p>
                <span className="text-accent font-semibold">Apply Now →</span>
              </Card>
              
              {registrationFee && (
                <Card>
                  <h3 className="text-accent text-xl font-semibold mb-3">💰 Registration Fee</h3>
                  <p className="text-white/80">
                    The registration fee is <strong>{registrationFee}</strong>
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    Covers access to GPUs during the course
                  </p>
                </Card>
              )}
              
              {feeWaiverUrl && (
                <Card as="a" href={feeWaiverUrl} target="_blank" hoverable>
                  <h3 className="text-accent text-xl font-semibold mb-3">🤝 Financial Assistance</h3>
                  <p className="text-white/80 mb-4">
                    All applicants are eligible for financial assistance
                  </p>
                  <span className="text-accent font-semibold">Apply for Fee Waiver →</span>
                </Card>
              )}
            </div>

            {(applicationDeadline || notificationDate) && (
              <div className="text-center">
                <h4 className="text-accent text-lg font-semibold mb-4">Important Dates</h4>
                <ul className="text-white/90 space-y-2">
                  {applicationDeadline && (
                    <li>Application deadline: <strong>{applicationDeadline}</strong></li>
                  )}
                  {notificationDate && (
                    <li>Notification of acceptance: <strong>{notificationDate}</strong></li>
                  )}
                  <li>Summer School dates: <strong>{dates}</strong></li>
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Sponsors Section */}
      {sponsors && sponsors.length > 0 && (
        <section id="sponsors" className="py-20 bg-glass border-t border-white/10">
          <div className="container mx-auto px-8">
            <SectionTitle title="Sponsors" />
            <div className="flex flex-wrap justify-center gap-8">
              {sponsors.map((sponsor) => (
                <SponsorCard key={sponsor.name} sponsor={sponsor} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners Section */}
      {partners && partners.length > 0 && (
        <section id="partners" className="py-20 bg-secondary/70 border-t border-white/10">
          <div className="container mx-auto px-8">
            <SectionTitle title="Partners" />
            <div className="flex flex-wrap justify-center gap-8">
              {partners.map((partner) => (
                <SponsorCard key={partner.name} sponsor={partner} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Organizers Section */}
      <section id="organizers" className="py-20 bg-glass border-t border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Organizers" />
          <div className="flex flex-wrap justify-center gap-8">
            {organizers.map((organizer) => (
              <OrganizerCard key={organizer.name} organizer={organizer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
