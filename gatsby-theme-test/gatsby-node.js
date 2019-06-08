const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  // setup path aliases so "src/test.js" will always point to the "./src/test.js" file
  actions.setWebpackConfig({
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src"),
      },
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
              tags
              author
            }
          }
        }
      }
      allAuthorsYaml {
        edges {
          node {
            id
            profile_image
            avatar {
              absolutePath
              childImageSharp {
                sizes {
                  srcSet
                  src
                  sizes
                  originalImg
                }
              }
            }
          }
        }
      }
      allTagsYaml {
        edges {
          node {
            id
            name
            description
            meta_title
            meta_description
            created_at
            image
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    throw new Error(result.errors);
  }

  // Resolve page promises in parallel (using Promise.all)
  const pagesPromises = [];

  // Post pages
  result.data.allMarkdownRemark.edges.forEach(({ node }, index, posts) => {
    const slug = node.frontmatter.slug;
    const prev = index === 0 ? null : posts[index - 1].node;
    const next = index === posts.length - 1 ? null : posts[index + 1].node;

    pagesPromises.push(
      createPage({
        path: slug,
        component: path.resolve(
          path.join(__dirname, "src", "pages", "post.js"),
        ),
        context: {
          ...node.frontmatter,
          prev,
          next,
        },
      }),
    );
  });

  // Author pages
  result.data.allAuthorsYaml.edges.forEach(({ node }) => {
    const author = node.id;
    createPage({
      path: `/author/${author}`,
      component: path.resolve(
        path.join(__dirname, "src", "pages", "author.js"),
      ),
      context: {
        author: node.id,
      },
    });
  });

  // Tag pages
  result.data.allTagsYaml.edges.forEach(({ node }) => {
    const tag = node.id;
    createPage({
      path: `/tag/${tag}`,
      component: path.resolve(path.join(__dirname, "src", "pages", "tag.js")),
      context: {
        tag: node.id,
      },
    });
  });

  // Home page
  pagesPromises.push(
    createPage({
      path: "/",
      component: path.resolve(path.join(__dirname, "src", "pages", "home.js")),
    }),
  );

  // wait for all pages until they are done
  await Promise.all(pagesPromises);
};
