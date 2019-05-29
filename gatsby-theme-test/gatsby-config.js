const path = require("path");

module.exports = themeOptions => ({
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: path.join(__dirname, "src", "posts"),
      },
    },
    // {
    //   resolve: "gatsby-plugin-page-creator",
    //   options: {
    //     path: path.join(__dirname, "src", "pages"),
    //   },
    // },
    {
      resolve: "gatsby-plugin-compile-es6-packages",
      options: {
        // replace with the name of your theme
        modules: ["gatsby-theme-test"],
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              showCaptions: true,
              maxWidth: 840,
              quality: 80,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
        ],
      },
    },
    {
      resolve: `gatsby-plugin-amp`,
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
        canonicalBaseUrl: "http://localhost:8000/",
        components: [],
        excludedPaths: [],
        pathIdentifier: "",
        relAmpHtmlPattern: "{{canonicalBaseUrl}}{{pathname}}",
        useAmpClientIdApi: true,
      },
    },
  ],
});
