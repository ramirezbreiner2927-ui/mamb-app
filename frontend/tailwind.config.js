/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mamb: {
          gold:    '#F5C842',
          orange:  '#E8813A',
          red:     '#D44B2A',
          brown:   '#7A3B1E',
          cream:   '#FDF6ED',
          teal:    '#2E8B7A',
          purple:  '#5B2D8E',
          green:   '#3A7D3A',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Nunito"', 'sans-serif'],
        kids:    ['"Fredoka One"', 'cursive'],
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease forwards',
        'slide-up':   'slideUp 0.4s ease forwards',
        'shimmer':    'shimmer 2s infinite',
        'float':      'float 3s ease-in-out infinite',
        'spin-slow':  'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideUp: { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '0%,100%': { opacity: 0.4 }, '50%': { opacity: 1 } },
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
      }
    }
  },
  plugins: []
}
