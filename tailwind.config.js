// Builds css/tailwind.css with only the classes used in the HTML pages.
// Run `npm run build:css` after adding or changing Tailwind classes.
module.exports = {
  purge: { enabled: true, content: ['./*.html'] },
  theme: { extend: {} },
  variants: {},
  plugins: [],
};
