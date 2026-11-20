import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CallToAction, Reveal } from '../components/ui.jsx';
import { StockVideo } from '../components/StockVideo.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';
import { tone } from '../lib/tones.js';
import { stages } from '../lib/approach.js';

const gates = [
  ['Deliverables', 'Each stage ends with something you can read, run or approve.'],
  ['Acceptance criteria', 'Agreed before work starts, so "done" is not a matter of opinion.'],
  ['Named owners', 'One accountable person on each side for every stage.'],
  ['Quality gates', 'Production AI gets repeatable evaluations and monitoring. Governance controls are mapped to frameworks such as NIST AI RMF.'],
];

function useActiveStage() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = stages.map((s) => document.getElementById(`stage-${s.n}`)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.i)); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

function Stage({ s, i }) {
  const t = tone(i);
  return (
    <article id={`stage-${s.n}`} data-i={i} className="scroll-mt-28 border-t border-line py-14 first:border-t-0 first:pt-0">
      <Reveal className="relative overflow-hidden rounded-3xl bg-ink">
        <StockVideo id={s.video} name={`approach-${s.n}`} poster="/videos/hero-montage.jpg" className="aspect-[16/8] w-full object-cover opacity-90" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 text-white sm:p-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/88">Stage {s.n}</p>
            <h2 className="mt-2 text-4xl font-medium sm:text-5xl">{s.name}</h2>
          </div>
          <span className="rounded-full bg-white/15 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] backdrop-blur">{s.time}</span>
        </div>
      </Reveal>

      <Reveal className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-2xl font-medium leading-snug">{s.lead}</p>
          <p className="mt-4 text-lg leading-8 text-ink/70">{s.text}</p>
          <p className="mt-6 text-sm text-ink/75"><span className="font-semibold text-ink">Who takes part:</span> {s.who}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-5">
            <p className="text-sm font-semibold">What we do</p>
            <ul className="mt-3 space-y-2.5 text-sm text-ink/75">
              {s.activities.map((a) => <li key={a} className="flex gap-2.5"><span aria-hidden className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${t.solid}`} />{a}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5">
            <p className="text-sm font-semibold">What you get</p>
            <ul className="mt-3 space-y-2.5 text-sm text-ink/75">
              {s.deliverables.map((a) => <li key={a} className="flex gap-2.5"><span aria-hidden className="mt-0.5 text-xs">✓</span>{a}</li>)}
            </ul>
            <p className={`mt-4 rounded-xl px-3 py-2 text-xs font-medium ${t.card}`}>Gate: {s.gate}</p>
          </div>
        </div>
      </Reveal>
    </article>
  );
}

export default function Approach() {
  usePageTitle('Our approach');
  const active = useActiveStage();

  return (
    <>
      <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-ink pt-[var(--header-h)] text-white">
        <StockVideo id={4547} name="approach-hero" poster="/videos/hero-montage.jpg" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
        <div className="mx-auto w-full max-w-hero px-5 py-24 sm:px-8">
          <p className="hero-in font-mono text-xs uppercase tracking-[0.22em] text-white/90">Our approach</p>
          <h1 className="hero-in mt-6 max-w-4xl text-balance text-5xl font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-[5rem]">Seven stages from first conversation to AI that keeps improving.</h1>
          <p className="hero-in mt-7 max-w-xl text-lg leading-8 text-white/85 sm:text-xl">Every stage has an owner, a deliverable and a gate, so you always know where the work stands and what comes next.</p>
          <ol className="hero-in mt-12 flex flex-wrap gap-2">
            {stages.map((s, i) => (
              <li key={s.n}><a href={`#stage-${s.n}`} className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm backdrop-blur transition-colors hover:bg-white hover:text-ink"><span className={`h-2 w-2 rounded-full ${tone(i).solid}`} />{s.name}</a></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-editorial gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[15rem_1fr] lg:py-28">
          <aside className="hidden lg:block">
            <nav aria-label="Approach stages" className="sticky top-28">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-iris">The path</p>
              <ol className="relative mt-6 space-y-1 border-l-2 border-line">
                {stages.map((s, i) => (
                  <li key={s.n}>
                    <a href={`#stage-${s.n}`} className={`-ml-[2px] flex items-center gap-3 border-l-2 py-2.5 pl-5 text-sm transition-colors ${active === i ? 'border-ink font-semibold text-ink' : 'border-transparent text-ink/72 hover:text-ink'}`}>
                      <span className="font-mono text-xs">{s.n}</span>{s.name}
                    </a>
                  </li>
                ))}
              </ol>
              <Link to="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white hover:bg-iris">Start at stage 01 →</Link>
            </nav>
          </aside>
          <div>
            {stages.map((s, i) => <Stage key={s.n} s={s} i={i} />)}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:py-28">
          <Reveal className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-iris">At every stage</p>
            <h2 className="mt-4 text-4xl font-medium leading-tight sm:text-5xl">What you can hold us to.</h2>
          </Reveal>
          <dl className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {gates.map(([t, d]) => (
              <Reveal key={t} className="border-t-2 border-ink pt-5">
                <dt className="text-xl font-semibold">{t}</dt>
                <dd className="mt-2 text-ink/70">{d}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
