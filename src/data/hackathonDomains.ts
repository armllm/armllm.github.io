export interface ProjectIdea {
  title: string
  /** One-line teaser shown on the collapsed card. */
  hook: string
  problem: string
  /** "Realistic data" */
  data: string
  /** "Why an LLM" */
  whyLLM: string
  /** "How to evaluate" */
  evaluate: string
  /** "Impact for Armenia" */
  impact: string
}

export interface Domain {
  key: string
  icon: string
  name: string
  tagline: string
  ideas: ProjectIdea[]
}

export const hackathonDomains: Domain[] = [
  {
    key: 'urban',
    icon: '🏙️',
    name: 'Urban development',
    tagline:
      'LLM and VLM agents that reason over city reports, citizen requests, maps, and planning documents.',
    ideas: [
      {
        title: 'Traffic-signal calibration copilot',
        hook: 'Turn traffic counts and citizen complaints into auditable signal-timing changes.',
        problem:
          "Yerevan intersections run largely static signal timings that don't adapt to real congestion, and retiming is slow and manual.",
        data: 'Traffic counts, the OpenStreetMap road network, and municipal complaint logs (or synthetic stand-ins).',
        whyLLM:
          'Reasons jointly over count tables, free-text complaints, and map context, and proposes timing changes with an auditable written justification.',
        evaluate:
          'Replay historical congestion windows; measure agreement with expert retiming and/or simulated average-delay reduction in a simple traffic sim.',
        impact: 'Shorter commutes and data-driven traffic operations for the municipality.',
      },
      {
        title: 'Curbside parking finder (VLM)',
        hook: 'Read the street and tell drivers where the open spots are.',
        problem: 'Drivers cruise for parking, adding congestion and emissions.',
        data: 'Street-level imagery (dashcam or phone) plus OSM parking tags, and a small labeled occupancy set.',
        whyLLM:
          'A VLM reads unstructured street scenes to judge free vs. occupied and phrases a suggestion ("2 spots ~80m ahead on the right").',
        evaluate:
          'Precision/recall on a labeled occupancy test set; report the false-positive rate — sending drivers to full spots is worse than nothing.',
        impact: 'Less cruising, smoother traffic, and lower emissions in dense districts.',
      },
      {
        title: 'Construction-permit pre-check assistant',
        hook: 'Flag likely code and zoning issues before an application is filed.',
        problem: 'Permit applications bounce repeatedly over avoidable code and zoning issues.',
        data: 'Published Armenian building codes and Yerevan zoning rules, plus sample or synthetic applications.',
        whyLLM:
          'Cross-references free-text applications against long, cross-referencing regulations and explains why something fails.',
        evaluate:
          'Rubric on an expert-annotated set — did it catch the real issues, with correct citations? Report the false-flag rate.',
        impact: 'Faster, more transparent permitting and fewer rejected filings for citizens and staff.',
      },
      {
        title: 'Citizen-request triage & routing',
        hook: 'Sort, locate, and de-duplicate messy city service requests automatically.',
        problem:
          'City service requests arrive as messy free text and get mis-routed or duplicated, slowing response.',
        data: 'Municipal request logs (or synthetic) plus a department taxonomy.',
        whyLLM:
          'Classifies intent, extracts location and urgency, de-duplicates near-identical reports, and routes to the right unit.',
        evaluate:
          'Routing accuracy vs. labeled department; dedupe precision/recall; location-extraction accuracy.',
        impact: 'Faster municipal response and cleaner analytics on recurring problems.',
      },
    ],
  },
  {
    key: 'public',
    icon: '🏛️',
    name: 'Public systems & policy',
    tagline:
      'Tools that help institutions evaluate options, extract evidence, or explain decisions.',
    ideas: [
      {
        title: 'SME tax-filing copilot',
        hook: 'Walk a small business through declarations and pre-fill the forms.',
        problem: 'Sole proprietors and small firms struggle with declaration paperwork and misfile.',
        data: 'The public Armenian tax code, official form schemas, and synthetic receipts/invoices.',
        whyLLM:
          'Maps messy receipt text to the right fields and explains category choices in plain language.',
        evaluate:
          'Field-level accuracy on a labeled receipt-to-form test set; it must surface failure modes (ambiguous categories) rather than silently guess.',
        impact: "Lower compliance burden and fewer errors for the country's many small businesses.",
      },
      {
        title: 'e-Invoicing extraction & reconciliation',
        hook: 'Turn scanned invoices into valid structured payloads, reconciled to declarations.',
        problem:
          'Businesses hand-key invoice data into e-invoicing systems, causing errors and delays.',
        data: 'Scanned or synthetic invoices, the target e-invoice schema, and public tax references.',
        whyLLM:
          'Extracts structured line items from varied invoice layouts, produces a schema-valid payload, and reconciles totals against declarations.',
        evaluate:
          'Line-item extraction F1 plus the share of schema-valid outputs; flag mismatches instead of silently accepting them.',
        impact: 'Less manual data entry and fewer filing errors for businesses and tax authorities.',
      },
      {
        title: 'Policy-evidence extractor & explainer',
        hook: 'Explain who a draft law affects — with every claim cited to the text.',
        problem:
          "Draft laws and budgets are long and opaque; the public and even staff can't quickly see what changes and who is affected.",
        data: 'Published draft legislation and budget documents (Armenian).',
        whyLLM:
          'Extracts discrete provisions, grounds each in a cited passage, and writes a plain-Armenian "who is affected and how" summary.',
        evaluate:
          'Grounding check — does every claim cite a real supporting passage (no hallucinated provisions)? Plus a human clarity/accuracy rubric.',
        impact: 'More transparent policy and more informed public debate.',
      },
      {
        title: 'Public-procurement anomaly assistant',
        hook: 'Surface odd clauses and single-bidder patterns in public tenders.',
        problem: 'Suspicious tender patterns (odd clauses, single-bidder awards) are hard to spot at scale.',
        data: 'Public procurement portal documents (or synthetic tenders).',
        whyLLM:
          'Reads long tender text and flags unusual clauses and risk patterns with an explanation and citation.',
        evaluate: 'Precision on a labeled "flagged/normal" set and the false-flag rate.',
        impact: 'Stronger oversight and anti-corruption tooling for watchdogs and auditors.',
      },
    ],
  },
  {
    key: 'health',
    icon: '🩺',
    name: 'Healthcare',
    tagline:
      'Safety-first: safe triage, knowledge retrieval, patient education, and administrative automation.',
    ideas: [
      {
        title: 'Guarded symptom-triage assistant (Armenian)',
        hook: 'Route symptoms to the right level of care — with hard safety rails, not diagnosis.',
        problem:
          'People struggle to know whether a symptom needs self-care, a GP, or urgent help — worse in rural areas.',
        data: 'Public clinical triage guidelines and a small set of vignettes.',
        whyLLM:
          'Conducts an adaptive structured interview and explains the routing in plain Armenian. Not diagnosis.',
        evaluate:
          'Agreement with a nurse-authored triage rubric on vignettes; explicitly measure over- and under-triage rates and document failure modes and safety rails.',
        impact:
          'Better navigation of the health system, especially for underserved regions — without pretending to diagnose.',
      },
      {
        title: 'Clinic scheduling & no-show reduction agent',
        hook: 'Fill the schedule and cut no-shows for under-staffed clinics.',
        problem: 'Under-staffed clinics lose capacity to no-shows and inefficient scheduling.',
        data: 'Synthetic scheduling logs and clinic constraints.',
        whyLLM:
          'Reasons over cancellations and constraints to propose schedules and generate tailored reminders.',
        evaluate: 'Simulated utilization / no-show reduction against a baseline scheduler.',
        impact: 'More patients seen with the same staff.',
      },
      {
        title: 'Medical-coding & insurance-dispute drafter',
        hook: 'Code a visit and draft a policy-cited appeal for a denied claim.',
        problem: 'Claims get denied over coding issues, and appealing is slow, manual admin work.',
        data: 'Public coding standards, insurer/ArMed-style policy docs, and synthetic visit summaries.',
        whyLLM:
          'Maps a visit summary to diagnosis/procedure codes and drafts a policy-cited appeal letter for denied claims.',
        evaluate:
          'Coding accuracy vs. labels plus human review of appeal quality and faithfulness to policy.',
        impact: 'Fewer wrongly denied claims and less administrative burden on clinicians.',
      },
      {
        title: 'Patient-education explainer',
        hook: 'Rewrite discharge notes and lab results into plain, safe Armenian.',
        problem: 'Discharge summaries and lab results are written for clinicians, not patients.',
        data: 'Sample or synthetic discharge summaries and lab panels, plus public patient-education references.',
        whyLLM:
          'Rewrites clinical text into plain Armenian at a chosen reading level, with safety caveats and "when to seek care."',
        evaluate:
          'Factual-consistency check against the source plus a readability target; flag anything it cannot ground.',
        impact: 'Better health literacy and follow-through, especially for older and rural patients.',
      },
    ],
  },
  {
    key: 'education',
    icon: '🎓',
    name: 'Education',
    tagline:
      'Personalized learning, assessment tools, and Armenian-language support (a major plus).',
    ideas: [
      {
        title: 'Armenian-language Socratic tutor',
        hook: 'Scaffold a student to the answer instead of handing it over.',
        problem:
          "Students need help that scaffolds thinking, not answer keys, and teachers can't be everywhere.",
        data: 'Open Armenian curriculum materials for a chosen unit.',
        whyLLM: 'Runs a grounded, Socratic dialogue that hints and probes without revealing the answer.',
        evaluate:
          "On a problem set, measure how often it stays grounded, doesn't leak the answer, and doesn't hallucinate; a small student-facing pilot if possible.",
        impact: 'Personalized, Armenian-language learning support at scale.',
      },
      {
        title: 'Auto-grading assistant for teachers',
        hook: 'Grade short answers against a rubric, with feedback and human-review flags.',
        problem: 'Teachers spend hours grading and giving feedback in large classes.',
        data: 'Rubrics plus anonymized or synthetic student answers (Armenian preferred).',
        whyLLM:
          'Applies a rubric consistently, writes feedback, and flags borderline cases instead of overruling the teacher.',
        evaluate:
          'Agreement with teacher grades (e.g., quadratic-weighted kappa) plus calibration; show where it is unreliable.',
        impact: 'Frees teacher time and gives students faster feedback, in Armenian.',
      },
      {
        title: 'Grounded material adaptation',
        hook: 'Adapt one lesson to many reading levels without drifting from the source.',
        problem:
          'One lesson has to serve students at different levels, and manual differentiation is time-consuming.',
        data: 'A source lesson plus target reading levels or learner profiles.',
        whyLLM:
          'Rewrites and adapts material to a level or specific gaps while staying faithful to the source.',
        evaluate:
          'Factual consistency with the source plus hitting the target reading level; catch drift or added claims.',
        impact: 'Inclusive, multi-level classrooms without doubling teacher prep.',
      },
      {
        title: 'Knowledge-assessment generator',
        hook: 'Generate a valid quiz and answer key from source materials.',
        problem: 'Making good, aligned quizzes from materials is slow.',
        data: 'A set of source materials (Armenian preferred).',
        whyLLM:
          'Generates questions, an answer key, and difficulty labels, each answerable from the source.',
        evaluate:
          'Item validity (answerable from text), answer-key correctness, and distractor quality; human spot-check.',
        impact: 'Faster, source-aligned assessment for teachers and self-learners.',
      },
    ],
  },
  {
    key: 'security',
    icon: '🔒',
    name: 'Security',
    tagline:
      'LLM and VLM systems that detect threats, harden software, and keep Armenian users and institutions safe online.',
    ideas: [
      {
        title: 'Phishing & scam detector (Armenian)',
        hook: 'Catch fraudulent SMS, emails, and sites targeting Armenian users.',
        problem:
          'Armenian users are hit by bank-impersonation SMS, fake government notices, and scam sites, with little localized protection.',
        data: 'Public phishing corpora plus collected or synthetic Armenian-language scam messages and URLs.',
        whyLLM:
          'Reads unstructured messages in Armenian and English, judges intent, and explains the red flags in plain language.',
        evaluate:
          'Precision/recall on a labeled phishing-vs-legitimate set; report the false-positive rate, since flagging real bank messages erodes trust.',
        impact: 'Protects citizens — especially older, less tech-savvy users — from fraud.',
      },
      {
        title: 'Secure-code review assistant',
        hook: 'Scan a repo or diff for vulnerabilities and explain the fix.',
        problem: 'Small Armenian dev teams and startups often ship code without any security review.',
        data: 'Public vulnerability datasets (known CWE/CVE samples) and open-source repositories.',
        whyLLM:
          'Reasons over code context to spot injection, hard-coded secrets, and broken authorization, and drafts a concrete fix with rationale.',
        evaluate:
          'Detection rate on a labeled vulnerable/clean code set plus the false-positive rate; compare against a plain linter baseline.',
        impact: "Safer software from Armenia's growing tech sector.",
      },
      {
        title: 'Log anomaly explainer',
        hook: 'Turn noisy server and auth logs into plain-language incident summaries.',
        problem: "Small organizations can't staff a security operations center to watch their logs.",
        data: 'Public security-log datasets (auth, web, network) with labeled incidents.',
        whyLLM:
          'Correlates events across noisy logs, flags patterns like brute-force or data exfiltration, and explains them for non-experts.',
        evaluate:
          'Detection precision/recall on labeled incidents; measure alert volume, since drowning users in alerts is its own failure mode.',
        impact: 'A lightweight "SOC-in-a-box" for under-resourced institutions.',
      },
      {
        title: 'Security-advisory triage & patch assistant',
        hook: 'Turn CVE feeds into a prioritized, org-specific patch plan.',
        problem: "IT teams drown in vulnerability advisories and can't tell which ones matter for their systems.",
        data: 'Public CVE/NVD feeds plus a synthetic asset inventory.',
        whyLLM:
          "Maps advisories to the organization's actual software, prioritizes by exploitability and exposure, and drafts remediation steps.",
        evaluate: 'Prioritization agreement with an expert ranking on a labeled advisory set.',
        impact: 'Faster, smarter patching for under-staffed Armenian IT teams.',
      },
    ],
  },
  {
    key: 'food',
    icon: '🍎',
    name: 'Food & agriculture',
    tagline:
      "LLM and VLM tools for farmers, food safety, and nutrition — a sector at the heart of Armenia's economy.",
    ideas: [
      {
        title: 'Crop advisory & plant-disease agent (VLM)',
        hook: 'Diagnose plant disease from a photo and advise on the fix, in Armenian.',
        problem: 'Smallholder farmers lack timely agronomy advice and often misidentify crop diseases.',
        data: 'Public plant-disease image datasets, agronomy guidelines, and weather data.',
        whyLLM:
          'A VLM identifies disease from a leaf photo; the LLM reasons over weather and crop guidelines to recommend treatment and timing in Armenian.',
        evaluate:
          'Disease-classification accuracy on a held-out image set plus an advice-quality rubric; flag low-confidence cases instead of guessing.',
        impact: 'Higher yields and lower losses for smallholder farmers.',
      },
      {
        title: 'Food-safety inspection assistant',
        hook: 'Help inspectors catch violations and document them faster.',
        problem: 'Food-safety oversight is stretched thin and applied inconsistently.',
        data: 'Public food-safety regulations plus synthetic inspection reports and restaurant reviews.',
        whyLLM:
          'Cross-references reports against regulations to flag likely violations with citations, and drafts the write-up.',
        evaluate:
          'Rubric on an expert-annotated set of cases — did it catch the real violations with correct citations? Report false flags.',
        impact: 'A safer food supply with less inspector paperwork.',
      },
      {
        title: 'Market-price & supply intelligence',
        hook: 'Tell farmers where and when to sell for a fair price.',
        problem: 'Producers lack visibility into produce prices across markets and get squeezed by middlemen.',
        data: 'Public or collected market price feeds across regions.',
        whyLLM: 'Aggregates messy price data, explains trends, and reasons about where and when to sell.',
        evaluate: 'Forecast and explanation accuracy against held-out prices; sanity-check against a naive baseline.',
        impact: 'Fairer prices and less waste for producers.',
      },
      {
        title: 'Nutrition & meal-planning assistant (Armenian cuisine)',
        hook: 'Affordable, healthy meal plans grounded in local ingredients.',
        problem: 'Families want healthy meals but lack guidance tuned to local food and budgets.',
        data: 'Nutrition databases plus Armenian recipes and seasonal-ingredient lists.',
        whyLLM:
          'Generates budget- and diet-aware meal plans grounded in local dishes, and explains substitutions.',
        evaluate:
          'Nutritional accuracy against a reference plus groundedness — does it stay within real ingredients and recipes?',
        impact: 'Better nutrition literacy using familiar, affordable food.',
      },
    ],
  },
  {
    key: 'energy',
    icon: '🌱',
    name: 'Environment & energy',
    tagline:
      'LLM agents for cleaner energy, resilient resources, and a healthier environment across Armenia.',
    ideas: [
      {
        title: 'Building energy-efficiency advisor',
        hook: 'Cut energy bills with tailored, explained retrofit advice.',
        problem: "Households and small businesses waste energy and don't know which efficiency upgrades pay off.",
        data: 'Public building-energy guidelines, tariff schedules, and synthetic consumption profiles.',
        whyLLM:
          "Reasons over a building's usage and local tariffs to recommend and prioritize upgrades, explaining payback in plain Armenian.",
        evaluate:
          'Agreement with an energy-auditor rubric on sample buildings; sanity-check predicted savings against a baseline.',
        impact: 'Lower bills and lower energy demand for Armenian households.',
      },
      {
        title: 'Air & water quality explainer',
        hook: 'Turn environmental sensor data into plain-language health guidance.',
        problem: 'Air- and water-quality data is published but rarely understandable or actionable for the public.',
        data: 'Public environmental monitoring feeds (air quality, water) plus health-guideline references.',
        whyLLM:
          'Reasons over multi-sensor readings and guidelines to explain the risk and recommend precautions for a given day and location.',
        evaluate:
          'Factual-consistency check against guidelines plus a clarity rubric; flag when data is missing rather than inventing it.',
        impact: 'Actionable environmental-health information for residents.',
      },
      {
        title: 'Seismic & wildfire risk briefing assistant',
        hook: 'Grounded, plain-language hazard briefings for a location.',
        problem: 'Residents and local officials struggle to interpret hazard data for their own area.',
        data: 'Public seismic hazard maps, wildfire-risk data, and preparedness guidelines.',
        whyLLM:
          'Synthesizes hazard layers and preparedness guidance into a location-specific briefing, with citations.',
        evaluate:
          'Grounding check (every claim tied to a source) plus an expert rubric across a set of locations.',
        impact: 'Better preparedness in a seismically active, wildfire-prone country.',
      },
      {
        title: 'Water-resource & irrigation planning aid',
        hook: 'Help allocate scarce water across competing needs.',
        problem: 'Water is scarce and unevenly managed, and allocation decisions are often opaque.',
        data: 'Public hydrology and reservoir data plus irrigation guidelines (or synthetic stand-ins).',
        whyLLM:
          'Reasons over supply, demand, and constraints to propose and explain allocation and irrigation schedules.',
        evaluate:
          'Simulated efficiency and fairness versus a baseline allocation, plus an explanation-quality rubric.',
        impact: 'More efficient, transparent water use for agriculture and communities.',
      },
    ],
  },
  {
    key: 'finance',
    icon: '🏦',
    name: 'Finance & fintech',
    tagline:
      'LLM systems for fairer credit, safer transactions, and stronger financial literacy in Armenia.',
    ideas: [
      {
        title: 'SME credit-assessment copilot',
        hook: 'Fairer, explainable lending decisions for small businesses.',
        problem: 'Small businesses without formal credit histories struggle to access financing.',
        data: 'Public financial statements and ratios plus synthetic SME financials and loan outcomes.',
        whyLLM:
          'Reads mixed financial documents, reasons about creditworthiness, and produces an explainable, evidence-cited assessment.',
        evaluate:
          'Predictive accuracy versus labeled outcomes plus a fairness and consistency check; the stated reasons must be grounded in the inputs.',
        impact: "Wider, fairer access to capital for Armenia's small businesses.",
      },
      {
        title: 'Transaction fraud & anomaly detector',
        hook: 'Flag suspicious transactions with an explanation, not a black box.',
        problem: 'Fraud detection is often either too crude or too opaque for small institutions to trust.',
        data: 'Public fraud-detection datasets plus synthetic transaction streams.',
        whyLLM: 'Reasons over transaction context to flag anomalies and explain why, cutting analyst review time.',
        evaluate:
          'Precision/recall on labeled fraud plus the false-positive rate, since blocking good customers is costly.',
        impact: 'Safer digital payments for banks and their customers.',
      },
      {
        title: 'Financial-literacy assistant (Armenian)',
        hook: 'Plain-Armenian answers to real money questions.',
        problem:
          "Many people lack guidance on budgeting, loans, and taxes, and the advice that exists isn't in accessible Armenian.",
        data: 'Public financial-education materials and consumer-finance regulations.',
        whyLLM:
          'Answers grounded questions about budgeting, loans, and savings in plain Armenian, with appropriate caution and citations.',
        evaluate:
          'Factual-consistency against source materials plus a clarity rubric; it must hedge or refuse on out-of-scope advice.',
        impact: 'Stronger financial literacy, especially for young people and first-time borrowers.',
      },
      {
        title: 'Invoice-financing & cash-flow assistant',
        hook: 'Help small firms turn unpaid invoices into working capital.',
        problem: "SMEs face cash-flow gaps waiting on invoices and don't understand their financing options.",
        data: 'Synthetic invoices and receivables plus public information on financing products.',
        whyLLM: 'Extracts invoice data, projects cash flow, and explains financing options and their trade-offs.',
        evaluate:
          'Extraction accuracy plus projection sanity versus a baseline, and an explanation-quality rubric.',
        impact: 'Healthier cash flow for small businesses.',
      },
    ],
  },
  {
    key: 'emergency',
    icon: '🚨',
    name: 'Emergency & disaster response',
    tagline:
      'LLM agents that help people and responders prepare for and act in crises — critical in a seismically active region.',
    ideas: [
      {
        title: 'Earthquake response coordination agent',
        hook: 'Turn chaotic incoming reports into a prioritized response picture.',
        problem: 'In the first hours of a disaster, information is chaotic and coordination is slow.',
        data: 'Public disaster-response datasets, synthetic incident reports, and resource inventories.',
        whyLLM:
          'Ingests messy reports, extracts location, severity, and needs, de-duplicates them, and proposes resource routing.',
        evaluate:
          'Extraction and prioritization accuracy on a labeled incident set; measure how performance degrades with noisier input.',
        impact: 'Faster, better-coordinated response when minutes matter.',
      },
      {
        title: 'Preparedness & evacuation assistant (Armenian)',
        hook: 'Personalized, grounded preparedness guidance before disaster strikes.',
        problem: "People often don't know how to prepare for or evacuate during earthquakes, floods, or fires.",
        data: 'Public preparedness and evacuation guidelines plus local hazard maps.',
        whyLLM:
          'Produces location- and household-specific preparedness plans grounded in official guidance, in plain Armenian.',
        evaluate:
          'Grounding check against the guidelines plus an expert rubric; flag anything not covered by the sources.',
        impact: 'A more prepared population in a high-hazard country.',
      },
      {
        title: 'Emergency-call triage & routing',
        hook: 'Help dispatchers extract what matters and route the right help.',
        problem: 'Emergency dispatchers must extract critical details fast, under stress, sometimes across languages.',
        data: 'Synthetic emergency-call transcripts plus a resource and dispatch taxonomy.',
        whyLLM:
          'Extracts location, nature, and severity from a call, flags critical cues, and suggests routing — as a decision aid, never autonomous.',
        evaluate:
          'Extraction accuracy and routing agreement with expert labels; explicitly measure dangerous misses (recall on critical cases).',
        impact: 'Faster, more accurate dispatch — with humans in control.',
      },
      {
        title: 'Damage assessment from imagery (VLM)',
        hook: 'Rapid, first-pass damage maps from photos and drone imagery.',
        problem: 'After a disaster, assessing building and infrastructure damage is slow and manual.',
        data: 'Public disaster damage-assessment image datasets (satellite, drone, ground).',
        whyLLM: 'A VLM classifies damage severity from imagery and summarizes affected areas for responders.',
        evaluate: 'Classification accuracy versus labeled damage grades; report confusion between adjacent severity levels.',
        impact: 'Faster situational awareness and resource targeting after a disaster.',
      },
    ],
  },
]
