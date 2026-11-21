import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icon.jsx';
import { Reveal } from './ui.jsx';
import { tone } from '../lib/tones.js';
import { stages } from '../lib/approach.js';
import { industries, packages } from '../lib/content.js';

const STAGE_ICONS = ['search', 'gauge', 'map', 'flask', 'code', 'rocket', 'pulse'];
const INDUSTRY_ICONS = { 'financial-services': 'bank', healthcare: 'heart', retail: 'cart', manufacturing: 'factory', logistics: 'truck', technology: 'cpu' };

function Eyebrow({ children, dark }) {
  return <p className={`font-mono text-xs uppercase tracking-[0.2em] ${dark ? 'text-white/82' : 'text-iris'}`}>{children}</p>;
}

export function StagesExplorer() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % stages.length), 5000);
    return () => clearInterval(id);
  }, [auto]);
  const s = stages[i];
  const pick = (n) => { setI(n); setAuto(false); };
  const pct = (i / (stages.length - 1)) * 100;

  return (
    <section id="how" className="scroll-mt-20 bg-ink text-white">
      <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <Eyebrow dark>How it runs</Eyebrow>
            <h2 className="mt-4 text-4xl font-medium leading-[1.07] sm:text-5xl">Seven stages, each with a deliverable and a gate.</h2>
          </Reveal>
          <Link to="/approach" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium hover:bg-white hover:text-ink">Full approach →</Link>
        </div>

        <div className="relative mt-14">
          <div aria-hidden className="absolute left-6 right-6 top-6 hidden h-[2px] bg-white/15 md:block" />
          <div aria-hidden className="absolute left-6 top-6 hidden h-[2px] bg-white transition-all duration-700 md:block" style={{ width: `calc((100% - 3rem) * ${pct / 100})` }} />
          <ol className="relative grid grid-cols-4 gap-y-6 md:grid-cols-7" role="tablist" aria-label="Stages">
            {stages.map((st, n) => (
              <li key={st.n} className="flex flex-col items-center text-center">
                <button
                  type="button" role="tab" aria-selected={n === i} onClick={() => pick(n)}
                  className={`relative grid h-12 w-12 place-items-center rounded-full border-2 transition-all duration-300 ${n === i ? `scale-110 border-transparent ${tone(n).card}` : n < i ? 'border-white bg-white text-ink' : 'border-white/25 bg-ink text-white/88 hover:border-white'}`}
                >
                  <Icon name={STAGE_ICONS[n]} className="h-5 w-5" />
                </button>
                <span className={`mt-3 text-sm font-medium ${n === i ? 'text-white' : 'text-white/80'}`}>{st.name}</span>
                <span className="font-mono text-[0.68rem] text-white/80">{st.n}</span>
              </li>
            ))}
          </ol>
        </div>

        <div key={s.n} className="hero-in mt-12 grid gap-6 rounded-3xl bg-white/[0.06] p-7 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className={`grid h-11 w-11 place-items-center rounded-2xl ${tone(i).card}`}><Icon name={STAGE_ICONS[i]} className="h-5 w-5" /></span>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/82">Stage {s.n} · {s.time}</p>
            </div>
            <h3 className="mt-5 text-3xl font-medium">{s.name}</h3>
            <p className="mt-3 text-xl leading-snug text-white/90">{s.lead}</p>
            <p className="mt-3 leading-7 text-white/85">{s.text}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-ink">
            <p className="text-sm font-semibold">What you get</p>
            <ul className="mt-3 space-y-2.5">
              {s.deliverables.map((d) => <li key={d} className="flex items-center gap-3 text-sm"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-paper text-[0.6rem]">✓</span>{d}</li>)}
            </ul>
            <div className="mt-5 flex items-center gap-3 rounded-xl bg-paper px-4 py-3">
              <Icon name="shield" className="h-5 w-5 shrink-0 text-ink/75" />
              <p className="text-sm"><span className="text-ink/72">Gate:</span> <span className="font-semibold">{s.gate}</span></p>
            </div>
            <div className="mt-5 flex items-center justify-between text-sm">
              <button type="button" onClick={() => pick((i + stages.length - 1) % stages.length)} className="font-medium text-ink/72 hover:text-ink">← Previous</button>
              <button type="button" onClick={() => pick((i + 1) % stages.length)} className="font-semibold hover:underline">Next stage →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PKG = [
  { icon: 'compass', step: 'Start here', best: 'Teams unsure where AI fits' },
  { icon: 'map', step: 'Plan', best: 'Leadership ready to commit budget' },
  { icon: 'bolt', step: 'Prove', best: 'One workflow to test quickly' },
  { icon: 'layers', step: 'Scale', best: 'A proven pilot going to production' },
];

export function WaysToWork() {
  const list = packages.slice(0, 4);
  const ops = packages.find((p) => /Managed/.test(p.name));
  return (
    <section id="packages" className="scroll-mt-20 bg-paper">
      <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <Eyebrow>Engagements</Eyebrow>
          <h2 className="mt-4 text-4xl font-medium leading-[1.07] sm:text-5xl">Ways to work with Nuriek.</h2>
          <p className="mt-4 text-lg text-ink/78">Each step stands on its own. Most clients start small and move up when the results justify it.</p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:items-end">
          {list.map((p, n) => {
            const first = n === 0;
            return (
              <Reveal key={p.name} className={`card-lift relative flex flex-col rounded-3xl p-7 ${first ? 'bg-ink text-white' : 'border border-line bg-white'}`} style={{ minHeight: `${21 + n * 2.5}rem` }}>
                {first && <span className="absolute -top-3 left-7 rounded-full bg-amber px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-night">Most clients start here</span>}
                <div className="flex items-center justify-between">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ${first ? 'bg-white text-ink' : tone(n).card}`}><Icon name={PKG[n].icon} /></span>
                  <span className={`font-mono text-xs uppercase tracking-[0.14em] ${first ? 'text-white/80' : 'text-ink/70'}`}>0{n + 1} · {PKG[n].step}</span>
                </div>
                <h3 className="mt-6 text-2xl font-medium leading-tight">{p.name}</h3>
                <p className={`mt-3 flex-1 text-sm leading-6 ${first ? 'text-white/88' : 'text-ink/78'}`}>{p.blurb}</p>
                <p className={`mt-5 text-xs ${first ? 'text-white/80' : 'text-ink/70'}`}>Best for: {PKG[n].best}</p>
                <div className={`mt-5 border-t pt-4 ${first ? 'border-white/15' : 'border-line'}`}>
                  <span className={`flex items-center gap-1.5 text-sm ${first ? 'text-white/80' : 'text-ink/70'}`}><Icon name="calendar" className="h-4 w-4" />{p.duration}</span>
                  <span className="mt-1 block whitespace-nowrap text-xl font-semibold">{p.price}</span>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white px-6 py-5">
          <div className="flex items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-paper"><Icon name="infinity" className="h-5 w-5" /></span>
            <p><span className="font-semibold">After launch:</span> <span className="text-ink/78">{ops ? `${ops.name}, ${ops.price} per month.` : 'Managed AI Operations, billed monthly.'}</span></p>
          </div>
          <Link to="/services#engagements" className="link-cta text-sm">Compare all engagements <span aria-hidden>→</span></Link>
        </Reveal>
        <p className="mt-4 text-xs text-ink/70">Indicative ranges. Final pricing depends on scope, complexity, security and staffing.</p>
      </div>
    </section>
  );
}

export function IndustriesBento() {
  const span = ['lg:col-span-2', '', '', '', '', 'lg:col-span-2'];
  return (
    <section id="industries" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>Industries</Eyebrow>
            <h2 className="mt-4 text-4xl font-medium leading-[1.07] sm:text-5xl">Built around the problems each sector actually has.</h2>
          </Reveal>
          <Link to="/industries" className="link-cta text-sm">Explore industries <span aria-hidden>→</span></Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, n) => {
            const big = span[n];
            const t = tone(n);
            return (
              <Reveal key={ind.id} className={big}>
                <Link to={`/industries#${ind.id}`} className={`group relative flex h-full min-h-[17rem] flex-col overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1 ${big ? 'bg-ink text-white' : 'border border-line bg-paper'}`}>
                  <div aria-hidden className={`absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 transition-transform duration-700 group-hover:scale-125 ${t.solid}`} />
                  <div className="relative flex items-start justify-between">
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl ${t.card}`}><Icon name={INDUSTRY_ICONS[ind.id]} /></span>
                    <span aria-hidden className={`grid h-9 w-9 place-items-center rounded-full transition-all duration-300 group-hover:rotate-[-45deg] ${big ? 'bg-white/10' : 'bg-white'}`}>→</span>
                  </div>
                  <h3 className={`relative mt-auto pt-10 font-medium ${big ? 'text-3xl' : 'text-2xl'}`}>{ind.name}</h3>
                  <p className={`relative mt-2 text-sm leading-6 ${big ? 'max-w-lg text-white/88' : 'text-ink/78'}`}>{ind.text}</p>
                  {big && ind.useCases && (
                    <ul className="relative mt-5 flex flex-wrap gap-2">
                      {ind.useCases.slice(0, 3).map((u) => <li key={u} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/85">{u}</li>)}
                    </ul>
                  )}
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
