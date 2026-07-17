# Hack Armenia — Hackathon Page Design

**Date:** 2026-07-17
**Route:** `/2026/hackathon`
**Status of source material:** The challenge design comes from an internal draft (`Hack Armenia - Challenge Design.pdf`, "Draft for owner review", owner approval targeted ~23 July 2026). The public page is therefore a **preview**: confident tone, but with a subtle "challenge details are being finalized" note, and no invented hard numbers (weights, prizes, exact compute, team size, final schedule).

## 1. Purpose

Add a rich, interactive public page for **Hack Armenia**, the 24-hour LLM build sprint that follows the Armenia LLM Summer School 2026 (Aug 8, at AI9 Startup Campus, organized by AI9 with ARMLLM as content co-organizer). The page must:

- Communicate the challenge shape: **one umbrella challenge, four Armenian public-interest domain tracks**, judged under a single rubric.
- Make the "evaluate · reason · generalize" theme concrete through **fleshed-out, buildable-in-24h, Armenia-specific project ideas**.
- Drive registration via a provided Google Form.
- Match the visual language and component patterns of the existing `Competition2026` page.

## 2. Approach

Chosen: **Rich interactive page** (`Competition2026`-caliber). A centerpiece **Domain Explorer** (tabbed tracks → expandable project-idea cards) carries the fleshed-out content; supporting sections use the existing design-system components with light `useState` interactivity, mirroring how `Competition2026.tsx` keeps most content in inline data arrays and extracts one big interactive component (`MatrixPlayground`).

Rejected: static page (fails the "very nice and interactive" ask); compact teaser (doesn't use the fleshed-out content).

## 3. Architecture

New / changed files:

- **`src/pages/Hackathon2026.tsx`** (new) — the page. `memo`, lazy-loaded, uses `SEO`, `SectionTitle`, `Card`, `Button`, `FAQ`. Holds inline data arrays for constraints, submission requirements, rubric, timeline, rules, FAQ (same style as `Competition2026`).
- **`src/data/hackathonDomains.ts`** (new) — typed domain/idea content (the bulk of the fleshed-out material).
- **`src/components/hackathon/DomainExplorer.tsx`** (new) — the interactive tabbed explorer with expandable idea cards. This is the one extracted interactive component (isolation/clarity: one clear job, driven entirely by `hackathonDomains.ts`).
- **`src/App.tsx`** (edit) — add lazy import + `<Route path="/2026/hackathon" element={<Hackathon2026 />} />`.
- **`src/pages/Edition2026.tsx`** (edit) — add a **Hackathon banner** section (styled like the existing Competition banner) linking to `/2026/hackathon`; update the "August 8" agenda note to link to the page.
- **`src/data/faq2026.ts`** (edit) — extend the existing hackathon FAQ answers with a link to `/2026/hackathon`.

**Not** added to the top nav — consistent with the recent decision (commit `e54778b`) to keep Competition/Results out of the header and surface them via a banner on the 2026 page.

### Data types (`hackathonDomains.ts`)

```ts
export interface ProjectIdea {
  title: string
  hook: string        // one-line teaser shown on the collapsed card
  problem: string
  data: string        // "Realistic data"
  whyLLM: string      // "Why an LLM"
  evaluate: string    // "How to evaluate"
  impact: string      // "Impact for Armenia"
}
export interface Domain {
  key: string
  icon: string        // emoji
  name: string
  tagline: string
  ideas: ProjectIdea[]
}
export const hackathonDomains: Domain[]
```

The five idea fields deliberately mirror the challenge's Required constraints + Submission requirements (working prototype, evaluation method, failure modes/safety, realistic data, why-LLM, impact note).

### DomainExplorer behavior

- Row of four track tabs (icon + name); selecting a tab is `useState`.
- Active tab shows its tagline + a grid of idea cards.
- Each idea card shows `title` + `hook` collapsed; clicking expands to reveal the five fields (Problem / Realistic data / Why an LLM / How to evaluate / Impact for Armenia). Independent expand state per card.
- Accessible: buttons for tabs and card toggles, `aria-expanded`, keyboard-activatable.
- Optional nicety: a "Surprise me" button that selects a random track + expands a random idea (varies by a click counter, not `Math.random` at module load).

## 4. Page sections (top → bottom)

1. **Hero** — badge "ARMLLM 2026 · Hackathon"; H1 "Hack Armenia"; subtitle "A 24-hour LLM build sprint for Armenia"; framing line; primary CTA **Register** (→ `REGISTER_URL`), secondary CTAs "Explore the tracks" (`#tracks`) and "Submission requirements" (`#submit`). A subtle pill: *"Challenge details are being finalized — subject to change."* Date line: "August 8, 2026 · starts 00:00 · 24 hours · AI9 Startup Campus, Yerevan."
2. **Quick facts** — four `Card`s: When (Aug 8, 24h) / Where (AI9) / Who (organized by AI9; ARMLLM co-organizes content) / What (one challenge, four tracks).
3. **The challenge in one minute** — the framing paragraph + the umbrella-challenge line; theme keywords **evaluate · reason · generalize** highlighted. Key-rule callout: "one challenge, several Armenian public-interest domains, judged under one umbrella."
4. **★ Choose your track (Domain Explorer)** — `id="tracks"`. `<DomainExplorer />`. Intro line: pick a domain you care about; every track is judged by the same rubric.
5. **What judges look for** — the five **Required constraints** as an interactive expand-on-click checklist (each item expands to "why it matters / what strong looks like").
6. **Submission requirements** — `id="submit"`. Five cards: Demo (<3 min, live or recorded) / Pitch (3–5 min + Q) / Artifact (fully reproducible repo, app link, or packaged prototype) / Evaluation (test set, rubric, examples, or benchmark) / Impact note (who uses it, what changes if it works).
7. **Judging rubric** — four descriptive dimensions (no invented weights): Idea quality & fit to an Armenian public-interest problem; Evaluation & evidence (did they actually test it); Understanding of model limitations, failure modes & safety; Real-world plausibility (works beyond the demo, realistic data, reproducible).
8. **The 24 hours (indicative timeline)** — vertical timeline, clearly marked *"indicative — the final schedule is shared at kickoff."* Stages: Kickoff & challenge brief (00:00) → Team formation & pick your track → Build (mentor checkpoints) → Mid-point evaluation gut-check → Build continues → Code freeze & demo prep → Demos & pitches → Judging & awards.
9. **Rules & tools** — resolved answers from the draft: any model/API allowed; **open-source + full reproducibility required**; Armenian-language **encouraged (not required)**; data = anything publicly available or provided by organizers before/during is fair game; **compute support planned** (GPU or API credits) with "details announced closer to the event" (no fixed numbers). Presented as a "Good to know" grid.
10. **Prizes** — single card: **"Prizes — to be announced."**
11. **FAQ** — `FAQ` component with a `hackathonFAQ` category set (see §6).
12. **Register** — `id="register"`; embedded Google Form (`FORM_EMBED`) with an "open in new tab" fallback button (`FORM_VIEW`), matching the `Competition2026` submit section; note that registration is run by AI9.
13. **Back to 2026** — link to `/2026`.

Alternating section backgrounds (`bg-glass` / `bg-secondary/70`) and `SectionTitle` usage follow `Competition2026`.

## 5. Fleshed-out domain content (the approved material)

Each idea carries all five fields.

### 🏙️ Urban development — *LLM/VLM agents reasoning over city reports, citizen requests, maps, and planning documents.*

**Traffic-signal calibration copilot**
- Problem: Yerevan intersections run largely static signal timings that don't adapt to real congestion; retiming is slow and manual.
- Data: Traffic counts, OpenStreetMap road network, municipal complaint logs (or synthetic).
- Why an LLM: Reasons jointly over count tables, free-text complaints, and map context, and proposes timing changes with an auditable written justification.
- Evaluate: Replay historical congestion windows; measure agreement with expert retiming and/or simulated average-delay reduction in a simple traffic sim.
- Impact: Shorter commutes and data-driven traffic operations for the municipality.

**Curbside parking finder (VLM)**
- Problem: Drivers cruise for parking, adding congestion and emissions.
- Data: Street-level imagery (dashcam/phone) + OSM parking tags; a small labeled occupancy set.
- Why an LLM: A VLM reads unstructured street scenes to judge free/occupied and phrases a suggestion ("2 spots ~80m ahead on the right").
- Evaluate: Precision/recall on a labeled occupancy test set; report false-positive rate (sending drivers to full spots is worse than nothing).
- Impact: Less cruising, smoother traffic, and lower emissions in dense districts.

**Construction-permit pre-check assistant**
- Problem: Permit applications bounce repeatedly over avoidable code/zoning issues.
- Data: Published Armenian building codes & Yerevan zoning rules + sample/synthetic applications.
- Why an LLM: Cross-references free-text applications against long, cross-referencing regulations and explains *why* something fails.
- Evaluate: Rubric on an expert-annotated set — did it catch the real issues, with correct citations? Report false-flag rate.
- Impact: Faster, more transparent permitting; fewer rejected filings for citizens and staff.

**Citizen-request triage & routing**
- Problem: City service requests arrive as messy free text and get mis-routed or duplicated, slowing response.
- Data: Municipal request logs (or synthetic) + a department taxonomy.
- Why an LLM: Classifies intent, extracts location/urgency, deduplicates near-identical reports, and routes to the right unit.
- Evaluate: Routing accuracy vs. labeled department; dedupe precision/recall; location-extraction accuracy.
- Impact: Faster municipal response and cleaner analytics on recurring problems.

### 🏛️ Public systems & policy — *Tools that help institutions evaluate options, extract evidence, or explain decisions.*

**SME tax-filing copilot**
- Problem: Sole proprietors and small firms struggle with declaration paperwork and misfile.
- Data: Public Armenian tax code + official form schemas + synthetic receipts/invoices.
- Why an LLM: Maps messy receipt text to the right fields and explains category choices in plain language.
- Evaluate: Field-level accuracy on a labeled receipt→form test set; must surface failure modes (ambiguous categories) rather than silently guess.
- Impact: Lower compliance burden and fewer errors for the country's many small businesses.

**e-Invoicing extraction & reconciliation**
- Problem: Businesses hand-key invoice data into e-invoicing systems, causing errors and delays.
- Data: Scanned/synthetic invoices + the target e-invoice schema; public tax references.
- Why an LLM: Extracts structured line items from varied invoice layouts, produces a schema-valid payload, and reconciles totals against declarations.
- Evaluate: Line-item extraction F1 + share of schema-valid outputs; flag mismatches instead of silently accepting them.
- Impact: Less manual data entry and fewer filing errors for businesses and tax authorities.

**Policy-evidence extractor & explainer**
- Problem: Draft laws and budgets are long and opaque; the public and even staff can't quickly see what changes and who's affected.
- Data: Published draft legislation / budget documents (Armenian).
- Why an LLM: Extracts discrete provisions, grounds each in a cited passage, and writes a plain-Armenian "who is affected and how" summary.
- Evaluate: Grounding check — does every claim cite a real supporting passage (no hallucinated provisions)? Plus a human clarity/accuracy rubric.
- Impact: More transparent policy and more informed public debate.

**Public-procurement anomaly assistant**
- Problem: Suspicious tender patterns (odd clauses, single-bidder awards) are hard to spot at scale.
- Data: Public procurement portal documents (or synthetic tenders).
- Why an LLM: Reads long tender text and flags unusual clauses and risk patterns with an explanation and citation.
- Evaluate: Precision on a labeled "flagged/normal" set; false-flag rate.
- Impact: Stronger oversight and anti-corruption tooling for watchdogs and auditors.

### 🩺 Healthcare — *safety-first: safe triage, knowledge retrieval, patient education, administrative automation.*

**Guarded symptom-triage assistant (Armenian)**
- Problem: People struggle to know whether a symptom needs self-care, a GP, or urgent help — worse in rural areas.
- Data: Public clinical triage guidelines; a small set of vignettes.
- Why an LLM: Conducts an adaptive structured interview and explains the routing in plain Armenian. **Not diagnosis.**
- Evaluate: Agreement with a nurse-authored triage rubric on vignettes; explicitly measure **over- and under-triage rates**; document failure modes and safety rails.
- Impact: Better navigation of the health system, especially for underserved regions — without pretending to diagnose.

**Clinic scheduling & no-show reduction agent**
- Problem: Under-staffed clinics lose capacity to no-shows and inefficient scheduling.
- Data: Synthetic scheduling logs + clinic constraints.
- Why an LLM: Reasons over cancellations/constraints to propose schedules and generate tailored reminders.
- Evaluate: Simulated utilization / no-show reduction against a baseline scheduler.
- Impact: More patients seen with the same staff.

**Medical-coding & insurance-dispute drafter**
- Problem: Claims get denied over coding issues; appealing is slow, manual admin work.
- Data: Public coding standards + insurer/ArMed-style policy docs; synthetic visit summaries.
- Why an LLM: Maps a visit summary to diagnosis/procedure codes and drafts a policy-cited appeal letter for denied claims.
- Evaluate: Coding accuracy vs. labels + human review of appeal quality and faithfulness to policy.
- Impact: Fewer wrongly denied claims and less administrative burden on clinicians.

**Patient-education explainer**
- Problem: Discharge summaries and lab results are written for clinicians, not patients.
- Data: Sample/synthetic discharge summaries and lab panels + public patient-education references.
- Why an LLM: Rewrites clinical text into plain Armenian at a chosen reading level, with safety caveats and "when to seek care."
- Evaluate: Factual-consistency check against the source + readability target; flag anything it can't ground.
- Impact: Better health literacy and follow-through, especially for older and rural patients.

### 🎓 Education — *personalized learning, assessment tools, Armenian-language support (a major plus).*

**Armenian-language Socratic tutor**
- Problem: Students need help that scaffolds thinking, not answer keys; teachers can't be everywhere.
- Data: Open Armenian curriculum materials for a chosen unit.
- Why an LLM: Runs a grounded, Socratic dialogue that hints and probes without revealing the answer.
- Evaluate: On a problem set, measure how often it stays grounded / doesn't leak the answer / doesn't hallucinate; a small student-facing pilot if possible.
- Impact: Personalized, Armenian-language learning support at scale.

**Auto-grading assistant for teachers**
- Problem: Teachers spend hours grading and giving feedback in large classes.
- Data: Rubrics + anonymized or synthetic student answers (Armenian preferred).
- Why an LLM: Applies a rubric consistently, writes feedback, and flags borderline cases instead of overruling the teacher.
- Evaluate: Agreement with teacher grades (e.g., quadratic-weighted kappa) + calibration; show where it's unreliable.
- Impact: Frees teacher time and gives students faster feedback, in Armenian.

**Grounded material adaptation / differentiation**
- Problem: One lesson has to serve students at different levels; manual differentiation is time-consuming.
- Data: A source lesson + target reading levels / learner profiles.
- Why an LLM: Rewrites/adapts material to a level or specific gaps while staying faithful to the source.
- Evaluate: Factual consistency with the source + hitting the target reading level; catch drift or added claims.
- Impact: Inclusive, multi-level classrooms without doubling teacher prep.

**Knowledge-assessment generator**
- Problem: Making good, aligned quizzes from materials is slow.
- Data: A set of source materials (Armenian preferred).
- Why an LLM: Generates questions + an answer key + difficulty labels, each answerable from the source.
- Evaluate: Item validity (answerable from text), answer-key correctness, distractor quality; human spot-check.
- Impact: Faster, source-aligned assessment for teachers and self-learners.

## 6. FAQ content (`hackathonFAQ`)

- **Is this the same as the entrance competition?** No — the Matrix Arena competition is the Summer School entrance test; Hack Armenia is a 24-hour build sprint on Aug 8, organized by AI9 with ARMLLM co-organizing content, with its own separate registration.
- **Who can take part / do I need to attend the school?** (Hedged — "details at registration"; open to strong engineers and researchers.)
- **What do we build?** An LLM-powered system in one Armenian public-interest domain that can evaluate evidence, reason under uncertainty, and generalize — with a working prototype and a real (even lightweight) evaluation.
- **Can I use any model or API?** Yes — anything goes.
- **Does it have to be open source?** Yes — open source with full reproducibility is required.
- **Do we have to work in Armenian?** Encouraged and a real plus, but not required.
- **What data can we use?** Anything publicly available, or data the organizers provide before/during the event.
- **Is compute provided?** Compute support (GPU or API credits) is planned; specifics are announced closer to the event.
- **How do we register?** Via the registration form (button on this page); registration is run by AI9.

The two existing hackathon Q&As in `faq2026.ts` stay, with a link added to `/2026/hackathon`.

## 7. Constants

```
REGISTER_URL (FORM_VIEW) = https://docs.google.com/forms/d/e/1FAIpQLSfnxFoPMmU_k6sE_V_kCSiCh-AMgf9VnbDkyrxqzH395xHrng/viewform?usp=sharing
FORM_EMBED               = https://docs.google.com/forms/d/e/1FAIpQLSfnxFoPMmU_k6sE_V_kCSiCh-AMgf9VnbDkyrxqzH395xHrng/viewform?embedded=true
HACK_DATE   = "August 8, 2026"   (starts 00:00, runs 24 hours)
VENUE       = "AI9 Startup Campus, Yerevan"
CONTACT_EMAIL = "armeniallm@gmail.com"
```

(`&ouid=…` from the supplied link is dropped — it is the owner's account id and is unnecessary for a shared link.)

## 8. Explicitly hedged / out of scope

- No invented prize amounts, judging weights, compute numbers, team sizes, or final minute-by-minute schedule — all shown as "to be announced" / "indicative" / "details closer to the event."
- No top-nav entry (banner-on-2026 pattern instead).
- No new backend; the form is a plain Google Form embed/link.
- Internal draft artifacts (owner names, "open decisions", the 23 July approval date) are **not** surfaced on the public page.

## 9. Verification

- `npm run build` (tsc + vite) passes with no type errors.
- Route `/2026/hackathon` renders; hero CTAs, Domain Explorer tab switching, idea-card expand/collapse, checklist expand, and the embedded form all work.
- The Hackathon banner on `/2026` links to the page; the FAQ link resolves.
- Responsive check at mobile widths (tabs and grids wrap like the Competition page).
