import React from "react";
import { graphql } from "gatsby";
import PageAuthor from "../components/PageAuthor";
import PageWithList from "../components/PageWithList";
// eslint-disable-next-line no-unused-vars
import { GatsbyImageSharpFixed, GatsbyImageSharpFluid } from "gatsby-image";
import { AmpContext } from "../utils/ampContext";

export default ({ data, pageContext }) => {
  const ampContext = React.useContext(AmpContext);
  ampContext.setIsAmp(pageContext.isAmp);

  if (!pageContext.author_slug) {
    const allAuthors = data.authors.edges.map(({ node }) => ({
      id: node.id,
      slug: `author/${node.slug}`,
      title: node.name,
      image: node && node.cover_image && node.cover_image.childImageSharp.fluid,
      excerpt: node.bio,
    }));

    return (
      <PageWithList
        main={{ title: "All authors", description: "List of all authors" }}
        cardList={allAuthors}
        isAmp={pageContext.isAmp}
      />
    );
  }

  return (
    <PageAuthor
      data={data.author}
      posts={data.posts.edges}
      isAmp={pageContext.isAmp}
    />
  );
};

export const query = graphql`
  query($author_slug: String) {
    author: authorsYaml(slug: { eq: $author_slug }) {
      id
      slug
      name
      bio
      location
      links {
        name
        url
        icon
      }
      cover_image {
        absolutePath
        relativePath
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      profile_image_large: profile_image {
        absolutePath
        relativePath
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      profile_image {
        absolutePath
        relativePath
        childImageSharp {
          fixed(width: 30, height: 30) {
            ...GatsbyImageSharpFixed
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
          cover_image {
            relativePath
            absolutePath
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date_created], order: DESC }
      filter: {
        frontmatter: {
          layout: { eq: "post" }
          draft: { ne: true }
          author: { eq: $author_slug }
        }
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
              relativePath
              absolutePath
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
