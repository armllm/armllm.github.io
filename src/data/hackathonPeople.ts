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
    position: 'Founder',
    company: 'Empy.ai',
    linkedin: 'https://www.linkedin.com/in/aram-empy/',
    image: '/images/hackathon/aram-shakhbandaryan.jpg',
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
    name: 'Hovhannes Kuloghlyan',
    position: 'Co-Founder',
    company: 'Wirestock',
    linkedin: 'https://www.linkedin.com/in/h0vhannes/',
    image: '/images/hackathon/hovhannes-kuloghlyan.jpg',
  },
  {
    name: 'Armen Grigoryan',
    position: 'Head of TV & Digital Products Division',
    company: 'Ucom',
    linkedin: 'https://www.linkedin.com/in/grigsarmen/',
    image: '/images/hackathon/armen-grigoryan.jpg',
  },
  {
    name: 'Khachik Badeyan',
    position: 'Technical Portfolio Lead',
    company: 'PMI Science Armenia',
    linkedin: 'https://www.linkedin.com/in/khbadeyan/',
    image: '/images/hackathon/khachik-badeyan.jpg',
  },
  {
    name: 'Gevorg Minasyan',
    company: 'Async',
    linkedin: 'https://www.linkedin.com/in/gevorg-minasyan-42475a132/',
    image: '/images/hackathon/gevorg-minasyan.jpg',
  },
  {
    name: 'Davit Karamyan',
    company: 'NVIDIA',
    linkedin: 'https://www.linkedin.com/in/davit-karamyan-62790b139/',
    image: '/images/hackathon/davit-karamyan.jpg',
  },
  {
    name: 'Tigran Atoyan',
    position: 'Founder & AI Researcher',
    image: '/images/hackathon/tigran-atoyan.jpg',
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
    name: 'David Zokhrabyan',
    position: 'Growth',
    company: 'OpenAI',
    linkedin: 'https://www.linkedin.com/in/davidzokhrabyan/',
    image: '/images/hackathon/david-zokhrabyan.jpg',
  },
  {
    name: 'Davit Arakelyan',
    position: 'Chief Business Officer',
    company: 'Eleveight AI',
    linkedin: 'https://www.linkedin.com/in/davit-arakelyan-320007184/',
    image: '/images/hackathon/davit-arakelyan.jpg',
  },
  {
    name: 'Perouz Taslakian',
    position: 'AI Research Scientist / Research Lead',
    company: 'ServiceNow AI Research',
    linkedin: 'https://www.linkedin.com/in/perouz/',
    image: '/images/hackathon/perouz-taslakian.jpg',
  },
  {
    name: 'Arik Akhverdyan',
    position: 'Co-Founder & CEO',
    company: 'AI9',
    linkedin: 'https://www.linkedin.com/in/arik-akverdian/',
    image: '/images/hackathon/arik-akhverdyan.jpg',
  },
  {
    name: 'Vazgen Hakobjanyan',
    position: 'Founder & CEO',
    company: 'Magical Labs',
    linkedin: 'https://www.linkedin.com/in/vazgen-hakobjanyan-a09ba52/',
    image: '/images/hackathon/vazgen-hakobjanyan.jpg',
  },
  {
    name: 'Vazgen Badalyan',
    position: 'Founder',
    company: 'Evidenso',
    image: '/images/hackathon/vazgen-badalyan.jpg',
  },
]

export const hackathonOrganizers: Person[] = [
  {
    name: 'Armen Aghajanyan',
    company: 'Perceptron AI',
    image: '/images/hackathon/armen-aghajanyan.jpg',
  },
  {
    name: 'Aram Galstyan',
    company: 'USC / Amazon',
    image: '/images/hackathon/aram-galstyan.jpg',
  },
  {
    name: 'Erik Arakelyan',
    position: 'Senior Researcher',
    company: 'NVIDIA Armenia',
    linkedin: 'https://www.linkedin.com/in/erik-arakelyan-a6a84470/',
    image: '/images/hackathon/erik-arakelyan.jpg',
  },
  {
    name: 'Hrant Khachatryan',
    position: 'Founding Director',
    company: 'YerevaNN',
    linkedin: 'https://www.linkedin.com/in/hrant-khachatrian-b97425206/',
    image: '/images/hackathon/hrant-khachatryan.jpg',
  },
  {
    name: 'Perouz Taslakian',
    position: 'AI Research Scientist / Research Lead',
    company: 'ServiceNow AI Research',
    linkedin: 'https://www.linkedin.com/in/perouz/',
    image: '/images/hackathon/perouz-taslakian.jpg',
  },
  {
    name: 'Tatev Vardanyan',
    company: 'YerevaNN',
    image: '/images/hackathon/tatev-vardanyan.jpg',
  },
  {
    name: 'Arik Akhverdyan',
    position: 'Co-Founder & CEO',
    company: 'AI9',
    linkedin: 'https://www.linkedin.com/in/arik-akverdian/',
    image: '/images/hackathon/arik-akhverdyan.jpg',
  },
]
