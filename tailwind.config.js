/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'luxury-black': '#0a0a0a',
        'luxury-dark': '#1a1a1a',
        'luxury-charcoal': '#2d2d2d',
        'luxury-grey': '#3d3d3d',
        'luxury-white': '#f5f5f5',
        'luxury-beige': '#e8e4dc',
        'neon-cyan': '#00d9ff',
        'neon-purple': '#b026ff',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(10px)',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(0, 217, 255, 0.3)',
        'glow-purple': '0 0 30px rgba(176, 38, 255, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
