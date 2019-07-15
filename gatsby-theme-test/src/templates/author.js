import React from "react";
import PageAuthor from "../components/PageAuthor";
// eslint-disable-next-line no-unused-vars
import { GatsbyImageSharpFixed, GatsbyImageSharpFluid } from "gatsby-image";
import { graphql } from "gatsby";

// TODO: disable root page for authors
export default ({ data, pageContext }) =>
  pageContext.author_slug ? (
    <PageAuthor data={data.author} posts={data.posts.edges} />
  ) : (
    <div>Err</div>
  );

export const query = graphql`
  query($author_slug: String) {
    author: authorsYaml(slug: { eq: $author_slug }) {
      id
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
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      profile_image {
        absolutePath
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
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
