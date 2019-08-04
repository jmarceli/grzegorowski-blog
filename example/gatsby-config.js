const path = require("path");

module.exports = {
  __experimentalThemes: [
    {
      resolve: "gatsby-theme-test",
      options: { contentPath: path.join(__dirname, "content") },
    },
  ],
  siteMetadata: {
    siteUrl: "https://www.grzegorowski.com",
    title: "Full-stack developer blog by Jan Grzegorowski",
    mainMenu: [
      { label: "Home", slug: "/" },
      { label: "Contact", slug: "/author/jan" },
      { label: "Cookies", slug: "/cookies" },
    ],
    socialMedia: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/jan-grzegorowski/",
        icon: ["fab", "linkedin-in"],
      },
      {
        name: "Twitter",
        url: "https://twitter.com/jangrzegorowski/",
        icon: ["fab", "twitter"],
      },
    ],
    copyrights: "Jan Grzegorowski",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-amp",
      options: {
        // analytics: {
        //   type: 'gtag',
        //   dataCredentials: 'include',
        //   config: {
        //     vars: {
        //       gtag_id: <GA_TRACKING_ID>,
        //       config: {
        //         <GA_TRACKING_ID>: {
        //           page_location: '{{pathname}}'
        //         },
        //       },
        //     },
        //   },
        // },
        canonicalBaseUrl: "https://www.grzegorowski.com",
        components: [],
        excludedPaths: ["/404*", "/"],
        pathIdentifier: "/amp/",
        relAmpHtmlPattern: "{{canonicalBaseUrl}}{{pathname}}{{pathIdentifier}}",
        useAmpClientIdApi: true,
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        exclude: ["/cookies"],
      },
    },
  ],
};
