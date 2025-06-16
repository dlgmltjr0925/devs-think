/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Background colors
    "bg-primary",
    "bg-secondary",
    "bg-error",
    "bg-warning",
    "bg-success",
    "bg-info",

    // Text colors
    "text-primary-contrast",
    "text-secondary-contrast",
    "text-error-contrast",
    "text-warning-contrast",
    "text-success-contrast",
    "text-info-contrast",

    // Border colors
    "border-primary",
    "border-secondary",
    "border-error",
    "border-warning",
    "border-success",
    "border-info",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
