/** @type {import('tailwindcss').Config} */
module.exports = {
  colors: {
        'theme-dark': '#000300',
        'theme-primary': '#ff6347', // Example primary color
        'theme-secondary': '#ffa500', // Example secondary color
        'theme-success': '#32cd32', // Example success color
        'theme-button': '#007bff', // Example button color
        'theme-button-hover': '#0056b3', // Example button hover color
      },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

