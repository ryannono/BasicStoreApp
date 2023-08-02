/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        fill: 'repeat(auto-fill, minmax(200px, 1fr))',
      },
      // eslint-disable-next-line no-unused-vars
      backgroundImage: theme => ({
        'hero-bg':
          "url('https://images.unsplash.com/photo-1468077218827-c65e763b0e32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')", // Path to your image
      }),
    },
  },
  plugins: [],
};
