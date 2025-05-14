/** @type {import('tailwindcss').Config} */
const preBorderRadius = "0.75rem";
module.exports = {
  content: [
    "./src/components/**/*.tsx",
    "./src/pages/**/*.tsx",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: 'HelveticaNeue, "Helvetica Neue", Helvetica, Arial, 游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック, "Yu Gothic", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "MS ゴシック", "MS Gothic", sans-serif',
      fontFeatureSettings: "palt",
    },
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
              code: {
                wordBreak: "break-all",
              },
              pre: {
                borderRadius: preBorderRadius,
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
              pre: {
                borderRadius: preBorderRadius,
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
              pre: {
                borderRadius: preBorderRadius,
              },
            },
          ],
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
