import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/ui/SectionTitle'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import SEO from '../components/SEO'
import leaderboard from '../data/competitionLeaderboard.json'

const IMG = '/images/competition/results'

interface Row {
  rank: number
  agent_name: string
  is_baseline: boolean
  final_score: number
  solve_score_raw: number
  bt_elo: number
  arena_points: number
  robustness_score: number
  wins: number
  draws: number
  losses: number
  mean_loss: number | null
}
const ROWS = leaderboard as Row[]
const PARTICIPANTS = ROWS.filter((r) => !r.is_baseline).length
const BASELINES = ROWS.filter((r) => r.is_baseline).length

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }

type Tier = 'accepted' | 'waitlist' | 'online' | 'baseline'
const TIER_META: Record<Tier, { label: string; badge: string; leftBorder: string }> = {
  accepted: { label: 'Accepted', badge: 'bg-green-500/15 text-green-300 border border-green-400/40', leftBorder: 'border-l-green-400/70' },
  waitlist: { label: 'Waitlist · FCFS', badge: 'bg-amber-500/15 text-amber-300 border border-amber-400/40', leftBorder: 'border-l-amber-400/70' },
  online: { label: 'Online track', badge: 'bg-sky-500/15 text-sky-300 border border-sky-400/40', leftBorder: 'border-l-sky-400/70' },
  baseline: { label: 'baseline', badge: 'bg-white/10 text-white/45 border border-white/15', leftBorder: 'border-l-white/15' },
}

const BREAKDOWNS = [
  {
    rank: 1,
    name: 'Alexan Hayrapetyan',
    title: 'Learned-corrector champion',
    text: 'Bilinear kron-ridge with GCV-chosen regularization, then structure selection on a holdout (bilinear-only vs. bilinear-first vs. latent-first) with annealed ALS, a validated latent portfolio (annealed-ALS ensemble + soft-impute + variational PMF), and graph-coupling damping as an adversarial-mask defense — topped with an embedded per-budget neural corrector (zlib-packed weights). Attack: projective balanced k-means feature blocks. Lost only 4 of 96 duels.',
  },
  {
    rank: 2,
    name: 'Eduard Grigoryan',
    title: 'Regime-selector with residual polish',
    text: 'Four regime specialists (low-rank / mixed / spiky / nonlinear) all run on an 80% split; the best on the held-out 20% is refit on 100%, then sharpened with an L-BFGS residual refinement and a top-2 convex blend of the leading candidates. Optional Torch path.',
  },
  {
    rank: 3,
    name: 'Gayane Yazeryan',
    title: 'Best raw duelist (110–10)',
    text: 'A clean insight: with unit-norm features the generator’s tanh term is effectively linear, so a well-tuned bilinear ridge captures almost everything. One eigendecomposition of the training Gram matrix makes every candidate λ cheap to validate; an ALS pass mops up the residual. Paired with a feature-block attack.',
  },
  {
    rank: 5,
    name: 'Arash Rezaali',
    title: 'Robust bilinear + nonlinear grid',
    text: 'Huber-robust bilinear fit (resistant to leverage outliers) plus ALS low-rank, an explicit nonlinear feature grid, and a bias model, over config-model masks.',
  },
  {
    rank: 11,
    name: 'Arman Isajanyan',
    title: 'Trained regime router',
    text: 'A frozen softmax classifier reads an 8-feature signature from one cheap probe pass and routes each instance to a per-regime, offline-tuned config (bilinear / low-rank / weak). Ships a feature-clustered "banded" attack plus a banding defense that hardens the low-rank term when it detects a clustered mask.',
  },
  {
    rank: 18,
    name: 'Vanuhi Baghdasarian',
    title: 'Seven-model CV ensemble',
    text: 'Mean, ridge, bilinear, low-rank, hybrid, nonlinear-ridge and a high-rank variant, K-fold cross-validated and blended by soft-min weighting — with a greedy leverage-score attack mask and a full validity repair loop.',
  },
]

const CompetitionResults2026 = memo(function CompetitionResults2026() {
  const [showAll, setShowAll] = useState(true)
  const podium = ROWS.filter((r) => !r.is_baseline).slice(0, 3)

  // Acceptance tiers assigned by rank AMONG PARTICIPANTS (baselines excluded).
  let pcount = 0
  const tiered = ROWS.map((r) => {
    if (r.is_baseline) return { ...r, tier: 'baseline' as Tier }
    pcount += 1
    const tier: Tier = pcount <= 40 ? 'accepted' : 'online'
    return { ...r, tier }
  })
  const shown = showAll ? tiered : tiered.slice(0, 25)

  return (
    <div>
      <SEO
        title="Matrix Arena — Competition Results 2026"
        description="Final results of the Matrix Arena entrance competition for the Armenia LLM Summer School 2026: leaderboard, Bradley-Terry Elo, match-by-match rating development, duel snapshots, and solution breakdowns."
        url="/2026/competition/results"
        keywords={['Matrix Arena results', 'ARMLLM 2026 leaderboard', 'matrix completion competition results']}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-white/10">
        <div className="container mx-auto px-8 text-center">
          <span className="inline-block bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-6">
            Matrix Arena · Final Results
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">Competition Results</h1>
          <p className="text-lg text-white/85 max-w-3xl mx-auto mb-8">
            {PARTICIPANTS} participant agents and {BASELINES} reference baselines, scored on
            reconstruction quality, nearly 3,900 head-to-head adversarial duels, and robustness —
            combined into one final score.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="#leaderboard">Full Leaderboard</Button>
            <Link
              to="/2026/competition"
              className="inline-block px-8 py-4 rounded-lg font-semibold border-2 border-accent text-white hover:bg-accent/10 transition-all"
            >
              ← Back to the Challenge
            </Link>
          </div>
        </div>
      </section>

      {/* Podium */}
      <section className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Podium" subtitle="Top three by final score" />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-end">
            {podium.map((r, i) => (
              <Card
                key={r.agent_name}
                className={
                  '!text-center ' +
                  (i === 0 ? 'md:order-2 border-accent/50 bg-accent/10 md:-translate-y-3' :
                   i === 1 ? 'md:order-1' : 'md:order-3')
                }
              >
                <div className="text-5xl mb-2">{MEDAL[r.rank]}</div>
                <h3 className="text-white text-xl font-bold mb-1">{r.agent_name}</h3>
                <p className="text-accent text-3xl font-bold my-2">{r.final_score.toFixed(3)}</p>
                <p className="text-white/60 text-sm">
                  Elo {r.bt_elo.toFixed(0)} · {r.wins}–{r.losses} in duels
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it was scored */}
      <section className="py-16 bg-secondary/70 border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="How it was scored" />
          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card><h3 className="text-accent font-semibold mb-1">Solve · 60%</h3>
              <p className="text-white/70 text-sm">Reconstruction NRMSE vs. the mean baseline over small + medium instances (6 seeds).</p></Card>
            <Card><h3 className="text-accent font-semibold mb-1">Arena · 35%</h3>
              <p className="text-white/70 text-sm">Bradley-Terry Elo from a sampled round-robin — ~3,900 duels, each agent vs. 14 opponents × 4 seeds.</p></Card>
            <Card><h3 className="text-accent font-semibold mb-1">Robustness · 5%</h3>
              <p className="text-white/70 text-sm">Penalizes crashes, invalid masks, timeouts, and non-determinism.</p></Card>
          </div>
          <p className="text-white/55 text-center text-sm mt-6 max-w-3xl mx-auto">
            A 3× timeout grace was applied so the ranking reflects solution quality over raw machine
            speed. A full cheat audit found no instance reconstruction, memory-peeking, or I/O — the
            board is clean.
          </p>
        </div>
      </section>

      {/* Leaderboard chart */}
      <section className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Score Breakdown" subtitle="Each bar = weighted solve + arena + robustness contributions" />
          <div className="max-w-5xl mx-auto bg-white/95 rounded-xl p-3 border border-white/10 shadow-xl">
            <img src={`${IMG}/leaderboard.png`} alt="Leaderboard score breakdown" className="w-full h-auto rounded" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Elo development */}
      <section className="py-20 bg-secondary/70 border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Elo Development" subtitle="How the top agents' ratings evolved, match by match" />
          <div className="max-w-5xl mx-auto bg-white/95 rounded-xl p-3 border border-white/10 shadow-xl">
            <img src={`${IMG}/elo_development.png`} alt="Match-by-match Elo development" className="w-full h-auto rounded" loading="lazy" />
          </div>
          <p className="text-white/55 text-center text-sm mt-4 max-w-3xl mx-auto">
            Online Elo (K=24), every agent starting at 1500, updated after each duel in tournament
            order. The final ranking uses the batch Bradley-Terry fit; this view shows the journey.
          </p>
        </div>
      </section>

      {/* Match snapshots */}
      <section className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Match Snapshots" subtitle="Both agents solve the same hidden matrix under each other's attack masks" />
          <div className="space-y-10 max-w-5xl mx-auto">
            {[
              { f: 'snapshot_1.png', cap: 'The champion in action: #1 vs. #3 on a shared instance — compare the hidden-error panels.' },
              { f: 'snapshot_2.png', cap: 'The adversarial banded attack in a duel: observations concentrate on feature-similar cells, forcing extrapolation.' },
              { f: 'snapshot_3.png', cap: 'A close contest between two strong ensembles.' },
            ].map((s) => (
              <figure key={s.f}>
                <div className="bg-white/95 rounded-xl p-2 border border-white/10 shadow-xl">
                  <img src={`${IMG}/${s.f}`} alt={s.cap} className="w-full h-auto rounded" loading="lazy" />
                </div>
                <figcaption className="text-white/60 text-sm mt-3 text-center">{s.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Solution breakdowns */}
      <section className="py-20 bg-secondary/70 border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Interesting Solutions" subtitle="How the strongest agents were built" />
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {BREAKDOWNS.map((b) => (
              <div key={b.name} className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-accent font-bold text-lg">#{b.rank}</span>
                  <h3 className="text-white font-semibold">{b.name}</h3>
                </div>
                <p className="text-accent/90 text-sm font-medium mb-2">{b.title}</p>
                <p className="text-white/70 text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
          <p className="text-white/55 text-center text-sm mt-8 max-w-3xl mx-auto">
            A striking convergence: nearly every top agent independently arrived at
            <em> bilinear ridge + low-rank ALS + holdout model selection</em>, and several
            discovered the same feature-clustered "banded" attack.
          </p>
        </div>
      </section>

      {/* Full leaderboard table */}
      <section id="leaderboard" className="py-20 bg-glass border-b border-white/10">
        <div className="container mx-auto px-8">
          <SectionTitle title="Full Leaderboard" subtitle={`All ${ROWS.length} ranked entries · ★ = baseline`} />

          {/* Acceptance legend */}
          <div className="max-w-3xl mx-auto mb-4 grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg px-4 py-3 bg-green-500/10 border border-green-400/30">
              <p className="text-green-300 font-semibold text-sm">Ranks 1–40 · Accepted</p>
              <p className="text-white/60 text-xs mt-0.5">Admitted to the summer school.</p>
            </div>
            <div className="rounded-lg px-4 py-3 bg-sky-500/10 border border-sky-400/30">
              <p className="text-sky-300 font-semibold text-sm">Ranks 41+ · Online track</p>
              <p className="text-white/60 text-xs mt-0.5">Considered for the online track.</p>
            </div>
          </div>
          <p className="text-white/50 text-center text-xs mb-6 max-w-3xl mx-auto">
            Tiers are assigned by rank <em>among participants</em>; the reference baselines (★) are
            excluded from the counting and carry no acceptance status.
          </p>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="text-accent border-b border-white/15">
                  <th className="py-2 px-3">#</th>
                  <th className="py-2 px-3">Agent</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3 text-right">Final</th>
                  <th className="py-2 px-3 text-right">Solve</th>
                  <th className="py-2 px-3 text-right">Elo</th>
                  <th className="py-2 px-3 text-right">Arena</th>
                  <th className="py-2 px-3 text-right">Robust</th>
                  <th className="py-2 px-3 text-right">W–L</th>
                </tr>
              </thead>
              <tbody className="text-white/85">
                {shown.map((r) => (
                  <tr
                    key={r.agent_name}
                    className={
                      'border-b border-b-white/5 border-l-4 ' + TIER_META[r.tier].leftBorder + ' ' +
                      (r.is_baseline ? 'text-white/45 italic' : '')
                    }
                  >
                    <td className="py-2 px-3 font-semibold">{MEDAL[r.rank] || r.rank}</td>
                    <td className="py-2 px-3">{r.agent_name}{r.is_baseline ? ' ★' : ''}</td>
                    <td className="py-2 px-3">
                      <span className={'inline-block px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ' + TIER_META[r.tier].badge}>
                        {TIER_META[r.tier].label}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right font-semibold text-white">{r.final_score.toFixed(3)}</td>
                    <td className="py-2 px-3 text-right">{r.solve_score_raw.toFixed(3)}</td>
                    <td className="py-2 px-3 text-right">{r.bt_elo.toFixed(0)}</td>
                    <td className="py-2 px-3 text-right">{r.arena_points.toFixed(2)}</td>
                    <td className="py-2 px-3 text-right">{r.robustness_score.toFixed(2)}</td>
                    <td className="py-2 px-3 text-right">{r.wins}–{r.losses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="px-6 py-3 rounded-lg bg-accent/20 text-accent font-semibold hover:bg-accent/30 transition-colors"
            >
              {showAll ? 'Collapse to top 25 ▴' : `Show all ${ROWS.length} entries ▾`}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
})

export default CompetitionResults2026
