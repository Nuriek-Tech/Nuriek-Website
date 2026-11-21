import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  { tab: 'Strategy to impact', kicker: 'AI consulting', title: <>Bring AI into the work your teams do every day.</>, text: 'Find the workflows where AI can help, test them with your people, and take the strongest ideas into production.', cta: { label: 'Book a consultation', to: '/contact' } },
  { tab: 'Pilots in weeks', kicker: 'Pilots', title: <>Make AI real with a working pilot in <span className="text-glow">weeks</span>.</>, text: 'A scoped agent or automation pilot in four to six weeks, measured against criteria we agree on up front.', cta: { label: 'Explore engagement packages', to: '/services#engagements' } },
  { tab: 'Governance first', kicker: 'Responsible AI', title: <>Put <span className="text-glow">governance</span> in before you scale.</>, text: 'Policies, access control, prompt-injection testing and audit trails, designed in from the start.', cta: { label: 'Discover Responsible AI', to: '/services#governance' } },
];

// Free stock clips (Mixkit Free License). Self-hosted copies in /videos/stock are used when present.
const CLIP_IDS = [42666, 46635, 23282];

function HeroClip({ n }) {
  const id = CLIP_IDS[n - 1];
  const local = `/videos/stock/hero-${n}.mp4`;
  const remote = `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`;
  const [src, setSrc] = useState(null);
  useEffect(() => {
    let live = true;
    fetch(local, { method: 'HEAD' })
      .then((r) => (r.ok && (r.headers.get('content-type') || '').startsWith('video') ? local : remote))
      .catch(() => remote)
      .then((u) => { if (live) setSrc(u); });
    return () => { live = false; };
  }, [local, remote]);
  if (!src) return null;
  return (
    <video
      key={src}
      className="hero-clip h-full w-full object-cover"
      src={src}
      autoPlay muted loop playsInline preload="auto"
      onError={() => setSrc((cur) => (cur === '/videos/hero-montage.mp4' ? cur : '/videos/hero-montage.mp4'))}
    />
  );
}

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % slides.length), 8000);
    return () => clearInterval(id);
  }, [paused, i]);
  const sl = slides[i];

  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-[var(--header-h)] text-white">
      <div aria-hidden className="absolute inset-0 -z-20 bg-ink">
        {reduce ? (
          <img src="/videos/hero-montage.jpg" alt="" className="h-full w-full object-cover" />
        ) : (
          <HeroClip key={i} n={i + 1} />
        )}
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="mx-auto flex w-full max-w-hero flex-1 items-center px-5 py-20 sm:px-8 lg:py-28">
        <div key={sl.tab} className="max-w-3xl">
          <p className="hero-in font-mono text-xs uppercase tracking-[0.22em] text-white/90">{sl.kicker}</p>
          <h1 className="hero-in mt-6 text-balance text-5xl font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-[5rem] [&_.text-glow]:text-white [&_.text-glow]:underline [&_.text-glow]:decoration-white/40 [&_.text-glow]:underline-offset-8">{sl.title}</h1>
          <p className="hero-in mt-7 max-w-xl text-lg leading-8 text-white/85 sm:text-xl">{sl.text}</p>
          <div className="hero-in mt-10 flex flex-wrap items-center gap-4">
            <Link to={sl.cta.to} className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-white/85">{sl.cta.label} <span aria-hidden>→</span></Link>
            <Link to="/services" className="inline-flex items-center gap-3 rounded-full border border-white/50 px-6 py-3.5 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10">Explore services</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 bg-black/25 backdrop-blur-md">
        <div className="mx-auto grid max-w-hero grid-cols-3 gap-4 px-5 sm:px-8" role="tablist" aria-label="Hero slides">
          {slides.map((s, n) => (
            <button key={s.tab} type="button" role="tab" aria-selected={n === i} onClick={() => setI(n)} className="group relative py-5 text-left">
              <span className="absolute left-0 top-0 h-[2px] w-full bg-white/20" />
              {n === i && <span className="absolute left-0 top-0 w-full"><i className="tab-progress !bg-white" key={`${i}-${paused}`} style={{ animationPlayState: paused ? 'paused' : 'running' }} /></span>}
              <span className="block font-mono text-xs text-white/82">0{n + 1}</span>
              <span className={`mt-1 block text-sm font-medium sm:text-base ${n === i ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>{s.tab}</span>
            </button>
          ))}
        </div>
        <div className="mx-auto flex max-w-hero justify-end px-5 pb-3 sm:px-8">
          <button type="button" onClick={() => setPaused((p) => !p)} className="font-mono text-xs uppercase tracking-[0.14em] text-white/82 hover:text-white">{paused ? 'Play' : 'Pause'}</button>
        </div>
      </div>
    </section>
  );
}
