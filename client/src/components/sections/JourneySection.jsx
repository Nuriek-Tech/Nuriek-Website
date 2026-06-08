const milestones = [
  {
    year: '2018',
    title: 'The insight.',
    text: 'Me and Sonu. Felt it before we could name it — people are not static. Systems are.',
  },
  {
    year: '2020',
    title: 'First experiments.',
    text: 'Built. Failed. Learned.',
  },
  {
    year: '2021',
    title: 'The start.',
    text: 'Ideas, notebooks and questions.',
  },
  {
    year: '2022',
    title: 'Explored many paths.',
    text: 'Amal, Sonu, and me — chasing fifty ideas, none of them wasted.',
  },
  {
    year: '2023',
    title: 'The shift.',
    text: 'From products to intelligence.',
  },
  {
    year: '2024',
    title: 'The decision.',
    text: 'One direction. All in.',
  },
  {
    year: '2026',
    title: 'Nuriek begins.',
    text: 'Building what we once needed.',
  },
];

export function JourneySection() {
  return (
    <section id="story" className="border-y border-line bg-mist/45">
      <div className="mx-auto max-w-[72rem] px-5 py-12 sm:px-8">
        <p className="eyebrow mb-9 text-graphite">The journey</p>
        <div
          className="journey-timeline relative -mx-5 flex gap-8 overflow-x-auto scroll-smooth px-5 pb-3 sm:-mx-8 sm:gap-9 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-7 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-2 xl:gap-7"
          role="list"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-5 right-5 top-[1.6rem] hidden h-px bg-ink/35 lg:left-1 lg:right-1 lg:block"
          />
          {milestones.map((item) => (
            <article
              className="relative w-[10.25rem] shrink-0 snap-start sm:w-[10.75rem] lg:w-auto lg:min-w-0 lg:shrink lg:pr-2 xl:pr-4"
              key={item.year}
              role="listitem"
            >
              <p className="mb-4 font-mono text-sm font-semibold">{item.year}</p>
              <div className="mb-5 h-3 w-3 rounded-full bg-ink lg:relative lg:z-10" />
              <h2 className="font-mono text-[0.82rem] font-semibold leading-5 lg:text-[0.78rem] lg:leading-[1.35] xl:text-[0.82rem] xl:leading-5">
                {item.title}
              </h2>
              <p className="mt-4 font-mono text-[0.78rem] leading-6 text-graphite lg:mt-3 lg:text-[0.72rem] lg:leading-[1.45] xl:mt-4 xl:text-[0.78rem] xl:leading-6">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
