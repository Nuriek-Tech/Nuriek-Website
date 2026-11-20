import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/ui.jsx';
import { StockVideo } from '../components/StockVideo.jsx';
import { Icon } from '../components/Icon.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';
import { tone } from '../lib/tones.js';
import { SITE } from '../lib/content.js';
import { articles } from '../lib/articles.js';

const topics = ['All', 'Strategy', 'Agents', 'GenAI', 'Governance', 'Operations'];

const formats = [
  ['map', 'Guides', 'Step-by-step approaches you can apply.'],
  ['layers', 'Architecture notes', 'How the pieces fit, with the trade-offs.'],
  ['chart', 'Case studies', 'Published only with client permission.'],
];

export default function Insights() {
  usePageTitle('Insights');
  const [topic, setTopic] = useState('All');
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const shown = articles.filter((p) => topic === 'All' || p.topic === topic);

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setErr('Enter a valid email address.'); return; }
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Subscribe to Nuriek Insights')}&body=${encodeURIComponent(`Please add ${email.trim()} to the Nuriek Insights list.`)}`;
  };

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink pt-[var(--header-h)] text-white">
        <StockVideo id={47792} name="insights-hero" poster="/videos/hero-montage.jpg" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="mx-auto w-full max-w-hero px-5 py-24 sm:px-8 lg:py-32">
          <p className="hero-in font-mono text-xs uppercase tracking-[0.22em] text-white/90">Insights</p>
          <h1 className="hero-in mt-6 max-w-4xl text-balance text-5xl font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-[5rem]">Plain writing about what works in enterprise AI.</h1>
          <p className="hero-in mt-7 max-w-xl text-lg leading-8 text-white/85">Guides, architecture notes and case studies from real delivery work, including what did not work.</p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-iris">Latest writing</p>
              <h2 className="mt-4 text-4xl font-medium leading-[1.07] sm:text-5xl">Guides from real delivery work.</h2>
              <p className="mt-3 text-ink/75">Practical, vendor-neutral writing on strategy, agents, generative AI, governance and operations.</p>
            </Reveal>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by topic">
              {topics.map((t) => (
                <button key={t} type="button" role="tab" aria-selected={topic === t} onClick={() => setTopic(t)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${topic === t ? 'bg-ink text-white' : 'bg-white text-ink/70 hover:text-ink'}`}>{t}</button>
              ))}
            </div>
          </div>

          {topic === 'All' && (
            <Link to={`/insights/${articles[0].slug}`} className="group mt-12 grid overflow-hidden rounded-3xl border border-line bg-white lg:grid-cols-[1.1fr_1fr]">
              <div className={`relative flex min-h-[16rem] items-end p-8 ${tone(0).card}`}>
                <Icon name={articles[0].icon} className="absolute right-8 top-8 h-24 w-24 opacity-25 transition-transform duration-700 group-hover:scale-110" />
                <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink">Featured · {articles[0].topic}</span>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/70">{articles[0].format} · {articles[0].read} read</p>
                <h3 className="mt-3 text-3xl font-semibold leading-tight group-hover:underline">{articles[0].title}</h3>
                <p className="mt-3 leading-7 text-ink/78">{articles[0].summary}</p>
                <span className="mt-6 text-sm font-semibold">Read the guide →</span>
              </div>
            </Link>
          )}

          <div key={topic} className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {(topic === 'All' ? shown.slice(1) : shown).map((p) => {
              const i = articles.indexOf(p);
              return (
                <Link key={p.slug} to={`/insights/${p.slug}`} className="hero-in card-lift group flex flex-col overflow-hidden rounded-3xl border border-line bg-white">
                  <div className={`relative flex h-36 items-end p-6 ${tone(i).card}`}>
                    <Icon name={p.icon} className="absolute right-6 top-6 h-14 w-14 opacity-30 transition-transform duration-700 group-hover:scale-110" />
                    <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink">{p.topic}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/70">{p.format} · {p.read} read</p>
                    <h3 className="mt-2 text-xl font-semibold leading-snug group-hover:underline">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-ink/78">{p.summary}</p>
                    <span className="mt-5 text-sm font-semibold">Read →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-editorial gap-5 px-5 py-16 sm:grid-cols-3 sm:px-8">
          {formats.map(([icon, t, d], i) => (
            <Reveal key={t} className="flex gap-4">
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${tone(i).card}`}><Icon name={icon} className="h-5 w-5" /></span>
              <div><p className="font-semibold">{t}</p><p className="text-sm text-ink/75">{d}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-paper px-4 py-16 sm:px-6">
        <Reveal className="mx-auto grid max-w-hero gap-8 rounded-[2rem] bg-ink px-6 py-14 text-white sm:px-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:px-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/82">Subscribe</p>
            <h2 className="mt-4 text-3xl font-medium leading-tight sm:text-4xl">Get new guides by email.</h2>
            <p className="mt-3 text-white/88">One email when something new is published. No sales sequences.</p>
          </div>
          <form onSubmit={subscribe} noValidate>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="ins-email" className="sr-only">Work email</label>
              <input id="ins-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErr(''); }} placeholder="name@company.com"
                className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-white outline-none placeholder:text-white/80 focus:border-white" aria-invalid={!!err} />
              <button type="submit" className="h-12 rounded-full bg-white px-6 text-sm font-semibold text-ink hover:bg-white/85">Subscribe</button>
            </div>
            {err && <p className="mt-2 text-sm text-coral">{err}</p>}
            <p className="mt-3 text-xs text-white/80">Opens your email app to confirm. Or <Link to="/contact" className="underline">ask us a question</Link>.</p>
          </form>
        </Reveal>
      </section>
    </>
  );
}
