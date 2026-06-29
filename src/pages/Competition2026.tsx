import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/ui/SectionTitle'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import SEO from '../components/SEO'
import FAQ from '../components/FAQ'
import type { FAQCategory } from '../data/faq2026'
import MatrixPlayground from '../components/competition/MatrixPlayground'
import CodeBlock from '../components/competition/CodeBlock'

const FORM_VIEW =
  'https://docs.google.com/forms/d/e/1FAIpQLSdIZxpQX8iQrIxdHJ5Xcgun5JFSXDGCmP8UcNrBuZ1qbTtdfg/viewform'
const FORM_EMBED =
  'https://docs.google.com/forms/d/e/1FAIpQLSdIZxpQX8iQrIxdHJ5Xcgun5JFSXDGCmP8UcNrBuZ1qbTtdfg/viewform?embedded=true'
const STATEMENT_PDF = '/competition/matrix-arena-statement.pdf'
const GITHUB_REPO = 'https://github.com/osoblanco/armllm_competition'
const CONTACT_EMAIL = 'armeniallm@gmail.com'
const DEADLINE = 'July 5, 2026'
const IMG = '/images/competition'

/* ----------------------------- inline content ---------------------------- */

const ANATOMY_PANELS = [
  {
    key: 'gt',
    label: 'Ground truth Y*',
    text: 'The hidden matrix the grader builds from a secret mixture of bilinear, low-rank, and weakly nonlinear mechanisms. You never see it in full — your job is to reconstruct its hidden entries.',
  },
  {
    key: 'mask',
    label: 'Observation mask',
    text: 'Which entries are revealed. Exactly k are observed in every row and every column, and the observed cells form a connected bipartite graph.',
  },
  {
    key: 'obs',
    label: 'What you see',
    text: 'The masked input Y_obs your agent receives: only the observed cells carry real values; everything else is hidden (shown gray).',
  },
  {
    key: 'pred',
    label: 'Your prediction',
    text: 'Ŷ — your reconstruction of the entire matrix, returned from solve(). You also get the row features X and column features Z to help.',
  },
  {
    key: 'err',
    label: 'Hidden error',
    text: 'The absolute error on hidden cells only. Those are the entries scored: predicting the cells you were already shown earns nothing.',
  },
] as const

const REGIMES = [
  { name: 'Mostly bilinear', blurb: 'Y ≈ Xᵀ W Z dominates. Feature-interaction methods shine.' },
  { name: 'Mostly low-rank', blurb: 'A latent UVᵀ term dominates. Matrix factorization wins.' },
  { name: 'Mixed', blurb: 'Bilinear and low-rank in comparable measure — blend models.' },
  { name: 'Nonlinear dominant', blurb: 'A weak tanh interaction matters more here. Robustness counts.' },
  { name: 'Noisy', blurb: 'Higher observation noise. Regularize and avoid overfitting.' },
  { name: 'Spiky', blurb: 'High-leverage rows/columns with 3× magnitude features.' },
]

const TACTICS = [
  { icon: '📊', title: 'Baselines first', text: 'Mean, row/column means. Cheap, and the bar you must clear.' },
  { icon: '📈', title: 'Ridge on interactions', text: 'Regress on [xᵢ, zⱼ, xᵢ⊙zⱼ] — strong on the bilinear regime.' },
  { icon: '🧩', title: 'Bilinear fit', text: 'Fit Ŷ = X W Zᵀ directly by minimizing observed error over W.' },
  { icon: '🔻', title: 'Low-rank factorization', text: 'Ŷ ≈ P Qᵀ via alternating least squares or gradient descent.' },
  { icon: '🔗', title: 'Hybrid models', text: 'Combine a bilinear term with a low-rank residual; blend by CV.' },
  { icon: '🎛️', title: 'Ensemble & early stop', text: 'Average over ranks/regularizers; hold out observed cells to tune.' },
  { icon: '🎯', title: 'Leverage-aware attacks', text: 'Use X, Z leverage scores to reveal the least informative cells.' },
  { icon: '🕸️', title: 'Minimal graphs', text: 'Hand your opponent a sparse, barely-connected observation graph.' },
]

const competitionFAQ: FAQCategory[] = [
  {
    title: 'Eligibility & submission',
    items: [
      {
        question: 'Who can take part?',
        answer:
          'The competition is the entrance test for the Armenia LLM Summer School 2026. It is open to all applicants invited to the technical assessment stage.',
      },
      {
        question: 'When is the deadline?',
        answer:
          'The final day for submissions is <strong>July 5, 2026</strong> (end of day, Yerevan time). You may resubmit any number of times before then — the latest valid submission is the one that counts.',
      },
      {
        question: 'How do I submit?',
        answer:
          'Submit a single Python file defining an <code>Agent</code> class through the form at the bottom of this page. You may resubmit; the latest valid submission counts.',
      },
      {
        question: 'What language and libraries can I use?',
        answer:
          'Python 3.11 with NumPy and the standard library. SciPy is allowed. PyTorch is permitted inside <code>solve()</code> but a GPU is not guaranteed, so keep within the time budget.',
      },
      {
        question: 'Where is the starter code, and how do I ask questions?',
        answer:
          'The full open-source kit — core library, baselines, grader, visualizer, and tests — is at <a href="https://github.com/osoblanco/armllm_competition" target="_blank" rel="noopener noreferrer" class="text-accent underline">github.com/osoblanco/armllm_competition</a>. Please read its README and the problem statement first; if anything is unclear or you spot a bug, open a GitHub issue or email <a href="mailto:armeniallm@gmail.com" class="text-accent underline">armeniallm@gmail.com</a>.',
      },
    ],
  },
  {
    title: 'The task',
    items: [
      {
        question: 'Do I generate the matrices?',
        answer:
          '<strong>No.</strong> The grader creates one shared hidden matrix per seed. You only receive a partial observation and must reconstruct the hidden entries. In a duel, both players solve the same ground truth under different opponent-chosen masks.',
      },
      {
        question: 'Is this exact recovery?',
        answer:
          'No. The nonlinear component is weak and restricted. The goal is robust prediction across hidden instances, not perfect recovery of an arbitrary function.',
      },
      {
        question: 'What is the attack phase?',
        answer:
          'In the arena, you also choose which entries your opponent may observe — using only X, Z, and k, never the ground truth. A clever mask makes reconstruction harder for them while staying valid.',
      },
      {
        question: 'Can I just rebuild the matrix from the seed?',
        answer:
          'No. The <code>seed</code> handed to your agent is <em>decoupled</em> from instance generation — it is a one-way-derived value for your own RNG determinism, not the generation seed. The graded evaluation also uses secret, high-entropy generation seeds, so rebuilding from the seed (or brute-forcing which seed reproduces the visible X) yields an unrelated matrix on the real grader and only wastes your time budget. Use only your declared inputs to form a prediction.',
      },
    ],
  },
  {
    title: 'Scoring',
    items: [
      {
        question: 'How is my score computed?',
        answer:
          'Final score = 0.60 × normalized solve score + 0.35 × normalized arena rating + 0.05 × robustness. Solve score rewards beating the mean baseline; arena rating is a Bradley-Terry Elo from head-to-head duels.',
      },
      {
        question: 'What makes a submission invalid?',
        answer:
          'Wrong output shape, NaN/Inf or absurdly large values, returning an invalid mask, crashing, exceeding the time budget, or non-deterministic output. Invalid results are caught and penalized, never crash the grader.',
      },
    ],
  },
]

const solveCode = `import numpy as np

class Agent:
    def solve(self, X, Z, Y_obs, mask, budget, seed):
        """Reconstruct the full (n, m) matrix from observed entries.

        X      : (n, d) row features
        Z      : (m, d) column features
        Y_obs  : (n, m) observed values, 0 where hidden
        mask   : (n, m) bool, True where observed
        budget : dict with sizes + time limits
        seed   : int (deterministic)

        Returns
        -------
        Y_hat : (n, m) prediction over the WHOLE matrix.
        """
        mean = float(Y_obs[mask].mean()) if mask.any() else 0.0
        return np.full_like(Y_obs, mean, dtype=float)`

const attackCode = `    def attack(self, X, Z, k, budget, seed):
        """Choose which entries your OPPONENT may observe.

        You never see the ground truth here — only X, Z, and k.
        Return an (n, n) boolean mask with exactly k True values per
        row and per column, whose induced bipartite graph is connected.
        An invalid mask is replaced by the official one (with a penalty).
        """
        from matrix_arena.masks import generate_random_regular_mask
        return generate_random_regular_mask(X.shape[0], k, seed)`

const ridgeCode = `import numpy as np

class Agent:
    """A stronger start: ridge regression on feature interactions."""

    def solve(self, X, Z, Y_obs, mask, budget, seed):
        n, d = X.shape
        m = Z.shape[0]
        rows, cols = np.where(mask)
        Xi, Zj = X[rows], Z[cols]
        Phi = np.concatenate([Xi, Zj, Xi * Zj], axis=1)   # [x, z, x*z]
        y = Y_obs[rows, cols]
        A = Phi.T @ Phi + 1e-2 * np.eye(Phi.shape[1])
        w = np.linalg.solve(A, Phi.T @ y)

        Xa = np.repeat(X, m, axis=0)
        Za = np.tile(Z, (n, 1))
        Phi_all = np.concatenate([Xa, Za, Xa * Za], axis=1)
        return (Phi_all @ w).reshape(n, m)

    def attack(self, X, Z, k, budget, seed):
        from matrix_arena.masks import generate_random_regular_mask
        return generate_random_regular_mask(X.shape[0], k, seed)`

/* -------------------------------- helpers -------------------------------- */

function FigureCard({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="max-w-5xl mx-auto">
      <div className="bg-white/95 rounded-xl p-2 border border-white/10 shadow-xl shadow-black/40">
        <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full h-auto rounded-md" />
      </div>
      <figcaption className="text-white/60 text-sm mt-3 text-center max-w-3xl mx-auto">
        {caption}
      </figcaption>
    </figure>
  )
}

function Formula({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
      <p className="text-accent text-sm font-semibold mb-2">{title}</p>
      <div className="font-mono text-white/90 text-base md:text-lg leading-relaxed">{children}</div>
    </div>
  )
}

/* --------------------------------- page ---------------------------------- */

const Competition2026 = memo(function Competition2026() {
  const [panel, setPanel] = useState(0)

  return (
    <div>
      <SEO
        title="Matrix Arena — Entrance Competition 2026"
        description="Matrix Arena: Adversarial Inductive Matrix Completion — the entrance-test programming competition for the Armenia LLM Summer School 2026. Reconstruct hidden matrices from partial observations, and outwit opponents in adversarial duels."
        url="/2026/competition"
        keywords={[
          'Matrix Arena',
          'matrix completion competition',
          'ARMLLM 2026 competition',
          'adversarial matrix completion',
          'LLM Summer School entrance test',
        ]}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 border-b border-white/10 overflow-hidden">
        <div className="container mx-auto px-8 text-center">
          <span className="inline-block bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-6">
            ARMLLM 2026 · Entrance Competition
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">Matrix Arena</h1>
          <p className="text-xl md:text-2xl text-white font-semibold mb-6 text-shadow-glow">
            Adversarial Inductive Matrix Completion
          </p>
          <p className="text-lg text-white/85 max-w-3xl mx-auto mb-10">
            Reconstruct the hidden entries of a structured matrix from a sparse, partial view — then
            go head to head, choosing what your opponent gets to see. A test of Python, numerical
            programming, optimization, and adversarial thinking.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="#submit">Submit Your Agent</Button>
            <Button href="#playground" variant="secondary">
              Try the Live Demo
            </Button>
            <Button href={GITHUB_REPO} target="_blank" variant="secondary">
              Starter Kit &amp; Code ↗
            </Button>
            <Button href={STATEMENT_PDF} target="_blank" variant="secondary">
              Problem Statement (PDF)
            </Button>
          </div>
          <p className="mt-8 text-accent font-semibold text-lg">
            ⏰ Submissions close on {DEADLINE}
          </p>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-16 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <h3 className="text-accent text-lg font-semibold mb-2">🧠 What you build</h3>
              <p className="text-white/80 text-sm">
                One Python file with an <code className="text-accent">Agent</code> class that solves
                and attacks.
              </p>
            </Card>
            <Card>
              <h3 className="text-accent text-lg font-semibold mb-2">🎯 What you predict</h3>
              <p className="text-white/80 text-sm">
                The hidden entries of a matrix from a sparse observation and side features.
              </p>
            </Card>
            <Card>
              <h3 className="text-accent text-lg font-semibold mb-2">⚔️ How you compete</h3>
              <p className="text-white/80 text-sm">
                Solve-only leaderboard <em>plus</em> adversarial duels where you design opponent masks.
              </p>
            </Card>
            <Card>
              <h3 className="text-accent text-lg font-semibold mb-2">📏 How you’re scored</h3>
              <p className="text-white/80 text-sm">
                Beat the mean baseline, climb the Bradley-Terry Elo, and stay robust.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* The challenge in one minute */}
      <section className="py-20 bg-secondary/70 border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="The Challenge in One Minute"
            subtitle="Matrix completion, with structure and an adversary"
          />
          <div className="max-w-4xl mx-auto text-white/85 space-y-5 text-lg leading-relaxed">
            <p>
              You are given two feature matrices — <strong>X</strong> (one vector per row) and{' '}
              <strong>Z</strong> (one vector per column) — and a <strong>partial view</strong> of a
              hidden interaction matrix <strong>Y*</strong>. Your task: predict the entries of Y* you
              were <em>not</em> shown.
            </p>
            <p>
              Y* is not arbitrary. The grader builds it from a restricted, hidden family — a bilinear
              term <span className="font-mono text-accent">XᵀWZ</span>, a low-rank latent term, and a
              weak nonlinear term — so the structure is learnable, but you must discover which mix you
              are facing.
            </p>
          </div>
          <div className="max-w-4xl mx-auto mt-8 bg-accent/10 border border-accent/40 rounded-xl p-6">
            <p className="text-white/90">
              <span className="text-accent font-bold">Key rule.</span> Participants do not create the
              ground-truth matrix. The grader creates one shared hidden matrix per seed. In a duel,
              both participants solve the <em>same</em> ground-truth matrix under different
              opponent-generated observation masks.
            </p>
          </div>
        </div>
      </section>

      {/* Anatomy */}
      <section className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Anatomy of a Reconstruction"
            subtitle="Click a stage to learn what it means"
          />
          <FigureCard
            src={`${IMG}/solve_hybrid_bilinear.png`}
            alt="Five-panel anatomy of a single reconstruction"
            caption="Left to right: ground truth, observation mask, the masked input you receive, the prediction, and the error on hidden cells. Produced by the official visualizer."
          />
          <div className="max-w-5xl mx-auto mt-8">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {ANATOMY_PANELS.map((p, i) => (
                <button
                  key={p.key}
                  onClick={() => setPanel(i)}
                  className={
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ' +
                    (i === panel
                      ? 'bg-gradient-to-r from-primary to-accent text-white border-transparent'
                      : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10')
                  }
                >
                  {i + 1}. {p.label}
                </button>
              ))}
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center min-h-[5.5rem] flex items-center justify-center">
              <p className="text-white/85 text-lg max-w-3xl">{ANATOMY_PANELS[panel].text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live playground */}
      <section id="playground" className="py-20 bg-secondary/70 border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Live Playground"
            subtitle="A real, in-browser matrix-completion task — adjust it and watch the score move"
          />
          <div className="max-w-6xl mx-auto">
            <MatrixPlayground />
          </div>
        </div>
      </section>

      {/* Two phases */}
      <section className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Two Phases" subtitle="Solve well, then outwit your opponent" />

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="!text-left">
              <h3 className="text-accent text-2xl font-bold mb-3">1 · Solve</h3>
              <p className="text-white/80 mb-4">
                Every agent reconstructs the same instances under a fair, grader-generated official
                mask. Your loss is the normalized RMSE on hidden entries; your score is how far you
                beat the mean baseline, averaged over many seeds and budget sizes.
              </p>
              <ul className="text-white/70 space-y-2 text-sm list-disc list-inside">
                <li>Same masks for everyone — pure reconstruction skill.</li>
                <li>Positive score means you beat the baseline; zero means you tied it.</li>
                <li>Averaged across small, medium, and large instances.</li>
              </ul>
            </Card>

            <Card className="!text-left">
              <h3 className="text-accent text-2xl font-bold mb-3">2 · Duel (Arena)</h3>
              <p className="text-white/80 mb-4">
                Two agents face the same hidden matrix, but each receives a mask chosen by the other.
                You attack with structure only — never the ground truth. Lower hidden-error wins the
                duel; wins and draws feed a Bradley-Terry Elo.
              </p>
              <ol className="text-white/70 space-y-2 text-sm list-decimal list-inside">
                <li>Grader builds one shared (X, Z, Y*).</li>
                <li>A masks B; B masks A — using only X, Z, k.</li>
                <li>Invalid masks fall back to the official one, with a penalty.</li>
                <li>Each solves under the opponent’s mask; lower NRMSE wins.</li>
              </ol>
            </Card>
          </div>

          <div className="mt-12">
            <FigureCard
              src={`${IMG}/duel_hybrid_vs_lowrank.png`}
              alt="A duel: two agents reconstruct the same hidden matrix under different masks"
              caption="A duel. Both rows show the same ground truth (leftmost), but each agent gets a different opponent-chosen mask. The hybrid agent's hidden error (top right) is far lower than the low-rank agent's (bottom right) — so it wins."
            />
          </div>
        </div>
      </section>

      {/* Regimes */}
      <section className="py-20 bg-secondary/70 border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="The Hidden Instance Family"
            subtitle="Six regimes, chosen deterministically per seed — and never revealed"
          />
          <FigureCard
            src={`${IMG}/regime_gallery.png`}
            alt="Gallery of ground-truth matrices, one per generative regime"
            caption="One normalized ground-truth matrix per regime. The low-rank instance shows smoother banding; bilinear, noisy, and nonlinear instances carry more high-frequency detail."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mt-10">
            {REGIMES.map((r) => (
              <div key={r.name} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-accent font-semibold mb-1">{r.name}</h3>
                <p className="text-white/70 text-sm">{r.blurb}</p>
              </div>
            ))}
          </div>
          <p className="text-white/60 text-center mt-8 max-w-3xl mx-auto">
            A strong agent performs well across <em>all</em> regimes, because it cannot tell which one
            a given seed drew.
          </p>
        </div>
      </section>

      {/* Scoring */}
      <section className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Scoring & Ranking" subtitle="Three components, one final score" />
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Formula title="Reconstruction loss (per instance)">
              NRMSE = √(meanₕᵢ𝒹𝒹ₑₙ (Ŷ − Y*)²) ⁄ std(Y*ₕᵢ𝒹𝒹ₑₙ)
            </Formula>
            <Formula title="Solve score (vs. mean baseline)">
              SolveScore = log( NRMSE_mean ⁄ NRMSE_agent )
            </Formula>
            <Formula title="Duel rating (Bradley-Terry)">
              P(i beats j) = e^rᵢ ⁄ (e^rᵢ + e^rⱼ),&nbsp; Elo = 1500 + (400⁄ln10)·r
            </Formula>
            <Formula title="Final score">
              0.60 · solve&#770; + 0.35 · arena&#770; + 0.05 · robustness
            </Formula>
          </div>
          <div className="max-w-5xl mx-auto mt-8 grid sm:grid-cols-3 gap-4">
            <Card>
              <h3 className="text-accent font-semibold mb-1">Solve · 60%</h3>
              <p className="text-white/70 text-sm">Min-max normalized reconstruction score.</p>
            </Card>
            <Card>
              <h3 className="text-accent font-semibold mb-1">Arena · 35%</h3>
              <p className="text-white/70 text-sm">Normalized Bradley-Terry Elo from duels.</p>
            </Card>
            <Card>
              <h3 className="text-accent font-semibold mb-1">Robustness · 5%</h3>
              <p className="text-white/70 text-sm">Penalizes crashes, timeouts, invalid output.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* API */}
      <section className="py-20 bg-secondary/70 border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="The API"
            subtitle="Submit one file with an Agent class — two methods, nothing else required"
          />
          <div className="max-w-4xl mx-auto space-y-6">
            <CodeBlock
              filename="agent.py"
              tabs={[
                { label: 'solve()', code: solveCode },
                { label: 'attack()', code: attackCode },
                { label: 'stronger example (ridge)', code: ridgeCode },
              ]}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-accent font-semibold mb-2">solve(X, Z, Y_obs, mask, budget, seed)</h3>
                <p className="text-white/70 text-sm">
                  Return a finite <code>(n, m)</code> array — your prediction over the whole matrix.
                  Only hidden entries are scored.
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-accent font-semibold mb-2">attack(X, Z, k, budget, seed)</h3>
                <p className="text-white/70 text-sm">
                  Return a valid <code>(n, n)</code> boolean mask: exactly <code>k</code> per row and
                  column, connected. You never see Y* here.
                </p>
              </div>
            </div>
            <p className="text-white/55 text-sm mt-4">
              <span className="text-accent font-semibold">About <code>seed</code>:</span> it is a
              decoupled, one-way-derived value for your own RNG determinism — not the seed used to
              build the instance. The graded run uses secret, high-entropy generation seeds, so you
              cannot rebuild Y* from <code>seed</code> or by matching the generator to X.
            </p>
          </div>
        </div>
      </section>

      {/* Tactics */}
      <section className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Suggested Tactics" subtitle="Ways in — from baselines to adversarial masks" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {TACTICS.map((t) => (
              <div key={t.title} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <div className="text-2xl mb-2">{t.icon}</div>
                <h3 className="text-white font-semibold mb-1">{t.title}</h3>
                <p className="text-white/65 text-sm">{t.text}</p>
              </div>
            ))}
          </div>
          <p className="text-white/55 text-center mt-8 max-w-3xl mx-auto">
            The nonlinear component is weak and restricted — this is about robust prediction under
            hidden instances, not exact recovery. Don’t overfit the cells you can see.
          </p>
        </div>
      </section>

      {/* Rules */}
      <section className="py-20 bg-secondary/70 border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Rules & Constraints" subtitle="Determinism in, robustness out" />
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/[0.03] border border-green-400/20 rounded-xl p-6">
              <h3 className="text-green-300 font-bold text-lg mb-4">✓ Do</h3>
              <ul className="text-white/80 space-y-2 text-sm list-disc list-inside">
                <li>Be deterministic given the <code>seed</code> argument.</li>
                <li>Control all randomness with explicit seeds.</li>
                <li>Return finite arrays of the exact required shape.</li>
                <li>Stay within the per-call time budget.</li>
                <li>Return valid masks from <code>attack()</code>.</li>
              </ul>
            </div>
            <div className="bg-white/[0.03] border border-red-400/20 rounded-xl p-6">
              <h3 className="text-red-300 font-bold text-lg mb-4">✗ Don’t</h3>
              <ul className="text-white/80 space-y-2 text-sm list-disc list-inside">
                <li>Try to read or reconstruct Y* inside <code>attack()</code>.</li>
                <li>
                  Rebuild Y* from the <code>seed</code> or by matching the generator to X — the
                  seed is decoupled and the graded run uses secret seeds.
                </li>
                <li>Return NaN, Inf, or absurdly large values.</li>
                <li>Read from disk or share state between calls.</li>
                <li>Exceed the time limit or rely on a GPU.</li>
                <li>Return malformed or disconnected masks.</li>
              </ul>
            </div>
          </div>
          <p className="text-white/55 text-center mt-6 text-sm">
            Invalid behavior is caught, scored as a failure, and recorded — it never crashes the
            grader.
          </p>
        </div>
      </section>

      {/* Budgets */}
      <section className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Budget Levels" subtitle="Instances come in three sizes" />
          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-accent border-b border-white/15">
                  <th className="py-3 px-4 font-semibold">Level</th>
                  <th className="py-3 px-4 font-semibold">n × m</th>
                  <th className="py-3 px-4 font-semibold">d</th>
                  <th className="py-3 px-4 font-semibold">k</th>
                  <th className="py-3 px-4 font-semibold">solve time</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                {[
                  ['Small', '48 × 48', '12', '10', '1.0 s'],
                  ['Medium', '96 × 96', '24', '12', '5.0 s'],
                  ['Large', '160 × 160', '32', '16', '15.0 s'],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-white/5">
                    {row.map((cell, i) => (
                      <td key={i} className={'py-3 px-4 ' + (i === 0 ? 'text-white font-semibold' : '')}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/55 text-center mt-6 text-sm">
            Final weighting across sizes: small 30% · medium 45% · large 25%.
          </p>
        </div>
      </section>

      {/* Starter kit & questions */}
      <section className="py-20 bg-secondary/70 border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Get the Starter Kit & Ask Questions"
            subtitle="Read the code, run the grader locally, and reach out if anything is unclear"
          />
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-10">
            <Card className="!text-left">
              <h3 className="text-accent text-xl font-semibold mb-2">📦 Starter kit</h3>
              <p className="text-white/80 text-sm mb-4">
                The full competition kit is open source — core library, five reference baselines, the
                agent template, the grader, the match visualizer, and a complete test suite. Clone it,
                study the baselines, and test your agent locally before you submit.
              </p>
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-semibold hover:underline"
              >
                github.com/osoblanco/armllm_competition ↗
              </a>
            </Card>
            <Card className="!text-left">
              <h3 className="text-accent text-xl font-semibold mb-2">📄 Problem statement</h3>
              <p className="text-white/80 text-sm mb-4">
                The formal specification — generator, scoring, duel protocol, ranking, and constraints —
                with all the equations. Keep it handy as a reference while you build.
              </p>
              <a
                href={STATEMENT_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-semibold hover:underline"
              >
                Download the PDF ↗
              </a>
            </Card>
            <Card className="!text-left">
              <h3 className="text-accent text-xl font-semibold mb-2">💬 Questions?</h3>
              <p className="text-white/80 text-sm mb-4">
                Please read the kit’s README and the problem statement first. If something is unclear
                or you think you’ve found a bug, open a GitHub issue or email us.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-accent font-semibold hover:underline break-all"
              >
                {CONTACT_EMAIL}
              </a>
            </Card>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={GITHUB_REPO} target="_blank">
              Browse the Code on GitHub ↗
            </Button>
            <Button href={`${GITHUB_REPO}/issues`} target="_blank" variant="secondary">
              Ask a Question (Open an Issue) ↗
            </Button>
          </div>
        </div>
      </section>

      {/* Submit */}
      <section id="submit" className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle
            title="Submit Your Agent"
            subtitle="Upload your single-file Agent through the form below"
          />
          <div className="max-w-3xl mx-auto">
            <div className="mb-6 bg-accent/10 border border-accent/40 rounded-xl p-5 text-center">
              <p className="text-white/90">
                <span className="text-accent font-bold">⏰ Final deadline:</span>{' '}
                <span className="font-semibold">{DEADLINE}</span> (end of day, Yerevan time). You
                may resubmit any number of times — the latest valid submission counts.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3 md:p-4 mb-6">
              <iframe
                src={FORM_EMBED}
                title="Matrix Arena submission form"
                className="w-full rounded-xl bg-white"
                style={{ height: '900px' }}
                loading="lazy"
              >
                Loading…
              </iframe>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-sm mb-4">
                Form not loading? Open it in a new tab.
              </p>
              <Button href={FORM_VIEW} target="_blank">
                Open Submission Form ↗
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Competition FAQ" subtitle="Quick answers before you start" />
          <FAQ categories={competitionFAQ} />
        </div>
      </section>

      {/* Back link */}
      <section className="py-16 bg-secondary/70">
        <div className="container mx-auto px-8 text-center">
          <p className="text-white/70 mb-6">
            This competition is the entrance test for the Armenia LLM Summer School 2026.
          </p>
          <Link
            to="/2026"
            className="inline-block bg-white/5 px-8 py-4 rounded-xl border border-white/10 text-white font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg hover:shadow-accent/20"
          >
            ← Back to the 2026 Edition
          </Link>
        </div>
      </section>
    </div>
  )
})

export default Competition2026
