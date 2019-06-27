import React from "react";
import PageAuthor from "../components/PageAuthor";
// eslint-disable-next-line no-unused-vars
import { GatsbyImageSharpFixed, GatsbyImageSharpFluid } from "gatsby-image";
import { graphql } from "gatsby";

export default ({ data }) => (
  <PageAuthor data={data.author} posts={data.posts.edges} />
);

export const query = graphql`
  query($author: String) {
    author: authorsYaml(id: { eq: $author }) {
      id
      name
      bio
      location
      links {
        name
        url
        icon
      }
      email
      profile_image {
        absolutePath
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      avatar {
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
      filter: { frontmatter: { draft: { ne: true }, author: { eq: $author } } }
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
            image {
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
