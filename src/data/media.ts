export interface MediaItem {
  title: string
  source: string
  url: string
  thumbnail: string
  description?: string
}

export const mediaItems: MediaItem[] = [
  {
    title: "LLM Summer School 2025",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=jXqUkthY_sI",
    thumbnail: "https://img.youtube.com/vi/jXqUkthY_sI/hqdefault.jpg",
    description: "Video coverage of the Armenia LLM Summer School 2025 in Yerevan, Armenia"
  },
  {
    title: "LLM Summer School Highlights",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=wy8eMSnoA2s",
    thumbnail: "https://img.youtube.com/vi/wy8eMSnoA2s/maxresdefault.jpg",
    description: "A video showcase of the Armenia LLM Summer School featuring presentations and collaborative sessions"
  },
  {
    title: "Armenia's First LLM Summer School Launch",
    source: "News.am Tech",
    url: "https://tech.news.am/arm/news/3794/hayastanum-meknarkel-e-mets-lezvakan-modelneri-arajin-amarayin-dprocy.html",
    thumbnail: "https://tech.news.am/static/news/b/2024/07/3794.jpg",
    description: "Coverage of Armenia's first Large Language Model summer school launch"
  },
  {
    title: "LLM Summer School with Impressive Faculty",
    source: "iTel.am",
    url: "http://dev.itel.am/am/news/15435",
    thumbnail: "https://itel.am/datas/znews/big_/2024/07/10/668e2a0d271c42.85868638.jpg",
    description: "LLM summer school featuring impressive faculty and AI trends"
  },
  {
    title: "Perouz Taslakian & Erik Arakelyan: LLM Summer School",
    source: "EVN Report Podcast",
    url: "https://evnreport.com/podcasts/evn-disrupt/perouz-taslakian-erik-arakelyan-llm-summer-school/",
    thumbnail: "https://evnreport.com/wp-content/uploads/2024/07/Perouz-Taslakian-and-Erik-Arakelyan_web.jpg",
    description: "A discussion about the development and goals of the LLM Summer School in Armenia"
  }
]
