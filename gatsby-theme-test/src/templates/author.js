import React from "react";
import { graphql } from "gatsby";
import PageAuthor from "../components/PageAuthor";
import PageWithList from "../components/PageWithList";
// eslint-disable-next-line no-unused-vars
import { GatsbyImageSharpFixed, GatsbyImageSharpFluid } from "gatsby-image";

export default ({ data, pageContext }) => {
  if (!pageContext.author_slug) {
    const allAuthors = data.authors.edges.map(({ node }) => ({
      id: node.id,
      slug: `author/${node.slug}`,
      title: node.name,
      image: node && node.cover_image && node.cover_image.childImageSharp.fluid,
      excerpt: node.bio,
    }));

    return (
      <PageWithList
        main={{ title: "All authors", description: "List of all authors" }}
        cardList={allAuthors}
      />
    );
  }

  return <PageAuthor data={data.author} posts={data.posts.edges} />;
};

export const query = graphql`
  query($author_slug: String) {
    author: authorsYaml(slug: { eq: $author_slug }) {
      id
      slug
      name
      bio
      location
      links {
        name
        url
        icon
      }
      cover_image {
        absolutePath
        relativePath
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      profile_image {
        absolutePath
        relativePath
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
    authors: allAuthorsYaml {
      edges {
        node {
          id
          slug
          name
          bio
          cover_image {
            relativePath
            absolutePath
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date_created], order: DESC }
      filter: {
        frontmatter: { draft: { ne: true }, author: { eq: $author_slug } }
      }
    ) {
      edges {
        node {
          id
          html
          timeToRead
          rawMarkdownBody
          excerpt
          frontmatter {
            title
            slug
            date
            tags
            date_created
            date_updated
            author
            feature_image {
              relativePath
              absolutePath
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
