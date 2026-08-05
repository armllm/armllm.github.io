export interface Person {
  name: string
  position?: string
  company?: string
  linkedin?: string
  /** Path under /images; falls back to initials when absent. */
  image?: string
}

export const hackathonMentors: Person[] = [
  {
    name: 'Philipp Guevorguian',
    position: 'Technical Staff',
    company: 'Perceptron AI',
    linkedin: 'https://www.linkedin.com/in/philipp-guevorguian/',
    image: '/images/hackathon/philipp-guevorguian.jpg',
  },
  {
    name: 'Aram Shakhbandaryan',
    linkedin: 'https://www.linkedin.com/in/aram-empy/',
    image: '/images/hackathon/aram-shakhbandaryan.jpg',
  },
  {
    name: 'Emil Kapustin',
    position: 'AI Engineer',
    company: 'PulsePoint',
    linkedin: 'https://www.linkedin.com/in/emkapustin/',
    image: '/images/hackathon/emil-kapustin.jpg',
  },
  {
    name: 'Ani Vanyan',
    position: 'ML Researcher',
    company: 'YerevaNN',
    image: '/images/hackathon/ani-vanyan.jpg',
  },
  {
    name: 'Khoren Petrosyan',
    position: 'ML Researcher',
    company: 'YerevaNN',
    linkedin: 'https://www.linkedin.com/in/khoren-petrosyan/',
    image: '/images/hackathon/khoren-petrosyan.jpg',
  },
  {
    name: 'Naré Gevorgyan',
    position: 'CEO',
    company: 'AICA',
    linkedin: 'https://www.linkedin.com/in/nare-gevorgyan/',
    image: '/images/hackathon/nare-gevorgyan.jpg',
  },
  {
    name: 'Marie Mikayelyan',
    position: 'CPO',
    company: 'OmniShift',
    linkedin: 'https://www.linkedin.com/in/marie-mikayelyan/',
    image: '/images/hackathon/marie-mikayelyan.jpg',
  },
  {
    name: 'Armen Grigoryan',
    image: '/images/hackathon/armen-grigoryan.jpg',
  },
  {
    name: 'Hovhannes Kuloghlyan',
    image: '/images/hackathon/hovhannes-kuloghlyan.jpg',
  },
]

export const hackathonJury: Person[] = [
  {
    name: 'Gevorg Mantashyan',
    position: 'First Deputy Minister',
    company: 'Ministry of High-Tech Industry',
    linkedin: 'https://www.linkedin.com/in/gevorg-mantashyan-80643ab/',
    image: '/images/hackathon/gevorg-mantashyan.jpg',
  },
  {
    name: 'Vazgen Hakobjanyan',
    position: 'Founder & CEO',
    company: 'Magical Labs',
    linkedin: 'https://www.linkedin.com/in/vazgen-hakobjanyan-a09ba52/',
    image: '/images/hackathon/vazgen-hakobjanyan.jpg',
  },
  {
    name: 'Perouz Taslakian',
    company: 'ServiceNow Research',
    image: '/images/hackathon/perouz-taslakian.jpg',
  },
  {
    name: 'Erik Arakelyan',
    company: 'NVIDIA',
    image: '/images/hackathon/erik-arakelyan.jpg',
  },
]
