export default {
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rosa: '#e14a94',
        'rosa-dark': '#b5307a',
        'rosa-light': '#f9d4e9',
        azul: '#0072b9',
        'azul-dark': '#004f80',
        'azul-light': '#cfe6f5',
        dorado: '#f3a100',
        'dorado-dark': '#c47d00',
        verde: '#10b981',
        purpura: '#7c3aed',
        gris: '#555553',
        'gris-claro': '#f4f4f2',
        crema: '#fbfaf6',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
