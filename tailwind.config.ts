import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary colors
        'primary-light': "rgb(6 182 212)", // lighter blue
        'primary-dark': "rgb(14 165 233)", // darker blue
        'primary': "rgb(6 182 212)",
        'secondary': "rgb(14 165 233)", // darker blue
        
        // Theme-aware colors (using CSS variables)
        'background': "var(--background)",
        'background-secondary': "var(--background-secondary)",
        'foreground': "var(--foreground)",
        
        // Light theme colors
        'light-bg-dark': "rgb(226 232 240)", // darker background
        'light-bg-light': "rgb(241 245 249)", // lighter background
        'light-text': "rgb(17 24 39)", // text color
        
        // Dark theme colors
        'dark-bg-dark': "rgb(17 24 39)", // darker background
        'dark-bg-light': "rgb(30 41 59)", // lighter background
        'dark-text': "rgb(229 231 235)", // text color
      },
    },
  },
  plugins: [],
};

export default config;