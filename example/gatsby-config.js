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
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: path.join(__dirname, "content", "img", "favicon.png"),

        // WebApp Manifest Configuration
        // appName: null, // Inferred with your package.json
        // appDescription: null,
        // developerName: null,
        // developerURL: null,
        // dir: 'auto',
        // lang: 'en-US',
        // background: '#fff',
        // theme_color: '#fff',
        // display: 'standalone',
        // orientation: 'any',
        // start_url: '/?homescreen=1',
        // version: '1.0',

        // icons: {
        //   android: true,
        //   appleIcon: true,
        //   appleStartup: true,
        //   coast: false,
        //   favicons: true,
        //   firefox: true,
        //   yandex: false,
        //   windows: false
        // }
      },
    },
  ],
};
