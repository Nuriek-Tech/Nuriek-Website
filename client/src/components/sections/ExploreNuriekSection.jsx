const destinations = [
  {
    title: 'Products',
    description: 'Explore what we build, starting with Tuuteez, our voice-first AI tutor for school students.',
    href: 'https://www.product.nuriek.com/',
    label: 'Explore products',
  },
  {
    title: 'AI Consulting',
    description: 'Work with Nuriek to identify where AI can help, test it in a pilot, and integrate it into your team’s everyday work.',
    href: 'https://www.consulting.nuriek.com/',
    label: 'Explore AI consulting',
  },
];

export function ExploreNuriekSection() {
  return (
    <section id="explore-nuriek" aria-labelledby="explore-nuriek-title" className="border-t border-line bg-paper">
      <div className="mx-auto w-full max-w-[86rem] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <h2 id="explore-nuriek-title" className="font-serif text-[clamp(2.25rem,6vw,4.9rem)] leading-none">
          Explore Nuriek
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {destinations.map(({ title, description, href, label }) => (
            <article key={href} className="flex flex-col items-start border border-line p-6 sm:p-9">
              <h3 className="font-serif text-3xl sm:text-4xl">{title}</h3>
              <p className="mb-7 mt-4 max-w-[31rem] text-base leading-7 text-graphite">{description}</p>
              <a href={href} className="link-underline mt-auto text-base font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                {label}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
