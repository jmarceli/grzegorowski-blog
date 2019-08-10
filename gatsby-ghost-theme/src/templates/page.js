import React from "react";
import { graphql } from "gatsby";
// eslint-disable-next-line no-unused-vars
import { GatsbyImageSharpFixed, GatsbyImageSharpFluid } from "gatsby-image";
import PageStatic from "../components/PageStatic/index";
import { AmpContext } from "../utils/ampContext";

export default ({ data, pageContext }) => {
  const ampContext = React.useContext(AmpContext);
  ampContext.setIsAmp(pageContext.isAmp);

  return <PageStatic post={data.post} authors={data.authors} />;
};

export const query = graphql`
  query($slug: String) {
    post: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt
      timeToRead
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
