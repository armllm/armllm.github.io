# Hack Armenia — kickoff slide deck generator (16:9, HTML -> PDF)
#
# Edit the data below, then:
#   python3 build_hack_armenia_slides.py            # writes hack-armenia-slides.html
#   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
#     --headless=new --no-pdf-header-footer \
#     --print-to-pdf=Hack-Armenia-Slides.pdf \
#     file://$PWD/hack-armenia-slides.html
#
# Slides are 1280x720 px (13.333in x 7.5in = standard 16:9).

import base64, os

IMG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "images")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "hack-armenia-slides.html")


def uri(fn):
    p = os.path.join(IMG, fn)
    ext = fn.rsplit(".", 1)[-1].lower()
    mime = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg", "svg": "image/svg+xml"}[ext]
    with open(p, "rb") as f:
        return f"data:{mime};base64," + base64.b64encode(f.read()).decode()


# ----------------------------------------------------------------- content ---

EVENT = {
    "dates": "August 8–9, 2026",
    "venue": "AI9 Startup Campus · Yerevan",
    "kickoff": "Saturday 10:00",
    "demo": "Sunday 13:00",
}

NUMBERS = [
    ("24h", "of building", "Sat 10:00 → Sun"),
    ("60–80", "participants", "one cohort"),
    ("15–20", "teams", "3–4 people each"),
    ("9", "mentors", "on-site Saturday"),
    ("8", "jury members", "judging Demo Day"),
    ("9", "domains", "Armenia's public interest"),
]

DOMAINS = [
    ("🏙️", "Urban development", "City ops, planning & mobility"),
    ("🏛️", "Public systems & policy", "Filings, evidence & transparency"),
    ("🩺", "Healthcare", "Safe triage, admin & patient education"),
    ("🎓", "Education", "Tutoring, grading & Armenian-language learning"),
    ("🔒", "Security", "Phishing defense, secure code & threat triage"),
    ("🍎", "Food & agriculture", "Crop advisory, food safety & nutrition"),
    ("🌱", "Environment & energy", "Efficiency, hazards & resources"),
    ("🏦", "Finance & fintech", "Fair credit, fraud & literacy"),
    ("🚨", "Emergency & disaster", "Coordination, preparedness & response"),
]

EXAMPLES = [
    ("🏛️", "SME tax-filing copilot", "Walk a small business through declarations; extract figures from receipts and pre-fill the forms."),
    ("🩺", "Guarded symptom triage", "Route symptoms to the right level of care in Armenian — with hard safety rails. Not diagnosis."),
    ("🎓", "Auto-grading assistant", "Grade short answers against a rubric, write feedback, and flag borderline cases for the teacher."),
    ("🔒", "Phishing & scam detector", "Catch bank-impersonation SMS and fake government notices aimed at Armenian users."),
    ("🍎", "Crop advisory agent (VLM)", "Diagnose plant disease from a photo and advise on treatment and timing, in Armenian."),
    ("🚨", "Response coordination agent", "Turn chaotic incoming incident reports into a de-duplicated, prioritised response picture."),
]

RULES = [
    ("🧠", "Any model or API", "Open or closed, local or hosted. Bring your own keys where you can."),
    ("🔓", "Open source required", "Projects must be open source and fully reproducible. No closed black boxes."),
    ("🇦🇲", "Armenian encouraged", "Not required, but Armenian-language support is a real plus."),
    ("🗂️", "Use real data", "Anything publicly available, or data we provide before or during the event."),
    ("👥", "Teams of 3–4", "Form your team at kickoff. 15–20 teams in total."),
    ("⚖️", "Build it here", "Come with ideas, not with a finished codebase. The work happens during the sprint."),
]

SCHEDULE = [
    ("Sat 10:00", "Kickoff & briefing", "Welcome, theme walkthrough, logistics."),
    ("Sat 11:00", "Teams form & plan", "Form a team of 3–4, scope your problem and data."),
    ("Sat 15:00–18:00", "Mentors on-site", "Mentors available in the room — flexible, drop in any time."),
    ("Sat → Sun", "Build", "Prototype end-to-end early, then harden and evaluate."),
    ("Sun 12:00", "Code freeze", "Lock the repo, prepare your talk and demo."),
    ("Sun 13:00", "Demo Day", "5-minute pitches to the jury."),
    ("After demos", "Awards", "The jury names the winners."),
]

SUBMISSION = [
    ("🎬", "Working demo", "It has to run. A rough end-to-end demo beats a polished deck."),
    ("📦", "Artifact", "A repo with reproducible code — plus an app link if you have one."),
    ("📊", "Evaluation", "A test set, rubric, examples, or benchmark — with numbers."),
    ("🎯", "Impact note", "Who uses it, and what changes if it works."),
]

JUDGING = [
    ("Idea quality & fit", "Does it target a real Armenian public-interest problem worth solving?"),
    ("Evaluation & evidence", "Did you actually test the system and show results — not just assert them?"),
    ("Model limits & safety", "Do you know where the model fails, and how you mitigate it?"),
    ("Real-world plausibility", "Could this work outside the demo — realistic data, reproducible, deployable?"),
]

JUDGES_LOOK_FOR = [
    ("A working prototype", "Judges want to see it run, not just slides."),
    ("An evaluation method", "Even lightweight. “It seems to work” is not evidence."),
    ("Failure modes & safety", "Name where it breaks and who it could harm. Show your guardrails."),
    ("Realistic data", "Toy data that ignores messy reality will not convince."),
    ("The LLM earns its place", "If a regex or a plain form would do the job, use that instead."),
]

MENTORS = [
    ("Philipp Guevorguian", "Technical Staff · Perceptron AI", "philipp-guevorguian.jpg"),
    ("Aram Shakhbandaryan", "Founder · Empy.ai", "aram-shakhbandaryan.jpg"),
    ("Ani Vanyan", "ML Researcher · YerevaNN", "ani-vanyan.jpg"),
    ("Khoren Petrosyan", "ML Researcher · YerevaNN", "khoren-petrosyan.jpg"),
    ("Naré Gevorgyan", "CEO · AICA", "nare-gevorgyan.jpg"),
    ("Marie Mikayelyan", "CPO · OmniShift", "marie-mikayelyan.jpg"),
    ("Hovhannes Kuloghlyan", "Co-Founder · Wirestock", "hovhannes-kuloghlyan.jpg"),
    ("Armen Grigoryan", "Head of TV & Digital Products · Ucom", "armen-grigoryan.jpg"),
    ("Khachik Badeyan", "Technical Portfolio Lead · PMI Science Armenia", "khachik-badeyan.jpg"),
]

JURY = [
    ("Gevorg Mantashyan", "First Deputy Minister · Ministry of High-Tech Industry", "gevorg-mantashyan.jpg"),
    ("David Zokhrabyan", "Growth · OpenAI", "david-zokhrabyan.jpg"),
    ("Davit Arakelyan", "Chief Business Officer · Eleveight AI", "davit-arakelyan.jpg"),
    ("Perouz Taslakian", "AI Research Scientist / Research Lead · ServiceNow AI Research", "perouz-taslakian.jpg"),
    ("Arik Akhverdyan", "Co-Founder & CEO · AI9", "arik-akhverdyan.jpg"),
    ("Vazgen Hakobjanyan", "Founder & CEO · Magical Labs", "vazgen-hakobjanyan.jpg"),
    ("Erik Arakelyan", "Senior Researcher · NVIDIA Armenia", "erik-arakelyan.jpg"),
    ("Hrant Khachatryan", "Founding Director · YerevaNN", "hrant-khachatryan.jpg"),
]

# --------------------------------------------------------------------- css ---

CSS = """
*{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important}
html,body{font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f8fafc;background:#0a0e1a}
@page{size:13.333in 7.5in;margin:0}
.slide{position:relative;width:1280px;height:720px;overflow:hidden;page-break-after:always;
 display:flex;flex-direction:column;padding:56px 64px 60px;
 background:radial-gradient(900px 500px at 12% -10%,rgba(99,102,241,.30),transparent 60%),
 radial-gradient(800px 600px at 108% 12%,rgba(167,139,250,.24),transparent 55%),
 linear-gradient(160deg,#0a0e1a 0%,#0b1022 55%,#0a0e1a 100%)}
.slide:last-child{page-break-after:auto}
.center{justify-content:center;align-items:center;text-align:center}
h1{font-size:88px;font-weight:900;letter-spacing:-2px;line-height:1;
 background:linear-gradient(90deg,#c7d2fe,#a78bfa 55%,#818cf8);-webkit-background-clip:text;background-clip:text;color:transparent}
h2{font-size:46px;font-weight:900;letter-spacing:-1px;color:#fff;line-height:1.1}
h2 .ac{color:#a78bfa}
.kicker{display:inline-block;font-size:13px;font-weight:800;letter-spacing:3px;text-transform:uppercase;
 color:#c7d2fe;background:rgba(129,140,248,.15);border:1px solid rgba(129,140,248,.45);padding:7px 16px;border-radius:999px}
.sub{color:rgba(255,255,255,.72);font-size:20px;line-height:1.5;margin-top:14px}
.rule{height:1px;background:linear-gradient(90deg,rgba(255,255,255,.20),transparent);margin:20px 0 26px}
.foot{position:absolute;left:64px;right:64px;bottom:22px;display:flex;justify-content:space-between;align-items:center;
 font-size:12px;color:rgba(255,255,255,.42);font-weight:600}
.pg{font-variant-numeric:tabular-nums}
.body{flex:1;display:flex;flex-direction:column;justify-content:center}
/* logo chips */
.chips{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
.chip{background:#fff;border-radius:12px;padding:10px 16px;height:58px;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(0,0,0,.4)}
.chip img{max-height:34px;max-width:150px;object-fit:contain}
.chip-sm{height:42px;padding:7px 12px}.chip-sm img{max-height:26px;max-width:110px}
/* number tiles */
.nums{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.num{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:22px 24px}
.num-v{font-size:52px;font-weight:900;letter-spacing:-2px;line-height:1;color:#fff}
.num-l{font-size:17px;font-weight:700;color:#e2e8f0;margin-top:10px}
.num-s{font-size:13px;color:rgba(255,255,255,.55);margin-top:3px}
/* generic cards */
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.card{background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:20px 22px}
.card-i{font-size:28px;line-height:1}
.card-t{font-size:19px;font-weight:800;color:#fff;margin:10px 0 6px}
.card-b{font-size:14.5px;color:rgba(255,255,255,.72);line-height:1.5}
.dom-n{font-size:17px;font-weight:800;color:#fff}
.dom-d{font-size:13px;color:rgba(255,255,255,.62);margin-top:4px;line-height:1.4}
/* schedule */
.sched{display:flex;flex-direction:column;gap:8px}
.row{display:flex;gap:20px;align-items:flex-start;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:10px 18px}
.row.hi{background:rgba(129,140,248,.14);border-color:rgba(129,140,248,.5)}
.row-w{width:170px;flex-shrink:0;color:#a78bfa;font-weight:800;font-size:15px;padding-top:1px}
.row-t{font-size:16.5px;font-weight:800;color:#fff}
.row-b{font-size:13px;color:rgba(255,255,255,.66);margin-top:1px}
/* people */
.people{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}
.person{display:flex;flex-direction:column;align-items:center;text-align:center;
 background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:16px 10px}
.person img{width:92px;height:92px;border-radius:50%;object-fit:cover;border:2px solid rgba(167,139,250,.6)}
.person-n{font-size:14.5px;font-weight:800;color:#fff;margin-top:10px;line-height:1.2}
.person-a{font-size:11.5px;color:rgba(255,255,255,.62);margin-top:4px;line-height:1.35}
/* pitch */
.pitch{display:flex;gap:18px;align-items:stretch}
.pitch-part{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:24px 26px}
.pitch-h{font-size:26px;font-weight:900;color:#a78bfa}
.bar{height:14px;border-radius:999px;background:rgba(255,255,255,.08);display:flex;overflow:hidden;margin-top:16px}
.bar span{display:block;height:100%}
/* prizes */
.prizes{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.prize{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.14);border-radius:18px;padding:26px 22px;text-align:center}
.prize.gold{border-color:rgba(253,230,138,.55);background:rgba(253,230,138,.10)}
.prize-p{font-size:44px;line-height:1}
.prize-t{font-size:22px;font-weight:900;color:#fff;margin-top:10px}
.prize-s{font-size:14px;color:rgba(255,255,255,.7);margin-top:6px}
.byline{display:inline-block;margin-top:12px;font-size:12.5px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;
 color:#c7d2fe;background:rgba(129,140,248,.16);border:1px solid rgba(129,140,248,.45);padding:5px 12px;border-radius:999px}
.special{margin-top:20px;background:rgba(167,139,250,.12);border:1px solid rgba(167,139,250,.45);border-radius:16px;padding:20px 26px;display:flex;align-items:center;gap:18px}
.list{display:flex;flex-direction:column;gap:12px}
.li{display:flex;gap:14px;align-items:flex-start;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.11);border-radius:14px;padding:15px 20px}
.li-n{width:30px;height:30px;flex-shrink:0;border-radius:9px;background:linear-gradient(135deg,#6366f1,#a78bfa);
 display:flex;align-items:center;justify-content:center;font-weight:900;font-size:15px;color:#fff}
.li-t{font-size:17px;font-weight:800;color:#fff}
.li-b{font-size:14px;color:rgba(255,255,255,.7);margin-top:2px}
.big{font-size:34px;font-weight:900;color:#fff;line-height:1.25}
.note{font-size:14px;color:rgba(255,255,255,.55);margin-top:14px}
"""

# ------------------------------------------------------------------ slides ---

ORG_CHIPS = (
    f'<div class="chip"><img src="{uri("logo_armllm_bg_removed.png")}" alt="ARMLLM"/></div>'
    f'<div class="chip"><img src="{uri("ai9-square.svg")}" alt="AI9"/></div>'
    f'<div class="chip"><img src="{uri("yn_logo.png")}" alt="YerevaNN"/></div>'
)
ORG_CHIPS_SM = ORG_CHIPS.replace('class="chip"', 'class="chip chip-sm"')

slides = []


def slide(inner, cls="", foot=True):
    slides.append((inner, cls, foot))


# 1 — title
slide(f'''
<div class="body center">
  <img src="{uri('logo_armllm_bg_removed.png')}" style="width:120px;filter:drop-shadow(0 0 22px rgba(129,140,248,.6))"/>
  <div style="margin-top:22px"><span class="kicker">24-hour LLM build sprint</span></div>
  <h1 style="margin-top:18px">Hack Armenia</h1>
  <div class="sub" style="font-size:24px;color:#e9ecff;max-width:820px">
    Build an LLM system that can <b>evaluate</b> evidence, <b>reason</b> under uncertainty,
    and <b>generalize</b> — for Armenia's public interest.
  </div>
  <div style="margin-top:22px;font-size:17px;color:#a78bfa;font-weight:700">
    {EVENT["dates"]} &nbsp;·&nbsp; {EVENT["venue"]}
  </div>
  <div class="chips" style="margin-top:30px;justify-content:center">{ORG_CHIPS}</div>
</div>''', cls="center", foot=False)

# 2 — welcome
slide(f'''
<h2>Welcome to <span class="ac">Hack Armenia</span></h2>
<div class="rule"></div>
<div class="body">
  <div class="big" style="max-width:1000px">
    One weekend. One theme. A working LLM system that actually does something
    useful for Armenia — and evidence that it works.
  </div>
  <div class="grid3" style="margin-top:34px">
    <div class="card"><div class="card-i">🏗️</div><div class="card-t">Build</div>
      <div class="card-b">24 hours to go from idea to a running prototype, with mentors in the room.</div></div>
    <div class="card"><div class="card-i">📊</div><div class="card-t">Measure</div>
      <div class="card-b">Show numbers. An evaluation — even a lightweight one — is what separates the top teams.</div></div>
    <div class="card"><div class="card-i">🎤</div><div class="card-t">Pitch</div>
      <div class="card-b">5 minutes in front of an expert jury on Sunday. Talk plus live demo.</div></div>
  </div>
</div>''')

# 3 — numbers
nums = "".join(f'<div class="num"><div class="num-v">{v}</div><div class="num-l">{l}</div><div class="num-s">{s}</div></div>'
               for v, l, s in NUMBERS)
slide(f'''
<h2>The sprint in <span class="ac">numbers</span></h2>
<div class="rule"></div>
<div class="body"><div class="nums">{nums}</div></div>''')

# 4 — the theme
slide(f'''
<h2>The theme: <span class="ac">Armenia's public interest</span></h2>
<div class="rule"></div>
<div class="body">
  <div class="big" style="max-width:1020px">
    Nothing is revealed at kickoff — the theme <i>is</i> the brief. Pick a real problem
    that matters here, and build for it.
  </div>
  <div class="grid3" style="margin-top:34px">
    <div class="card"><div class="card-t">Evaluate</div>
      <div class="card-b">Weigh evidence and cite what it is grounded in.</div></div>
    <div class="card"><div class="card-t">Reason</div>
      <div class="card-b">Work through uncertainty instead of guessing confidently.</div></div>
    <div class="card"><div class="card-t">Generalize</div>
      <div class="card-b">Hold up across real cases, not just your happy path.</div></div>
  </div>
  <div class="note">The domains and example projects that follow are there to guide you — bring your own idea in the same spirit.</div>
</div>''')

# 5 — domains
doms = "".join(f'<div class="card" style="padding:16px 18px"><div style="display:flex;gap:12px;align-items:flex-start">'
               f'<div class="card-i" style="font-size:24px">{i}</div><div><div class="dom-n">{n}</div>'
               f'<div class="dom-d">{d}</div></div></div></div>' for i, n, d in DOMAINS)
slide(f'''
<h2>Nine <span class="ac">public-interest domains</span></h2>
<div class="sub" style="font-size:17px;margin-top:8px">Where LLMs can be genuinely useful to Armenia. Choose one — or bring your own.</div>
<div class="rule" style="margin:16px 0 20px"></div>
<div class="body"><div class="grid3">{doms}</div></div>''')

# 6 — example projects
exs = "".join(f'<div class="card"><div class="card-i">{i}</div><div class="card-t">{t}</div>'
              f'<div class="card-b">{b}</div></div>' for i, t, b in EXAMPLES)
slide(f'''
<h2>Example <span class="ac">projects</span></h2>
<div class="sub" style="font-size:17px;margin-top:8px">Starting points, not requirements. Full list on the website.</div>
<div class="rule" style="margin:16px 0 20px"></div>
<div class="body"><div class="grid3">{exs}</div></div>''')

# 7 — rules
rules = "".join(f'<div class="card"><div class="card-i">{i}</div><div class="card-t">{t}</div>'
                f'<div class="card-b">{b}</div></div>' for i, t, b in RULES)
slide(f'''
<h2>Rules <span class="ac">& tools</span></h2>
<div class="rule"></div>
<div class="body"><div class="grid3">{rules}</div></div>''')

# 8 — schedule
rows = "".join(f'<div class="row{" hi" if "Mentors" in t or "Demo Day" in t else ""}">'
               f'<div class="row-w">{w}</div><div><div class="row-t">{t}</div>'
               f'<div class="row-b">{b}</div></div></div>' for w, t, b in SCHEDULE)
slide(f'''
<h2>The <span class="ac">24 hours</span></h2>
<div class="rule" style="margin:16px 0 18px"></div>
<div class="body"><div class="sched">{rows}</div></div>''')

# 9 — mentors
mentors = "".join(f'<div class="person"><img src="{uri("hackathon/" + f)}" alt="{n}"/>'
                  f'<div class="person-n">{n}</div><div class="person-a">{a}</div></div>' for n, a, f in MENTORS)
slide(f'''
<h2>Your <span class="ac">mentors</span></h2>
<div class="sub" style="font-size:17px;margin-top:8px">On-site <b style="color:#a78bfa">Saturday 15:00–18:00</b> — flexible, drop in any time.</div>
<div class="rule" style="margin:16px 0 20px"></div>
<div class="body"><div class="people">{mentors}</div></div>''')

# 10 — how to use mentors
slide(f'''
<h2>How to use your <span class="ac">mentors</span></h2>
<div class="rule"></div>
<div class="body">
  <div class="grid2">
    <div class="card"><div class="card-t">Come with a specific question</div>
      <div class="card-b">“Is this evaluation sound?” beats “what do you think of our idea?”. Mentors are most useful once you have something concrete.</div></div>
    <div class="card"><div class="card-t">Show them something running</div>
      <div class="card-b">Even a broken prototype gives a mentor more to work with than a slide.</div></div>
    <div class="card"><div class="card-t">Ask about scope</div>
      <div class="card-b">The most common 24-hour failure is building too much. Mentors will help you cut.</div></div>
    <div class="card"><div class="card-t">Product and technical both</div>
      <div class="card-b">Some mentors will push on your model and evaluation, others on who actually uses this and why.</div></div>
  </div>
  <div class="note">Mentors are on-site Saturday 15:00–18:00. Timing is flexible — grab whoever is free.</div>
</div>''')

# 11 — what you hand in
subs = "".join(f'<div class="card"><div class="card-i">{i}</div><div class="card-t">{t}</div>'
               f'<div class="card-b">{b}</div></div>' for i, t, b in SUBMISSION)
slide(f'''
<h2>What you <span class="ac">hand in</span></h2>
<div class="rule"></div>
<div class="body">
  <div class="grid2">{subs}</div>
  <div class="note">Code freeze is Sunday 12:00 — lock the repo and prepare your pitch before then.</div>
</div>''')

# 12 — pitch format
slide(f'''
<h2>The pitch: <span class="ac">5 minutes, maximum</span></h2>
<div class="rule"></div>
<div class="body">
  <div class="big" style="max-width:980px;margin-bottom:28px">
    Five minutes total per team, split however you like between the talk and the demo.
  </div>
  <div class="pitch">
    <div class="pitch-part">
      <div class="pitch-h">🎤 The talk</div>
      <div class="card-b" style="margin-top:10px;font-size:15.5px">
        The problem, why an LLM is the right tool, how you evaluated it, and what you found —
        including where it breaks.
      </div>
    </div>
    <div class="pitch-part">
      <div class="pitch-h">🎬 The demo</div>
      <div class="card-b" style="margin-top:10px;font-size:15.5px">
        Show it running on a real case. Live is best; a recording is fine if the network is not.
      </div>
    </div>
  </div>
  <div class="bar"><span style="width:55%;background:linear-gradient(90deg,#6366f1,#818cf8)"></span><span style="width:45%;background:linear-gradient(90deg,#a78bfa,#c7d2fe)"></span></div>
  <div class="note">Split it as you see fit — but at 5:00 you stop. Practise it once before you present.</div>
</div>''')

# 13 — judging criteria
jl = "".join(f'<div class="li"><div class="li-n">{i+1}</div><div><div class="li-t">{t}</div>'
             f'<div class="li-b">{b}</div></div></div>' for i, (t, b) in enumerate(JUDGING))
slide(f'''
<h2>How you are <span class="ac">judged</span></h2>
<div class="sub" style="font-size:17px;margin-top:8px">One rubric for every team, whatever domain you pick.</div>
<div class="rule" style="margin:16px 0 20px"></div>
<div class="body"><div class="list">{jl}</div></div>''')

# 14 — what judges look for
jlf = "".join(f'<div class="li"><div class="li-n">✓</div><div><div class="li-t">{t}</div>'
              f'<div class="li-b">{b}</div></div></div>' for t, b in JUDGES_LOOK_FOR)
slide(f'''
<h2>What judges <span class="ac">look for</span></h2>
<div class="rule" style="margin:16px 0 20px"></div>
<div class="body"><div class="list">{jlf}</div></div>''')

# 15 — jury
jury = "".join(f'<div class="person"><img src="{uri("hackathon/" + f)}" alt="{n}"/>'
               f'<div class="person-n">{n}</div><div class="person-a">{a}</div></div>' for n, a, f in JURY)
slide(f'''
<h2>The <span class="ac">jury</span></h2>
<div class="sub" style="font-size:17px;margin-top:8px">Who you present to on Sunday at 13:00.</div>
<div class="rule" style="margin:16px 0 20px"></div>
<div class="body"><div class="people" style="grid-template-columns:repeat(4,1fr);gap:14px">{jury}</div></div>''')

# 16 — prizes
slide(f'''
<h2><span class="ac">Prizes</span></h2>
<div class="rule"></div>
<div class="body">
  <div class="prizes">
    <div class="prize gold"><div class="prize-p">🥇</div><div class="prize-t">1st place</div>
      <div class="prize-s">Best overall build</div><div class="byline">Prize by OpenAI</div></div>
    <div class="prize"><div class="prize-p">🥈</div><div class="prize-t">2nd place</div>
      <div class="prize-s">Runner-up</div><div class="byline">Prize by OpenAI</div></div>
    <div class="prize"><div class="prize-p">🥉</div><div class="prize-t">3rd place</div>
      <div class="prize-s">Third place</div><div class="byline">Prize by OpenAI</div></div>
  </div>
  <div class="special">
    <div style="font-size:38px">🏅</div>
    <div><div class="prize-t" style="margin:0">Special prize</div>
      <div class="prize-s" style="margin-top:4px">An additional award chosen by <b>Eleveight AI</b>.</div></div>
  </div>
</div>''')

# 17 — closing
slide(f'''
<div class="body center">
  <span class="kicker">Now go build</span>
  <h1 style="font-size:70px;margin-top:20px">Good luck</h1>
  <div class="sub" style="font-size:22px;max-width:820px">
    Ship something that runs, measure it honestly, and tell us who it helps.
  </div>
  <div style="margin-top:26px;font-size:17px;color:#a78bfa;font-weight:700">
    Demo Day — Sunday 13:00 &nbsp;·&nbsp; armeniallm@gmail.com
  </div>
  <div class="chips" style="margin-top:32px;justify-content:center">{ORG_CHIPS}</div>
</div>''', cls="center", foot=False)

# ------------------------------------------------------------------ render ---

html = [f"<!doctype html><html><head><meta charset='utf-8'><style>{CSS}</style></head><body>"]
total = len(slides)
for i, (inner, cls, foot) in enumerate(slides):
    f = (f'<div class="foot"><span>Hack Armenia · {EVENT["dates"]} · AI9 Startup Campus</span>'
         f'<span class="pg">{i+1} / {total}</span></div>') if foot else ""
    html.append(f'<div class="slide {cls}">{inner}{f}</div>')
html.append("</body></html>")

with open(OUT, "w") as fh:
    fh.write("".join(html))
print(f"wrote {OUT}  ({total} slides)")
