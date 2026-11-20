import { Link, useParams } from 'react-router-dom';
import { CallToAction } from '../components/ui.jsx';
import { Icon } from '../components/Icon.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';
import { tone } from '../lib/tones.js';
import { articles } from '../lib/articles.js';
import NotFound from './NotFound.jsx';

export default function Article() {
  const { slug } = useParams();
  const idx = articles.findIndex((a) => a.slug === slug);
  const a = articles[idx];
  usePageTitle(a ? a.title : 'Article not found');
  if (!a) return <NotFound />;
  const t = tone(idx);
  const next = articles[(idx + 1) % articles.length];

  return (
    <>
      <header className={`relative overflow-hidden pt-[var(--header-h)] ${t.card}`}>
        <Icon name={a.icon} className="absolute -right-10 bottom-[-3rem] h-72 w-72 opacity-15" />
        <div className="relative mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-24">
          <Link to="/insights" className="text-sm font-medium opacity-95 hover:opacity-100">← All insights</Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.16em]">
            <span className="rounded-full bg-white/90 px-3 py-1 text-ink">{a.topic}</span>
            <span className="opacity-95">{a.format} · {a.read} read</span>
          </div>
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.08] sm:text-6xl">{a.title}</h1>
          <p className="mt-6 text-lg leading-8 opacity-90 sm:text-xl">{a.summary}</p>
          <p className="mt-8 text-sm opacity-95">Nuriek AI Consulting</p>
        </div>
      </header>

      <article className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
          {a.body.map((b, n) => (
            <section key={n} className="mt-10 first:mt-0">
              {b.h && <h2 className="text-2xl font-semibold leading-snug sm:text-3xl">{b.h}</h2>}
              {b.p && b.p.map((para) => <p key={para.slice(0, 30)} className="mt-4 text-lg leading-8 text-ink/80">{para}</p>)}
              {b.list && (
                <ul className="mt-5 space-y-3">
                  {b.list.map((li) => (
                    <li key={li.slice(0, 30)} className="flex gap-3 text-lg leading-8 text-ink/80">
                      <span aria-hidden className={`mt-3 h-2 w-2 shrink-0 rounded-full ${t.solid}`} />{li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="mt-16 rounded-3xl bg-paper p-8">
            <p className="text-lg font-semibold">Want to apply this in your organization?</p>
            <p className="mt-2 text-ink/70">We can review your situation and suggest a practical first step.</p>
            <Link to="/contact" className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white hover:bg-iris">Book a consultation →</Link>
          </div>

          <Link to={`/insights/${next.slug}`} className="group mt-10 block border-t border-line pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink/70">Next article</p>
            <p className="mt-2 text-2xl font-semibold group-hover:underline">{next.title} →</p>
          </Link>
        </div>
      </article>
      <CallToAction />
    </>
  );
}
