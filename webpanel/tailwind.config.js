module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        'secondary': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      animation: {
        'fade': 'fadeIn 0.5s ease-out',
        'slide': 'slideIn 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'card': '0 2px 15px -3px rgba(0, 0, 0, 0.07)',
        'hover': '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    function({ addComponents }) {
      addComponents({
        '.card': {
          '@apply bg-white rounded-xl shadow-card hover:shadow-hover transition-all duration-300': {},
        },
        '.glass': {
          '@apply bg-white/80 backdrop-blur-md': {},
        },
        '.gradient-text': {
          '@apply bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent': {},
        },
      });
    },
  ],
};