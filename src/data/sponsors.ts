export interface Sponsor {
  name: string
  logo: string
  url: string
  description?: string
}

export interface Partner {
  name: string
  logo: string
  url: string
  description?: string
}

export const sponsors2024: Sponsor[] = [
  {
    name: "Nebius AI",
    logo: "/images/nebius.png",
    url: "https://nebius.ai/"
  },
  {
    name: "Picsart",
    logo: "/images/picsart.png",
    url: "https://picsart.com/"
  }
]

export const hosts2024: Partner[] = [
  {
    name: "American University of Armenia",
    logo: "/images/aua.png",
    url: "https://aua.am/",
    description: "Venue"
  },
  {
    name: "YerevaNN",
    logo: "/images/yn_logo.png",
    url: "https://yerevann.com/"
  }
]

export const sponsors2025: Sponsor[] = [
  {
    name: "Armenia Fund",
    logo: "/images/Armenia_Fund.png",
    url: "https://www.armeniafund.org/"
  },
  {
    name: "Advanced Research Center for the Sciences and AI",
    logo: "/images/ARCS_ai_logo.png",
    url: "https://www.asof.am/arcs-ai/home"
  }
]

export const partners2025: Partner[] = [
  {
    name: "The Armenian Society of Fellows",
    logo: "/images/ASOF_Logo_alt.svg",
    url: "https://www.asof.am/"
  },
  {
    name: "Nebius AI",
    logo: "/images/nebius.png",
    url: "https://nebius.com/",
    description: "Compute Infrastructure generously provided by"
  },
  {
    name: "Profound",
    logo: "/images/profound.png",
    url: "https://profound.academy/"
  }
]
