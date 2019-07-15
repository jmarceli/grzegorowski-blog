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

exports.createPages = async ({ graphql, actions }, pluginOptions) => {
  const { contentPath } = pluginOptions;
  const { createPage } = actions;

  const result = await graphql(`
    {
      posts: allMarkdownRemark(
        sort: {fields: [frontmatter___date], order: DESC}, 
        filter: { fileAbsolutePath: { regex: "/content/posts/" }
        ${
          process.env.NODE_ENV === "production"
            ? ", frontmatter: { draft: { ne: true } }"
            : ""
        }},
      ) {
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
      pages: allMarkdownRemark(
        sort: {fields: [frontmatter___date], order: DESC}, 
        filter: { fileAbsolutePath: { regex: "/content/pages/" }
        ${
          process.env.NODE_ENV === "production"
            ? ", frontmatter: { draft: { ne: true } }"
            : ""
        }},
      ) {
        edges {
          node {
            frontmatter {
              layout
              slug
            }
          }
        }
      }
      allAuthorsYaml {
        edges {
          node {
            id
            slug
          }
        }
      }
      allTagsYaml {
        edges {
          node {
            id
            slug
            name
            description
            meta_title
            meta_description
            created_at
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

  // Posts
  result.data.posts.edges.forEach(({ node }, index, posts) => {
    const slug = node.frontmatter.slug;
    const prev = index === 0 ? null : posts[index - 1].node;
    const next = index === posts.length - 1 ? null : posts[index + 1].node;

    pagesPromises.push(
      createPage({
        path: slug,
        component: path.resolve(
          path.join(__dirname, "src", "templates", "post.js"),
        ),
        context: {
          ...node.frontmatter,
          mainTag: (node.frontmatter.tags && node.frontmatter.tags[0]) || "",
          prev,
          next,
        },
      }),
    );
  });

  // Pages - static pages e.g. home page and cookies page
  result.data.pages.edges.forEach(({ node }) => {
    const slug = node.frontmatter.slug;
    pagesPromises.push(
      createPage({
        path: slug,
        component: path.resolve(
          path.join(
            __dirname,
            "src",
            "templates",
            `${node.frontmatter.layout}.js`,
          ),
        ),
        context: {
          slug,
        },
      }),
    );
  });

  // Author pages
  result.data.allAuthorsYaml.edges.forEach(({ node }) => {
    const author = node.slug;
    if (!author) {
      console.warn("Skipping empty AUTHOR page creation", node);
      return;
    }
    createPage({
      path: `/author/${author}`,
      component: path.resolve(
        path.join(__dirname, "src", "templates", "author.js"),
      ),
      context: {
        author_slug: author,
      },
    });
  });

  // Tag pages
  result.data.allTagsYaml.edges.forEach(({ node }) => {
    const tag = node.slug;
    if (!tag) {
      console.warn("Skipping empty TAG page creation", node);
      return;
    }
    createPage({
      path: `/tag/${tag}`,
      component: path.resolve(
        path.join(__dirname, "src", "templates", "tag.js"),
      ),
      context: {
        tag_slug: tag,
      },
    });
  });

  // wait for all pages until they are done
  await Promise.all(pagesPromises);
};
