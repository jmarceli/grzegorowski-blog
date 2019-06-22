import React from "react";
import { graphql } from "gatsby";
// eslint-disable-next-line no-unused-vars
import { GatsbyImageSharpFixed, GatsbyImageSharpFluid } from "gatsby-image";
import PagePost from "../components/PagePost/index";

export default ({ data }) => (
  <PagePost
    post={data.post}
    similarPosts={data.similarPosts && data.similarPosts.edges}
    authors={data.authors}
    tags={data.tags && data.tags.edges}
    tagPosts={data.tagPosts}
  />
);

export const query = graphql`
  query($slug: String, $tags: [String], $mainTag: String) {
    post: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt
      timeToRead
      rawMarkdownBody
      frontmatter {
        author
        image {
          absolutePath
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
    similarPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          draft: { ne: true }
          tags: { in: $tags }
          slug: { ne: $slug }
        }
      }
      limit: 5
    ) {
      edges {
        node {
          timeToRead
          excerpt
          frontmatter {
            title
            slug
            date
            tags
            date_created
            date_updated
            featured
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
    authors: allAuthorsYaml {
      edges {
        node {
          bio
          id
          website
          location
          avatar {
            childImageSharp {
              fixed(width: 60, height: 60) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
    tags: allTagsYaml(filter: { name: { in: $tags } }) {
      edges {
        node {
          id
          name
          image
        }
      }
    }
    tagPosts: allMarkdownRemark(
      filter: {
        frontmatter: {
          draft: { ne: true }
          tags: { in: [$mainTag] }
          slug: { ne: $slug }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 4
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            date
            featured
          }
        }
      }
      totalCount
    }
  }
`;
