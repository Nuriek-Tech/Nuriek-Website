const entries = [
  {
    number: '01',
    title: 'The quiet interface',
    text: 'A study in letting the page breathe before asking it to explain.',
  },
  {
    number: '02',
    title: 'Memory as material',
    text: 'Notes on products that become more humane as they understand context.',
  },
  {
    number: '03',
    title: 'Founder weather',
    text: 'A record of doubts, decisions, and the discipline of staying close to the work.',
  },
];

export function ArchiveSection() {
  return (
    <section id="archive" className="border-y border-line bg-paper">
      <div className="mx-auto max-w-editorial px-5 py-24 sm:px-8 lg:py-32">
        <div className="mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-graphite">Archive</p>
            <h2 className="mt-5 max-w-2xl text-balance font-serif text-4xl leading-[1.05] sm:text-6xl">
              Fragments for the next version.
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-8 text-graphite">
            A structure for essays, dispatches, product notes, and founder
            letters without turning them into content tiles.
          </p>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {entries.map((entry) => (
            <article
              className="grid gap-6 py-9 sm:grid-cols-[6rem_0.8fr_1fr] sm:items-baseline"
              key={entry.number}
            >
              <p className="text-sm text-graphite">{entry.number}</p>
              <h3 className="font-serif text-3xl leading-tight">{entry.title}</h3>
              <p className="text-lg leading-8 text-graphite">{entry.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

