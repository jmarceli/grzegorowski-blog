import React from "react";
import PageHome from "../components/PageHome";
import { graphql } from "gatsby";

export default ({ data }) => <PageHome data={data} />;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
      edges {
        node {
          id
          html
          rawMarkdownBody
          frontmatter {
            title
            excerpt
            slug
            date
          }
        }
      }
    }
  }
`;
