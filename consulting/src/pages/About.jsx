import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CallToAction, Reveal } from '../components/ui.jsx';
import { StockVideo } from '../components/StockVideo.jsx';
import { Icon } from '../components/Icon.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';
import { tone } from '../lib/tones.js';
import { SITE } from '../lib/content.js';

const POSTER = '/videos/hero-montage.jpg';

const beliefs = [
  { video: 42648, points: ['Honest scoping', 'Senior people throughout', 'Agreed success criteria'], icon: 'compass', title: 'Our principles', text: 'Honest scoping, senior people from start to finish, and outcomes measured against criteria agreed up front.', link: 'See how we work', to: '/approach' },
  { video: 23374, points: ['Privacy by design', 'Tested before launch', 'Human oversight'], icon: 'shield', title: 'Responsible AI', text: 'Privacy, access control, testing and human oversight designed in from the first stage, not added at the end.', link: 'Responsible AI services', to: '/services#governance' },
  { video: 35959, points: ['Straight answers', 'Small pilots first', 'Shared ownership'], icon: 'users', title: 'Trust', text: 'If AI is not the right answer for a problem, we say so. A small pilot that works beats a large programme that only impresses.', link: 'Read our AI policy guide', to: '/insights/an-ai-usage-policy-you-can-adopt-this-month' },
];

const world = [
  { video: 33407, kicker: 'Our heritage', title: 'Enterprise engineering, applied to AI.', text: 'Our work grows out of years of enterprise software, cloud delivery and programme management. We bring that discipline to AI: architecture, testing, security and operations, not just models.', link: 'Explore our services', to: '/services' },
  { video: 41541, kicker: 'Where we work', title: 'Headquartered in Bangalore, working worldwide.', text: 'Our team works with organizations across regions and time zones, with clear communication, shared documentation and named owners on both sides of every engagement.', link: 'Book a consultation', to: '/contact' },
  { video: 23116, kicker: 'Thinking in the open', title: 'We share what we learn.', text: 'Our Insights section publishes practical, vendor-neutral guides from real delivery work, from choosing a first use case to keeping AI costs predictable.', link: 'Read our insights', to: '/insights' },
];

const platforms = ['Microsoft Azure', 'Amazon Web Services', 'Google Cloud'];

function Beliefs() {
  const [i, setI] = useState(0);
  const vids = useRef([]);
  const b = beliefs[i];
  useEffect(() => {
    vids.current.forEach((v, n) => { if (!v) return; if (n === i) v.play().catch(() => {}); else v.pause(); });
  }, [i]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-editorial px-5 py-24 sm:px-8 lg:py-32">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-iris">Who we are and what we believe</p>
          <h2 className="mt-6 text-balance text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">We are engineers first. AI should earn its place with evidence.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink/80">And the people using it should understand it, trust it and stay in control of it.</p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <ol className="flex flex-col divide-y divide-line border-y border-line" role="tablist" aria-label="Our beliefs">
            {beliefs.map((x, n) => {
              const on = n === i;
              return (
                <li key={x.title} className="flex-1">
                  <button type="button" role="tab" aria-selected={on} onClick={() => setI(n)} onMouseEnter={() => setI(n)}
                    className="group flex h-full w-full items-center gap-6 py-7 text-left">
                    <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition-all duration-500 ${on ? `${tone(n).card} scale-110` : 'bg-paper text-ink/70 group-hover:text-ink'}`}><Icon name={x.icon} /></span>
                    <span className="flex-1">
                      <span className="block font-mono text-xs font-semibold text-ink/70">0{n + 1}</span>
                      <span className={`mt-1 block text-3xl font-medium tracking-tight transition-colors duration-300 sm:text-4xl ${on ? 'text-ink' : 'text-ink/60 group-hover:text-ink'}`}>{x.title}</span>
                    </span>
                    <span aria-hidden className={`text-2xl transition-all duration-500 ${on ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'}`}>→</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="relative min-h-[28rem] overflow-hidden rounded-3xl bg-ink text-white">
            {beliefs.map((x, n) => (
              <video key={x.video} ref={(el) => { vids.current[n] = el; if (el) { el.muted = true; el.setAttribute('muted', ''); } }}
                src={`https://assets.mixkit.co/videos/${x.video}/${x.video}-720.mp4`} muted loop playsInline autoPlay={n === 0} preload={n === 0 ? 'auto' : 'metadata'}
                className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-1000 ease-editorial ${n === i ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`} />
            ))}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
            <div key={i} className="hero-in absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <p className="text-2xl font-medium leading-snug sm:text-3xl">{b.text}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {b.points.map((pt) => <li key={pt} className="rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">{pt}</li>)}
              </ul>
              <Link to={b.to} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-white/90">{b.link} <span aria-hidden>→</span></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  usePageTitle('About');
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-ink pt-[var(--header-h)] text-white">
        <StockVideo id={917} name="about-hero" poster={POSTER} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/50 to-black/25" />
        <div className="mx-auto w-full max-w-hero px-5 pb-16 pt-24 sm:px-8">
          <nav aria-label="Breadcrumb" className="hero-in mb-10 text-sm text-white/85">
            <Link to="/" className="hover:underline">Home</Link> <span aria-hidden className="mx-2">/</span> <span className="text-white">About us</span>
          </nav>
          <p className="hero-in font-mono text-xs font-semibold uppercase tracking-[0.22em] text-white/90">Who we are</p>
          <h1 className="hero-in mt-5 text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl lg:text-[6rem]">About us</h1>
          <p className="hero-in mt-6 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">Engineers who stay for the whole job.</p>
        </div>
      </section>

      {/* Tagline band */}
      <section className="bg-iris text-white">
        <div className="mx-auto flex max-w-editorial flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <p className="text-xl font-medium sm:text-2xl">From AI ambition to measurable business impact.</p>
          <Link to="/approach" className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline">See our approach →</Link>
        </div>
      </section>

      {/* Intro with CTAs */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-editorial gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:py-28">
          <Reveal>
            <h2 className="text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl">About Nuriek</h2>
          </Reveal>
          <Reveal>
            <p className="text-xl leading-9 text-ink/85">Nuriek Tech Private Limited is an AI engineering and consulting firm headquartered in Bangalore, India. We partner with organizations around the world to design, build and operate AI systems that deliver measurable business outcomes.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/approach" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white hover:bg-iris">Our approach →</Link>
              <Link to="/insights" className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3.5 text-sm font-semibold hover:bg-ink hover:text-white">Read our guides →</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Split image / text */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-editorial gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-28">
          <Reveal className="relative pb-16 pr-10">
            <div className="overflow-hidden rounded-sm bg-ink">
              <StockVideo id={13231} name="about-split-1" poster={POSTER} className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-1/2 overflow-hidden rounded-sm border-[6px] border-paper bg-ink shadow-xl">
              <StockVideo id={23375} name="about-split-2" poster={POSTER} className="aspect-[4/3] w-full object-cover" />
            </div>
          </Reveal>
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-iris">What we do</p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl">We make AI practical, measurable and safe to run.</h2>
            <p className="mt-6 text-lg leading-8 text-ink/80">We advise, architect, engineer, integrate, deploy, secure and continuously optimize enterprise AI. The same team stays with you from the first workshop to production support, so nothing is lost in hand-offs.</p>
            <Link to="/services" className="link-cta mt-8 text-sm">Explore our 12 capabilities <span aria-hidden>→</span></Link>
          </Reveal>
        </div>
      </section>

      {/* Who we are and what we believe */}
      <Beliefs />

      {/* Nuriek in the world — alternating rows */}
      <section className="bg-paper">
        <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:py-28">
          <div className="border-t border-ink pt-8">
            <Reveal><h2 className="text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl">Nuriek in the world</h2></Reveal>
          </div>

          <Reveal className="mt-14 grid items-center gap-10 lg:grid-cols-2">
            <div className="grid aspect-[4/3] grid-cols-2 gap-px overflow-hidden rounded-sm bg-line">
              <a href={SITE.parent} className="group flex flex-col justify-between bg-white p-7">
                <img src="/nuriek-logo.png?v=2" alt="Nuriek" className="h-7 w-auto self-start" />
                <div><p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink/75">Products</p><p className="mt-2 text-sm text-ink/80">Adaptive intelligence products.</p><span className="mt-4 inline-block text-sm font-semibold group-hover:underline">nuriek.com →</span></div>
              </a>
              <div className="flex flex-col justify-between bg-ink p-7 text-white">
                <img src="/nuriek-logo-consulting-white.png" alt="Nuriek AI Consulting" className="h-7 w-auto self-start" />
                <div><p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white/85">AI Consulting</p><p className="mt-2 text-sm text-white/85">Strategy, engineering and operations.</p><span className="mt-4 inline-block text-sm font-semibold">You are here</span></div>
              </div>
            </div>
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-iris">One company</p>
              <h3 className="mt-4 text-3xl font-medium leading-tight sm:text-4xl">Two ways to work with Nuriek.</h3>
              <p className="mt-5 text-lg leading-8 text-ink/80">Nuriek builds its own products, and Nuriek AI Consulting brings the same engineering to client teams. What we learn building one makes the other better.</p>
              <a href={SITE.parent} className="link-cta mt-8 text-sm">Visit nuriek.com <span aria-hidden>→</span></a>
            </div>
          </Reveal>

          {world.map((w, n) => {
            const flip = n % 2 === 0;
            return (
              <Reveal key={w.title} className="mt-20 grid items-center gap-10 lg:grid-cols-2">
                <div className={`overflow-hidden rounded-sm bg-ink ${flip ? 'lg:order-2' : ''}`}>
                  <StockVideo id={w.video} name={`about-world-${n + 1}`} poster={POSTER} className="aspect-[4/3] w-full object-cover" />
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-iris">{w.kicker}</p>
                  <h3 className="mt-4 text-3xl font-medium leading-tight sm:text-4xl">{w.title}</h3>
                  <p className="mt-5 text-lg leading-8 text-ink/80">{w.text}</p>
                  <Link to={w.to} className="link-cta mt-8 text-sm">{w.link} <span aria-hidden>→</span></Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Platforms */}
      <section className="bg-white">
        <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink pt-8">
            <Reveal className="max-w-2xl">
              <h2 className="text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl">Platforms we build on</h2>
              <p className="mt-4 text-lg text-ink/80">We design and deliver on the major cloud platforms, choosing what fits your existing estate.</p>
            </Reveal>
            <Link to="/services#cloud" className="link-cta text-sm">Cloud and modernization <span aria-hidden>→</span></Link>
          </div>
          <div className="mt-12 grid gap-px bg-line sm:grid-cols-3">
            {platforms.map((p) => (
              <Reveal key={p} className="flex h-32 items-center justify-center bg-white px-6 text-center text-xl font-semibold tracking-tight text-ink/85">{p}</Reveal>
            ))}
          </div>
        </div>
      </section>

      <CallToAction title="Connect with us." text="Tell us what you are trying to improve. We will tell you honestly whether AI is the right tool." />
    </>
  );
}
