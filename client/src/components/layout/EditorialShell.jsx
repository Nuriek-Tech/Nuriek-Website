import { SiteFooter } from './SiteFooter.jsx';
import { SiteHeader } from './SiteHeader.jsx';

export function EditorialShell({ children }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink selection:bg-ink selection:text-paper">
      <SiteHeader />
      <main id="content">{children}</main>
      <SiteFooter />
    </div>
  );
}

