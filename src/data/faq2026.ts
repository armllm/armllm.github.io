export interface FAQItem {
  question: string
  answer: string
}

export interface FAQCategory {
  title: string
  items: FAQItem[]
}

export const faq2026: FAQCategory[] = [
  {
    title: "Program overview",
    items: [
      {
        question: "When and where is the summer school happening?",
        answer: "The 2026 school is scheduled for <strong>August 3–7, 2026</strong> at the <strong>AI9 Startup Campus</strong> (9 Isahakyan St, Yerevan, Armenia)."
      },
      {
        question: "Is there an online option?",
        answer: "Yes. We offer an online track via Zoom. This covers all the theoretical sessions. Online participants typically do not get access to GPU resources."
      },
      {
        question: "Will there be a hackathon?",
        answer: "Yes. The hackathon starts on <strong>August 8 at 00:00</strong> and runs for a full <strong>24-hour hack day</strong>. It is organized by <strong>AI9</strong>, and Armenia LLM Summer School is a co-organizer for hackathon content."
      },
      {
        question: "How do I register for the hackathon?",
        answer: "There will be a separate registration for participation in the hackathon. The hackathon is organized by <strong>AI9</strong>, while <strong>Armenia LLM Summer School</strong> is a co-organizer for hackathon content."
      },
      {
        question: "What should I bring?",
        answer: "A <strong>laptop</strong> is a must-have. All hands-on and practical sessions require you to have your own machine."
      },
      {
        question: "Do I need a powerful computer?",
        answer: "If you attend in person, we provide GPU resources for the heavy lifting. You just need a reliable laptop to connect and code. Online participants generally do not have access to these shared GPU resources."
      },
      {
        question: "Do you provide housing or food?",
        answer: "We do not provide accommodation directly, but we usually recommend the <strong>Yerevan State University guesthouse</strong>. For food, we provide coffee and snacks during breaks; you handle your own lunch and dinner."
      },
      {
        question: "How do we stay updated during the school?",
        answer: "Once you are confirmed, you will get an invite to our <strong>Slack</strong> channel, where we post the agenda, links, and updates."
      }
    ]
  },
  {
    title: "Eligibility & technical background",
    items: [
      {
        question: "Who should apply?",
        answer: "The program is designed for motivated learners in AI, including students, researchers, and engineers."
      },
      {
        question: "Do I need prior LLM experience?",
        answer: "You do not need to be an expert in training LLMs, however we do expect that you have an understanding of neural networks, large language model architectures, and some hands-on experience training machine learning models."
      },
      {
        question: "Do I need Python experience?",
        answer: "Python proficiency is expected and is asked in the application form."
      }
    ]
  },
  {
    title: "Application & selection",
    items: [
      {
        question: "How are applicants selected?",
        answer: "Selection is competitive and follows a two-stage process: (1) initial application form and (2) technical assessment."
      },
      {
        question: "What information do I need for registration?",
        answer: "The form asks for personal/contact details, location, affiliation, experience with ML and LLMs, Python proficiency, and a motivation paragraph (~100 words). You may also provide links (e.g., GitHub, Google Scholar)."
      },
      {
        question: "What files do I need to upload?",
        answer: "You must upload your CV/resume (1 file, up to 10 MB)."
      },
      {
        question: "What is the application timeline for 2026?",
        answer: "<ul><li><strong>Stage 1:</strong> submit the form and CV by <strong>May 15, 2026</strong>.</li><li><strong>Stage 2:</strong> monitor email for a test link on <strong>May 28, 2026</strong>.</li><li><strong>Answers:</strong> expect to receive an answer by <strong>June 5</strong>.</li></ul>"
      },
      {
        question: "What if I do not receive the technical test link?",
        answer: "Contact the organizers at <a href=\"mailto:armeniallm@gmail.com\" class=\"text-white/90 underline\">armeniallm@gmail.com</a>."
      },
      {
        question: "Is there a waitlist?",
        answer: "Capacity is limited and selection is competitive. If in-person spots open, we may contact waitlisted applicants; in some cases, online participation may be offered."
      },
      {
        question: "Can international applicants register?",
        answer: "Yes. International applicants are welcome; payment and logistics instructions are shared after acceptance."
      }
    ]
  },
  {
    title: "Fees, financial aid & payments",
    items: [
      {
        question: "How much does the program cost?",
        answer: "<ul><li><strong>In-person:</strong> 120,000 AMD (or equivalent). Covers theoretical + practical sessions and includes GPU access.</li><li><strong>Online:</strong> $200 (or equivalent). Covers theoretical sessions; aid is distributed based on funding available.</li></ul>"
      },
      {
        question: "Is there financial aid for students?",
        answer: "<ul><li><strong>Student waivers:</strong> up to <strong>90%</strong> of the fee.</li><li><strong>International/exceptional applicants:</strong> depending on budget, we may offer waivers (50% to full scholarships) to non-student applicants with exceptional backgrounds.</li></ul>"
      },
      {
        question: "Can I apply for financial aid during registration?",
        answer: "Yes. The application form includes a direct question asking whether you are applying for financial aid."
      },
      {
        question: "How do I pay if I am an international applicant?",
        answer: "International bank transfers. If those do not work for you, let us know if you are stuck."
      },
      {
        question: "Can my company pay for me?",
        answer: "Yes. We can issue a <strong>prepayment invoice</strong> for your employer and provide an official tax invoice after the program ends for reimbursement."
      },
      {
        question: "Will I get payment documents for my university or employer?",
        answer: "Yes. If needed, we can provide prepayment and/or tax invoice documents for reimbursement workflows."
      }
    ]
  },
  {
    title: "Participation, certification & policies",
    items: [
      {
        question: "Will I get a certificate?",
        answer: "Yes. Everyone who fully attends the sessions, whether in-person or online, receives an official <strong>Certificate of Participation</strong>."
      },
      {
        question: "Can I get a refund if I cannot attend?",
        answer: "If you let us know early enough, we can usually issue a refund so we can offer your spot to someone on the waitlist."
      }
    ]
  }
]
