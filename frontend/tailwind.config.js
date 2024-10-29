// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F8F8FE",
        primary: "#2D3748",
        secondary: "#F8F8FE",
        tertiary: "#A0AEC0",
        card: "#2C2C2E", 
        text: "#FFFFFF", 
        textSecondary: "#E1E1E1", 
        link: "#007AFF", 
        accent: "#FF3B30", 
        divider: "#3A3A3C", 
      },
      boxShadow: {
        top: "0 -2px 1px rgba(0, 0, 0, 0.05)", 
      },
    },
  },
  plugins: [],
};
