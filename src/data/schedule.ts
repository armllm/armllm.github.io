export interface ScheduleDay {
  date: string
  title: string
  emoji: string
  speaker?: string
  description?: string
  isBreak?: boolean
  isHackathon?: boolean
}

export const schedule2024: ScheduleDay[] = [
  {
    date: "July 1-2",
    title: "Intro & Pretraining",
    emoji: "🧠",
    speaker: "Armen Aghajanyan",
    description: "Transformer architecture, self-attention, pre-training, scaling laws"
  },
  {
    date: "July 3",
    title: "Alignment (Part 1)",
    emoji: "🎯",
    speaker: "Jiao Sun, Karen Hambardzumyan",
    description: "Instruction tuning, LIMA, LLM evaluation, efficient fine-tuning"
  },
  {
    date: "July 4",
    title: "Alignment (Part 2)",
    emoji: "🎯",
    speaker: "Jonathan May",
    description: "RLHF, PPO, DPO/CPO"
  },
  {
    date: "July 5",
    title: "Vision LLMs",
    emoji: "👁️",
    speaker: "Alex Andonian, Armen Aghajanyan",
    description: "Vision language modeling, late-fusion and early-fusion approaches"
  },
  {
    date: "July 6",
    title: "Interpretability, Safety & Privacy",
    emoji: "🔒",
    speaker: "Narine Kokhlikyan, Eugene Bagdasaryan",
    description: "Attribution algorithms, Captum, privacy, security, adversarial attacks"
  },
  {
    date: "July 7",
    title: "RAG & Knowledge Graphs",
    emoji: "📚",
    speaker: "Erik Arakelyan, Hrayr Harutyunyan",
    description: "Knowledge graphs, retrieval-augmented generation"
  }
]

export const schedule2025: ScheduleDay[] = [
  {
    date: "July 24",
    title: "Intro to LLMs",
    emoji: "🧠",
    speaker: "Armen Aghajanyan"
  },
  {
    date: "July 25",
    title: "Multi-modal Models",
    emoji: "👁️",
    speaker: "Armen Aghajanyan"
  },
  {
    date: "July 26",
    title: "Post-training",
    emoji: "🎯",
    speaker: "Michael Noukhovitch"
  },
  {
    date: "July 27",
    title: "Sunday Break",
    emoji: "🌅",
    description: "Day off for rest and exploration",
    isBreak: true
  },
  {
    date: "July 28",
    title: "Inference Time Compute / Reasoning",
    emoji: "⚡",
    speaker: "Nouha Dziri"
  },
  {
    date: "July 29",
    title: "Agents & Tool Usage",
    emoji: "🤖",
    speaker: "Alex Drouin"
  },
  {
    date: "July 30",
    title: "Security (Agents & Adversarial)",
    emoji: "🔒",
    speaker: "Gauthier Gidel"
  },
  {
    date: "July 31 - August 1",
    title: "Hackathon",
    emoji: "🚀",
    description: "Apply your knowledge to innovative LLM projects",
    isHackathon: true
  }
]
