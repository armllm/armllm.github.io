# Hack Armenia — Partnership Prospectus generator
# Edit the data lists below (tiers/amounts, stats, tracks, copy), then:
#   python3 build_hack_armenia_prospectus.py            # writes hack-armenia-prospectus.html
#   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
#     --headless=new --no-pdf-header-footer \
#     --print-to-pdf=Hack-Armenia-Partnership-Prospectus.pdf \
#     file://$PWD/hack-armenia-prospectus.html
# NOTE: the NVIDIA mark is a green text wordmark placeholder (no official asset in-repo).
# Tier amounts are INDICATIVE and clearly labelled as such on the page.

#!/usr/bin/env python3
import base64, os, html

IMG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "images")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "hack-armenia-prospectus.html")

def uri(fn):
    p = os.path.join(IMG, fn); ext = fn.rsplit(".",1)[-1].lower()
    mime = {"png":"image/png","jpg":"image/jpeg","jpeg":"image/jpeg","svg":"image/svg+xml"}[ext]
    with open(p,"rb") as f: return f"data:{mime};base64," + base64.b64encode(f.read()).decode()

def hbar(rows, maxval, width=660, row_h=52, bar_h=18, label_w=230, grad="barGrad"):
    n=len(rows); top=6; height=n*row_h+top+4; bx=label_w+18; bw=width-bx-66
    out=[f'<svg viewBox="0 0 {width} {height}" width="100%" style="display:block">',
         f'<defs><linearGradient id="{grad}" x1="0" y1="0" x2="1" y2="0">'
         f'<stop offset="0" stop-color="#6366f1"/><stop offset="1" stop-color="#a78bfa"/></linearGradient></defs>']
    for i,(label,val,disp) in enumerate(rows):
        cy=top+i*row_h+row_h/2; fillw=max(6,bw*val/maxval)
        out.append(f'<text x="{label_w}" y="{cy}" text-anchor="end" dominant-baseline="central" fill="#e2e8f0" font-size="15" font-weight="600">{html.escape(label)}</text>')
        out.append(f'<rect x="{bx}" y="{cy-bar_h/2}" width="{bw}" height="{bar_h}" rx="{bar_h/2}" fill="rgba(255,255,255,0.06)"/>')
        out.append(f'<rect x="{bx}" y="{cy-bar_h/2}" width="{fillw:.1f}" height="{bar_h}" rx="{bar_h/2}" fill="url(#{grad})"/>')
        out.append(f'<text x="{bx+fillw+10:.1f}" y="{cy}" dominant-baseline="central" fill="#ffffff" font-size="15" font-weight="800">{disp}</text>')
    out.append('</svg>'); return "".join(out)

funnel=hbar([("Applications received",255,"255"),("Unique applicants",248,"248"),("Selected participants",77,"77")],255)
mix=hbar([("Graduate students",186,"186"),("Industry professionals",105,"105"),("Undergraduate students",88,"88")],186)
feedback=hbar([("Instructor effectiveness",4.53,"4.53"),("Lecture quality",4.49,"4.49"),("Overall experience",4.18,"4.18"),("Practical sessions",4.11,"4.11")],5.0,grad="barGrad2")

NVIDIA_SVG=('<svg viewBox="0 0 200 40" width="112" height="22" xmlns="http://www.w3.org/2000/svg">'
 '<text x="0" y="30" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="800" letter-spacing="0.5" fill="#76b900">NVIDIA</text></svg>')

tracks=[("🏙️","Urban development","City ops, planning & mobility"),
 ("🏛️","Public systems & policy","Filings, evidence & transparency"),
 ("🩺","Healthcare","Safe triage, admin & patient education"),
 ("🎓","Education","Tutoring, grading & Armenian-language learning"),
 ("🔒","Security","Phishing defense, secure code & threat triage"),
 ("🍎","Food & agriculture","Crop advisory, food safety & nutrition"),
 ("🌱","Environment & energy","Efficiency, hazards & resources"),
 ("🏦","Finance & fintech","Fair credit, fraud & literacy"),
 ("🚨","Emergency & disaster","Coordination, preparedness & response")]
timeline=[("Sat 10:00","Kickoff &amp; reveal"),("Sat 11:00","Teams form"),("Sat–Sun","Build + mentors"),
 ("Sun 10:00","Code freeze"),("Sun 11:00","Demo Day"),("Sun 13:00","Awards")]
stats=[("248","applicants in 2025","3.2 per available seat"),
 ("60–80","expected participants","hand-picked from the pool"),
 ("15–20","teams of 3–4","small, focused teams"),
 ("8–15","senior AI mentors","hands-on all sprint"),
 ("24h","of building","then Demo Day &amp; expert jury"),
 ("4.5/5","program rating","2024 exit survey, n=55")]
why=[("🎯","Meet &amp; recruit talent","Direct access to Armenia's sharpest LLM engineers and researchers, mid-build and at demos."),
 ("📣","National brand presence","Your logo across a flagship program with press, media and open-course reach."),
 ("🧩","Shape a real challenge","Put your own problem statement in front of motivated, capable teams."),
 ("🇦🇲","Invest in the ecosystem","Strengthen Armenia's AI talent pipeline and public-interest technology.")]
support=[("⚡","Compute &amp; API credits","GPUs or model-API credits so every team can build at full power."),
 ("🏆","Prize pool","Cash or hardware prizes that draw the strongest teams."),
 ("🧑‍🏫","Mentors &amp; judges","Your engineers mentor teams during the sprint and judge the finals."),
 ("🗂️","Problem statements &amp; data","Bring a real problem — and, optionally, data — from your domain.")]
tier_cols=[("Community","In-kind"),("Silver","$2,500"),("Gold","$6,000"),("Title","from $12,000")]
tier_rows=[("Logo on site, materials &amp; event screens",["Small","✓","Large","Top"]),
 ("Social &amp; press mentions",["✓","✓","✓","✓"]),
 ("Mentor &amp; judge seats",["1","1","2","4"]),
 ("Recruiting access (opt-in profiles)",["—","✓","✓","✓"]),
 ("Set a track / problem statement",["—","—","✓","✓"]),
 ("Named prize category",["—","—","✓","✓"]),
 ("“Presented by” naming + opening remarks",["—","—","—","✓"])]
faculty=["Meta","Google","Amazon","ServiceNow","USC","MIT","Perceptron AI"]
supporters=["ai9-square.svg","yn_logo.png","ARCS_ai_logo.png","pmi_science_blue_logo.jpg","nebius.png",
 "aualogo.png","picsart.png","profound.png","Armenia_Fund.png","ASOF_Logo.png"]

def step(n,t,b): return f'<div class="step"><div class="step-n">{n}</div><div class="step-t">{t}</div><div class="step-b">{b}</div></div>'
def stat_tile(v,l,s): return f'<div class="tile"><div class="tile-v">{v}</div><div class="tile-l">{l}</div><div class="tile-s">{s}</div></div>'
def track_cell(i,n,d): return f'<div class="tk"><div class="tk-i">{i}</div><div><div class="tk-n">{n}</div><div class="tk-d">{d}</div></div></div>'
def icon_card(i,t,b): return f'<div class="ic"><div class="ic-i">{i}</div><div class="ic-t">{t}</div><div class="ic-b">{b}</div></div>'
def tl_node(t,l): return f'<div class="tl-n"><div class="tl-dot"></div><div class="tl-t">{t}</div><div class="tl-l">{l}</div></div>'
def chip(fn): return f'<div class="chip"><img src="{uri(fn)}" alt=""/></div>'

thead="".join(f'<th><div class="tc-n">{n}</div><div class="tc-a">{a}</div></th>' for n,a in tier_cols)
tbody=""
for label,vals in tier_rows:
    cells="".join(f'<td class="{("yes" if v=="✓" else ("no" if v=="—" else "txt"))}">{v}</td>' for v in vals)
    tbody+=f'<tr><td class="rl">{label}</td>{cells}</tr>'
ribbon_chips="".join(f'<span class="rb">{i} {n}</span>' for i,n,_ in tracks)

CSS="""
*{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important}
html,body{font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f8fafc}
@page{size:A4;margin:0}
.page{position:relative;width:210mm;height:297mm;overflow:hidden;page-break-after:always;display:flex;flex-direction:column;
 background:radial-gradient(1200px 600px at 15% -8%,rgba(99,102,241,.28),transparent 60%),
 radial-gradient(1000px 700px at 110% 15%,rgba(167,139,250,.22),transparent 55%),
 linear-gradient(160deg,#0a0e1a 0%,#0b1022 55%,#0a0e1a 100%);padding:15mm 15mm 15mm}
.page:last-child{page-break-after:auto}
.center{justify-content:center}.between{justify-content:space-between}
.eyebrow{display:inline-block;font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:#c7d2fe;background:rgba(129,140,248,.14);border:1px solid rgba(129,140,248,.4);padding:6px 14px;border-radius:999px}
h1{font-size:62px;font-weight:900;line-height:1.02;letter-spacing:-1.5px;background:linear-gradient(90deg,#c7d2fe,#a78bfa 60%,#818cf8);-webkit-background-clip:text;background-clip:text;color:transparent}
.h2{font-size:30px;font-weight:900;letter-spacing:-.5px;color:#fff}.h2 .accent{color:#a78bfa}
.sub{color:rgba(255,255,255,.72);font-size:15px;line-height:1.55}
.lead{color:rgba(255,255,255,.82);font-size:16px;line-height:1.6}
.section-note{color:rgba(255,255,255,.5);font-size:12px}
.rule{height:1px;background:linear-gradient(90deg,rgba(255,255,255,.16),transparent);margin:14px 0}
.cover-facts{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}
.fact{font-size:13px;color:#dbe2ff;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);padding:9px 14px;border-radius:10px;font-weight:600}
.armllm{width:112px;filter:drop-shadow(0 0 18px rgba(129,140,248,.55))}
.org-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.org-lab{font-size:12px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.55);font-weight:700}
.chip{background:#fff;border-radius:12px;padding:10px 16px;height:54px;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(0,0,0,.35)}
.chip img{max-height:32px;max-width:150px;object-fit:contain}
.ribbon{margin-top:24px}
.rb-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.rb{font-size:12.5px;font-weight:700;color:#dbe2ff;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);padding:7px 12px;border-radius:9px}
.cta .big{font-size:19px;font-weight:700;color:#fff;line-height:1.42}
.foot{display:flex;justify-content:space-between;color:rgba(255,255,255,.6);font-size:12.5px;margin-top:14px;font-weight:600}
.tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.tile{background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:16px}
.tile-v{font-size:34px;font-weight:900;color:#fff;letter-spacing:-1px;line-height:1}
.tile-l{font-size:13.5px;color:#e2e8f0;font-weight:700;margin-top:8px}
.tile-s{font-size:11.5px;color:rgba(255,255,255,.55);margin-top:3px}
.card{background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:16px 18px}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.grid4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px}
.ic{background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:15px 16px}
.ic-i{font-size:24px}.ic-t{font-size:15.5px;font-weight:800;color:#fff;margin:8px 0 4px}.ic-b{font-size:13px;color:rgba(255,255,255,.72);line-height:1.5}
.tk-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.tk{display:flex;gap:11px;align-items:flex-start;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:13px}
.tk-i{font-size:22px;line-height:1}.tk-n{font-size:14px;font-weight:800;color:#fff}.tk-d{font-size:11.5px;color:rgba(255,255,255,.62);margin-top:3px;line-height:1.35}
.tl{display:flex;justify-content:space-between;align-items:flex-start;position:relative;margin:10px 6px 0}
.tl:before{content:"";position:absolute;left:3%;right:3%;top:7px;height:2px;background:linear-gradient(90deg,#6366f1,#a78bfa)}
.tl-n{position:relative;text-align:center;width:16%}
.tl-dot{width:14px;height:14px;border-radius:50%;background:#a78bfa;margin:0 auto 8px;box-shadow:0 0 0 4px rgba(167,139,250,.2)}
.tl-t{font-size:13px;font-weight:800;color:#fff}.tl-l{font-size:11px;color:rgba(255,255,255,.6);margin-top:2px}
.chart-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:18px 20px 14px}
.chart-h{font-size:16px;font-weight:800;color:#fff}.chart-s{font-size:12px;color:rgba(255,255,255,.55);margin-top:2px;margin-bottom:8px}
table{width:100%;border-collapse:separate;border-spacing:0;margin-top:10px}
th,td{padding:11px 10px;text-align:center;font-size:13px}
th{border-bottom:2px solid rgba(255,255,255,.16)}
.tc-n{font-size:15px;font-weight:900;color:#fff}.tc-a{font-size:12px;color:#a78bfa;font-weight:700;margin-top:2px}
td.rl{text-align:left;color:#e2e8f0;font-weight:600;font-size:12.5px;width:40%}
tbody tr:nth-child(odd){background:rgba(255,255,255,.03)}
td.yes{color:#a78bfa;font-weight:900;font-size:16px}td.no{color:rgba(255,255,255,.28)}td.txt{color:#fff;font-weight:800}
.indic{display:inline-block;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#fde68a;background:rgba(253,230,138,.12);border:1px solid rgba(253,230,138,.35);padding:4px 10px;border-radius:999px}
.wall{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:10px}
.wall .chip{height:62px;padding:10px 12px}.wall .chip img{max-height:40px;max-width:130px}
.fac{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.fac .nm{font-size:13px;font-weight:700;color:#e2e8f0;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);padding:6px 12px;border-radius:8px}
.accentcard{background:rgba(129,140,248,.1);border:1px solid rgba(129,140,248,.4);border-radius:14px;padding:16px 18px}
.steps{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.step{background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:15px 16px}
.step-n{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#6366f1,#a78bfa);color:#fff;font-weight:900;font-size:15px;display:flex;align-items:center;justify-content:center}
.step-t{font-size:14.5px;font-weight:800;color:#fff;margin:9px 0 4px}.step-b{font-size:12.5px;color:rgba(255,255,255,.7);line-height:1.45}
.contact{border-top:1px solid rgba(255,255,255,.14);padding-top:16px;display:flex;justify-content:space-between;align-items:flex-end}
.pagenum{position:absolute;bottom:8mm;right:15mm;font-size:11px;color:rgba(255,255,255,.4);font-weight:600}
.wm{position:absolute;bottom:8mm;left:15mm;font-size:11px;color:rgba(255,255,255,.4);font-weight:600}
"""

def page(inner,num,cls="",wm="Hack Armenia · Partnership Prospectus"):
    return f'<div class="page {cls}">{inner}<div class="wm">{wm}</div><div class="pagenum">{num}</div></div>'

cover=f'''<div>
<img class="armllm" src="{uri('logo_armllm_bg_removed.png')}" alt="ARMLLM"/>
<div style="margin-top:18px"><span class="eyebrow">Partnership Prospectus · 2026</span></div>
<h1 style="margin-top:16px">Hack&nbsp;Armenia</h1>
<div style="font-size:19px;color:#e9ecff;margin-top:10px;line-height:1.5;max-width:150mm">
A 24-hour LLM build sprint where Armenia's strongest engineers and researchers ship AI systems for the
country's public interest — the finale of the Armenia LLM Summer School.</div>
<div class="cover-facts">
<div class="fact">📅 August 8–9, 2026</div><div class="fact">🕙 Sat 10:00 → Sun 13:00</div>
<div class="fact">⏱️ 24 hours of building</div><div class="fact">📍 AI9 Startup Campus, Yerevan</div></div>
<div class="rule" style="margin-top:24px"></div>
<div class="org-row">
<span class="org-lab">Organized by</span>
<div class="chip"><img src="{uri('logo_armllm_bg_removed.png')}" alt="Armenia LLM Summer School"/></div>
<div class="chip"><img src="{uri('ai9-square.svg')}" alt="AI9"/></div>
<div class="chip"><img src="{uri('yn_logo.png')}" alt="YerevaNN"/></div></div>
<div style="font-size:13.5px;color:#dbe2ff;font-weight:700;margin-top:11px">Armenia LLM Summer School&nbsp;·&nbsp;AI9&nbsp;·&nbsp;YerevaNN</div>
<div class="org-row" style="margin-top:12px">
<span class="org-lab">Faculty from</span>
<div class="chip" style="height:44px;padding:8px 14px">{NVIDIA_SVG}</div>
<span style="font-size:13px;color:rgba(255,255,255,.72);font-weight:600">Meta · Google · Amazon · ServiceNow</span></div>
<div class="ribbon"><div class="org-lab">The challenge space · nine public-interest domains</div><div class="rb-row">{ribbon_chips}</div></div>
</div>
<div class="cta"><div class="rule"></div>
<div class="big">Partner with us to put world-class LLM talent to work on problems<br/>that matter for Armenia — and meet the people building its AI future.</div>
<div class="foot"><span>armllm.github.io/2026/hackathon</span><span>armeniallm@gmail.com</span></div></div>'''

tiles_html="".join(stat_tile(*s) for s in stats)
fac_html="".join(f'<span class="nm">{f}</span>' for f in faculty)
opp=f'''<div>
<div class="h2">The <span class="accent">opportunity</span></div>
<div class="lead" style="margin-top:10px;max-width:170mm">The Armenia LLM Summer School is the country's flagship
program on large language models, taught by researchers from <b>NVIDIA, Meta, Google, Amazon and ServiceNow</b>.
<b>Hack Armenia</b> — organized by the <b>Armenia LLM Summer School, AI9 and YerevaNN</b> — caps the 2026 edition with a
24-hour sprint: teams build working LLM systems for real Armenian public-interest problems, and sponsors get a
front-row seat to the talent and the work.</div>
<div class="rule"></div>
<div class="tiles">{tiles_html}</div>
<div style="margin-top:18px" class="card">
<div style="font-size:13px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#c7d2fe;margin-bottom:10px">Taught by researchers from</div>
<div class="fac"><div class="chip" style="height:42px;padding:7px 14px">{NVIDIA_SVG}</div>{fac_html}</div></div>
<div style="margin-top:16px" class="grid2">
<div class="card"><div class="ic-t">Why it matters for Armenia</div><div class="ic-b">The sprint channels top talent into domains the country actually needs — health, education, security, agriculture, energy, finance and disaster response — and every output ships open-source.</div></div>
<div class="card"><div class="ic-t">Why it matters for you</div><div class="ic-b">Recruiting, brand, and a rare chance to set a real technical challenge for a room full of motivated builders — while backing the region's AI ecosystem.</div></div></div>
</div>'''

charts=f'''<div>
<div class="h2">Proven demand, <span class="accent">serious talent</span></div>
<div class="sub" style="margin-top:8px;max-width:170mm">The Summer School that Hack Armenia caps is heavily oversubscribed and highly rated — the sprint draws from exactly this pool of vetted engineers and researchers.</div>
<div class="rule"></div>
<div class="chart-card"><div class="chart-h">A selective, in-demand pipeline</div>
<div class="chart-s">2025 admissions funnel — roughly 3.2 applicants for every available seat</div>{funnel}</div>
<div style="height:14px"></div>
<div class="grid2">
<div class="chart-card"><div class="chart-h">Who applies</div><div class="chart-s">2025 applicant mix (multi-select; graduate, undergraduate &amp; industry)</div>{mix}</div>
<div class="chart-card"><div class="chart-h">How they rate it</div><div class="chart-s">2024 exit survey, out of 5 (n = 55)</div>{feedback}</div></div>
<div class="accentcard" style="margin-top:16px">
<span style="font-size:15px;font-weight:800;color:#fff">Sponsors meet pre-vetted talent.</span>
<span style="font-size:14px;color:rgba(255,255,255,.82)"> Every team is drawn from a cohort selected out of 248 applicants (≈3.2 per seat) and rated 4.5/5 — not a random crowd, but the region's strongest LLM builders.</span></div>
<div class="section-note" style="margin-top:14px">Sources: Armenia LLM Summer School 2025 applications &amp; attendance records and the 2024 participant feedback survey.</div>
</div>'''

tk_html="".join(track_cell(*t) for t in tracks)
tl_html="".join(tl_node(t,l) for t,l in timeline)
challenge=f'''<div>
<div class="h2">One challenge, <span class="accent">revealed at kickoff</span></div>
<div class="sub" style="margin-top:8px;max-width:175mm">Every team tackles the same real-world challenge, revealed live at kickoff. It draws from the Armenian public-interest domains below — teams ship a working prototype with a real evaluation, judged by one rubric.</div>
<div class="rule"></div>
<div class="tk-grid">{tk_html}</div>
<div style="margin-top:20px" class="chart-card"><div class="chart-h">The 24 hours</div>
<div class="chart-s">Saturday 10:00 to Sunday 13:00 — 24 hours of building, then Demo Day</div><div class="tl">{tl_html}</div></div>
<div style="margin-top:16px" class="grid2">
<div class="card"><div class="ic-t">What every strong build shows</div><div class="ic-b">A working prototype · a real (even lightweight) evaluation · named failure modes &amp; safety · realistic data · and a clear reason an LLM is the right tool.</div></div>
<div class="card"><div class="ic-t">Open by default</div><div class="ic-b">Winning projects are open-source and fully reproducible — a lasting public good, and a credible showcase of what your compute, data or problem statement made possible.</div></div></div>
</div>'''

why_html="".join(icon_card(*w) for w in why)
partner=f'''<div>
<div class="h2">Partner with <span class="accent">Hack Armenia</span></div>
<div class="sub" style="margin-top:8px;max-width:175mm">Four reasons companies back the sprint — and a tier for every level of commitment.</div>
<div class="rule"></div>
<div class="grid4">{why_html}</div>
<div style="display:flex;align-items:center;gap:12px;margin:22px 0 4px">
<div style="font-size:18px;font-weight:900;color:#fff">Sponsorship tiers</div>
<span class="indic">Indicative — subject to change</span></div>
<table><thead><tr><th style="text-align:left"></th>{thead}</tr></thead><tbody>{tbody}</tbody></table>
<div class="section-note" style="margin-top:12px">Every tier is flexible — cash, compute, prizes, mentorship, or a problem statement can all count toward it. Let's tailor a package to your goals.</div>
</div>'''

sup_html="".join(icon_card(*s) for s in support)
wall_html="".join(chip(fn) for fn in supporters)
support_page=f'''<div>
<div class="h2">Ways to <span class="accent">support</span></div>
<div class="sub" style="margin-top:8px;max-width:175mm">Four concrete forms of support — mix and match to build your partnership.</div>
<div class="rule"></div>
<div class="grid4">{sup_html}</div>
<div style="font-size:14px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#c7d2fe;margin:26px 0 4px">Past editions were made possible by</div>
<div class="wall">{wall_html}</div>
</div>
<div><div style="font-size:17px;font-weight:900;color:#fff;margin-bottom:10px">How to get involved</div>
<div class="steps">{step("1","Choose a way to support","Compute, prizes, mentors, or a problem statement — whatever fits your goals.")}{step("2","We tailor a package","Logo tier, mentor &amp; judge seats and recruiting access, mapped to what you want.")}{step("3","Join us on August 8","Meet the teams, judge the finals, and see your challenge come to life.")}</div></div>
<div class="contact">
<div><div style="font-size:22px;font-weight:900;color:#fff">Let's build something for Armenia.</div>
<div class="sub" style="font-size:14px;margin-top:4px">Reach out to discuss a partnership that fits your goals.</div></div>
<div style="text-align:right"><div style="font-size:16px;font-weight:800;color:#a78bfa">armeniallm@gmail.com</div>
<div class="sub" style="font-size:13px">armllm.github.io/2026/hackathon</div></div></div>'''

HTML=f'''<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>
{page(cover,"","between",wm="")}
{page(opp,"2","")}
{page(charts,"3","")}
{page(challenge,"4","")}
{page(partner,"5","")}
{page(support_page,"6","between")}
</body></html>'''
with open(OUT,"w") as f: f.write(HTML)
print("wrote",OUT,len(HTML),"bytes")
