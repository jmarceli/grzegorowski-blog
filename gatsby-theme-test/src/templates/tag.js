import React from "react";
import { graphql } from "gatsby";
// eslint-disable-next-line no-unused-vars
import { GatsbyImageSharpFixed, GatsbyImageSharpFluid } from "gatsby-image";
import PageWithList from "../components/PageWithList";
import { getPostCards } from "../utils/mappers";
import { AmpContext } from "../utils/ampContext";

export default ({ data, pageContext }) => {
  const ampContext = React.useContext(AmpContext);
  ampContext.setIsAmp(pageContext.isAmp);

  if (!pageContext.tag_slug) {
    const allTags = data.tags.edges.map(({ node }) => ({
      id: node.id,
      slug: `tag/${node.slug}`,
      title: node.name,
      image:
        node && node.feature_image && node.feature_image.childImageSharp.fluid,
      excerpt: node.description,
    }));

    return (
      <PageWithList
        main={{ title: "All tags", description: "List of all tags" }}
        cardList={allTags}
      />
    );
  }

  const cards = getPostCards(data.posts.edges, data.authors.edges);

  return (
    <PageWithList
      cardList={cards}
      main={{
        image:
          data.tag.feature_image &&
          data.tag.feature_image.childImageSharp.fluid,
        title: data.tag.name,
        description: data.tag.description,
      }}
      authors={data.authors.edges}
    />
  );
};

export const query = graphql`
  query($tag_slug: String) {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date_created], order: DESC }
      filter: {
        frontmatter: { draft: { ne: true }, tags: { in: [$tag_slug] } }
      }
    ) {
      edges {
        node {
          id
          html
          timeToRead
          rawMarkdownBody
          excerpt
          frontmatter {
            title
            slug
            date
            tags
            date_created
            date_updated
            author
            feature_image {
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
    tag: tagsYaml(slug: { eq: $tag_slug }) {
      id
      name
      description
      feature_image {
        absolutePath
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      meta_description
      meta_title
      created_at
      updated_at
      visibility
    }
    tags: allTagsYaml {
      edges {
        node {
          id
          slug
          name
          description
          meta_title
          meta_description
          created_at
          feature_image {
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
