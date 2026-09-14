/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#150F0A',
        paper: '#F6F1E5',
        accent: {
          DEFAULT: '#B9905F',
          light: '#D3B384',
          dim: '#8A6A45',
        },
      },
      fontFamily: {
        arabic: ['"Aref Ruqaa"', 'serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest2: '0.35em',
      },
    },
  },
  plugins: [],
}
