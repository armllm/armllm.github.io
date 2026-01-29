import { memo } from 'react'
import EditionLayout from '../components/EditionLayout'
import SEO, { StructuredData } from '../components/SEO'
import { speakers2024 } from '../data/speakers'
import { sponsors2024, hosts2024 } from '../data/sponsors'
import { organizers2024 } from '../data/organizers'
import { schedule2024 } from '../data/schedule'

const Edition2024 = memo(function Edition2024() {
  return (
    <>
      <SEO
        title="2024 Edition"
        description="The inaugural Armenia LLM Summer School (July 1-7, 2024) brought together 70+ students and researchers at the American University of Armenia for an intensive week on Large Language Models."
        url="/2024"
        keywords={['LLM Summer School 2024', 'Armenia AI 2024', 'AUA Summer School', 'Machine Learning Armenia']}
      />
      <StructuredData
        type="Event"
        data={{
          name: 'LLM Summer School 2024',
          description: 'The inaugural Armenia LLM Summer School - an intensive week focused on the fundamentals and applications of large language models.',
          startDate: '2024-07-01',
          endDate: '2024-07-07',
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: {
            '@type': 'Place',
            name: 'American University of Armenia',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '40 M. Baghramyan Avenue',
              addressLocality: 'Yerevan',
              addressCountry: 'Armenia'
            }
          },
          organizer: {
            '@type': 'Organization',
            name: 'Armenia LLM Summer School',
            url: 'https://armllm.github.io'
          },
          image: 'https://armllm.github.io/images/coverllm.png'
        }}
      />
      <EditionLayout
        year={2024}
        dates="July 1-7, 2024"
        location="American University of Armenia, Yerevan"
        description="An immersive educational experience designed to explore the dynamic fields of Large Language Models (LLM) and its variations."
        aboutText={[
          "Welcome to the LLM Armenian Summer School, an immersive educational experience designed to explore the dynamic fields of Large Language Models (LLM) and its variations. This program is tailored for enthusiasts, scholars, and professionals keen to delve into the world of LLM generative approaches and multihop-reasoning, explainability, interpretability, risk assessment, fairness and transparency and retrieval-based approaches in AI-driven content generation.",
          "Our summer school offers a comprehensive curriculum, hands-on projects, and expert-led lectures, providing participants with theoretical knowledge and practical skills."
        ]}
        speakers={speakers2024}
        schedule={schedule2024}
        sponsors={sponsors2024}
        partners={hosts2024}
        organizers={organizers2024}
      />
    </>
  )
})

export default Edition2024
