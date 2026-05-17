import { NotebookSpread } from '../visuals/NotebookSpread.jsx';

export function OpeningStatement() {
  return (
    <section
      id="top"
      className="hero-atmosphere relative overflow-hidden pt-[5rem]"
      style={{ background: '#f0ede8' }}
    >
      <div className="mx-auto flex w-full max-w-hero items-center px-4 py-8 sm:min-h-[36rem] sm:px-6 sm:py-10 lg:min-h-[39rem] lg:px-10 lg:py-12">
        <div className="hero-reveal w-full">
          <NotebookSpread />
        </div>
      </div>
    </section>
  );
}
