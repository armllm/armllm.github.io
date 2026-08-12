# Hack Armenia / Armenia LLM Summer School 2026 — press kit (A4 -> PDF)
#
#   python3 build_press_kit.py
#   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
#     --headless=new --no-pdf-header-footer \
#     --print-to-pdf=Armenia-LLM-2026-Press-Kit.pdf \
#     file://$PWD/press-kit.html
#
# Written for a general-audience reporter: explains what a hackathon is before
# anything else. Contains no participant emails and no API keys.

import base64, os

IMG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "images")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "press-kit.html")


def uri(fn):
    p = os.path.join(IMG, fn)
    ext = fn.rsplit(".", 1)[-1].lower()
    mime = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg", "svg": "image/svg+xml"}[ext]
    with open(p, "rb") as f:
        return f"data:{mime};base64," + base64.b64encode(f.read()).decode()


# ----------------------------------------------------------------- content ---

SCHOOL_FACULTY = [
    ("André Martins", "IST / Unbabel", "Pre-training &amp; intro to LLMs"),
    ("Edgar Minasyan", "NVIDIA", "Post-training: SFT &amp; reinforcement learning"),
    ("Ivan Moshkov", "NVIDIA", "Test-time scaling"),
    ("Aram Markosyan", "NVIDIA", "Agents &amp; reasoning"),
    ("Armen Aghajanyan", "Perceptron AI", "Advanced topics"),
]

WINNERS = [
    ("1st prize", "OpenWater Armenia", "",
     "An interactive water-intelligence platform. Users pick any region of Armenia and ask questions "
     "in plain language; the system combines an LLM interface with deterministic geospatial and "
     "time-series analysis, answering from published water, climate, infrastructure and permit data "
     "while showing its sources and limitations."),
    ("2nd prize", "COPA", "",
     "A civic decision-intelligence system that turns Armenian-language citizen comments into "
     "structured, actionable information for public institutions — identifying individual issues, "
     "routing them to the right agency, flagging cases that need a human, and drafting replies "
     "without inventing administrative facts."),
    ("3rd prize", "Armenian Socratic Tutor", "Team Random",
     "An Armenian-language tutor that helps fifth-graders work through mathematics problems "
     "<i>without</i> revealing the answers. Grounded in Armenia's official textbook and teacher "
     "guide, it uses guiding questions and graded hints, with safeguards against answer leakage."),
    ("Special prize", "DeepClare", "team HI",
     "Turns commercial invoices, consignment notes and supplier catalogues into draft customs "
     "declarations for Armenia and the Eurasian Economic Union — preparing Armenian product "
     "descriptions, assigning commodity codes and generating declaration files with a human-review "
     "report, abstaining whenever the evidence is insufficient."),
]

OTHER_PROJECTS = [
    ("ARM Triage AI", "Anthro AI Labs",
     "A guarded Armenian-language symptom navigator that points people to emergency, urgent or home "
     "care without issuing diagnoses, with deterministic emergency safeguards for elderly and rural users."),
    ("ResQ AI", "",
     "A decision-support copilot for emergency dispatchers: it reads incoming call information, "
     "recommends a priority, asks clarifying questions when critical details are missing — and leaves "
     "the final decision to the dispatcher."),
    ("OpenLaw AM", "the Codefathers",
     "An open, auditable Armenian legal assistant grounded in legislation published through ARLIS. It "
     "cites its sources, refuses to answer when evidence is thin, and ships a public benchmark."),
    ("Heratsi", "Neighbourhood",
     "Reads a PDF or photographed laboratory report and organises it into something a patient can "
     "actually understand, in Armenian, Russian or English."),
    ("AgroShield", "The Overfitters",
     "Lets farmers report crop and vineyard problems by photo and description; reports are grouped "
     "into emerging patterns for expert review, with public maps showing only aggregated locations."),
    ("VulnFusion", "Cyber Hayq",
     "Merges findings from several cybersecurity scanners into one prioritised, explainable "
     "vulnerability report, keeping deterministic risk scores rather than letting the model invent them."),
    ("NewGround / ILARM", "Lytease",
     "A bilingual platform for the human side of resettlement programmes, turning free-text concerns "
     "from displaced households into structured cases that caseworkers can triage and track."),
    ("Secure Doc", "SecureDoc",
     "Converts free-text patient notes into a structured profile and checks medication safety against "
     "openFDA, PubMed and ClinicalTrials.gov, producing a cited brief for professional review."),
]

MEDIA = [
    ("Public Radio of Armenia", "en.armradio.am"),
    ("First Channel News / 1Lurer", "1lurer.am"),
    ("NEWS.am Tech", "tech.news.am"),
    ("Ministry of High-Tech Industry of the RA", "hightech.gov.am"),
    ("How2B", "how2b.am"),
    ("EJC", "ejc.am"),
]

LEADERBOARD = "https://scorejudge.com/c/D9cwPfkFjF18fE8-GmA1Rx3iW4KlLsVij1sNFFoVzp0/"

CSS = """
*{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important}
html,body{font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f8fafc}
@page{size:A4;margin:0}
.page{position:relative;width:210mm;height:297mm;overflow:hidden;page-break-after:always;
 display:flex;flex-direction:column;padding:15mm 15mm 15mm;
 background:radial-gradient(1200px 600px at 15% -8%,rgba(99,102,241,.26),transparent 60%),
 radial-gradient(1000px 700px at 110% 15%,rgba(167,139,250,.20),transparent 55%),
 linear-gradient(160deg,#0a0e1a 0%,#0b1022 55%,#0a0e1a 100%)}
.page:last-child{page-break-after:auto}
h1{font-size:44px;font-weight:900;line-height:1.05;letter-spacing:-1.2px;color:#c7d2fe}
.h2{font-size:26px;font-weight:900;letter-spacing:-.4px;color:#fff;margin-bottom:4px}
.h2 .ac{color:#a78bfa}
.eyebrow{display:inline-block;font-size:10.5px;font-weight:800;letter-spacing:2.6px;text-transform:uppercase;
 color:#c7d2fe;background:rgba(129,140,248,.14);border:1px solid rgba(129,140,248,.4);padding:6px 13px;border-radius:999px}
.lead{color:rgba(255,255,255,.86);font-size:14px;line-height:1.62}
.sub{color:rgba(255,255,255,.66);font-size:12.5px;line-height:1.55}
.rule{height:1px;background:linear-gradient(90deg,rgba(255,255,255,.18),transparent);margin:12px 0 14px}
.card{background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.11);border-radius:12px;padding:13px 15px}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:11px}
.k{font-size:12.5px;font-weight:800;color:#fff;margin-bottom:4px}
.v{font-size:12.5px;color:rgba(255,255,255,.75);line-height:1.5}
.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.tile{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:12px 13px}
.tile-v{font-size:26px;font-weight:900;color:#fff;line-height:1;letter-spacing:-.8px}
.tile-l{font-size:11px;color:#e2e8f0;font-weight:700;margin-top:6px}
.tile-s{font-size:10px;color:rgba(255,255,255,.5);margin-top:2px}
.win{border-radius:13px;padding:14px 16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.13);margin-bottom:10px}
.win.gold{background:rgba(253,230,138,.09);border-color:rgba(253,230,138,.42)}
.win.spec{background:rgba(167,139,250,.10);border-color:rgba(167,139,250,.42)}
.win-h{display:flex;align-items:baseline;gap:9px;margin-bottom:5px;flex-wrap:wrap}
.win-p{font-size:10.5px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#fde68a}
.win.spec .win-p{color:#c7d2fe}
.win-n{font-size:17px;font-weight:900;color:#fff}
.win-t{font-size:11.5px;color:rgba(255,255,255,.55)}
.win-b{font-size:12.5px;color:rgba(255,255,255,.8);line-height:1.55}
.row{display:flex;gap:11px;align-items:flex-start;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.07)}
.row:last-child{border-bottom:none}
.row-n{width:150px;flex-shrink:0;font-size:12.5px;font-weight:800;color:#fff}
.row-a{width:110px;flex-shrink:0;font-size:11.5px;color:#a78bfa;font-weight:700}
.row-b{font-size:12px;color:rgba(255,255,255,.72);line-height:1.5}
.chips{display:flex;gap:9px;align-items:center;flex-wrap:wrap}
.chip{background:#fff;border-radius:9px;padding:7px 11px;height:40px;display:flex;align-items:center;justify-content:center}
.chip img{max-height:24px;max-width:96px;object-fit:contain}
.spons{display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.045);
 border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:12px 14px;margin-bottom:9px}
.spons .nm{font-size:13.5px;font-weight:900;color:#fff;width:150px;flex-shrink:0}
.spons .ds{font-size:12px;color:rgba(255,255,255,.75);line-height:1.5}
.quotebox{background:rgba(129,140,248,.11);border:1px solid rgba(129,140,248,.4);border-radius:13px;padding:14px 17px}
.foot{position:absolute;left:15mm;right:15mm;bottom:9mm;display:flex;justify-content:space-between;
 font-size:9.5px;color:rgba(255,255,255,.42);font-weight:600}
ul{margin:0;padding-left:17px}
li{font-size:12.5px;color:rgba(255,255,255,.8);line-height:1.6;margin-bottom:4px}
@media print{h1{color:#c7d2fe}.chip{box-shadow:none}}
"""

ORG_CHIPS = (f'<div class="chip"><img src="{uri("logo_armllm_bg_removed.png")}"/></div>'
             f'<div class="chip"><img src="{uri("ai9-square.svg")}"/></div>'
             f'<div class="chip"><img src="{uri("yn_logo.png")}"/></div>')

pages = []


def page(inner, num, total=8):
    pages.append(f'<div class="page">{inner}'
                 f'<div class="foot"><span>Armenia LLM Summer School 2026 &amp; Hack Armenia — press information</span>'
                 f'<span>{num} / {total}</span></div></div>')


# ---- 1: cover -------------------------------------------------------------
page(f'''
<img src="{uri('logo_armllm_bg_removed.png')}" style="width:74px"/>
<div style="margin-top:14px"><span class="eyebrow">Press information · August 2026</span></div>
<h1 style="margin-top:12px">Armenia LLM<br/>Summer School 2026<br/>&amp; Hack&nbsp;Armenia</h1>
<div class="lead" style="margin-top:14px;max-width:160mm">
  Two connected events held in Yerevan in August 2026: a five-day school teaching how modern AI
  language models are built, followed immediately by a 24-hour <b>hackathon</b> in which teams built
  working AI tools for Armenian public services — health, law, water, agriculture, emergency response.
</div>
<div class="rule"></div>
<div class="tiles">
  <div class="tile"><div class="tile-v">Aug 3–7</div><div class="tile-l">Summer School</div>
    <div class="tile-s">five days of teaching</div></div>
  <div class="tile"><div class="tile-v">Aug 8–9</div><div class="tile-l">Hack Armenia</div>
    <div class="tile-s">24-hour build sprint</div></div>
  <div class="tile"><div class="tile-v">76</div><div class="tile-l">participants</div>
    <div class="tile-s">from 110 applicants</div></div>
  <div class="tile"><div class="tile-v">16</div><div class="tile-l">projects built</div>
    <div class="tile-s">in 24 hours</div></div>
</div>
<div style="margin-top:16px" class="quotebox">
  <div class="k" style="font-size:13.5px">In one sentence</div>
  <div class="v" style="font-size:13px">
    Armenia's flagship AI training programme brought together researchers from NVIDIA, Meta, Google and
    Amazon to teach 76 selected engineers and students — who then had 24 hours to build software that
    solves a real Armenian problem. Sixteen working prototypes were produced and judged by a
    ten-person expert jury.
  </div>
</div>
<div style="margin-top:auto">
  <div class="sub" style="margin-bottom:8px;text-transform:uppercase;letter-spacing:1.8px;font-size:10px;font-weight:800">Organised by</div>
  <div class="chips">{ORG_CHIPS}</div>
  <div class="sub" style="margin-top:9px">Armenia LLM Summer School · AI9 Startup Campus · YerevaNN</div>
  <div class="rule"></div>
  <div class="sub">Venue: AI9 Startup Campus, 9 Isahakyan St, Yerevan &nbsp;·&nbsp;
    Contact: armeniallm@gmail.com &nbsp;·&nbsp; armllm.github.io/2026/hackathon</div>
</div>''', 1)

# ---- 2: what is a hackathon ----------------------------------------------
page(f'''
<div class="h2">First, the <span class="ac">basics</span></div>
<div class="sub">Written for readers who have not covered this before.</div>
<div class="rule"></div>

<div class="card" style="margin-bottom:11px">
  <div class="k" style="font-size:14px">What is a hackathon?</div>
  <div class="v" style="font-size:13px">
    A hackathon is a time-boxed building competition. Teams of three or four people are given a theme
    and a fixed, deliberately short window — here, 24 hours — to design, build and demonstrate a
    working piece of software. It is not a conference and not a lecture: nothing is presented that the
    team did not build in the room. At the end, each team demonstrates what actually runs, and a jury
    of experts scores the work. The word combines “hack”, meaning to build something quickly and
    inventively, with “marathon”.
  </div>
</div>

<div class="card" style="margin-bottom:11px">
  <div class="k" style="font-size:14px">Why do people do it?</div>
  <div class="v" style="font-size:13px">
    The deadline is the point. A tight limit forces teams to cut an idea down to the part that matters
    and prove it works, rather than describing what they might build one day. For participants it is a
    way to test skills, meet collaborators and be seen by employers and investors. For a country, it
    turns theoretical training into concrete, publicly available prototypes in a weekend — and shows
    where local talent actually is.
  </div>
</div>

<div class="card" style="margin-bottom:11px">
  <div class="k" style="font-size:14px">And what is an “LLM”?</div>
  <div class="v" style="font-size:13px">
    A large language model is the technology behind systems like ChatGPT: software trained on very
    large amounts of text that can read, summarise, answer questions and follow instructions in
    ordinary language. The Summer School teaches how such systems are built and, critically, how to
    measure when they are wrong. That matters because these models can produce confident, fluent
    answers that are false — which is why the hackathon's judging rubric awarded points specifically
    for testing failure cases and for refusing to answer when evidence was insufficient.
  </div>
</div>

<div class="quotebox">
  <div class="k" style="font-size:13.5px">Why this one was unusual</div>
  <div class="v" style="font-size:13px">
    Most hackathons are open-ended. Hack Armenia set a single theme — <b>Armenia's public interest</b> —
    and required every team to show evidence that their system worked, to name where it fails, and to
    publish their code openly. Several of the resulting projects address problems the state itself is
    trying to solve: customs paperwork, legal research, water data, emergency dispatch.
  </div>
</div>''', 2)

# ---- 3: the summer school -------------------------------------------------
fac = "".join(f'<div class="row"><div class="row-n">{n}</div><div class="row-a">{a}</div>'
              f'<div class="row-b">{t}</div></div>' for n, a, t in SCHOOL_FACULTY)
page(f'''
<div class="h2">Part one · The <span class="ac">Summer School</span></div>
<div class="sub">3–7 August 2026 · AI9 Startup Campus, Yerevan · third edition</div>
<div class="rule"></div>

<div class="lead" style="margin-bottom:12px">
  The Armenia LLM Summer School is an annual programme teaching how large language models are built,
  trained and evaluated. It is taught by working researchers from leading AI labs, most of them of
  Armenian origin, who return to Yerevan to teach. Admission is competitive: applicants submit a CV
  and sit a technical assessment, and in the previous edition roughly three applied for every place.
</div>

<div class="k" style="margin-bottom:6px">The 2026 faculty and curriculum</div>
<div class="card" style="padding:6px 15px;margin-bottom:12px">{fac}</div>

<div class="grid3" style="margin-bottom:12px">
  <div class="card"><div class="k">Format</div><div class="v">Five days of lectures and hands-on
    practical sessions, with an online track for the theory. Participants work on their own laptops
    with shared GPU access.</div></div>
  <div class="card"><div class="k">Who attends</div><div class="v">Graduate and undergraduate students,
    researchers and working engineers. Fees are heavily subsidised, with student waivers of up to 90%
    so cost is not the barrier.</div></div>
  <div class="card"><div class="k">Track record</div><div class="v">In the 2025 edition 248 people
    applied for 77 places. Participants in the 2024 exit survey rated lecture quality 4.5 out of 5.</div></div>
</div>

<div class="quotebox">
  <div class="k" style="font-size:13.5px">Why it exists</div>
  <div class="v" style="font-size:13px">
    Armenia has a strong engineering tradition and a fast-growing technology sector, but frontier AI
    training is concentrated in a handful of labs abroad. The school's purpose is to bring that
    teaching to Yerevan directly — so that people can learn how these systems work without leaving the
    country, and so that the expertise stays and compounds locally. The hackathon exists to make sure
    the week ends in something built rather than something merely understood.
  </div>
</div>''', 3)

# ---- 4: the hackathon -----------------------------------------------------
page(f'''
<div class="h2">Part two · <span class="ac">Hack Armenia</span></div>
<div class="sub">8–9 August 2026 · AI9 Startup Campus · organised with AI9 and YerevaNN</div>
<div class="rule"></div>

<div class="lead" style="margin-bottom:12px">
  Immediately after the school, participants and other selected applicants had 24 hours to build an
  AI system serving Armenia's public interest. Teams chose their own problem within that theme.
  Everything had to be built during the event, published as open source, and — unusually for a
  hackathon — accompanied by evidence that it actually worked.
</div>

<div class="tiles" style="margin-bottom:12px">
  <div class="tile"><div class="tile-v">110</div><div class="tile-l">applied</div></div>
  <div class="tile"><div class="tile-v">76</div><div class="tile-l">took part</div>
    <div class="tile-s">63 accepted places</div></div>
  <div class="tile"><div class="tile-v">20</div><div class="tile-l">teams formed</div>
    <div class="tile-s">3–4 people each</div></div>
  <div class="tile"><div class="tile-v">16</div><div class="tile-l">projects submitted</div></div>
</div>

<div class="grid2" style="margin-bottom:12px">
  <div class="card"><div class="k">How the 24 hours ran</div><div class="v">
    Kick-off Saturday 10:00 with the theme and rules. Teams formed and scoped their problem, then built
    through the night with <b>12 senior AI mentors</b> on site. Code freeze Sunday midday, then Demo Day
    at 13:00: five minutes per team, split between a talk and a live demonstration.</div></div>
  <div class="card"><div class="k">How it was judged</div><div class="v">
    A <b>ten-person jury</b> scored every team on five criteria — the quality of the idea and its fit to a
    real Armenian need; whether the prototype actually worked; the strength of the evaluation evidence;
    awareness of failure modes and safety; and whether it could survive outside the demo.</div></div>
</div>

<div class="card" style="margin-bottom:12px">
  <div class="k">Who was in the room</div>
  <div class="v">Participants came from Yerevan, Gyumri, Dilijan, Ijevan, Hrazdan and abroad, and
  included ML researchers, security engineers, data scientists, product managers, university students
  and first-time hackathon entrants. Mentors and jurors came from NVIDIA, OpenAI, YerevaNN, AI9,
  Nebius, ServiceNow Research, PMI Science Armenia, Ucom, Wirestock and Armenian startups, alongside
  the First Deputy Minister of High-Tech Industry.</div>
</div>

<div class="quotebox">
  <div class="k" style="font-size:13.5px">The rule that shaped the results</div>
  <div class="v" style="font-size:13px">
    Teams were told an LLM had to <i>earn its place</i>: if a simpler tool would do the job, use the
    simpler tool. Points were awarded for measuring accuracy against a baseline, for naming who could
    be harmed when the system fails, and for making the model abstain rather than guess. That is why
    several of the winning projects refuse to answer when the evidence is thin.
  </div>
</div>''', 4)

# ---- 5: sponsors ----------------------------------------------------------
page(f'''
<div class="h2">Who <span class="ac">made it possible</span></div>
<div class="sub">Prizes, compute, funding and venue.</div>
<div class="rule"></div>

<div class="spons"><div class="nm">OpenAI</div><div class="ds">
  Sponsored the hackathon prizes with API credits: <b>$12,000</b> for first place, <b>$7,500</b> for
  second and <b>$5,000</b> for third — credit toward the computing power needed to keep developing
  the winning projects.</div></div>

<div class="spons"><div class="nm">Eleveight AI</div><div class="ds">
  Presented a separate <b>special prize</b> of $5,000-equivalent in GPUs — the specialised processors
  used to run AI models — so the winning team leaves with real computing hardware.</div></div>

<div class="spons"><div class="nm">Ministry of High-Tech<br/>Industry of the RA</div><div class="ds">
  Supported Hack Armenia. First Deputy Minister <b>Gevorg Mantashyan</b> served on the jury, and the
  Ministry covered the event through its own channels.</div></div>

<div class="spons"><div class="nm">ISAA</div><div class="ds">
  Supported the event alongside the Ministry.</div></div>

<div class="spons"><div class="nm">Nebius &amp; Yerevan<br/>State University</div><div class="ds">
  Provided the computing power for the Summer School. Nebius's Head of Solutions Architecture,
  Levon Sarkisian, also sat on the hackathon jury.</div></div>

<div class="spons"><div class="nm">AI9 Startup Campus</div><div class="ds">
  Co-organiser and host venue for both events, in central Yerevan.</div></div>

<div class="spons" style="margin-bottom:14px"><div class="nm">YerevaNN</div><div class="ds">
  Co-organiser. An Armenian non-profit machine-learning research lab; several of its researchers
  mentored teams.</div></div>

<div class="card">
  <div class="k">Also supporting the Summer School</div>
  <div class="v">ARCS.ai and PMI Science R&amp;D Center Armenia. Faculty travelled from NVIDIA,
  Perceptron AI and IST/Unbabel; past editions have drawn teaching staff from Meta, Google, Amazon and
  ServiceNow Research.</div>
</div>

<div style="margin-top:auto">
  <div class="sub" style="margin-bottom:8px;text-transform:uppercase;letter-spacing:1.8px;font-size:10px;font-weight:800">Compute and partners</div>
  <div class="chips">
    <div class="chip"><img src="{uri('nebius_logo.jpg')}"/></div>
    <div class="chip"><img src="{uri('ysu_logo.png')}"/></div>
    <div class="chip"><img src="{uri('arcs_ai_logo.jpg')}"/></div>
    <div class="chip"><img src="{uri('pmi_science_blue_logo.jpg')}"/></div>
  </div>
</div>''', 5)

# ---- 6: winners -----------------------------------------------------------
wins = "".join(
    f'<div class="win {"gold" if p=="1st prize" else ("spec" if p=="Special prize" else "")}">'
    f'<div class="win-h"><span class="win-p">{p}</span><span class="win-n">{n}</span>'
    f'{f"<span class=\"win-t\">{t}</span>" if t else ""}</div>'
    f'<div class="win-b">{b}</div></div>' for p, n, t, b in WINNERS)
page(f'''
<div class="h2">The <span class="ac">results</span></div>
<div class="sub">Judged by a ten-person jury on Demo Day, Sunday 9 August.</div>
<div class="rule"></div>
{wins}
<div class="card" style="margin-top:4px">
  <div class="k">What the winners have in common</div>
  <div class="v">All four are grounded in real Armenian data — published water and climate records,
  ARLIS legislation, the national school textbook, customs classification rules — rather than generic
  demonstrations. All four cite their sources, and three of them explicitly refuse to answer when the
  evidence is insufficient, which was rewarded by the judging rubric. Every project is open source.</div>
</div>
<div class="sub" style="margin-top:10px">Every team's score is published on the official leaderboard —
  link supplied with this pack on request.</div>''', 6)

# ---- 7: other projects ----------------------------------------------------
others = "".join(f'<div class="row"><div class="row-n">{n}</div>'
                 f'<div class="row-a">{t}</div><div class="row-b">{b}</div></div>'
                 for n, t, b in OTHER_PROJECTS)
page(f'''
<div class="h2">Other projects <span class="ac">built that weekend</span></div>
<div class="sub">A selection of the sixteen submissions. All code is public.</div>
<div class="rule"></div>
<div class="card" style="padding:4px 15px">{others}</div>
<div class="card" style="margin-top:12px">
  <div class="k">Also submitted</div>
  <div class="v">ChronoLex, an Armenian legal-research assistant that finds which version of a law
  applied on a given date; Armenian.cc, which turns Armenian social-media video into learning material
  for Russian speakers; CarMed, a vehicle-diagnosis assistant built for how Armenians actually
  describe car faults, including Armenian written in Latin letters mixed with Russian terms; and a
  second Armenian Socratic maths tutor for Grade 7.</div>
</div>
<div class="quotebox" style="margin-top:12px">
  <div class="k" style="font-size:13.5px">A note for reporting</div>
  <div class="v" style="font-size:13px">
    These are 24-hour prototypes, not deployed government systems. They are best described as working
    demonstrations that show what is possible — several teams have said they intend to continue. The
    code for each is publicly available on GitHub, so any claim in this document can be checked.
  </div>
</div>''', 7)

# ---- 8: media + contact ---------------------------------------------------
med = "".join(f'<div class="row"><div class="row-n">{n}</div><div class="row-b">{u}</div></div>'
              for n, u in MEDIA)
page(f'''
<div class="h2">Coverage, links and <span class="ac">contacts</span></div>
<div class="rule"></div>

<div class="k" style="margin-bottom:6px">Already published</div>
<div class="card" style="padding:4px 15px;margin-bottom:14px">{med}</div>

<div class="k" style="margin-bottom:6px">Material available on request</div>
<div class="card" style="margin-bottom:14px"><div class="v">
  Photographs from both events · team presentations and recorded demos · the full judging rubric ·
  the official leaderboard with every team's score · introductions to winning teams, mentors, jurors
  and organisers for interview.
</div></div>

<div class="grid2" style="margin-bottom:14px">
  <div class="card"><div class="k">Press contact</div><div class="v">
    Armenia LLM Summer School<br/>armeniallm@gmail.com</div></div>
  <div class="card"><div class="k">Online</div><div class="v">
    armllm.github.io<br/>armllm.github.io/2026/hackathon</div></div>
</div>

<div class="quotebox">
  <div class="k" style="font-size:13.5px">Suggested framing</div>
  <div class="v" style="font-size:13px">
    The story is not that a hackathon happened. It is that 76 people, most of them Armenian engineers
    and students, spent 24 hours building AI tools for problems the country actually has — water data,
    customs paperwork, legal research, emergency dispatch, school mathematics — and that the work is
    public, checkable and, in several cases, continuing. The Ministry of High-Tech Industry backed it;
    OpenAI and Eleveight AI funded the prizes; the teaching that made it possible was delivered in
    Yerevan the week before by researchers who came home to teach.
  </div>
</div>

<div style="margin-top:auto">
  <div class="rule"></div>
  <div class="chips">{ORG_CHIPS}</div>
  <div class="sub" style="margin-top:9px">Armenia LLM Summer School · AI9 Startup Campus · YerevaNN —
    Yerevan, August 2026</div>
</div>''', 8)

html = (f"<!doctype html><html><head><meta charset='utf-8'>"
        f"<title>Armenia LLM 2026 — press kit</title><style>{CSS}</style></head><body>"
        + "".join(pages) + "</body></html>")

with open(OUT, "w") as f:
    f.write(html)
print(f"wrote {OUT} ({len(pages)} pages)")
