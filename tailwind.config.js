/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "accent-1": "#FF5A6A",
        "accent-2": "#29ABE2",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: [
            {
              h2: {
                position: "relative",
                paddingBottom: "1rem",
                "&::after": {
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "4rem",
                  height: "4px",
                  content: '""',
                  background: theme("colors.accent-1"),
                  borderRadius: "2px",
                },
              },
              li: {
                margin: 0,
              },
              "li > ul": {
                listStyle: "none",
                paddingLeft: "0.25rem",
                borderLeft: "4px solid #ddd",
              },
            },
          ],
        },
        sm: {
          css: [
            {
              li: {
                margin: 0,
              },
              "li > ul": {
                paddingLeft: "0.25rem",
              },
            },
          ],
        },
        base: {
          css: [
            {
              li: {
                margin: 0,
              },
              "li > ul": {
                paddingLeft: "0.25rem",
              },
            },
          ],
        },
        lg: {
          css: [
            {
              li: {
                margin: 0,
              },
              "li > ul": {
                paddingLeft: "0.25rem",
              },
            },
          ],
        },
        xl: {
          css: [
            {
              li: {
                margin: 0,
              },
              "li > ul": {
                paddingLeft: "0.25rem",
              },
            },
          ],
        },
        "2xl": {
          css: [
            {
              li: {
                margin: "0 0 0.25rem 0",
              },
              "li > ul": {
                paddingLeft: "0.25rem",
              },
            },
          ],
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
