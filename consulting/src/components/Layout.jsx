import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SITE, industries, services, solutions } from '../lib/content.js';
import { tone } from '../lib/tones.js';
import { StockVideo } from './StockVideo.jsx';

const nav = [
  { label: 'What we do', to: '/services', mega: 'whatwedo' },
  { label: 'Approach', to: '/approach' },
  { label: 'AI Lab', to: '/ai-lab' },
  { label: 'Insights', to: '/insights' },
  { label: 'About', to: '/about' },
];

function useRouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-in)');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [pathname]);
}

const mixkit = (id) => `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`;

const menus = {
  services: {
    label: 'Services',
    blurb: 'Twelve capabilities, from strategy to managed operations.',
    items: services.map((x) => ({ key: x.id, n: x.n, title: x.title, sub: x.summary, to: `/services#${x.id}` })),
    spot: { video: 4809, kicker: 'Where to start', text: 'A one to two week AI Opportunity Assessment.', link: 'See engagements', to: '/services#engagements' },
  },
  solutions: {
    label: 'Solutions',
    blurb: 'Business workflows where AI earns its place.',
    items: solutions.map((x, i) => ({ key: x.id, n: String(i + 1).padStart(2, '0'), title: x.name, sub: x.text, to: `/solutions#${x.id}` })),
    spot: { video: 4835, kicker: 'Have a workflow in mind?', text: 'We will tell you what we would test first.', link: 'All solutions', to: '/solutions' },
  },
  industries: {
    label: 'Industries',
    blurb: 'Start from the problems your sector recognizes.',
    items: industries.map((x, i) => ({ key: x.id, n: String(i + 1).padStart(2, '0'), title: x.name, sub: x.text, to: `/industries#${x.id}`, video: x.video })),
    spot: { video: 914, kicker: 'Six sectors', text: 'Finance, healthcare, retail, manufacturing, logistics and SaaS.', link: 'Explore industries', to: '/industries' },
  },
};

function SpotVideo({ id }) {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!id || reduce) return null;
  return <video key={id} className="hero-clip absolute inset-0 h-full w-full object-cover" src={mixkit(id)} autoPlay muted loop playsInline />;
}

const tabs = [
  { id: 'services', to: '/services' },
  { id: 'solutions', to: '/solutions' },
  { id: 'industries', to: '/industries' },
];

// Every clip the dropdown can show: tab spotlights plus industry previews.
const allVideos = [...new Set([
  ...Object.values(menus).map((x) => x.spot.video),
  ...menus.industries.items.map((x) => x.video),
].filter(Boolean))];

function MegaVideos({ ids, active, open }) {
  const refs = useRef({});
  const [ready, setReady] = useState(() => new Set());
  const [shown, setShown] = useState(active);
  const [warm, setWarm] = useState(false);

  // Start loading clips the first time the menu opens, then keep them.
  useEffect(() => { if (open) setWarm(true); }, [open]);

  // Only switch the visible clip once the new one can play, so the card never goes black.
  useEffect(() => { if (ready.has(active)) setShown(active); }, [active, ready]);

  // Play the visible clip while the menu is open; pause everything else.
  const sync = () => {
    Object.entries(refs.current).forEach(([id, v]) => {
      if (!v) return;
      if (open && Number(id) === shown) {
        if (v.paused) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
      } else if (!v.paused) {
        v.pause();
      }
    });
  };
  useEffect(sync);
  useEffect(() => {
    const onVis = () => { if (document.visibilityState === 'visible') sync(); };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  });

  if (!warm) return null;
  return ids.map((id) => (
    <video
      key={id}
      ref={(el) => {
        refs.current[id] = el;
        if (el) { el.muted = true; el.setAttribute('muted', ''); el.setAttribute('playsinline', ''); }
      }}
      src={mixkit(id)}
      muted loop playsInline
      preload={id === active || id === shown ? 'auto' : 'metadata'}
      onCanPlay={(e) => {
        setReady((r) => (r.has(id) ? r : new Set(r).add(id)));
        if (open && id === shown && e.currentTarget.paused) e.currentTarget.play().catch(() => {});
      }}
      onLoadedData={() => setReady((r) => (r.has(id) ? r : new Set(r).add(id)))}
      className={`absolute inset-0 -z-10 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-editorial ${id === shown ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
    />
  ));
}

function MegaMenu({ open, onClose }) {
  const [tab, setTab] = useState('services');
  const [hover, setHover] = useState(null);
  const m = menus[tab];
  const active = m.items.find((x) => x.key === hover);
  const videoId = active?.video || m.spot.video;
  const tabIndex = tabs.findIndex((t) => t.id === tab);
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => { if (!open) setHover(null); }, [open]);
  const pick = (id) => { if (id !== tab) { setTab(id); setHover(null); } };

  return (
    <div
      aria-hidden={!open}
      className={`mega-shell border-t border-line bg-white text-ink shadow-[0_30px_60px_-20px_rgba(17,17,17,0.25)] ${open ? 'is-open' : ''}`}
    >
      <div className="mx-auto grid max-w-[76rem] gap-8 px-6 py-8 lg:grid-cols-[16rem_1fr_17rem]">
        <div className="relative flex flex-col gap-2" role="tablist" aria-label="What we do">
          <span aria-hidden className="mega-pill absolute inset-x-0 top-0 rounded-2xl bg-ink shadow-lg" style={{ height: 'calc((100% - 3.25rem - 1rem) / 3)', transform: `translateY(calc(${tabIndex} * (100% + 0.5rem)))` }} />
          {tabs.map((t) => {
            const on = tab === t.id;
            return (
              <button
                key={t.id} type="button" role="tab" aria-selected={on} tabIndex={open ? 0 : -1}
                onMouseEnter={() => pick(t.id)} onFocus={() => pick(t.id)} onClick={() => pick(t.id)}
                className={`relative z-10 w-full flex-1 rounded-2xl p-4 text-left transition-colors duration-500 ${on ? 'text-white' : 'bg-paper text-ink hover:bg-mist'}`}
              >
                <span className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{menus[t.id].label}</span>
                  <span className={`grid h-7 min-w-7 place-items-center rounded-full px-2 font-mono text-xs transition-colors duration-500 ${on ? 'bg-white/15 text-white' : 'bg-white text-ink/75'}`}>{menus[t.id].items.length}</span>
                </span>
                <span className={`mt-1 block text-xs leading-5 transition-colors duration-500 ${on ? 'text-white/85' : 'text-ink/70'}`}>{menus[t.id].blurb}</span>
              </button>
            );
          })}
          <Link to={tabs[tabIndex].to} onClick={onClose} tabIndex={open ? 0 : -1} className="group mt-2 inline-flex h-9 items-center gap-2 px-1 text-sm font-semibold">
            View all {m.label.toLowerCase()} <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="mega-stage grid min-w-0">
          {tabs.map((t) => {
            const on = t.id === tab;
            return (
              <ul key={t.id} className={`mega-pane grid content-start gap-x-6 sm:grid-cols-2 ${on ? 'is-active' : ''}`} aria-hidden={!on}>
                {menus[t.id].items.map((x, i) => (
                  <li key={x.key} onMouseEnter={() => on && setHover(x.key)} style={{ transitionDelay: on ? `${80 + i * 22}ms` : '0ms' }}>
                    <Link to={x.to} onClick={onClose} tabIndex={on && open ? 0 : -1} onFocus={() => setHover(x.key)} className="group flex gap-3 rounded-xl border-b border-line px-2 py-3 transition-colors duration-300 hover:bg-paper">
                      <span className={`mt-0.5 font-mono text-xs font-semibold ${tone(i).text}`}>{x.n}</span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2 text-[0.95rem] font-semibold leading-snug">
                          {x.title}
                          <span aria-hidden className="shrink-0 -translate-x-2 text-ink/70 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span>
                        </span>
                        <span className="mt-1 line-clamp-1 block text-xs leading-5 text-ink/70">{x.sub}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>

        <div className="relative isolate flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-6 text-white">
          {!reduce && <MegaVideos ids={allVideos} active={videoId} open={open} />}
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/45 to-black/0" />
          <div key={`${tab}-${hover || ''}`} className="mega-copy">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/85">{active ? m.label.replace(/s$/, '') : m.spot.kicker}</p>
            <p className="mt-2 text-xl font-semibold leading-snug">{active ? active.title : m.spot.text}</p>
            {active && <p className="mt-2 line-clamp-3 text-xs leading-5 text-white/85">{active.sub}</p>}
            <Link to={active ? active.to : m.spot.to} onClick={onClose} tabIndex={open ? 0 : -1} className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5">{active ? 'Learn more' : m.spot.link} →</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-line bg-paper">
        <div className="mx-auto flex max-w-[76rem] flex-wrap items-center justify-between gap-3 px-6 py-3.5 text-sm">
          <p className="text-ink/75">Not sure where to start? Most clients begin with a short assessment.</p>
          <Link to="/contact" onClick={onClose} tabIndex={open ? 0 : -1} className="font-semibold underline-offset-4 hover:underline">Book a consultation →</Link>
        </div>
      </div>
    </div>
  );
}

const DARK_HERO = ['/', '/ai-lab', '/approach', '/about', '/insights', '/solutions'];

function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMegaRaw] = useState(null);
  const megaTimer = useRef(null);
  const setMega = (v) => {
    clearTimeout(megaTimer.current);
    if (v) setMegaRaw(v);
    else megaTimer.current = setTimeout(() => setMegaRaw(null), 180);
  };
  useEffect(() => () => clearTimeout(megaTimer.current), []);
  const [scrolled, setScrolled] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); setMega(null); setMobileGroup(null); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setMega(null); setOpen(false); } };
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('scroll', onScroll); };
  }, []);

  const overDark = DARK_HERO.includes(pathname) && !scrolled && !mega && !open;

  return (
    <header className="fixed left-0 top-0 z-30 w-full" onMouseLeave={() => setMega(null)}>
      <div className={`transition-all duration-500 ${overDark ? 'border-b border-white/10 bg-gradient-to-b from-black/70 via-black/35 to-transparent text-white' : 'border-b border-line bg-white/90 text-ink shadow-[0_8px_30px_-12px_rgba(17,17,17,0.15)] backdrop-blur-xl'}`}>
        <div className="relative mx-auto max-w-[76rem] px-5 sm:px-6">
          <div className={`flex items-center justify-between gap-6 transition-all duration-500 ${scrolled ? 'h-16' : 'h-[5.25rem]'}`}>
            <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="Nuriek AI Consulting home">
              <img src={overDark ? '/nuriek-logo-consulting-white.png' : '/nuriek-logo-consulting.png'} alt="Nuriek" className="h-[26px] w-auto" draggable={false} />
              <span className={`hidden h-7 w-px sm:block ${overDark ? 'bg-white/50' : 'bg-ink/30'}`} />
              <span className={`hidden flex-col font-mono font-semibold uppercase leading-none sm:flex ${overDark ? 'text-white' : 'text-ink'}`}><span className="text-[1.05rem] tracking-[0.08em]">AI</span><span className="mt-1 text-[0.62rem] tracking-[0.2em]">Consulting</span></span>
            </Link>

            <nav className="hidden h-full lg:block" aria-label="Primary">
              <ul className="flex h-full items-center gap-5 whitespace-nowrap text-[0.92rem] xl:gap-7">
                {nav.map((i) => (
                  <li key={i.to} className="relative flex h-full items-center" onMouseEnter={() => setMega(i.mega || null)}>
                    <NavLink
                      to={i.to}
                      onFocus={() => setMega(i.mega || null)}
                      className={({ isActive: ia }) => { const isActive = ia || (i.mega && ['/services', '/solutions', '/industries'].includes(pathname)); return `group relative flex h-full items-center gap-1.5 whitespace-nowrap font-medium transition-colors ${isActive || mega === i.mega && i.mega ? '' : overDark ? 'text-white/80 hover:text-white' : 'text-ink/70 hover:text-ink'}`; }}
                    >
                      {({ isActive: ia2 }) => { const isActive = ia2 || (i.mega && ['/services', '/solutions', '/industries'].includes(pathname)); return (
                        <>
                          {i.label}
                          {i.mega && <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden className={`transition-transform duration-300 ${mega === i.mega ? 'rotate-180' : ''}`}><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                          <span aria-hidden className={`absolute inset-x-0 bottom-0 h-[2px] origin-left transition-transform duration-300 ${overDark ? 'bg-white' : 'bg-ink'} ${isActive || (i.mega && mega === i.mega) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                        </>
                      ); }}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <Link to="/contact" className={`group inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full pl-5 pr-1.5 text-sm font-medium transition-colors duration-300 ${overDark ? 'bg-white text-ink hover:bg-white/90' : 'bg-ink text-white hover:bg-iris'}`}>
                <span className="hidden sm:inline">Book a consultation</span><span className="sm:hidden">Book</span>
                <span aria-hidden className={`grid h-8 w-8 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 ${overDark ? 'bg-ink text-white' : 'bg-white text-ink'}`}>→</span>
              </Link>
              <button
                type="button"
                className={`flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${overDark ? 'bg-white/15 text-white' : 'bg-ink/5'}`}
                aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((o) => !o)}
              >
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
                  {open ? <path d="M2 2L16 12M16 2L2 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    : <><path d="M0 1H18" stroke="currentColor" strokeWidth="1.4" /><path d="M0 7H18" stroke="currentColor" strokeWidth="1.4" /><path d="M0 13H18" stroke="currentColor" strokeWidth="1.4" /></>}
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className={`absolute inset-x-0 top-full hidden lg:block ${mega ? '' : 'pointer-events-none'}`} onMouseEnter={() => mega && setMega(mega)}><MegaMenu open={!!mega} onClose={() => { clearTimeout(megaTimer.current); setMegaRaw(null); }} /></div>

      <nav id="mobile-nav" aria-label="Mobile" className={`fixed inset-x-0 bottom-0 top-[5.25rem] overflow-y-auto bg-white px-5 pb-10 pt-4 transition-all duration-300 lg:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <ul className="divide-y divide-line">
          {nav.map((i) => (
            <li key={i.to} className="py-1">
              {i.mega ? (
                <>
                  <button type="button" onClick={() => setMobileGroup((g) => (g === i.mega ? null : i.mega))} aria-expanded={mobileGroup === i.mega} className="flex w-full items-center justify-between py-3 text-2xl font-medium">
                    {i.label}
                    <span aria-hidden className={`text-xl transition-transform ${mobileGroup === i.mega ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {mobileGroup === i.mega && (
                    <ul className="mb-3 space-y-1 pl-1">
                                            {tabs.map((t) => (
                        <li key={t.id} className="pt-2">
                          <Link to={t.to} className="block py-1.5 text-sm font-semibold">{t.label} →</Link>
                          <ul className="mb-2 border-l border-line pl-3">
                            {menus[t.id].items.map((x) => <li key={x.key}><Link to={x.to} className="block py-1 text-sm text-ink/70">{x.title}</Link></li>)}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link to={i.to} className="block py-3 text-2xl font-medium">{i.label}</Link>
              )}
            </li>
          ))}
        </ul>
        <Link to="/contact" className="mt-8 flex h-14 items-center justify-center gap-2 rounded-full bg-ink text-base font-medium text-white">Book a consultation →</Link>
        <a href={`mailto:${SITE.email}`} className="mt-4 block text-center text-sm text-ink/75">{SITE.email}</a>
      </nav>
    </header>
  );
}

function Footer() {
  const cols = [
    { title: 'Services', items: services.slice(0, 6).map((x) => [x.title, `/services#${x.id}`]), more: ['All 12 services', '/services'] },
    { title: 'Solutions', items: solutions.slice(0, 6).map((x) => [x.name, `/solutions#${x.id}`]), more: ['All solutions', '/solutions'] },
    { title: 'Industries', items: industries.map((x) => [x.name, `/industries#${x.id}`]) },
    { title: 'Company', items: [['Our approach', '/approach'], ['AI Lab', '/ai-lab'], ['Insights', '/insights'], ['About Nuriek', '/about'], ['Contact', '/contact']] },
  ];
  return (
    <footer className="bg-ink text-white">
      <div className="relative isolate overflow-hidden border-b border-white/10">
        <StockVideo id={13218} name="footer" poster="/videos/hero-montage.jpg" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="mx-auto grid max-w-[76rem] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/82">Let&apos;s talk</p>
            <p className="mt-5 max-w-2xl text-balance text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl">Have an AI idea worth testing?</p>
          </div>
          <div className="lg:justify-self-end">
            <a href={`mailto:${SITE.email}`} className="group inline-flex items-center gap-3 text-2xl font-medium sm:text-3xl">
              <span className="border-b-2 border-white/40 pb-1 transition-colors group-hover:border-white">{SITE.email}</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <div className="mt-6">
              <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink hover:bg-white/85">Book a consultation <span aria-hidden>→</span></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[76rem] gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <Link to="/" className="inline-flex items-center gap-3" aria-label="Nuriek AI Consulting home">
            <img src="/nuriek-logo-consulting-white.png" alt="Nuriek" className="h-[26px] w-auto" draggable={false} />
            <span className="h-5 w-px bg-white/25" />
            <span className="flex flex-col font-mono font-semibold uppercase leading-none text-white"><span className="text-[1.05rem] tracking-[0.08em]">AI</span><span className="mt-1 text-[0.62rem] tracking-[0.2em]">Consulting</span></span>
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-6 text-white/85">From AI ambition to measurable business impact. Discover, design, build, deploy, operate and optimize.</p>
          <ul className="mt-6 flex flex-wrap gap-2 text-xs text-white/88">
            {['Discover', 'Design', 'Build', 'Deploy', 'Operate', 'Optimize'].map((w) => <li key={w} className="rounded-full border border-white/15 px-3 py-1">{w}</li>)}
          </ul>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">{c.title}</p>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              {c.items.map(([l, to]) => <li key={to}><Link className="link-underline hover:text-white" to={to}>{l}</Link></li>)}
              {c.more && <li><Link className="font-medium text-white underline-offset-4 hover:underline" to={c.more[1]}>{c.more[0]} →</Link></li>}
            </ul>
          </div>
        ))}
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden px-5 sm:px-8">
        <p className="mx-auto max-w-[76rem] translate-y-[18%] text-[22vw] font-medium leading-none tracking-[-0.06em] text-white/[0.05] lg:text-[17rem]">nuriek</p>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[76rem] flex-col gap-3 px-5 py-6 font-mono text-xs text-white/80 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Nuriek Tech Private Limited · Bangalore, India</p>
          <div className="flex items-center gap-6">
            <a className="link-underline hover:text-white" href={SITE.parent}>nuriek.com</a>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="link-underline uppercase tracking-[0.14em] hover:text-white">Back to top ↑</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function useOverscrollColor() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Top half of the canvas matches the hero (dark on video-hero pages), bottom half matches the dark footer,
    // so pulling past either end never reveals a white strip.
    const top = DARK_HERO.includes(pathname) ? '#111111' : '#ffffff';
    document.documentElement.style.setProperty('--overscroll-bg', `linear-gradient(to bottom, ${top} 50%, #111111 50%)`);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', top);
  }, [pathname]);
}

export function Layout({ children }) {
  useRouteEffects();
  useOverscrollColor();
  return (
    <div className="min-h-screen overflow-x-clip bg-paper text-ink selection:bg-iris selection:text-white">
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-iris focus:px-3 focus:py-2 focus:text-white">Skip to content</a>
      <Header />
      <main id="content">{children}</main>
      <Footer />
    </div>
  );
}
