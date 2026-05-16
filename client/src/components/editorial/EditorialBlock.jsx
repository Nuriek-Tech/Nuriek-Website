export function EditorialBlock({
  children,
  eyebrow,
  id,
  title,
  tone = 'light',
}) {
  return (
    <section
      id={id}
      className={tone === 'dark' ? 'bg-ink text-paper' : 'bg-paper text-ink'}
    >
      <div className="mx-auto grid max-w-editorial gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:py-32">
        <div className="max-w-xs">
          {eyebrow && (
            <p className="eyebrow text-current/65">{eyebrow}</p>
          )}
          {title && <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.05] sm:text-5xl">{title}</h2>}
        </div>
        <div className="max-w-measure space-y-7 text-lg leading-8 text-current/78 sm:text-xl sm:leading-9">
          {children}
        </div>
      </div>
    </section>
  );
}

