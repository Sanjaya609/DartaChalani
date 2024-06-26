/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2f6fcf',
          16: '#2460B9',
          24: '#2659a6',
        },
        navy: {
          16: '#0D2344',
          24: '#143566',
          32: '#1B4789',
          40: '#2159AB',
        },
        blue: {
          16: '#0C2146',
          24: '#113269',
          32: '#18428B',
          48: '#2979FF',
          56: '#4F91FF',
          64: '#76A9FF',
          72: '#70A9FF',
          80: '#99C2FF',
          88: '#C2DAFF',
          90: '#C0DBFF',
          92: '#D6E7FF',
          96: '#EBF3FF',
        },
        gray: {
          16: '#292929',
          24: '#3D3D3D',
          32: '#525252',
          48: '#7A7A7A',
          56: '#8F8F8F',
          64: '#f2f7ff',
          72: '#B8B8B8',
          80: '#CCCCCC',
          88: '#E0E0E0',
          90: '#E6E6E6',
          92: '#EBEBEB',
          96: '#F5F5F5',
        },
        green: {
          DEFAULT: '#43a047',
          16: '#132C14',
          24: '#1F4921',
          32: '#2B662E',
          40: '#30AF1D',
          48: '#3AD322',
          56: '#54E03E',
          64: '#87C289',
          72: '#B5E1AF',
          80: '#CBE5CC',
          88: '#D0F6CA',
          96: '#ECF7ED',
        },
        yellow: {
          16: '#FFE81A',
          48: '#F4B101',
          56: '#FEC120',
          88: '#FFEEC2',
        },
        red: {
          16: '#43130F',
          24: '#6F1F19',
          32: '#9C2B23',
          40: '#dc2626',
          48: '#EB0A19',
          56: '#F62735',
          64: '#FB6F78',
          72: '#FAA9A3',
          80: '#FCCBC8',
          88: '#FDC4C8',
          96: '#FEE8E7',
        },
        orange: {
          16: '#452400',
          24: '#733C00',
          32: '#A05300',
          40: '#CE6B00',
          48: '#FB8200',
          56: '#FB982E',
          64: '#FCAF5C',
          72: '#FDC68B',
          80: '#FDDCB9',
          88: '#FEE7CD',
          96: '#FFEFDE',
        },
      },
      lineHeight: {
        100: '100%',
        130: '130%',
        150: '150%',
        180: '180%',
        200: '200%',
      },
      screens: {
        xs: '475px',
        xxl: '1536px',
      },
      width: {
        'app-max': '85.375rem',
      },
      minHeight: {
        12: '12rem',
        20: '20rem',
        25: '25rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
  ],
  ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
}
