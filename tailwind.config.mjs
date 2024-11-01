/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {

      fontSize: {
        '2xs': ['0.5rem', '0.5rem'],
      },

      colors: {
        'sky-day':       '#53ACDB',
        'sky-day-dark':  '#1488BA',
        'sky-day-light': '#99D4FF',
      },

      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body':     theme('colors.white'),
            '--tw-prose-headings': theme('colors.white'),
            //'--tw-prose-lead': theme('colors.pink[700]'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-bold': theme('colors.white'),
            //'--tw-prose-counters': theme('colors.pink[600]'),
            //'--tw-prose-bullets': theme('colors.pink[400]'),
            //'--tw-prose-hr': theme('colors.pink[300]'),
            //'--tw-prose-quotes': theme('colors.pink[900]'),
            //'--tw-prose-quote-borders': theme('colors.pink[300]'),
            //'--tw-prose-captions': theme('colors.pink[700]'),
            //'--tw-prose-code': theme('colors.pink[900]'),
            //'--tw-prose-pre-code': theme('colors.pink[100]'),
            //'--tw-prose-pre-bg': theme('colors.pink[900]'),
            //'--tw-prose-th-borders': theme('colors.pink[300]'),
            //'--tw-prose-td-borders': theme('colors.pink[200]'),
            //'--tw-prose-invert-body': theme('colors.pink[200]'),
            //'--tw-prose-invert-headings': theme('colors.white'),
            //'--tw-prose-invert-lead': theme('colors.pink[300]'),
            //'--tw-prose-invert-links': theme('colors.white'),
            //'--tw-prose-invert-bold': theme('colors.white'),
            //'--tw-prose-invert-counters': theme('colors.pink[400]'),
            //'--tw-prose-invert-bullets': theme('colors.pink[600]'),
            //'--tw-prose-invert-hr': theme('colors.pink[700]'),
            //'--tw-prose-invert-quotes': theme('colors.pink[100]'),
            //'--tw-prose-invert-quote-borders': theme('colors.pink[700]'),
            //'--tw-prose-invert-captions': theme('colors.pink[400]'),
            //'--tw-prose-invert-code': theme('colors.white'),
            //'--tw-prose-invert-pre-code': theme('colors.pink[300]'),
            //'--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            //'--tw-prose-invert-th-borders': theme('colors.pink[600]'),
            //'--tw-prose-invert-td-borders': theme('colors.pink[700]'),
          }
        }
      })

    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
