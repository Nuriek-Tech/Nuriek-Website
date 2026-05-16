import { useTeamModal } from '../../context/TeamModalContext.jsx';

export function FounderLetterSection() {
  const { openModal } = useTeamModal();

  return (
    <section id="letter" className="grid border-y border-line bg-paper lg:grid-cols-[0.92fr_1.08fr]">
      <div className="px-5 py-14 sm:px-8 lg:ml-auto lg:w-full lg:max-w-[36rem] lg:py-24">
        <h2 className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] italic leading-tight">
          Why we started Nuriek.
        </h2>
        <div className="mt-7 h-px w-10 bg-ink" />
        <p className="mt-8 max-w-[24rem] font-mono text-[0.86rem] leading-7 text-ink">
          We are not here to build another tool. We are here to build
          intelligence that grows with people over time - with memory, with
          empathy, and with responsibility.
        </p>
        <button
          type="button"
          onClick={openModal}
          className="mt-8 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.08em] link-underline text-left text-ink"
        >
          Meet the team →
        </button>
      </div>

      <div className="letter-page letter-open-journal relative min-h-[26rem] overflow-hidden p-8 sm:min-h-[30rem] sm:p-12 lg:min-h-[34rem]">
        <div className="relative z-[1] mx-auto flex min-h-full max-w-[28rem] flex-col justify-center px-1 py-4 sm:px-3 sm:py-8">
          <div className="journal-note-text space-y-8 text-left">
            <p>
              For years, I collected ideas.
              <br />
              Not because I wanted to build many
              <br />
              things, but because I was trying to
              <br />
              understand one thing — what do
              <br />
              people really need that doesn&apos;t exist?
            </p>
            <p>
              Nuriek is the answer to that
              <br />
              question.
            </p>
            <p>
              It&apos;s personal. It&apos;s long-term.
              <br />
              It&apos;s us.
            </p>
            <p className="journal-note-text pt-2 text-right text-[clamp(1.55rem,2.8vw,2.05rem)] font-medium leading-tight text-[#24221e]">
              — Arun
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
