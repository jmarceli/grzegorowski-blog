import React from "react";
import { graphql } from "gatsby";
import PagePost from "../components/PagePost/index";

export default ({ data }) => (
  <PagePost
    post={data.post}
    similarPosts={data.similarPosts && data.similarPosts.edges}
    author={data.author}
    tags={data.tags && data.tags.edges}
    tagPosts={data.tagPosts}
  />
);

export const query = graphql`
  query($slug: String, $author: String, $tags: [String], $mainTag: String) {
    post: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
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
      }
    }
    similarPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: $tags }, slug: { ne: $slug } } }
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
          }
        }
      }
    }
    author: authorsYaml(id: { eq: $author }) {
      id
      profile_image
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
      filter: { frontmatter: { tags: { in: [$mainTag] }, slug: { ne: $slug } } }
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
