const milestones = [
  {
    year: '2018',
    title: 'The insight.',
    text: 'People are not static. Systems are.',
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
    text: 'More than fifty ideas and directions.',
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
        <div className="relative grid gap-7 overflow-x-auto pb-2 sm:grid-cols-7 sm:overflow-visible">
          <div className="absolute left-1 right-1 top-[1.6rem] hidden h-px bg-ink/35 sm:block" />
          {milestones.map((item) => (
            <article className="relative min-w-[9.5rem] pr-4" key={item.year}>
              <p className="mb-4 font-mono text-sm font-semibold">{item.year}</p>
              <div className="mb-5 h-3 w-3 rounded-full bg-ink sm:relative sm:z-10" />
              <h2 className="font-mono text-[0.82rem] font-semibold leading-5">
                {item.title}
              </h2>
              <p className="mt-4 font-mono text-[0.78rem] leading-6 text-graphite">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
