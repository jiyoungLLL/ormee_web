import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
    './src/**/*.stories.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        purple: {
          10: '#f1eeff',
          15: '#f4f1ff',
          20: '#e4deff',
          30: '#cec3ff',
          35: '#b7a7ff',
          40: '#a28dff',
          50: '#7455FF',
          60: '#7863d9',
          70: '#6452b5',
          80: '#504291',
          90: '#3f3473',
        },
        gray: {
          10: '#F6F6FA',
          20: '#F2F2F4',
          30: '#E7E7EA',
          40: '#C9C9D4',
          50: '#B4B4C2',
          60: '#7E7F8E',
          70: '#696A7D',
          75: '#474756',
          80: '#282931',
          90: '#19191D',
        },
        system: {
          error: '#FF5555',
          alert: '#E96D6D',
          positive: '#14DB6E',
        },
        accent: {
          redOrange: {
            5: '#fff0e6',
            10: '#ffbf91',
            20: '#ff6a00',
          },
          yellowGreen: {
            5: '#eff8e6',
            10: '#b8df91',
            20: '#5ab500',
          },
          blue: {
            5: '#e6f7ff',
            10: '#91deff',
            20: '#00b3ff',
          },
        },
        state: {
          success: '#DEF5E2',
          error: '#FBE8E8',
        },
        label: {
          assistive: '#B4B4B2',
        },
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      fontSize: {
        display1: [
          '56px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.02em',
          },
        ],
        display2: [
          '40px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.02em',
          },
        ],
        title1: [
          '28px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.02em',
          },
        ],
        title2: [
          '26px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.02em',
          },
        ],
        title3: [
          '24px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.02em',
          },
        ],
        heading1: [
          '22px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.02em',
          },
        ],
        heading2: [
          '20px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.02em',
          },
        ],
        headline1: [
          '18px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.02em',
          },
        ],
        headline2: [
          '16px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.02em',
          },
        ],
        'body-reading': [
          '18px',
          {
            lineHeight: '155%',
            fontWeight: '400',
            letterSpacing: '-0.02em',
          },
        ],
        'body1-normal': [
          '16px',
          {
            lineHeight: '140%',
            fontWeight: '400',
            letterSpacing: '-0.02em',
          },
        ],
        'body1-reading': [
          '16px',
          {
            lineHeight: '155%',
            fontWeight: '400',
            letterSpacing: '-0.02em',
          },
        ],
        'body2-normal': [
          '14px',
          {
            lineHeight: '140%',
            fontWeight: '400',
            letterSpacing: '-0.02em',
          },
        ],
        'body2-reading': [
          '14px',
          {
            lineHeight: '150%',
            fontWeight: '400',
            letterSpacing: '-0.02em',
          },
        ],
        label: [
          '14px',
          {
            lineHeight: '140%',
            fontWeight: '500',
            letterSpacing: '-0.02em',
          },
        ],
        'label2-normal': [
          '12px',
          {
            lineHeight: '140%',
            fontWeight: '500',
            letterSpacing: '-0.02em',
          },
        ],
        'label2-reading': [
          '12px',
          {
            lineHeight: '140%',
            fontWeight: '400',
            letterSpacing: '-0.02em',
          },
        ],
        caption1: [
          '11px',
          {
            lineHeight: '140%',
            fontWeight: '400',
            letterSpacing: '-0.02em',
          },
        ],
        caption2: [
          '10px',
          {
            lineHeight: '140%',
            fontWeight: '400',
            letterSpacing: '-0.02em',
          },
        ],
      },
      borderWidth: {
        '0.5': '0.5px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
