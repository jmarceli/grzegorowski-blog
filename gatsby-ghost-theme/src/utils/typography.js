import Typography from "typography";
// import githubTheme from "typography-theme-github";

// const typography = new Typography(githubTheme);
const typography = new Typography({
  baseFontSize: "22px",
  baseLineHeight: 1.6,
  headerWeight: 500,
});

export const ffSans =
  '-apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';

export const toEm = pxSize => pxSize / 16;

export default typography;
