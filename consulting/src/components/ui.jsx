import { Link } from 'react-router-dom';
import { tone } from '../lib/tones.js';

export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  return <Tag className={`reveal ${className}`} {...rest}>{children}</Tag>;
}

export function PageHero({ eyebrow, title, lede, tone: ti = 0 }) {
  const t = tone(ti);
  return (
    <section className="feature-stage">
      <div className="feature-spread feature-inner">
        <div className="feature-story">
          <p className={`feature-topic ${t.text}`}>{eyebrow}</p>
          <h1>{title}</h1>
          {lede && <p className="feature-summary">{lede}</p>}
        </div>
        <img className="feature-photo" src={`/photos/scene-${(ti % 4) + 1}.jpg`} alt="" />
      </div>
    </section>
  );
}

export function Section({ eyebrow, title, children, tone: toneName = 'light', id }) {
  const dark = toneName === 'dark';
  const bg = dark ? 'bg-mist/60 text-ink' : toneName === 'soft' ? 'bg-white text-ink' : 'bg-paper text-ink';
  return (
    <section id={id} className={bg}>
      <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="mb-12 max-w-2xl">
          {eyebrow && <p className={`font-mono text-xs uppercase tracking-[0.2em] text-iris`}>{eyebrow}</p>}
          {title && <h2 className="mt-4 text-balance text-4xl leading-[1.07] sm:text-5xl">{title}</h2>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export function CallToAction({ title = 'Start with a conversation.', text = 'Tell us what you are trying to improve. We will tell you honestly whether AI is the right tool.' }) {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto grid max-w-editorial gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:py-28">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">Consult an expert</p>
          <h2 className="mt-5 max-w-3xl text-balance text-4xl font-medium leading-[1.07] sm:text-6xl">{title}</h2>
        </Reveal>
        <Reveal>
          <p className="text-lg leading-8 text-white/90">{text}</p>
          <Link to="/contact" className="link-cta mt-8 text-lg">Book a consultation <span aria-hidden>→</span></Link>
        </Reveal>
      </div>
    </section>
  );
}

export function Faq({ items }) {
  return (
    <div className="divide-y divide-ink/10 rounded-3xl bg-white px-6 sm:px-10">
      {items.map((f, i) => (
        <details key={f.q} className="group py-6" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-semibold sm:text-2xl [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-iris-50 font-mono text-iris transition-transform duration-300 group-open:rotate-45">+</span>
          </summary>
          <p className="mt-4 max-w-measure text-lg leading-8 text-ink/70">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
