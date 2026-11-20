import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CallToAction, Faq, Reveal } from '../components/ui.jsx';
import { Hero } from '../components/Hero.jsx';
import { Icon } from '../components/Icon.jsx';
import { StockVideo } from '../components/StockVideo.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';
import { tone } from '../lib/tones.js';
import { faqs, industries, launchFirst, packages, services } from '../lib/content.js';
import { serviceDetails } from '../lib/serviceDetails.js';
import { articles } from '../lib/articles.js';

const INDUSTRY_ICONS = { 'financial-services': 'bank', healthcare: 'heart', retail: 'cart', manufacturing: 'factory', logistics: 'truck', technology: 'cpu' };

function Kicker({ children, light }) {
  return <p className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] ${light ? 'text-white/85' : 'text-iris'}`}>{children}</p>;
}

function SectionHead({ kicker, title, link, to, light }) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-6 border-t pt-8 ${light ? 'border-white/20' : 'border-ink'}`}>
      <Reveal className="max-w-3xl">
        <Kicker light={light}>{kicker}</Kicker>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">{title}</h2>
      </Reveal>
      {link && <Link to={to} className="link-cta text-sm">{link} <span aria-hidden>→</span></Link>}
    </div>
  );
}

/* 1 — Spotlight banners (Kyndryl's event / report promos) */
function Spotlights() {
  const assess = packages[0];
  const guide = articles[0];
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-editorial gap-px bg-line px-0 md:grid-cols-2">
        <Link to="/services#engagements" className="group flex items-center justify-between gap-6 bg-white px-5 py-7 sm:px-8">
          <div className="flex items-center gap-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-white"><Icon name="compass" className="h-5 w-5" /></span>
            <div>
              <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-iris">Start here · {assess.duration}</p>
              <p className="mt-1 text-lg font-semibold leading-snug">{assess.name}</p>
            </div>
          </div>
          <span aria-hidden className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
        <Link to={`/insights/${guide.slug}`} className="group flex items-center justify-between gap-6 bg-white px-5 py-7 sm:px-8">
          <div className="flex items-center gap-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-iris text-white"><Icon name="map" className="h-5 w-5" /></span>
            <div>
              <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-iris">New guide · {guide.read} read</p>
              <p className="mt-1 text-lg font-semibold leading-snug">{guide.title}</p>
            </div>
          </div>
          <span aria-hidden className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}

/* 2 — Jump-to anchor bar */
function JumpBar() {
  const items = [['who', 'Who we are'], ['helps', 'How Nuriek helps'], ['industries', 'Industries'], ['insights', 'Insights'], ['faq', 'FAQ']];
  return (
    <nav aria-label="Jump to" className="sticky top-[var(--header-h)] z-20 border-y border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-editorial items-center gap-8 overflow-x-auto px-5 py-4 text-sm sm:px-8">
        <span className="shrink-0 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink/75">Jump to</span>
        {items.map(([id, l]) => <a key={id} href={`#${id}`} className="link-underline shrink-0 font-medium">{l}</a>)}
      </div>
    </nav>
  );
}

/* Rotating clip panel for "Who we are" (Mixkit stock clips, free licence) */
const WHO_CLIPS = [
  { id: 23043, label: 'Engineering and business, side by side' },
  { id: 23158, label: 'Technical depth: engineering teams at work' },
  { id: 24057, label: 'Business focus: decisions grounded in data' },
];

function ClipCycler() {
  const box = useRef(null);
  const vids = useRef([]);
  const [inView, setInView] = useState(false);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    if (box.current) io.observe(box.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || reduce) return undefined;
    const t = setTimeout(() => setI((n) => (n + 1) % WHO_CLIPS.length), 6500);
    return () => clearTimeout(t);
  }, [i, inView, paused, reduce]);

  useEffect(() => {
    vids.current.forEach((v, n) => {
      if (!v) return;
      if (inView && n === i && !reduce) { v.currentTime = 0; v.play().catch(() => {}); } else v.pause();
    });
  }, [i, inView, reduce]);

  useEffect(() => {
    const resume = () => {
      const v = vids.current[i];
      if (document.visibilityState === 'visible' && inView && v && v.paused && !reduce) v.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', resume);
    return () => document.removeEventListener('visibilitychange', resume);
  }, [i, inView, reduce]);

  return (
    <div ref={box} className="relative aspect-video overflow-hidden rounded-sm bg-ink" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {WHO_CLIPS.map((c, n) => (
        <video
          key={c.id}
          ref={(el) => { vids.current[n] = el; if (el) { el.muted = true; el.setAttribute('muted', ''); } }}
          src={inView || n === 0 ? `https://assets.mixkit.co/videos/${c.id}/${c.id}-720.mp4` : undefined}
          muted loop playsInline preload={n === i ? 'auto' : 'metadata'}
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-1000 ease-editorial ${n === i ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
        />
      ))}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
        <p key={i} className="hero-in text-base font-semibold sm:text-lg">{WHO_CLIPS[i].label}</p>
        <div className="mt-4 flex gap-2" role="tablist" aria-label="Video clips">
          {WHO_CLIPS.map((c, n) => (
            <button key={c.id} type="button" role="tab" aria-selected={n === i} aria-label={c.label} onClick={() => setI(n)} className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/30">
              {n === i && <span key={`${i}-${paused}`} className="tab-progress absolute inset-y-0 left-0 !h-full !bg-white" style={{ animationDuration: '6.5s', animationPlayState: paused ? 'paused' : 'running' }} />}
              {n < i && <span className="absolute inset-0 bg-white" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 3 — Who we are */
function WhoWeAre() {
  const points = [
    ['compass', 'Honest scoping', 'We recommend AI only where it earns its place.'],
    ['chart', 'Measured outcomes', 'Success criteria agreed before we build.'],
    ['shield', 'Responsible by design', 'Security, privacy and oversight from day one.'],
  ];
  return (
    <section id="who" className="scroll-mt-36 bg-white">
      <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:py-28">
        <SectionHead kicker="Who we are" title="Technical depth with business focus." link="About Nuriek" to="/about" />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <p className="text-xl leading-9 text-ink/80">Nuriek AI Consulting helps organizations move from AI ambition to measurable business impact. We advise, architect, engineer, integrate, deploy, secure and continuously optimize enterprise AI, with the same team from first workshop to production support.</p>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {points.map(([icon, t, d], i) => (
                <li key={t} className="flex items-start gap-4 py-5">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${tone(i).card}`}><Icon name={icon} className="h-5 w-5" /></span>
                  <div><p className="font-semibold">{t}</p><p className="text-sm text-ink/75">{d}</p></div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal><ClipCycler /></Reveal>
        </div>
      </div>
    </section>
  );
}

/* 4 — How Nuriek helps: four numbered cards */
function HowWeHelp() {
  const featured = launchFirst.map((id) => services.find((s) => s.id === id));
  return (
    <section id="helps" className="scroll-mt-36 bg-paper">
      <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:py-28">
        <SectionHead kicker="How Nuriek helps" title="Where most of our engagements begin." link="All 12 services" to="/services" />
        <ol className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s, i) => (
            <Reveal as="li" key={s.id} className="bg-paper">
              <Link to={`/services#${s.id}`} className="group flex h-full min-h-[22rem] flex-col p-7 transition-colors duration-300 hover:bg-white">
                <span className="font-mono text-4xl font-medium text-ink/80">0{i + 1}</span>
                <span className={`mt-8 grid h-12 w-12 place-items-center rounded-full ${tone(i).card}`}><Icon name={serviceDetails[s.id]?.icon} /></span>
                <h3 className="mt-6 text-2xl font-medium leading-tight">{s.title}</h3>
                <p className="mt-3 flex-1 text-ink/75">{s.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Learn more <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span></span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 5 — Full-width promo banner */
function PromoBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <StockVideo id={22032} name="home-promo" poster="/videos/hero-montage.jpg" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />
      <div className="mx-auto max-w-editorial px-5 py-28 sm:px-8 lg:py-40">
        <Reveal className="max-w-2xl">
          <Kicker light>AI pilots</Kicker>
          <h2 className="mt-5 text-balance text-4xl font-medium leading-[1.06] sm:text-6xl">Make AI real with a working pilot in weeks.</h2>
          <p className="mt-6 text-lg leading-8 text-white/85">One workflow, real data and evaluation criteria agreed up front. In four to six weeks you have evidence to decide what to scale.</p>
          <Link to="/services#engagements" className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink hover:bg-white/90">Explore pilot engagements <span aria-hidden>→</span></Link>
        </Reveal>
      </div>
    </section>
  );
}

/* 6 — Industry highlights, numbered like customer stories */
function IndustryHighlights() {
  const [i, setI] = useState(0);
  const ind = industries[i];
  const t = tone(i);
  return (
    <section id="industries" className="scroll-mt-36 bg-white">
      <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:py-28">
        <SectionHead kicker="Industries" title="Built around the problems each sector actually has." link="Explore industries" to="/industries" />
        <div className="mt-12 grid gap-10 lg:grid-cols-[22rem_1fr]">
          <ol className="divide-y divide-line border-y border-line" role="tablist" aria-label="Industries">
            {industries.map((x, n) => (
              <li key={x.id}>
                <button type="button" role="tab" aria-selected={n === i} onClick={() => setI(n)} onMouseEnter={() => setI(n)}
                  className={`flex w-full items-center gap-5 py-4 text-left transition-colors duration-300 ${n === i ? 'text-ink' : 'text-ink/70 hover:text-ink'}`}>
                  <span className={`font-mono text-sm font-semibold ${n === i ? 'text-iris' : ''}`}>0{n + 1}</span>
                  <span className="flex-1 text-lg font-medium">{x.name}</span>
                  <span aria-hidden className={`h-[2px] bg-ink transition-all duration-500 ${n === i ? 'w-8' : 'w-0'}`} />
                </button>
              </li>
            ))}
          </ol>
          <div key={ind.id} className="hero-in grid overflow-hidden rounded-sm border border-line md:grid-cols-[1fr_1.2fr]">
            <div className={`relative flex min-h-[18rem] flex-col justify-between p-8 ${t.card}`}>
              <span className="font-mono text-sm font-semibold">Highlight 0{i + 1}</span>
              <Icon name={INDUSTRY_ICONS[ind.id]} className="h-24 w-24 opacity-90" />
              <p className="text-2xl font-medium">{ind.name}</p>
            </div>
            <div className="flex flex-col p-8">
              <p className="text-lg leading-8 text-ink/80">{ind.intro || ind.text}</p>
              {ind.useCases && (
                <>
                  <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink/75">Highlights</p>
                  <ul className="mt-3 space-y-2.5">
                    {ind.useCases.slice(0, 3).map((u) => <li key={u} className="flex gap-3 text-ink/85"><span aria-hidden className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${t.solid}`} />{u}</li>)}
                  </ul>
                </>
              )}
              <Link to={`/industries#${ind.id}`} className="link-cta mt-auto self-start pt-8 text-sm">Read more about {ind.name} <span aria-hidden>→</span></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 7 — Trends and insights */
function TrendsInsights() {
  return (
    <section id="insights" className="scroll-mt-36 bg-paper">
      <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:py-28">
        <SectionHead kicker="Trends and insights" title="Practical thinking on enterprise AI." link="All insights" to="/insights" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {articles.slice(1, 4).map((a, n) => (
            <Reveal key={a.slug}>
              <Link to={`/insights/${a.slug}`} className="group flex h-full flex-col bg-white">
                <div className={`relative aspect-video overflow-hidden ${tone(n + 1).card}`}>
                  <Icon name={a.icon} className="absolute bottom-6 right-6 h-20 w-20 opacity-40 transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-iris">{a.topic}</p>
                  <h3 className="mt-3 text-xl font-semibold leading-snug group-hover:underline">{a.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-ink/75">{a.summary}</p>
                  <span className="mt-5 text-sm font-semibold">Read the article →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  usePageTitle('');
  return (
    <>
      <Hero />
      <Spotlights />
      <JumpBar />
      <WhoWeAre />
      <HowWeHelp />
      <PromoBanner />
      <IndustryHighlights />
      <TrendsInsights />
      <section id="faq" className="scroll-mt-36 bg-white">
        <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:py-28">
          <SectionHead kicker="FAQ" title="Questions we hear most." />
          <Reveal className="mt-12"><Faq items={faqs} /></Reveal>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
