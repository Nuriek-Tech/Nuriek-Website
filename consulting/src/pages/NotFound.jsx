import { Link } from 'react-router-dom';
import { PageHero } from '../components/ui.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';

export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <>
      <PageHero tone={1} eyebrow="404" title="This page does not exist." />
      <div className="mx-auto max-w-editorial px-5 pb-24 sm:px-8">
        <Link to="/" className="btn btn-solid">Back to home</Link>
      </div>
    </>
  );
}
