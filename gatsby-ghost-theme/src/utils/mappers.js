export const getPostCards = (posts, authors) => {
  const postsWithAuthors = posts.map(({ node }) => {
    const author = authors.find(
      ({ node: author }) => author.slug === node.frontmatter.author,
    );
    return postToCard(node, author);
  });
  return postsWithAuthors;
};

const postToCard = (postNode, authorNode) => ({
  id: postNode.id,
  slug: postNode.frontmatter.slug,
  tag:
    postNode.frontmatter &&
    postNode.frontmatter.tags &&
    postNode.frontmatter.tags[0],
  title: postNode.frontmatter.title,
  image:
    postNode.frontmatter &&
    postNode.frontmatter.feature_image &&
    postNode.frontmatter.feature_image.childImageSharp.fluid,
  excerpt: postNode.frontmatter.excerpt || postNode.excerpt,
  timeToRead: postNode.timeToRead,
  author: authorNode &&
    authorNode.node && {
      name: authorNode.node.name,
      image:
        authorNode.node.profile_image &&
        authorNode.node.profile_image.childImageSharp &&
        authorNode.node.profile_image.childImageSharp.fixed,
    },
});
