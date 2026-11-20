import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CallToAction, PageHero, Reveal, Section } from '../components/ui.jsx';
import { StockVideo } from '../components/StockVideo.jsx';
import { Icon } from '../components/Icon.jsx';
import { serviceDetails } from '../lib/serviceDetails.js';
import { usePageTitle } from '../lib/usePageTitle.js';
import { tone } from '../lib/tones.js';
import { goals, groupOf, packages, pricingNote, serviceGroups, services } from '../lib/content.js';

const FILTERS = [{ id: 'all', name: 'All' }, ...serviceGroups];

function Tile({ s, i, onOpen, big }) {
  const g = groupOf(s.id);
  const d = serviceDetails[s.id] || {};
  return (
    <button type="button" onClick={() => onOpen(s.id)}
      onMouseEnter={(e) => { const v = e.currentTarget.querySelector('video'); if (v) v.play().catch(() => {}); }}
      onMouseLeave={(e) => { const v = e.currentTarget.querySelector('video'); if (v) v.pause(); }}
      onFocus={(e) => { const v = e.currentTarget.querySelector('video'); if (v) v.play().catch(() => {}); }}
      onBlur={(e) => { const v = e.currentTarget.querySelector('video'); if (v) v.pause(); }}
      className={`tile group relative isolate flex min-h-[19rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-6 text-left text-white ${big ? 'md:col-span-2 md:min-h-[24rem]' : ''}`}
      style={{ animationDelay: `${i * 40}ms` }}>
      <StockVideo hoverOnly ownFrame id={d.video} name={`service-${s.id}`} poster="/videos/hero-montage.jpg"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/95 via-black/55 to-black/10 transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/30" />
      <div className="absolute left-6 right-6 top-6 flex items-start justify-between">
        <span className={`grid h-12 w-12 place-items-center rounded-2xl ${tone(g).card}`}><Icon name={d.icon} /></span>
        <span className="font-mono text-sm font-semibold text-white/90">{s.n}</span>
      </div>
      {s.featured && <span className="mb-3 self-start rounded-full bg-white px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink">Common starting point</span>}
      <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/85">{serviceGroups[g].name}</p>
      <h3 className={`mt-2 font-medium leading-tight ${big ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{s.title}</h3>
      <p className="mt-2 max-h-0 overflow-hidden text-sm leading-6 text-white/90 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 group-focus-visible:max-h-24 group-focus-visible:opacity-100">{s.summary}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">Explore <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span></span>
    </button>
  );
}

function Drawer({ id, onClose, onStep }) {
  const s = services.find((x) => x.id === id);
  useEffect(() => {
    if (!s) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [s, onClose, onStep]);

  const open = !!s;
  const g = s ? groupOf(s.id) : 0;
  const t = tone(g);
  const d = (s && serviceDetails[s.id]) || {};
  const idx = s ? services.indexOf(s) : 0;

  return (
    <div className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div onClick={onClose} className={`absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`} />
      <aside role="dialog" aria-modal="true" aria-label={s ? s.title : 'Service'}
        className={`drawer absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col overflow-y-auto overscroll-contain bg-white shadow-2xl transition-transform duration-500 ease-editorial ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {s && (
          <div key={s.id} className="hero-in">
            <div className="relative aspect-video bg-ink">
              <StockVideo id={d.video} name={`service-${s.id}`} poster="/videos/hero-montage.jpg" className="absolute inset-0 h-full w-full object-cover" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
              <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-lg hover:scale-105">✕</button>
              <div className="absolute inset-x-0 bottom-0 flex items-end gap-4 p-6 text-white">
                <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${t.card}`}><Icon name={d.icon} /></span>
                <div>
                  <p className="font-mono text-xs font-semibold text-white/90">{serviceGroups[g].name} · Service {s.n} of 12</p>
                  <h2 className="text-3xl font-medium leading-tight">{s.title}</h2>
                </div>
              </div>
            </div>
            <div className="p-7 sm:p-9">
              <p className="text-xl font-medium leading-snug">{s.summary}</p>
              {d.overview && <p className="mt-3 leading-7 text-ink/80">{d.overview}</p>}
              <div className="mt-8 space-y-4">
                {[['What changes', d.outcomes, 'chart'], ['Example use cases', d.examples, 'sparkles'], ['What you get', d.deliverables, 'box']].map(([title, list, icon]) => list && (
                  <div key={title} className="rounded-2xl bg-paper p-5">
                    <p className="flex items-center gap-2 text-sm font-semibold"><Icon name={icon} className="h-4 w-4" />{title}</p>
                    <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/85 sm:grid-cols-3">
                      {list.map((o) => <li key={o} className="flex gap-2"><span aria-hidden className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${t.solid}`} />{o}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-sm font-semibold">Capabilities included</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.items.map((i) => <li key={i} className="rounded-full border border-line px-3 py-1 text-sm text-ink/85">{i}</li>)}
              </ul>
              {d.engagement && <p className="mt-8 flex items-center gap-2 text-sm"><Icon name="calendar" className="h-4 w-4" /><span className="text-ink/80">Typical engagement:</span><span className="font-semibold">{d.engagement}</span></p>}
              <Link to={`/contact?service=${s.id}`} className="mt-6 flex h-14 items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-white hover:bg-iris">Discuss this service →</Link>
            </div>
            <div className="sticky bottom-0 flex items-center justify-between border-t border-line bg-white/95 px-7 py-4 text-sm backdrop-blur">
              <button type="button" onClick={() => onStep(-1)} className="group flex items-center gap-2 font-medium text-ink/80 hover:text-ink"><span aria-hidden className="transition-transform group-hover:-translate-x-1">←</span>{services[(idx + 11) % 12].title}</button>
              <button type="button" onClick={() => onStep(1)} className="group flex items-center gap-2 font-semibold">{services[(idx + 1) % 12].title}<span aria-hidden className="transition-transform group-hover:translate-x-1">→</span></button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function CapabilityGallery() {
  const { hash } = useLocation();
  const [filter, setFilter] = useState('all');
  const [openId, setOpenId] = useState(null);
  useEffect(() => { const h = hash.slice(1); if (services.some((x) => x.id === h)) setOpenId(h); }, [hash]);

  const shown = services.filter((s) => filter === 'all' || serviceGroups.find((g) => g.id === filter)?.ids.includes(s.id));
  const fi = FILTERS.findIndex((f) => f.id === filter);
  const openTile = useCallback((id) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);
  const step = useCallback((dir) => setOpenId((cur) => {
    const n = (services.findIndex((x) => x.id === cur) + dir + services.length) % services.length;
    return services[n].id;
  }), []);

  return (
    <section id="capabilities" className="relative bg-paper">
      {services.map((x) => <span key={x.id} id={x.id} aria-hidden className="absolute top-0" />)}
      <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-iris">Our capabilities</p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.07] tracking-tight sm:text-5xl">Choose a capability to explore.</h2>
            <p className="mt-3 text-lg text-ink/80">Hover to preview. Click to see outcomes, use cases and how we engage.</p>
          </Reveal>
          <div className="relative flex rounded-full bg-white p-1 shadow-sm" role="tablist" aria-label="Filter capabilities">
            <span aria-hidden className="absolute inset-y-1 rounded-full bg-ink transition-all duration-500 ease-editorial" style={{ left: `calc(${fi} * (100% - 0.5rem) / ${FILTERS.length} + 0.25rem)`, width: `calc((100% - 0.5rem) / ${FILTERS.length})` }} />
            {FILTERS.map((f) => (
              <button key={f.id} type="button" role="tab" aria-selected={filter === f.id} onClick={() => setFilter(f.id)}
                className={`relative z-10 w-24 whitespace-nowrap rounded-full px-2 py-2.5 text-sm font-semibold transition-colors duration-300 sm:w-28 ${filter === f.id ? 'text-white' : 'text-ink/80 hover:text-ink'}`}>
                {f.name}
              </button>
            ))}
          </div>
        </div>

        <div key={filter} className="mt-12 grid grid-flow-dense gap-4 md:grid-cols-2 lg:grid-cols-4">
          {shown.map((s, i) => <Tile key={s.id} s={s} i={i} onOpen={openTile} big={filter === 'all' && s.featured} />)}
        </div>
      </div>
      <Drawer id={openId} onClose={close} onStep={step} />
    </section>
  );
}

function GoalFinder() {
  const [pick, setPick] = useState(null);
  const svc = pick == null ? null : services.find((s) => s.id === goals[pick].id);
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <ul className="grid gap-3 sm:grid-cols-2">
        {goals.map((g, i) => (
          <li key={g.q}>
            <button
              type="button"
              onClick={() => setPick(i)}
              aria-pressed={pick === i}
              className={`h-full w-full rounded-2xl border p-5 text-left text-lg font-medium leading-snug transition-all duration-300 ${pick === i ? 'border-iris bg-iris text-white shadow-lg shadow-iris/20' : 'border-line bg-white hover:-translate-y-1 hover:border-iris/50'}`}
            >
              {g.q}
            </button>
          </li>
        ))}
      </ul>
      <div className="relative min-h-[16rem] overflow-hidden rounded-3xl border border-line bg-white p-8" aria-live="polite">
        {svc ? (
          <div key={svc.id} className="hero-in">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-iris">We would start with</p>
            <h3 className="mt-4 text-2xl leading-snug">{svc.title}</h3>
            <p className="mt-3 text-ink/70">{svc.summary}</p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <a href={`#${svc.id}`} className="link-cta text-sm">View service <span aria-hidden>→</span></a>
              <Link to={`/contact?service=${svc.id}`} className="link-cta text-sm">Book a consultation <span aria-hidden>→</span></Link>
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[12rem] flex-col justify-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-iris">Not sure yet?</p>
            <p className="mt-4 text-2xl font-medium leading-snug">Pick the goal that sounds closest and we will point you to a starting place.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Services() {
  usePageTitle('Services');
  return (
    <>
      <PageHero
        tone={0}
        eyebrow="Services"
        title="Twelve capabilities, from strategy to operations."
        lede="Use one, or have us carry an initiative from first workshop to production support."
      />

      <CapabilityGallery />

      <Section tone="soft" eyebrow="Find your starting point" title="Not sure which service you need?">
        <GoalFinder />
      </Section>

      <Section id="engagements" tone="dark" eyebrow="Engagements" title="From first assessment to managed operations.">
        <ol className="relative space-y-6 border-l-2 border-iris/25 pl-8 sm:pl-12">
          {packages.map((p, i) => (
            <Reveal as="li" key={p.name} className="relative">
              <span className={`absolute -left-[3.05rem] top-6 grid h-9 w-9 place-items-center rounded-full font-mono text-xs sm:-left-[4.05rem] ${tone(i).card}`}>{i + 1}</span>
              <div className="card-lift grid gap-4 rounded-3xl border border-line bg-white p-7 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-iris">{p.duration}</p>
                  <h3 className="mt-2 text-2xl">{p.name}</h3>
                  <p className="mt-2 text-ink/70">{p.blurb}</p>
                </div>
                <p className="text-2xl font-medium text-iris sm:text-right">{p.price}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <p className="mt-8 font-mono text-xs text-ink/70">{pricingNote}</p>
      </Section>

      <CallToAction />
    </>
  );
}
