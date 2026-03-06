import fs from 'node:fs/promises'

const CONTENT_PATH = '2026/funding-request-slides-content.json'
const OUT_PATH = '2026/funding-request-slides-2026.html'

function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

// Allows a small subset of inline HTML we intentionally store (e.g., <b>).
// We still escape everything else by default and only allow known tags.
function safeInlineHtml(s) {
  const raw = String(s ?? '')
  // Escape all then unescape allowed tags.
  const escaped = esc(raw)
  return escaped
    .replaceAll('&lt;b&gt;', '<b>')
    .replaceAll('&lt;/b&gt;', '</b>')
    .replaceAll('&lt;br /&gt;', '<br />')
    .replaceAll('&lt;br/&gt;', '<br/>')
}

function renderBullets(items, { fontSize } = {}) {
  const style = fontSize ? ` style="font-size: ${fontSize}px"` : ''
  return `
    <div class="list"${style}>
      ${items.map((x) => `<div>• ${safeInlineHtml(x)}</div>`).join('\n')}
    </div>
  `
}

function renderKpis(kpis, { columns } = {}) {
  const colStyle = columns ? ` style="grid-template-columns: ${columns}"` : ''
  return `
    <div class="kpiRow"${colStyle}>
      ${kpis
        .map(
          (k) => `
        <div class="kpi">
          <div class="tag">${esc(k.tag)}</div>
          <div class="n" style="font-size: 26px">${safeInlineHtml(k.value)}</div>
          <div class="l">${safeInlineHtml(k.label)}</div>
        </div>
      `
        )
        .join('\n')}
    </div>
  `
}

function renderKpisDefault(kpis) {
  return `
    <div class="kpiRow" style="margin-top: 10px">
      ${kpis
        .map(
          (k) => `
        <div class="kpi">
          <div class="tag">${esc(k.tag)}</div>
          <div class="n">${safeInlineHtml(k.value)}</div>
          <div class="l">${safeInlineHtml(k.label)}</div>
        </div>
      `
        )
        .join('\n')}
    </div>
  `
}

function renderFunnelSvg({ applications, registered, finalList }) {
  return `
    <div class="svgWrap">
      <svg width="520" height="520" viewBox="0 0 520 520" role="img" aria-label="Applications funnel">
        <defs>
          <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#818cf8" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#4f46e5" stop-opacity="0.95" />
          </linearGradient>
          <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="rgba(0,0,0,0.35)" />
          </filter>
        </defs>
        <rect x="40" y="70" width="440" height="110" rx="18" fill="url(#g1)" filter="url(#s)" />
        <rect x="85" y="220" width="350" height="100" rx="18" fill="rgba(255,255,255,0.09)" />
        <rect x="135" y="350" width="250" height="90" rx="18" fill="rgba(255,255,255,0.06)" />

        <text x="260" y="125" text-anchor="middle" font-size="42" font-weight="900" fill="white">${esc(
          applications
        )}</text>
        <text x="260" y="158" text-anchor="middle" font-size="16" fill="rgba(255,255,255,0.85)">
          Applications (2025)
        </text>

        <text x="260" y="274" text-anchor="middle" font-size="36" font-weight="900" fill="white">${esc(
          registered
        )}</text>
        <text x="260" y="302" text-anchor="middle" font-size="14" fill="rgba(255,255,255,0.82)">
          Registered
        </text>

        <text x="260" y="404" text-anchor="middle" font-size="34" font-weight="900" fill="white">${esc(
          finalList
        )}</text>
        <text x="260" y="432" text-anchor="middle" font-size="14" fill="rgba(255,255,255,0.82)">
          Final list
        </text>
      </svg>
    </div>
  `
}

function renderRatingsBars({ overall, lectures, instructors, handsOn }) {
  // Values are strings in content; parse to float and clamp.
  const clamp = (v) => Math.max(0, Math.min(5, v))
  const px = (v) => Math.round((clamp(v) / 5) * 420)
  const vals = {
    overall: clamp(Number(overall)),
    lectures: clamp(Number(lectures)),
    instructors: clamp(Number(instructors)),
    handsOn: clamp(Number(handsOn))
  }
  return `
    <div class="svgWrap">
      <svg width="600" height="360" viewBox="0 0 600 360" role="img" aria-label="Ratings bar chart">
        <defs>
          <linearGradient id="bar" x1="0" x2="1">
            <stop offset="0%" stop-color="#818cf8" />
            <stop offset="100%" stop-color="#4f46e5" />
          </linearGradient>
        </defs>
        <rect x="40" y="30" width="520" height="300" rx="18" fill="rgba(255,255,255,0.04)" />
        <g transform="translate(90,80)" fill="none" stroke="none">
          <text x="-10" y="10" text-anchor="end" font-size="14" fill="rgba(255,255,255,0.75)">Overall</text>
          <rect x="0" y="0" width="${px(vals.overall)}" height="26" rx="10" fill="url(#bar)" />
          <text x="${px(vals.overall) + 14}" y="20" font-size="14" fill="rgba(255,255,255,0.85)" font-family="ui-monospace">${vals.overall.toFixed(
            2
          )}</text>

          <text x="-10" y="70" text-anchor="end" font-size="14" fill="rgba(255,255,255,0.75)">Lectures</text>
          <rect x="0" y="60" width="${px(vals.lectures)}" height="26" rx="10" fill="url(#bar)" />
          <text x="${px(vals.lectures) + 14}" y="80" font-size="14" fill="rgba(255,255,255,0.85)" font-family="ui-monospace">${vals.lectures.toFixed(
            2
          )}</text>

          <text x="-10" y="130" text-anchor="end" font-size="14" fill="rgba(255,255,255,0.75)">Instructors</text>
          <rect x="0" y="120" width="${px(vals.instructors)}" height="26" rx="10" fill="url(#bar)" />
          <text x="${px(vals.instructors) + 14}" y="140" font-size="14" fill="rgba(255,255,255,0.85)" font-family="ui-monospace">${vals.instructors.toFixed(
            2
          )}</text>

          <text x="-10" y="190" text-anchor="end" font-size="14" fill="rgba(255,255,255,0.75)">Hands-on</text>
          <rect x="0" y="180" width="${px(vals.handsOn)}" height="26" rx="10" fill="url(#bar)" opacity="0.85" />
          <text x="${px(vals.handsOn) + 14}" y="200" font-size="14" fill="rgba(255,255,255,0.85)" font-family="ui-monospace">${vals.handsOn.toFixed(
            2
          )}</text>
        </g>
      </svg>
    </div>
  `
}

function htmlDoc(content) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(content.meta.title)}</title>
    <style>
      :root {
        --bg1: #0b1220;
        --bg2: #141b33;
        --card: rgba(255, 255, 255, 0.06);
        --card2: rgba(255, 255, 255, 0.04);
        --text: rgba(255, 255, 255, 0.92);
        --muted: rgba(255, 255, 255, 0.72);
        --muted2: rgba(255, 255, 255, 0.55);
        --accent: #818cf8;
        --accent2: #4f46e5;
        --shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
        --border: 1px solid rgba(255, 255, 255, 0.12);
        --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        --sans: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
      }
      @page { size: 13.333in 7.5in; margin: 0; }
      @media print {
        html, body { background: white !important; }
        .slide { box-shadow: none !important; }
        .slide:after { display: none !important; }
      }
      html, body {
        height: 100%;
        margin: 0;
        font-family: var(--sans);
        color: var(--text);
        background: radial-gradient(1200px 700px at 20% 10%, rgba(79, 70, 229, 0.35), transparent 60%),
          radial-gradient(900px 600px at 85% 20%, rgba(129, 140, 248, 0.28), transparent 60%),
          linear-gradient(160deg, var(--bg1), var(--bg2));
      }
      .deck { width: 100%; }
      .slide {
        position: relative;
        width: 1600px;
        height: 900px;
        margin: 0 auto 28px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.015));
        border: var(--border);
        border-radius: 18px;
        overflow: hidden;
        box-shadow: var(--shadow);
        page-break-after: always;
      }
      .slide:after {
        content: "";
        position: absolute;
        inset: 0;
        background: url("/images/logo_armllm_bg_removed.png") no-repeat 50% 52%;
        background-size: 980px auto;
        opacity: 0.04;
        pointer-events: none;
        filter: saturate(0.9);
      }
      .inner { position: relative; z-index: 1; height: 100%; padding: 54px 64px; display: flex; flex-direction: column; gap: 26px; }
      .top { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
      .brand { display: flex; align-items: center; gap: 14px; }
      .brand img { width: 54px; height: 54px; border-radius: 12px; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.12); object-fit: contain; }
      .brand .t1 { font-weight: 800; letter-spacing: 0.2px; font-size: 18px; }
      .brand .t2 { font-size: 14px; color: var(--muted); margin-top: 2px; }
      .pill { font-family: var(--mono); font-size: 12px; color: rgba(255, 255, 255, 0.9); padding: 10px 12px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.14); background: rgba(255, 255, 255, 0.05); }
      h1 { margin: 0; font-size: 56px; line-height: 1.06; letter-spacing: -0.6px; }
      h2 { margin: 0; font-size: 40px; letter-spacing: -0.4px; }
      p { margin: 0; color: var(--muted); font-size: 20px; line-height: 1.4; }
      .grid2 { display: grid; grid-template-columns: 1.18fr 0.82fr; gap: 22px; flex: 1; min-height: 0; }
      .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 18px; flex: 1; min-height: 0; }
      .card { background: var(--card); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 16px; padding: 22px; }
      .card h3 { margin: 0 0 10px; font-size: 20px; letter-spacing: -0.2px; }
      .card .sub { color: var(--muted2); font-size: 14px; margin-top: 10px; }
      .kpiRow { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
      .kpi { background: var(--card2); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 14px; padding: 16px 16px 14px; }
      .kpi .n { font-size: 34px; font-weight: 900; letter-spacing: -0.5px; margin: 2px 0 6px; }
      .kpi .l { font-size: 14px; color: var(--muted); }
      .kpi .tag { display: inline-block; font-family: var(--mono); font-size: 11px; padding: 6px 8px; border-radius: 999px; background: rgba(129, 140, 248, 0.12); border: 1px solid rgba(129, 140, 248, 0.25); color: rgba(255, 255, 255, 0.9); }
      .list { display: grid; gap: 10px; margin-top: 12px; font-size: 18px; color: var(--muted); }
      .list b { color: rgba(255, 255, 255, 0.92); }
      .footer { display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; color: var(--muted2); font-size: 12px; margin-top: auto; }
      .footer .src { max-width: 1120px; }
      .accent { background: linear-gradient(90deg, rgba(129, 140, 248, 1), rgba(79, 70, 229, 1)); -webkit-background-clip: text; background-clip: text; color: transparent; }
      .svgWrap { width: 100%; height: 100%; display: grid; place-items: center; }
      .note { font-family: var(--mono); font-size: 12px; color: var(--muted2); margin-top: 10px; }
    </style>
  </head>
  <body>
    <main class="deck">
      ${renderSlides(content)}
    </main>
  </body>
</html>
`
}

function renderSlides(c) {
  const s1 = c.slide1
  const s2 = c.slide2
  const s3 = c.slide3
  const s4 = c.slide4
  const s5 = c.slide5
  const s6 = c.slide6

  return `
<!-- Slide 1 -->
<section class="slide">
  <div class="inner">
    <div class="top">
      <div class="brand">
        <img src="/images/small_armllm.png" alt="ArmLLM" />
        <div>
          <div class="t1">Armenia LLM Summer School</div>
          <div class="t2">Annual training program + hands-on hackathon • Yerevan, Armenia</div>
        </div>
      </div>
      <div class="pill">${esc(s1.pill)}</div>
    </div>

    <div>
      <h1>${esc(s1.headline.includes('<') ? s1.headline : s1.headline).replace(
        'LLM',
        '<span class="accent">LLM</span>'
      )}<br />${esc(s1.subHeadline)}</h1>
      <p style="margin-top: 18px; max-width: 1100px">${esc(s1.intro)}</p>
    </div>

    <div class="grid2">
      <div class="card">
        <h3>${esc(s1.whatWeDeliverTitle)}</h3>
        ${renderBullets(s1.whatWeDeliverBullets)}
        <div class="sub" style="margin-top: 14px">${esc(s1.whatWeDeliverNote)}</div>
      </div>
      <div class="card">
        <h3>${esc(s1.atAGlanceTitle)}</h3>
        <div style="margin-top: 12px">
          ${renderKpis(s1.atAGlanceKpis, { columns: '1fr 1fr' })}
        </div>
        ${renderBullets(s1.atAGlanceBullets, { fontSize: 16 })}
        <div class="note">Draft deck • metrics from 2024–2025 editions</div>
      </div>
    </div>

    <div class="footer">
      <div>Armenia LLM Summer School • 2026</div>
      <div class="src">${esc(s1.footerSource)}</div>
    </div>
  </div>
</section>

<!-- Slide 2 -->
<section class="slide">
  <div class="inner">
    <div class="top">
      <div class="brand">
        <img src="/images/small_armllm.png" alt="ArmLLM" />
        <div>
          <div class="t1">${esc(s2.title)}</div>
          <div class="t2">${esc(s2.subtitle)}</div>
        </div>
      </div>
      <div class="pill">${esc(s2.pill)}</div>
    </div>

    <div class="grid2">
      <div class="card" style="display: flex; flex-direction: column; gap: 14px">
        <h2 style="font-size: 42px">${esc(s2.headline)}</h2>
        <p style="max-width: 720px">${esc(s2.body)}</p>

        ${renderKpisDefault(s2.kpis)}

        <div class="card" style="margin-top: 10px">
          <h3>${esc(s2.scaleTitle)}</h3>
          ${renderBullets(s2.scaleBullets, { fontSize: 18 })}
          <div class="sub">${esc('This is a proven annual program with repeatable delivery and consistent demand.')}</div>
        </div>

        <div class="card" style="margin-top: 6px">
          <h3>${esc(s2.whoAppliesTitle)}</h3>
          ${renderBullets(s2.whoAppliesBullets.map((x) => x), { fontSize: 18 })}
          <div class="sub">${esc(s2.whoAppliesNote)}</div>
        </div>
      </div>

      <div class="card">
        <h3>${esc(s2.funnelTitle)}</h3>
        ${renderFunnelSvg(s2.funnel)}
        <div class="note">Note: funnel stages reflect 2025 datasets (applications + registration/attendance sheet).</div>
      </div>
    </div>

    <div class="footer">
      <div>Armenia LLM Summer School • Proof of demand</div>
      <div class="src">${esc(s2.footerSource)}</div>
    </div>
  </div>
</section>

<!-- Slide 3 -->
<section class="slide">
  <div class="inner">
    <div class="top">
      <div class="brand">
        <img src="/images/small_armllm.png" alt="ArmLLM" />
        <div>
          <div class="t1">${esc(s3.title)}</div>
          <div class="t2">${esc(s3.subtitle)}</div>
        </div>
      </div>
      <div class="pill">${esc(s3.pill)}</div>
    </div>

    <div>
      <h2>${esc(s3.headline)}</h2>
      <p style="margin-top: 10px; max-width: 1100px">${esc(s3.body)}</p>
    </div>

    <div class="grid2">
      <div class="card">
        <h3>${esc(s3.surveyTitle)}</h3>
        <div style="margin-top: 14px">${renderKpis(s3.kpis)}</div>
        ${renderBullets(s3.bullets)}
        <div class="sub">These results support continued annual investment.</div>
      </div>
      <div class="card">
        <h3>Ratings (avg / 5)</h3>
        ${renderRatingsBars({
          overall: s3.kpis[0].value,
          lectures: s3.kpis[1].value,
          instructors: s3.kpis[2].value,
          handsOn: '4.11'
        })}
        <div class="note">We report aggregate feedback only (no personal data).</div>
      </div>
    </div>

    <div class="footer">
      <div>Armenia LLM Summer School • Track record</div>
      <div class="src">${esc(s3.footerSource)}</div>
    </div>
  </div>
</section>

<!-- Slide 4 -->
<section class="slide">
  <div class="inner">
    <div class="top">
      <div class="brand">
        <img src="/images/small_armllm.png" alt="ArmLLM" />
        <div>
          <div class="t1">${esc(s4.title)}</div>
          <div class="t2">${esc(s4.subtitle)}</div>
        </div>
      </div>
      <div class="pill">${esc(s4.pill)}</div>
    </div>

    <div>
      <h2>${esc(s4.headline)}</h2>
      <p style="margin-top: 10px; max-width: 1120px">${esc(s4.body)}</p>
    </div>

    <div class="grid3">
      <div class="card">
        <h3>${esc(s4.col1Title)}</h3>
        ${renderBullets(s4.col1Bullets, { fontSize: 18 })}
        <div class="sub">${esc(s4.col1Note)}</div>
      </div>
      <div class="card">
        <h3>${esc(s4.col2Title)}</h3>
        ${renderBullets(s4.col2Bullets, { fontSize: 18 })}
        <div class="sub">${esc(s4.col2Note)}</div>
      </div>
      <div class="card">
        <h3>${esc(s4.col3Title)}</h3>
        ${renderBullets(s4.col3Bullets, { fontSize: 18 })}
        <div class="sub">${esc(s4.col3Note)}</div>
      </div>
    </div>

    <div class="footer">
      <div>Armenia LLM Summer School • Faculty</div>
      <div class="src">${esc(s4.footerSource)}</div>
    </div>
  </div>
</section>

<!-- Slide 5 -->
<section class="slide">
  <div class="inner">
    <div class="top">
      <div class="brand">
        <img src="/images/small_armllm.png" alt="ArmLLM" />
        <div>
          <div class="t1">${esc(s5.title)}</div>
          <div class="t2">${esc(s5.subtitle)}</div>
        </div>
      </div>
      <div class="pill">${esc(s5.pill)}</div>
    </div>

    <div class="grid2">
      <div class="card">
        <h2 style="font-size: 42px">${esc(s5.headline)}</h2>
        <p style="margin-top: 10px; max-width: 760px">${esc(s5.body)}</p>
        <div class="card" style="margin-top: 18px">
          <h3>${esc(s5.organizersTitle)}</h3>
          ${renderBullets(s5.organizersBullets, { fontSize: 18 })}
          <div class="sub">${esc(s5.organizersNote)}</div>
        </div>
      </div>

      <div class="card">
        <h3>${esc(s5.supportTitle)}</h3>
        <div style="margin-top: 12px">
          <div class="kpiRow" style="grid-template-columns: 1fr 1fr">
            ${s5.supportKpis
              .map(
                (k) => `
              <div class="kpi">
                <div class="tag">${esc(k.tag)}</div>
                <div class="n" style="font-size: 24px">${safeInlineHtml(k.value)}</div>
                <div class="l">${safeInlineHtml(k.label)}</div>
              </div>
            `
              )
              .join('\n')}
          </div>
        </div>

        <div class="card" style="margin-top: 16px">
          <h3>${esc(s5.mediaTitle)}</h3>
          ${renderBullets(s5.mediaBullets, { fontSize: 18 })}
          <div class="sub">${esc(s5.mediaNote)}</div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div>Armenia LLM Summer School • Team & partners</div>
      <div class="src">${esc(s5.footerSource)}</div>
    </div>
  </div>
</section>

<!-- Slide 6 -->
<section class="slide">
  <div class="inner">
    <div class="top">
      <div class="brand">
        <img src="/images/small_armllm.png" alt="ArmLLM" />
        <div>
          <div class="t1">${esc(s6.title)}</div>
          <div class="t2">${esc(s6.subtitle)}</div>
        </div>
      </div>
      <div class="pill">${esc(s6.pill)}</div>
    </div>

    <div>
      <h2>${esc(s6.headline)}</h2>
      <p style="margin-top: 10px; max-width: 1120px">${esc(s6.body)}</p>
    </div>

    <div class="grid2" style="grid-template-columns: 1fr">
      <div class="card">
        <h3>${esc(s6.whereFundsGoTitle)}</h3>
        ${renderBullets(s6.whereFundsGoBullets)}
      </div>
    </div>

    <div class="footer">
      <div>Contact: ${esc(c.meta.contactEmail)}</div>
      <div class="src">Web: <span style="font-family: var(--mono)">${esc(c.meta.siteUrl2026)}</span> • Past editions: <span style="font-family: var(--mono)">${esc(
    c.meta.siteUrl2024
  )}</span>, <span style="font-family: var(--mono)">${esc(c.meta.siteUrl2025)}</span></div>
    </div>
  </div>
</section>
`
}

async function main() {
  const raw = await fs.readFile(CONTENT_PATH, 'utf8')
  const content = JSON.parse(raw)
  const out = htmlDoc(content)
  await fs.writeFile(OUT_PATH, out, 'utf8')
  console.log(`Wrote ${OUT_PATH}`)
}

main()

