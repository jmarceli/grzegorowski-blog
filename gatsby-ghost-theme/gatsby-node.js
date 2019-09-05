const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  // setup path aliases, so "src/test.js" will always point to the "./src/test.js" file
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
        sort: {fields: [frontmatter___date_created], order: DESC}, 
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

  // Posts
  const posts = result.data.posts.edges;
  for (let index = 0; index < posts.length; index++) {
    // for in is not used becuase when "in" is used "index" was a string...
    const { node } = posts[index];
    const slug = node.frontmatter.slug;
    const prev = index === 0 ? null : posts[index - 1].node;
    const next = index === posts.length - 1 ? null : posts[index + 1].node;

    // All createPage() should be synchronized with await to avoid parallel file writing issues
    await createPage({
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
    });

    // AMP pages for posts
    await createPage({
      path: `${slug}/amp/`,
      component: path.resolve(
        path.join(__dirname, "src", "templates", "post.js"),
      ),
      context: {
        ...node.frontmatter,
        mainTag: (node.frontmatter.tags && node.frontmatter.tags[0]) || "",
        prev,
        next,
        isAmp: true,
      },
    });
  }

  // Pages - static pages e.g. home page and cookies page
  // result.data.pages.edges.forEach(({ node }) => {
  for ({ node } of result.data.pages.edges) {
    // const { node } = result.data.pages.edges[index];
    const slug = node.frontmatter.slug;

    await createPage({
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
    });
  }

  // Author pages
  for ({ node } of result.data.allAuthorsYaml.edges) {
    const author = node.slug;
    if (!author) {
      console.warn("Skipping empty AUTHOR page creation", node);
      return;
    }
    await createPage({
      path: `/author/${author}`,
      component: path.resolve(
        path.join(__dirname, "src", "templates", "author.js"),
      ),
      context: {
        author_slug: author,
      },
    });
  }

  // Tag pages
  for ({ node } of result.data.allTagsYaml.edges) {
    const tag = node.slug;
    if (!tag) {
      console.warn("Skipping empty TAG page creation", node);
      return;
    }
    await createPage({
      path: `/tag/${tag}`,
      component: path.resolve(
        path.join(__dirname, "src", "templates", "tag.js"),
      ),
      context: {
        tag_slug: tag,
      },
    });
  }

  // 404 page
  await createPage({
    path: `^\/?404\/?$`,
    component: path.resolve(path.join(__dirname, "src", "templates", "404.js")),
  });

  // WARNING! While this approach seems to be quite performant there might be some race conditions
  // so to make it more reliable there is a slight chance that these promises should be executed synchronously
};
