const path = require("path");
const app = {
  name: "Full-stack developer blog by Jan Grzegorowski",
  author: "Jan Grzegorowski",
};

require("dotenv").config({
  path: `.env.${process.env.CONFIG_ENV || "development"}`,
});

const config = {
  contentPath: process.env.CONTENT_PATH,
  siteUrl: process.env.SITE_URL,
};

console.log(`Compiling using ${process.env.CONFIG_ENV} config`);
console.log(config);

module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl,
    title: app.name,
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
    copyrights: app.author,
  },
  plugins: [
    {
      resolve: "gatsby-ghost-theme",
      options: { contentPath: path.join(__dirname, config.contentPath) },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-K4KJJKX",

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        // Defaults to null
        // defaultDataLayer: { platform: "gatsby" },

        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",
      },
    },
    {
      resolve: "gatsby-amp",
      options: {
        analytics: {
          dataCredentials: "include",
          config: "https://www.googletagmanager.com/amp.json?id=GTM-K4KJJKX&gtm.url=SOURCE_URL"
          },
        },
        canonicalBaseUrl: config.siteUrl,
        components: [],
        excludedPaths: ["/404*"],
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
        logo: path.join(__dirname, config.contentPath, "img", "favicon.png"),

        // WebApp Manifest Configuration
        appName: app.name,
        appDescription: null,
        developerName: app.author,
        developerURL: "https://www.grzegorowski.com",
        dir: "auto",
        lang: "en-US",
        background: "#fff",
        theme_color: "#3eb0ef",
        display: "standalone",
        orientation: "any",
        start_url: "/",
        // version: '1.0',

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          yandex: false,
          windows: true,
        },
      },
    },
  ],
};
