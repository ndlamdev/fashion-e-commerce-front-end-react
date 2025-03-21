/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        accordionDown: {
          from: { height: "0px", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        accordionUp: {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0px", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordionDown 1s ease-in-out",
        "accordion-up": "accordionUp 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
