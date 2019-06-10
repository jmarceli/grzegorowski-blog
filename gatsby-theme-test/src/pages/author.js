import React from "react";
import { graphql } from "gatsby";

export default ({ data }) => (
  <pre>{JSON.stringify(data.allAuthorsYaml.edges, " ", 2)}</pre>
);

export const query = graphql`
  query {
    allAuthorsYaml(sort: { fields: [id], order: DESC }) {
      edges {
        node {
          id
          bio
          location
          website
          profile_image
          avatar {
            absolutePath
            childImageSharp {
              fluid {
                srcSet
                src
                sizes
                originalImg
                aspectRatio
              }
            }
          }
        }
      }
    }
  }
`;
