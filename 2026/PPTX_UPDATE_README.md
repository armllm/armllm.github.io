# Armenia LLM Summer School 2026 - PowerPoint Updates

## Completed Updates (via `update_pptx.py`)

The following changes have been applied to `Armenia_LLM_Summer_School_2026 (2).pptx`:

### Slide 2 - Armenia Alignment
- Title: "ALIGNMENT WITH ARMENIA'S AI DEVELOPMENT"
- Content: This summer school is in line with current developments in Armenia (compute infrastructure by Firebird, Eleveight and YSU, policies). Armenia aims to grow the number of strong world-class AI researchers by 2032 to reach 200. This school supports this goal by empowering existing researchers and students.

### Slide 4 - Proven Impact (Participation Stats)
- Pie chart: 35 students (45%), 42 industry professionals (55%)
- Added participant statistics and countries: Italy, USA, Russia, Iran, India, Armenia

### Slide 7 - Partners & Collaborations
- Sponsor contribution details: Armenia Fund, Nebius, AI9, AUA, Arcs AI, ASOF, Picsart, Profound Academy
- Collaborations highlights: Martha Hovhannesian (Legal aspects of LLMs), Perouz Taslakian (AI Agents at Yandex Hall), Picsart office tour

### Slide 9 - Budget
- Financial aid data: 35 students (90%), 42 industry professionals (100,000 AMD)
- Budget breakdown: ~15K speaker travel/hotel, 11K online/logistics/coffee/networking
- 80 GPUs (~60K value), 1 GPU per student, speakers no honorarium, AI9 venue contribution

## Manual Steps Required

### Adding Company Logos (Slides 5 & 6)

**Slide 5 - WORLD-CLASS AI EXPERTISE: FEATURED SPEAKERS**
Add small company logos next to each speaker name. Companies needed:
- Perceptron AI, NVIDIA, Google, UMass Amherst, UCL, USC, ServiceNow, MILA, Allen Institute for AI (AI2)

**Slide 6 - THE ORGANIZING TEAM: LEADING THE VISION**
Add small company logos next to each organizer name. Companies needed:
- Perceptron AI, NVIDIA, USC/Amazon, YerevaNN, ServiceNow Research

**How to add logos:**
1. Open the PowerPoint in Google Slides or Microsoft PowerPoint
2. For each name, insert a small image (logo) to the left of the name
3. Resize logos to approximately 24-32px height for consistency
4. Logo files available in repo: `public/images/` (nebius.png, picsart.png, yn_logo.png, etc.)

### Optional: Separate Collaborations Slide

If you prefer a dedicated "Collaborations Highlights" slide instead of the content in Slide 7:
1. Insert a new slide after Slide 7 (Partners)
2. Title: "COLLABORATIONS HIGHLIGHTS"
3. Content: Martha Hovhannesian—Legal aspects of LLMs (post-school talk); Perouz Taslakian—AI Agents lecture at Yandex Hall; Picsart—office tour for participants

## Running the Update Script

```bash
cd /workspace
pip install matplotlib
python 2026/update_pptx.py
```

Output: `2026/Armenia_LLM_Summer_School_2026 (2).pptx`
