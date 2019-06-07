import React from "react";
import { graphql } from "gatsby";

export default ({ data }) => (
  <pre>{JSON.stringify(data.allTagsYaml.edges, " ", 2)}</pre>
);

export const query = graphql`
  query {
    allTagsYaml(sort: { fields: [id], order: DESC }) {
      edges {
        node {
          id
          name
          description
          meta_title
          meta_description
          created_at
          image
        }
      }
    }
  }
`;
