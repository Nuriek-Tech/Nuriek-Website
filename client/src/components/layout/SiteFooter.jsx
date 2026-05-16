import { useContactModal } from '../../context/ContactModalContext.jsx';
import { useLegalModal } from '../../context/LegalModalContext.jsx';

export function SiteFooter() {
  const { openModal } = useContactModal();
  const { openTerms, openPrivacy } = useLegalModal();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-[72rem] flex-col gap-7 px-5 py-9 font-mono text-sm text-ink sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2025 Nuriek</p>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            <li>
              <a className="link-underline" href="#top">home</a>
            </li>
            <li>
              <button
                type="button"
                className="cursor-pointer bg-transparent font-mono text-sm text-ink link-underline"
                onClick={openModal}
              >
                contact
              </button>
            </li>
            <li>
              <button
                type="button"
                className="cursor-pointer bg-transparent font-mono text-sm text-ink link-underline"
                onClick={openPrivacy}
              >
                privacy policy
              </button>
            </li>
            <li>
              <button
                type="button"
                className="cursor-pointer bg-transparent font-mono text-sm text-ink link-underline"
                onClick={openTerms}
              >
                terms
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
