/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        4: "repeat(4, minmax(180px, 1fr))",
      },
      fontFamily: {
        main: '"Space+Grotesk"',
      },
      fontSize: {
        // base: ['20px', '20px'],
        button: [
          "20px",
          {
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "normal",
          },
        ],
      },
      colors: {
        main: "#FCF7E6",
        black: "#000000",
      },
      container: {
        padding: {
          DEFAULT: "15px",
        },
      },
      screens: {
        sm: "479.98px",
        md: "767.98px",
        lg: "991.98px",
        xl: "1302px",
      },
    },
  },
  plugins: [],
};
