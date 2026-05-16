import { useContactModal } from '../../context/ContactModalContext.jsx';

const navItems = [
  { label: 'story', href: '#story' },
  { label: 'context', href: '#context' },
  { label: 'mission', href: '#mission' },
  { label: 'today', href: '#today' },
];

export function SiteHeader() {
  const { openModal } = useContactModal();

  return (
    <header className="fixed left-0 top-0 z-20 w-full bg-paper/88 backdrop-blur">
      <div className="mx-auto grid h-[5rem] max-w-[72rem] grid-cols-[1fr_auto] items-center gap-6 px-5 sm:grid-cols-[1fr_auto_1fr] sm:px-8">
        <a
          href="#top"
          className="font-sans text-2xl font-semibold tracking-[-0.03em] text-ink"
          aria-label="Nuriek home"
        >
          nuriek
        </a>
        <nav className="hidden sm:block" aria-label="Primary navigation">
          <ul className="flex items-center gap-7 text-sm lowercase tracking-normal text-ink">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="link-underline" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="justify-self-end rounded-md border border-ink/25 px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-300 hover:bg-ink hover:text-paper"
          onClick={openModal}
        >
          Contact
        </button>
      </div>
    </header>
  );
}
