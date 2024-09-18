/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
        colors: {
            'blue-header': '#374151',
            'blue-container-notes': '#111827',
            'blue-container-notes-header': '#1F2937',
            'blue-buttons': '#2DD4BF'
        }
    },
  },
  plugins: [],
}

