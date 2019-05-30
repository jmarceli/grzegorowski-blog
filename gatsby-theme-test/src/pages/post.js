import React from "react";
import { graphql } from "gatsby";
import PagePost from "../components/PagePost/index";

export default ({ data }) => <PagePost data={data.markdownRemark} />;

export const query = graphql`
  query($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt
      timeToRead
      rawMarkdownBody
      frontmatter {
        image {
          absolutePath
          childImageSharp {
            sizes {
              srcSet
              src
              sizes
              originalImg
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
        author
      }
    }
  }
`;
