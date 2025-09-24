/** @type {import('tailwindcss').Config} */

// @ts-nocheck
function generateSpacingScale(max = 200, step = 5) {
  const scale = {};
  for (let i = step; i <= max; i += step) {
    scale[`${i}px`] = `${i}px`;
  }
  return scale;
}

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/styles/global.css'],
  theme: {
    extend: {
      colors: {
        ppt: '#2B2144', //purpleTitle
        ppm: '#2B265C', //purpleMenu
        ppp: '#6756C0', //purplePoint
        ppbg: '#F5F5FF', //purpleBG
        yellow: '#FFBB00',
        beige: '#FFE9AE',
        black: '#222222',
        gray: '#555555',
        lightGray: '#7B7B7B',
        white: '#FFFFFF',
        blue: '#3C0CE9',
        red: '#B8001F',
      },
      fontSize: {
        base: ['12px', { lineHeight: '18px' }],
        xl: ['16px', { lineHeight: '24px' }],
        '2xl': ['21px', { lineHeight: '28px' }],
        '3xl': ['32px', { lineHeight: '40px' }],
      },
      borderRadius: {
        default: '10px',
      },
      dropShadow: {
        sm: '0 3px 3px rgba(0,0,0,0.25)',
      },

      margin: generateSpacingScale(),
      padding: generateSpacingScale(),
      width: generateSpacingScale(),
      height: generateSpacingScale(),
      gap: generateSpacingScale(),
    },
  },
  plugins: [],
};
