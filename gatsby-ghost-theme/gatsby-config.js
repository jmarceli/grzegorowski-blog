const path = require("path");

module.exports = ({ contentPath }) => ({
  plugins: [
    "gatsby-transformer-yaml",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: contentPath,
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: path.join(__dirname, "src", "auto-pages"),
      },
    },
    {
      resolve: "gatsby-plugin-compile-es6-packages",
      options: {
        // replace with the name of your theme
        modules: ["gatsby-theme-test"],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 840,
              quality: 80,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              // do not use Prism for inline <code/>
              noInlineHighlight: false,
              showLineNumbers: true,
              aliases: {
                text: "javascript",
                js: "javascript",
              },
            },
          },
          "gatsby-remark-copy-linked-files",
        ],
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: path.join(__dirname, "src", "utils", "typography"),
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      // options: {
      // Add any options here
      // },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `grzegorowski`,
      },
    },
  ],
});
