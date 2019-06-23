import React from "react";
import PageHome from "../components/PageHome";
// eslint-disable-next-line no-unused-vars
import { GatsbyImageSharpFixed, GatsbyImageSharpFluid } from "gatsby-image";
import { graphql } from "gatsby";

export default ({ data }) => (
  <PageHome
    data={data.page}
    posts={data.posts.edges}
    authors={data.authors.edges}
  />
);

export const query = graphql`
  query($slug: String) {
    page: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      timeToRead
      rawMarkdownBody
      frontmatter {
        author
        image {
          absolutePath
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
        excerpt
        slug
        date
        tags
        date_created
        date_updated
        featured
      }
    }
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date_created], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
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
    authors: allAuthorsYaml {
      edges {
        node {
          bio
          id
          website
          location
          avatar {
            childImageSharp {
              fixed(width: 30, height: 30) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`;
