/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07142A', panel: '#0D2140', panel2: '#12294D', line: '#1C3558',
        mute: '#8FA6C2', soft: '#C9D8EA', text: '#EEF3F9',
        brand: '#1FD1A5', brand2: '#1E8BFF', up: '#2BD68F', down: '#FF6B6B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Montserrat', '"Segoe UI"', 'Arial', 'sans-serif'],
        sans: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', '"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      maxWidth: { wrap: '72rem' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
