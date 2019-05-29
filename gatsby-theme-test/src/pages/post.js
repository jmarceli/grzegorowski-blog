import React from "react";
import { graphql } from "gatsby";
import PagePost from "../components/PagePost";

export default ({ data }) => <PagePost data={data.markdownRemark} />;

export const query = graphql`
  query($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt
      timeToRead
      frontmatter {
        title
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
