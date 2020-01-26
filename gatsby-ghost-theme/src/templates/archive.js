import React from "react";
import PageWithList from "../components/PageWithList";
// eslint-disable-next-line no-unused-vars
import { GatsbyImageSharpFixed, GatsbyImageSharpFluid } from "gatsby-image";
import { graphql } from "gatsby";
import { AmpContext } from "../utils/ampContext";
import { getPostCards } from "../utils/mappers";

export default ({ data, pageContext }) => {
  const ampContext = React.useContext(AmpContext);
  ampContext.setIsAmp(pageContext.isAmp);

  const cards = getPostCards(data.posts.edges, data.authors.edges);
  return (
    <PageWithList
      main={{ title: "Archive", description: "List of all posts" }}
      cardList={cards}
    />
  );
};

export const query = graphql`
  query($slug: String) {
    page: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
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
        excerpt
        slug
        tags
        date_created
        date_updated
        featured
      }
    }
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date_created], order: DESC }
      filter: {
        frontmatter: { draft: { ne: true }, layout: { nin: ["page", "home"] } }
      }
    ) {
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
            slug
            tags
            date_created
            date_updated
            author
            feature_image {
              absolutePath
              relativePath
              childImageSharp {
                fluid(maxWidth: 600, maxHeight: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    authors: allAuthorsYaml {
      edges {
        node {
          id
          slug
          name
          bio
          website
          location
          profile_image {
            relativePath
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
