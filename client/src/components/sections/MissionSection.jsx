export function MissionSection() {
  return (
    <section id="mission" className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-[72rem] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_24rem] lg:items-center">
        <div>
          <p className="eyebrow mb-6 text-graphite">Our mission</p>
          <h2 className="max-w-[50rem] font-serif text-[clamp(2.25rem,3.4vw,3.6rem)] italic leading-tight">
            Build technology that treats people like people.
          </h2>
          <div className="mt-7 h-px w-10 bg-ink" />
          <p className="mt-8 max-w-[43rem] font-mono text-[0.88rem] leading-7 text-ink">
            We build adaptive intelligence that respects human complexity -
            memory, emotion, pace and context - so people feel supported, not
            processed.
          </p>
        </div>
        <div className="orbital-map relative hidden aspect-square lg:block" aria-hidden="true">
          <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
          <span className="absolute left-[23%] top-[70%] h-2.5 w-2.5 rounded-full bg-ink/22" />
          <span className="absolute right-[18%] top-[38%] h-2.5 w-2.5 rounded-full bg-ink/28" />
        </div>
      </div>
    </section>
  );
}
