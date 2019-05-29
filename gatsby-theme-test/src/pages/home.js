import React from "react";
import PageHome from "../components/PageHome";
import { graphql } from "gatsby";

export default ({ data }) => <PageHome data={data} />;

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          html
          rawMarkdownBody
          frontmatter {
            # Assumes you're using title in your frontmatter.
            title
            excerpt
            image
            slug
          }
        }
      }
    }
  }
`;
