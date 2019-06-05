const path = require("path");
// const fs = require("fs");
// const mkdirp = require("mkdirp");
// const { reporter } = require("gatsby-cli");

// exports.onPreBootstrap = ({ store, reporter }) => {
//   const { program } = store.getState();

//   const dirs = [
//     path.join(program.directory, "src/pages"),
//     path.join(program.directory, "src/posts")
//   ];

//   dirs.forEach(dir => {
//     if (!fs.existsSync(dir)) {
//       reporter.log(`creating the ${dir} directory`);
//       mkdirp.sync(dir);
//     }
//   });
// };

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
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            frontmatter {
              slug
            }
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

  // Home page
  pagesPromises.push(
    createPage({
      path: "/",
      component: path.resolve(path.join(__dirname, "src", "pages", "home.js")),
    }),
  );

  // wait for all pages until they are done
  await Promise.all(pagesPromises);

  // Create tag pages
  // const tagTemplate = path.resolve('./src/templates/tags.tsx');
  // const tags = _.uniq(
  //   _.flatten(
  //     result.data.allMarkdownRemark.edges.map(edge => {
  //       return _.castArray(_.get(edge, 'node.frontmatter.tags', []));
  //     }),
  //   ),
  // );
  // tags.forEach(tag => {
  //   createPage({
  //     path: `/tags/${_.kebabCase(tag)}/`,
  //     component: tagTemplate,
  //     context: {
  //       tag,
  //     },
  //   });
  // });

  // // Create author pages
  // const authorTemplate = path.resolve('./src/templates/author.tsx');
  // result.data.allAuthorYaml.edges.forEach(edge => {
  //   createPage({
  //     path: `/author/${_.kebabCase(edge.node.id)}/`,
  //     component: authorTemplate,
  //     context: {
  //       author: edge.node.id,
  //     },
  //   });
  // });
};
