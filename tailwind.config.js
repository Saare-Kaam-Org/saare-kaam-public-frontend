/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {
    colors: { paper:'#f5f5ef', ink:'#142e27', forest:'#234b3d', moss:'#6d8069', lime:'#d9ed9c', mist:'#e7e9df', clay:'#d7a98b' },
    fontFamily: { sans:['DM Sans','sans-serif'], display:['Manrope','sans-serif'], serif:['Playfair Display','serif'] },
    boxShadow: { lift:'0 30px 80px rgba(20,46,39,.16)' }
  }},
  plugins: []
}