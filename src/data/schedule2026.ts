export interface ScheduleDay {
  date: string
  day: string
  topic: string
  description?: string
  speakers: string[]
}

export const schedule2026: ScheduleDay[] = [
  {
    date: "August 3",
    day: "Day 1",
    topic: "Pre-training & Intro to LLMs",
    description: "Data mixture, scaling laws, MoE, VLM",
    speakers: ["TBD"]
  },
  {
    date: "August 4",
    day: "Day 2",
    topic: "SFT & Reinforcement Learning",
    description: "Supervised fine-tuning, RLHF, alignment",
    speakers: ["Siva Reddy (McGill / Mila)"]
  },
  {
    date: "August 5",
    day: "Day 3",
    topic: "Test-time Scaling",
    description: "Inference optimization, compute-optimal strategies",
    speakers: ["Ivan Mashkov (NVIDIA)"]
  },
  {
    date: "August 6",
    day: "Day 4",
    topic: "Agents & Reasoning",
    description: "Tool usage, agentic workflows, reasoning capabilities",
    speakers: ["TBD"]
  },
  {
    date: "August 7",
    day: "Day 5",
    topic: "Advanced Topics",
    description: "Context management, VLA/Robotics, or World Models",
    speakers: ["TBD"]
  }
]
