import { NotebookSpread } from '../visuals/NotebookSpread.jsx';

export function OpeningStatement() {
  return (
    <section
      id="top"
      className="hero-atmosphere relative overflow-hidden pt-[5rem]"
      style={{ background: '#f0ede8' }}
    >
      <div className="mx-auto flex min-h-[39rem] max-w-editorial items-center px-4 py-10 sm:px-6 lg:px-10 lg:py-12">
        <div className="hero-reveal w-full">
          <NotebookSpread />
        </div>
      </div>
    </section>
  );
}
