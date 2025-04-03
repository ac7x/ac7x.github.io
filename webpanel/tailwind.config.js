module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'line-green': '#06C755',
        'line-black': '#1E1E1E',
        'line-gray': {
          100: '#F8F9FA',
          200: '#F1F2F3',
          300: '#E5E5E6',
          400: '#CBCCCD',
          500: '#B1B2B3',
          600: '#86888A',
          700: '#5C5D5E',
          800: '#3F4042',
          900: '#1E1E1E',
        },
        'gray-850': '#1f2937', // 深灰色
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'line': '0 0 10px rgba(0, 0, 0, 0.1)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'highlight': '0 0 15px rgba(59, 130, 246, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--tw-prose-body)',
            'h1, h2, h3': {
              color: 'var(--tw-prose-headings)',
              fontWeight: '700',
            },
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'none',
              fontWeight: '500',
            },
            'a:hover': {
              textDecoration: 'underline',
            },
            code: {
              color: 'var(--tw-prose-code)',
            },
          },
        },
      },
    },
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};