const path = require("path");

module.exports = {
  __experimentalThemes: [
    {
      resolve: "gatsby-theme-test",
      options: { contentPath: path.join(__dirname, "content") },
    },
  ],
  siteMetadata: {
    title: "Full-stack developer blog by Jan Grzegorowski",
    mainMenu: [
      { label: "Home", slug: "/" },
      { label: "Contact", slug: "/author/jan" },
      { label: "Cookies", slug: "/cookies" },
    ],
    socialMedia: {
      facebook: "",
      linkedin: "",
    },
    copyrights: "Jan Grzegorowski",
  },
};
