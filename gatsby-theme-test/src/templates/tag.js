import React from "react";
import { graphql } from "gatsby";
// eslint-disable-next-line no-unused-vars
import { GatsbyImageSharpFixed, GatsbyImageSharpFluid } from "gatsby-image";
import PageTag from "../components/PageTag";

export default ({ data }) => (
  <PageTag
    posts={data.posts.edges}
    tag={data.tag}
    authors={data.authors.edges}
  />
);

export const query = graphql`
  query($tag: String) {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date_created], order: DESC }
      filter: { frontmatter: { draft: { ne: true }, tags: { in: [$tag] } } }
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
    tag: tagsYaml(name: { eq: $tag }) {
      id
      name
      description
      image {
        absolutePath
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      meta_description
      meta_title
      created_at
      updated_at
      visibility
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
