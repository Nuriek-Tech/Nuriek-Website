import { Link } from 'react-router-dom';
import { CallToAction, Reveal } from '../components/ui.jsx';
import { StockVideo } from '../components/StockVideo.jsx';
import { Icon } from '../components/Icon.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';
import { tone } from '../lib/tones.js';
import { services, solutions } from '../lib/content.js';
import { solutionDetails } from '../lib/solutionDetails.js';

function SolutionBlock({ s, i }) {
  const d = solutionDetails[s.id] || {};
  const t = tone(i);
  const flip = i % 2 === 1;
  const related = (d.services || []).map((id) => services.find((x) => x.id === id)).filter(Boolean);
  return (
    <section id={s.id} className={`scroll-mt-36 ${flip ? 'bg-white' : 'bg-paper'}`}>
      <div className="mx-auto grid max-w-editorial gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-start lg:gap-14 lg:py-24">
        <Reveal className={`lg:sticky lg:top-28 ${flip ? 'lg:order-2' : ''}`}>
          <div className="relative overflow-hidden rounded-3xl bg-ink shadow-xl">
            <StockVideo id={d.video} name={`solution-${s.id}`} poster="/videos/hero-montage.jpg" className="aspect-[4/3] w-full object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className={`absolute left-5 top-5 rounded-full px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] ${t.card}`}>Solution 0{i + 1}</span>
            <ul className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2">
              {s.tags.map((g) => <li key={g} className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink">{g}</li>)}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <span className={`grid h-12 w-12 place-items-center rounded-2xl ${t.card}`}><Icon name={d.icon} /></span>
          <h2 className="mt-5 text-4xl font-medium leading-tight sm:text-5xl">{s.name}</h2>
          <p className="mt-4 text-xl leading-snug text-ink/80">{s.text}</p>

          {d.problem && (
            <div className="mt-8 rounded-2xl border border-line bg-white p-6">
              <p className="text-sm font-semibold">The problem today</p>
              <p className="mt-2 leading-7 text-ink/70">{d.problem}</p>
            </div>
          )}

          {d.steps && (
            <div className="mt-8">
              <p className="text-sm font-semibold">How it works</p>
              <ol className="mt-4 space-y-4">
                {d.steps.map((st, n) => (
                  <li key={st} className="flex gap-4">
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-xs ${t.card}`}>{n + 1}</span>
                    <span className="pt-1 leading-6 text-ink/80">{st}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {d.outcomes && (
              <div>
                <p className="text-sm font-semibold">Outcomes</p>
                <ul className="mt-3 space-y-2 text-sm text-ink/75">
                  {d.outcomes.map((o) => <li key={o} className="flex gap-2.5"><span aria-hidden>✓</span>{o}</li>)}
                </ul>
              </div>
            )}
            {d.connects && (
              <div>
                <p className="text-sm font-semibold">Connects with</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {d.connects.map((c) => <li key={c} className="rounded-full border border-line bg-paper px-3 py-1 text-xs text-ink/75">{c}</li>)}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="text-sm text-ink/72">Built with: {related.map((r, n) => <span key={r.id}>{n > 0 && ', '}<Link to={`/services#${r.id}`} className="font-medium text-ink underline-offset-4 hover:underline">{r.title}</Link></span>)}</p>
            <Link to={`/contact`} className="link-cta text-sm">Discuss this workflow <span aria-hidden>→</span></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Solutions() {
  usePageTitle('Solutions');
  return (
    <>
      <section className="relative isolate flex min-h-[72svh] items-end overflow-hidden bg-ink pt-[var(--header-h)] text-white">
        <StockVideo id={33006} name="solutions-hero" poster="/videos/hero-montage.jpg" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/50 to-black/25" />
        <div className="mx-auto w-full max-w-hero px-5 pb-20 pt-24 sm:px-8">
          <p className="hero-in font-mono text-xs uppercase tracking-[0.22em] text-white/90">Solutions</p>
          <h1 className="hero-in mt-6 max-w-4xl text-balance text-5xl font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-[5rem]">Business workflows where AI earns its place.</h1>
          <p className="hero-in mt-7 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">Start from the process, not the model. Eight workflows we most often improve, and how we approach each one.</p>
        </div>
      </section>

      <nav aria-label="Solutions" className="sticky top-[var(--header-h)] z-20 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-editorial gap-2 overflow-x-auto px-5 py-3 sm:px-8">
          {solutions.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-ink hover:text-white">{s.name}</a>
          ))}
        </div>
      </nav>

      {solutions.map((s, i) => <SolutionBlock key={s.id} s={s} i={i} />)}

      <CallToAction title="Have a workflow in mind?" text="Describe it in a few lines. We will tell you what we would test first." />
    </>
  );
}
