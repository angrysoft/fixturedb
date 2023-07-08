/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    spacing: {
      '0': '0rem',
      '01': '0.1rem',
      '02': '0.2rem',
      '03': '0.3rem',
      '04': '0.4rem',
      '05': '0.5rem',
      '06': '0.6rem',
      '07': '0.7rem',
      '08': '0.8rem',
      '09': '0.9rem',
      '1': '1rem',
      '2': '2rem',
      '3': '3rem',
      '4': '4rem',
      '5': '5rem',
      '6': '6rem',
      '7': '7rem',
      '8': '8rem',
      '9': '9rem',
      '10': '10rem',
      '11': '11rem',
      '12': '12rem',
      '13': '13rem',
      '14': '14rem',
      '15': '15rem',
      '16': '16rem',
      '17': '17rem',
      '18': '18rem',
      '19': '19rem',
      '20': '20rem',
    },

    extend: {
      screens: {
        'print': { 'raw': 'print' },
      },
      colors: {
          background: "#121212",
          surface: "#1e1e1e",
          primary: "#bb87fa",
          secondary: "#1cd9c5",
          onBackground: "#d8d8d8",
          onSurface:"#e1e1e1",
          onPrimary: "#00000000",
          onSecondary: "#080808",
      },

      minHeight: {
        'a4h': '31.7cm',
      },

      gridTemplateColumns: {
        "contacts": "repeat(auto-fit,minmax(22rem,1fr))",
        "jobs": "repeat(auto-fit, minmax(25rem, 35rem))",
      },
    },
},
  plugins: [],
}
