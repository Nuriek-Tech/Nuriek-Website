/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#faf8f4',
        ink: '#111111',
        graphite: '#3a3a36',
        line: '#d8d8d2',
        mist: '#ecece6',
        night: '#242322',
        iris: { DEFAULT: '#a53928', 50: '#f8eae5' },
        coral: { DEFAULT: '#b64c38', 50: '#ffe9e4' },
        teal: { DEFAULT: '#437269', 50: '#d9f6f2' },
        amber: { DEFAULT: '#ffbe3d', 50: '#fff1cf' },
      },
      fontFamily: {
        serif: ['Inter', "'Inter Fallback'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', "'Inter Fallback'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Courier New"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        editorial: '84rem',
        hero: '90rem',
        measure: '42rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
