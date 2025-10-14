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
                ppLight: '#DDDCEB', //purpleLight
                ppGridHeader: '#61557D',
                ppWhite: '#E8E6F8',
                yellow: '#FFBB00',
                beige: '#FFE9AE',
                black: '#222222',
                gray: '#555555',
                grayWhite: '#F8F8F8',
                lightGray: '#7B7B7B',
                whiteGray: '#B3B3B3',
                white: '#FFFFFF',
                blue: '#3C0CE9',
                red: '#B8001F',
                calGray: '#B3B3B3',
                blueBtn: '#0C8CE9',
                purpleLight2: '#D6D4EE',
                gray44: '#444444',
                gray55: '#555555',
                gray4A: '#4A484E',
                grayD9: '#D9D9D9',
                red2: '#DA4962',
                gray100: '#F5F4F6',
            },
            fontSize: {
                base: ['12px', {lineHeight: '18px'}],
                xl: ['16px', {lineHeight: '24px'}],
                '2xl': ['21px', {lineHeight: '28px'}],
                '3xl': ['32px', {lineHeight: '40px'}],
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
