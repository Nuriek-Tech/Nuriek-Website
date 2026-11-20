import { Link } from 'react-router-dom';
import { CallToAction, Reveal } from '../components/ui.jsx';
import { StockVideo } from '../components/StockVideo.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';
import { tone } from '../lib/tones.js';

const tracks = [
  { video: 31510, name: 'lab-agents', title: 'Agentic workflows', text: 'Multi-step agents that read, decide and act inside business systems, with a person approving what matters.', tags: ['Orchestration', 'Tool use', 'Human approval'] },
  { video: 31771, name: 'lab-genai', title: 'Enterprise knowledge & RAG', text: 'Assistants that answer from your own documents and show their sources, measured with repeatable evaluations.', tags: ['Retrieval', 'Evaluation', 'Citations'] },
  { video: 14785, name: 'lab-industrial', title: 'Industrial & predictive AI', text: 'Models that turn sensor and quality data into earlier warnings for operations teams.', tags: ['Forecasting', 'Anomaly detection'] },
  { video: 47051, name: 'lab-infra', title: 'AI infrastructure & LLMOps', text: 'Deployment, observability, cost control and guardrails for AI running in production.', tags: ['Monitoring', 'Cost', 'Guardrails'] },
];

const steps = [
  ['Pick a real problem', 'Every prototype starts from a workflow a client team actually runs.'],
  ['Build it small', 'A working slice in days, not a slide deck.'],
  ['Measure it', 'Agreed evaluation criteria, run the same way every time.'],
  ['Publish what holds up', 'Only tested work appears here, with its limits stated.'],
];

export default function AiLab() {
  usePageTitle('AI Lab');
  return (
    <>
      <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-ink pt-[var(--header-h)] text-white">
        <StockVideo id={51214} name="lab-hero" poster="/videos/hero-montage.jpg" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
        <div className="mx-auto w-full max-w-hero px-5 py-24 sm:px-8">
          <div className="max-w-3xl">
            <p className="hero-in font-mono text-xs uppercase tracking-[0.22em] text-white/90">AI Lab</p>
            <h1 className="hero-in mt-6 text-balance text-5xl font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-[5rem]">Where ideas become working prototypes.</h1>
            <p className="hero-in mt-7 max-w-xl text-lg leading-8 text-white/85 sm:text-xl">Demos, technical prototypes and solution architectures. We publish only what we have built and tested.</p>
            <div className="hero-in mt-10 flex flex-wrap gap-4">
              <a href="#tracks" className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink hover:bg-white/85">What we are exploring <span aria-hidden>↓</span></a>
              <Link to="/contact" className="inline-flex items-center gap-3 rounded-full border border-white/50 px-6 py-3.5 text-sm font-medium text-white backdrop-blur hover:bg-white/10">Ask about a pilot</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="tracks" className="scroll-mt-24 bg-paper">
        <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:py-28">
          <Reveal className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-iris">Lab tracks</p>
            <h2 className="mt-4 text-4xl font-medium leading-tight sm:text-5xl">Four areas we are building in.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {tracks.map((t, i) => (
              <Reveal key={t.name} className="card-lift group overflow-hidden rounded-3xl border border-line bg-white">
                <div className="relative aspect-video overflow-hidden bg-ink">
                  <StockVideo id={t.video} name={t.name} poster="/videos/hero-montage.jpg" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className={`absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] ${tone(i).card}`}>Track 0{i + 1}</span>
                  <span className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white backdrop-blur">
                    <i className="ping h-1.5 w-1.5 rounded-full bg-teal" />In progress
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="text-2xl">{t.title}</h3>
                  <p className="mt-3 text-ink/70">{t.text}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {t.tags.map((g) => <li key={g} className="rounded-full border border-line bg-paper px-3 py-1 text-xs text-ink/75">{g}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:py-28">
          <Reveal className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-iris">How the lab works</p>
            <h2 className="mt-4 text-4xl font-medium leading-tight sm:text-5xl">Built small, measured, then shared.</h2>
          </Reveal>
          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([t, d], i) => (
              <Reveal as="li" key={t} className="border-t-2 border-ink pt-5">
                <span className="font-mono text-sm text-iris">0{i + 1}</span>
                <h3 className="mt-3 text-xl">{t}</h3>
                <p className="mt-2 text-ink/70">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper px-4 py-16 sm:px-6">
        <Reveal className="relative isolate mx-auto max-w-hero overflow-hidden rounded-[2rem] bg-ink text-white">
          <StockVideo id={12748} name="lab-world" poster="/videos/hero-montage.jpg" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-black/60" />
          <div className="px-6 py-20 sm:px-12 lg:px-16 lg:py-24">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/88">In preparation</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-medium leading-tight sm:text-5xl">The first public demos are on their way.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">Want a prototype for your own use case instead? A pilot is the fastest route, usually four to six weeks.</p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink hover:bg-white/85">Ask about a pilot <span aria-hidden>→</span></Link>
          </div>
        </Reveal>
      </section>

      <CallToAction />
    </>
  );
}
