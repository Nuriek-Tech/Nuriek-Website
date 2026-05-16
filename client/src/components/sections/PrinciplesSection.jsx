import { EditorialBlock } from '../editorial/EditorialBlock.jsx';

const principles = [
  'Typography carries the emotion.',
  'Motion stays quiet enough to disappear.',
  'Black and white are the whole palette.',
  'Every section earns its silence.',
];

export function PrinciplesSection() {
  return (
    <EditorialBlock
      id="principles"
      eyebrow="Principles"
      title="A design system made from restraint."
      tone="dark"
    >
      <ul className="space-y-5">
        {principles.map((principle) => (
          <li
            className="border-b border-paper/18 pb-5 font-serif text-3xl leading-tight text-paper sm:text-4xl"
            key={principle}
          >
            {principle}
          </li>
        ))}
      </ul>
    </EditorialBlock>
  );
}

