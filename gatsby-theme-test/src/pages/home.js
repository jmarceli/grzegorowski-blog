import React from "react";
import PageHome from "../components/PageHome";
import { graphql } from "gatsby";

export default ({ data }) => <PageHome data={data} />;

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date_created], order: DESC }
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
                fluid {
                  aspectRatio
                  srcSet
                  src
                  sizes
                  originalImg
                }
              }
            }
          }
        }
      }
    }
  }
`;
