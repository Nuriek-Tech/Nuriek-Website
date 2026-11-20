import { Link } from 'react-router-dom';
import { CallToAction, PageHero, Reveal } from '../components/ui.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';
import { tone } from '../lib/tones.js';
import { industries, services } from '../lib/content.js';
import { StockVideo } from '../components/StockVideo.jsx';

function IndustrySection({ ind, idx }) {
  const t = tone(idx);
  const flip = idx % 2 === 1;
  const related = ind.services.map((id) => services.find((s) => s.id === id)).filter(Boolean);
  return (
    <section id={ind.id} className={`scroll-mt-40 ${flip ? 'bg-white' : 'bg-paper'}`}>
      <div className="mx-auto grid max-w-editorial gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28">
        <Reveal className={`relative ${flip ? 'lg:order-2' : ''}`}>
          <StockVideo id={ind.video} name={`industry-${ind.id}`} poster={`/photos/scene-${(idx % 4) + 1}.jpg`} className="aspect-[4/3] h-full min-h-[20rem] w-full rounded-3xl object-cover shadow-xl" />
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink shadow-sm"><span aria-hidden className={`h-2 w-2 rounded-full ${t.solid}`} />0{idx + 1} · {ind.name}</span>
        </Reveal>

        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink"><span aria-hidden className={`h-2 w-2 rounded-full ${t.solid}`} />Industry 0{idx + 1}</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">{ind.name}</h2>
          <p className="mt-5 text-lg leading-8 text-ink/75">{ind.intro}</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="text-sm font-semibold">Common challenges</p>
              <ul className="mt-4 space-y-3 text-ink/75">
                {ind.challenges.map((c) => (
                  <li key={c} className="flex gap-3"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" />{c}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="text-sm font-semibold">Where AI helps</p>
              <ul className="mt-4 space-y-3 text-ink/75">
                {ind.useCases.map((c) => (
                  <li key={c} className="flex gap-3"><span aria-hidden className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${t.solid}`} />{c}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 text-sm font-semibold">Related services</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {related.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`} className="inline-block rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-ink/80 transition-colors hover:border-ink hover:text-ink">{s.title}</Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm italic text-ink/75">{ind.note}</p>
          <Link to={`/contact?industry=${ind.id}`} className="link-cta mt-8 text-sm">Talk to us about {ind.name} <span aria-hidden>→</span></Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function Industries() {
  usePageTitle('Industries');
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Start from the problems your sector recognizes." tone={2}
        lede="The technology is similar across industries. The data, the rules and the risks are not."
      />

      <nav aria-label="Industries" className="sticky top-[var(--header-h)] z-20 border-y border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-editorial gap-2 overflow-x-auto px-5 py-3 sm:px-8">
          {industries.map((i) => (
            <a key={i.id} href={`#${i.id}`} className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-ink hover:text-white">{i.name}</a>
          ))}
        </div>
      </nav>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-editorial gap-5 px-5 pt-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
          {industries.map((i, idx) => (
            <a key={i.id} href={`#${i.id}`} className="card-lift group relative block aspect-[4/3] overflow-hidden rounded-3xl">
              <StockVideo hoverOnly id={i.video} name={`industry-${i.id}`} poster={`/photos/scene-${(idx % 4) + 1}.jpg`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 pt-16 text-white">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/90">0{idx + 1}</p>
                <h2 className="mt-1 text-2xl">{i.name}</h2>
                <p className="mt-1 text-sm text-white/80">{i.text}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {industries.map((ind, idx) => <IndustrySection key={ind.id} ind={ind} idx={idx} />)}

      <section className="bg-paper">
        <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8">
          <Reveal className="rounded-3xl border border-line bg-white p-8 sm:p-10">
            <p className="text-xl font-medium leading-relaxed">
              Regulated sectors such as healthcare and financial services need compliance review before anything touches production data. We say so up front and scope accordingly.
            </p>
            <Link to="/contact" className="link-cta mt-6 text-sm">Talk to us <span aria-hidden>→</span></Link>
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
