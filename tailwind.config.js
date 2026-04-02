/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: '#D4765A',
          dark: '#B85D42',
          light: '#E89A82',
        },
        cream: {
          DEFAULT: '#FDFBF7',
          dark: '#F5F1E8',
        },
        sage: {
          DEFAULT: '#9CAA97',
          dark: '#7A8A77',
          light: '#B8C7B5',
        },
        brown: {
          DEFAULT: '#8B7355',
          dark: '#6B5642',
        },
        charcoal: {
          DEFAULT: '#3D3835',
          light: '#5A5451',
          dark: '#2C2825',
        },
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Lexend', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'blob': '60% 40% 30% 70% / 60% 30% 70% 40%',
        'blob-2': '40% 60% 70% 30% / 40% 70% 30% 60%',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'blob-float': 'blob-float 20s ease-in-out infinite',
        'gentle-sway': 'gentle-sway 4s ease-in-out infinite',
        'soft-bounce': 'soft-bounce 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'warm-glow': 'warm-glow 3s ease-in-out infinite',
      },
      keyframes: {
        'blob-float': {
          '0%, 100%': {
            transform: 'translate(0px, 0px) scale(1) rotate(0deg)',
          },
          '33%': {
            transform: 'translate(30px, -20px) scale(1.05) rotate(2deg)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.95) rotate(-2deg)',
          },
        },
        'gentle-sway': {
          '0%, 100%': {
            transform: 'translateX(0px) rotate(0deg)',
          },
          '50%': {
            transform: 'translateX(10px) rotate(1deg)',
          },
        },
        'soft-bounce': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-8px)',
          },
        },
        'fade-in-up': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'warm-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(212, 118, 90, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(212, 118, 90, 0.5)',
          },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
