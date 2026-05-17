export function TodaySection() {
  return (
    <section id="today" className="relative overflow-hidden border-t border-line bg-paper">
      <div className="mx-auto grid w-full max-w-[86rem] gap-12 px-5 py-16 sm:gap-16 sm:px-8 sm:py-20 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-24">
        <div>
          <p className="eyebrow mb-7 text-graphite">Today</p>
          <h2 className="max-w-[37rem] font-serif text-[clamp(2.25rem,6vw,4.9rem)] leading-[0.98] tracking-normal">
            The ideas finally became systems.
          </h2>
          <div className="mt-8 h-px w-12 bg-ink" />
          <p className="mt-9 max-w-[35rem] font-serif text-[clamp(1.15rem,2.5vw,1.75rem)] leading-[1.45] text-ink">
            After years of exploration, reflection, and iteration - we&apos;re
            building products that grow with people.
          </p>
          <p className="mt-7 max-w-[34rem] font-mono text-[0.82rem] leading-7 text-graphite">
            Nuriek is no longer just a notebook of questions. It is becoming a
            family of adaptive systems: tools that learn from context, respect
            pace, and make people feel understood before they are optimized.
          </p>
          <div className="mt-9 grid max-w-[32rem] gap-3 border-y border-line py-5 font-mono text-[0.78rem] sm:grid-cols-3">
            <p>
              <span className="block text-ink">01</span>
              Learning
            </p>
            <p>
              <span className="block text-ink">02</span>
              Memory
            </p>
            <p>
              <span className="block text-ink">03</span>
              Human pace
            </p>
          </div>
        </div>

        <div className="lg:relative lg:min-h-[41rem]">
          <div className="today-card relative w-full max-w-[34rem] rounded-[1.35rem] border border-line bg-[#f1efe7] px-6 py-7 shadow-[0_28px_80px_rgba(17,17,17,0.13)] sm:px-8 sm:py-8 lg:ml-auto">
            <div className="max-w-[24rem] border border-ink/8 bg-paper/72 p-5 shadow-[0_12px_22px_rgba(17,17,17,0.08)]">
              <p className="handwritten text-[1.3rem] leading-8 text-ink/82 sm:text-[1.45rem]">
                Built from a belief that education should evolve with every
                learner.
              </p>
            </div>
            <div className="today-orbit relative mx-auto mt-8 h-24 w-24" aria-hidden="true">
              <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
            </div>
            <div className="mt-7 h-px w-12 bg-ink/35" />
            <h3 className="mt-7 font-mono text-xl font-semibold uppercase tracking-[0.05em]">
              Tuuteez
            </h3>
            <p className="mt-4 max-w-[18rem] font-mono text-[0.9rem] leading-7 text-ink">
              Adaptive AI learning for students.
            </p>
            <div className="mt-7 grid gap-3 border-y border-line/80 py-5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-graphite sm:grid-cols-2 lg:grid-cols-4">
              <p>Personal pace</p>
              <p>Context memory</p>
              <p>Adaptive practice</p>
              <p>Student-first AI</p>
            </div>
            <div className="mt-7">
              <a
                href="https://tuuteez.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-ink bg-ink px-5 py-2.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-paper transition-all duration-200 hover:bg-paper hover:text-ink"
              >
                Visit Tuuteez
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
