module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
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
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'line': '0 0 10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};