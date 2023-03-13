/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        powerTollsTheme: {
          primary: '#7ed957',
          secondary: '#19D3AE',
          neutral: '#3A4256',
          "base-100": "#ffffff",
        }
      }
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
