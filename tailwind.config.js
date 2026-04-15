/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3A9D7C',
          light: '#62BA98',
          dark: '#267559',
        },
        secondary: {
          DEFAULT: '#F5EFE6',
        },
        accent: {
          DEFAULT: '#2A8E89',
          light: '#4AADAA',
        },
        success: '#15803D',
        warning: '#B45309',
        error: '#B91C1C',
        neutral: {
          50: '#FAFAF8',
          100: '#F5F0EA',
          200: '#E8E0D5',
          400: '#A89B8C',
          600: '#6B5E52',
          900: '#1C1410',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        display: ['48px', { lineHeight: '1.15', fontWeight: '700' }],
        h1: ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['28px', { lineHeight: '1.25', fontWeight: '600' }],
        h3: ['22px', { lineHeight: '1.3', fontWeight: '600' }],
        h4: ['16px', { lineHeight: '1.4', fontWeight: '700' }],
        body: ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        small: ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        micro: ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        md: '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        lg: '0 12px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
