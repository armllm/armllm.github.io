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
]
