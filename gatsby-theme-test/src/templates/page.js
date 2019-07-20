import React from "react";
import { graphql } from "gatsby";
// eslint-disable-next-line no-unused-vars
import { GatsbyImageSharpFixed, GatsbyImageSharpFluid } from "gatsby-image";
import PageStatic from "../components/PageStatic/index";

export default ({ data }) => (
  <PageStatic post={data.post} authors={data.authors} />
);

export const query = graphql`
  query($slug: String) {
    post: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt
      timeToRead
      rawMarkdownBody
      frontmatter {
        author
        feature_image {
          absolutePath
          relativePath
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
        slug
        date
        tags
        date_created
        date_updated
        featured
      }
    }
    authors: allAuthorsYaml {
      edges {
        node {
          id
          slug
          bio
          name
          website
          location
          profile_image {
            childImageSharp {
              fixed(width: 60, height: 60) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`;
