export interface Person {
  name: string
  position?: string
  company?: string
  /** e.g. "Technical mentor", "Product mentor" — omitted when not specified. */
  role?: string
  linkedin?: string
  /** Path under /images once a photo is available; falls back to initials. */
  image?: string
}

export const hackathonMentors: Person[] = [
  {
    name: 'Philipp Guevorguian',
    position: 'Technical Staff',
    company: 'Perceptron AI',
    role: 'Technical mentor',
    linkedin: 'https://www.linkedin.com/in/philipp-guevorguian/',
  },
  {
    name: 'Aram Shakhbandaryan',
    role: 'Technical mentor',
    linkedin: 'https://www.linkedin.com/in/aram-empy/',
  },
  {
    name: 'Emil Kapustin',
    position: 'AI Engineer',
    company: 'PulsePoint',
    linkedin: 'https://www.linkedin.com/in/emkapustin/',
  },
  {
    name: 'Ani Vanyan',
    position: 'ML Researcher',
    company: 'YerevaNN',
    role: 'Technical mentor',
  },
  {
    name: 'Khoren Petrosyan',
    position: 'ML Researcher',
    company: 'YerevaNN',
    role: 'Technical mentor',
    linkedin: 'https://www.linkedin.com/in/khoren-petrosyan/',
  },
  {
    name: 'Nare Gevorgyan',
    position: 'CEO',
    company: 'AICA',
    role: 'Product mentor',
    linkedin: 'https://www.linkedin.com/in/nare-gevorgyan/',
  },
  {
    name: 'Marie Mikayelyan',
    position: 'CPO',
    company: 'OmniShift',
    role: 'Product mentor',
    linkedin: 'https://www.linkedin.com/in/marie-mikayelyan/',
  },
]

export const hackathonJury: Person[] = [
  {
    name: 'Gevorg Mantashyan',
    position: 'First Deputy Minister',
    company: 'Ministry of High-Tech Industry',
    linkedin: 'https://www.linkedin.com/in/gevorg-mantashyan-80643ab/',
  },
  {
    name: 'Vazgen Hakobjanyan',
    position: 'Founder & CEO',
    company: 'Magical Labs',
    linkedin: 'https://www.linkedin.com/in/vazgen-hakobjanyan-a09ba52/',
  },
  {
    name: 'Perouz Tslakian',
  },
]
