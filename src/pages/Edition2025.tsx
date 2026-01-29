import { memo } from 'react'
import EditionLayout from '../components/EditionLayout'
import SEO, { StructuredData } from '../components/SEO'
import { speakers2025 } from '../data/speakers'
import { sponsors2025, partners2025 } from '../data/sponsors'
import { organizers2025 } from '../data/organizers'
import { schedule2025 } from '../data/schedule'

const Edition2025 = memo(function Edition2025() {
  return (
    <>
      <SEO
        title="2025 Edition"
        description="LLM Summer School 2025 (July 24-30) at AI9, Yerevan - An intensive program exploring latest LLM advancements with world-class speakers, followed by a 2-day hackathon."
        url="/2025"
        keywords={['LLM Summer School 2025', 'Armenia AI 2025', 'LLM Hackathon', 'AI Summer School Yerevan']}
      />
      <StructuredData
        type="Event"
        data={{
          name: 'LLM Summer School 2025',
          description: 'The 2nd edition of the LLM Summer School in Armenia - an intensive program for students and researchers exploring the latest advancements in Large Language Models.',
          startDate: '2025-07-24',
          endDate: '2025-07-30',
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: {
            '@type': 'Place',
            name: 'AI9',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Yerevan',
              addressCountry: 'Armenia'
            }
          },
          organizer: {
            '@type': 'Organization',
            name: 'Armenia LLM Summer School',
            url: 'https://armllm.github.io'
          },
          image: 'https://armllm.github.io/images/coverllm.png',
          offers: {
            '@type': 'Offer',
            price: '100000',
            priceCurrency: 'AMD',
            availability: 'https://schema.org/InStock',
            validFrom: '2025-01-01'
          }
        }}
      />
      <EditionLayout
        year={2025}
        dates="July 24-30, 2025"
        location="AI9, Yerevan, Armenia"
        locationUrl="https://yandex.com/maps/-/CHRKIYK2"
        description="An intensive program for students and researchers exploring the latest advancements in Large Language Models, followed by a 2-day hackathon"
        aboutText={[
          "The 2nd edition of the LLM Summer School in Armenia is an annual event dedicated to exploring the latest advancements in Large Language Models (LLMs). Scheduled from July 24 to July 30, 2025, at AI9 in Yerevan, Armenia, the event will feature a comprehensive program including lectures, workshops, and a hackathon where participants can apply their knowledge to innovative projects. Additionally, a hackathon is planned for July 31 to August 1, 2025.",
          "The Summer School targets senior undergraduate and graduate students, pre-doctoral students, and researchers from academia and industry, both locally and internationally. We anticipate over 70 participants."
        ]}
        speakers={speakers2025}
        schedule={schedule2025}
        sponsors={sponsors2025}
        partners={partners2025}
        organizers={organizers2025}
        applyUrl="https://forms.gle/poTtSxhFf2QojAm87"
        feeWaiverUrl="https://forms.gle/Y1pDQqcticvNB7Zr9"
        registrationFee="100,000 AMD"
        applicationDeadline="May 19, 2025"
        notificationDate="June 9, 2025"
      />
    </>
  )
})

export default Edition2025
