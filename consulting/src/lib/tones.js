export const tones = [
  { solid: 'bg-iris', soft: 'bg-white border border-line', text: 'text-iris', border: 'border-iris', card: 'bg-iris text-white', hero: 'bg-iris', a: 'bg-coral', b: 'bg-amber' },
  { solid: 'bg-coral', soft: 'bg-white border border-line', text: 'text-coral', border: 'border-coral', card: 'bg-coral text-white', hero: 'bg-coral', a: 'bg-iris', b: 'bg-amber' },
  { solid: 'bg-teal', soft: 'bg-white border border-line', text: 'text-teal', border: 'border-teal', card: 'bg-teal text-white', hero: 'bg-teal', a: 'bg-night', b: 'bg-amber' },
  { solid: 'bg-amber', soft: 'bg-white border border-line', text: 'text-amber', border: 'border-amber', card: 'bg-amber text-night', hero: 'bg-night', a: 'bg-iris', b: 'bg-coral' },
];
export const tone = (i) => tones[i % tones.length];
