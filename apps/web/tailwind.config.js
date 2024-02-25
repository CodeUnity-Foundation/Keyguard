const base = require("@keyguard/tailwind-config/tailwind.config");

/** @type {import('tailwindcss').Config} */
export default {
  ...base,
  content: [...base.content],
  plugins: [...base.plugins],
};
