/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/**/*.{js,css}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#111111',
        accent: '#E63946',
        surfaceLight: '#F5F5F5',
        surfaceDark: '#1A1A1A',
        borderLight: '#E5E7EB',
        borderDark: '#2A2A2A',
        backgroundDark: '#0A0A0A',
        secondaryLight: '#6B7280',
        secondaryDark: '#9CA3AF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
