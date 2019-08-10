const path = require("path");

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
  __experimentalThemes: [
    {
      resolve: "gatsby-ghost-theme",
      options: { contentPath: path.join(__dirname, config.contentPath) },
    },
  ],
  siteMetadata: {
    siteUrl: config.siteUrl,
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-98635349-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Any additional optional fields
        // sampleRate: 5,
        // siteSpeedSampleRate: 10,
        // cookieDomain: "example.com",
      },
    },
    {
      resolve: "gatsby-plugin-amp",
      options: {
        // analytics: {
        //   type: "gtag",
        //   dataCredentials: "include",
        //   config: {
        //     vars: {
        //       gtag_id: "UA-98635349-1",
        //       config: {
        //         "UA-98635349-1": {
        //           page_location: "{{pathname}}",
        //         },
        //       },
        //     },
        //   },
        // },
        canonicalBaseUrl: config.siteUrl,
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
        logo: path.join(__dirname, config.contentPath, "img", "favicon.png"),

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
