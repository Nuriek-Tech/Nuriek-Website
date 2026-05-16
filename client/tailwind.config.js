/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f7f7f4',
        ink: '#111111',
        graphite: '#3a3a36',
        line: '#d8d8d2',
        mist: '#ecece6',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Courier New"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        editorial: '84rem',
        measure: '42rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
