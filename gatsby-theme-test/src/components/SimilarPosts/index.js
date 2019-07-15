import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import CardPost from "../CardPost";
import CardSummary from "../CardSummary";
import { Wrapper, Container, List, Item } from "./styles";

// TODO: seo similar
export default function SimilarPosts({
  siteName,
  tag,
  tagPosts,
  similarPosts,
}) {
  const {
    site: { siteMetadata },
  } = useStaticQuery(query);

  return (
    <Wrapper>
      <Container>
        <List>
          {tagPosts.edges.length > 0 && (
            <Item key="tag-summary">
              <CardSummary
                siteName={siteMetadata.title}
                title={tag.name}
                slug={tag.slug}
                posts={tagPosts.edges}
                postsTotal={tagPosts.totalCount}
              />
            </Item>
          )}
          {similarPosts.map(({ node }) => (
            <Item key={node.frontmatter.slug}>
              <CardPost
                title={node.frontmatter.title}
                tag={node.frontmatter.tags && node.frontmatter.tags[0]}
                slug={node.frontmatter.slug}
                image={
                  node.frontmatter.feature_image &&
                  node.frontmatter.feature_image.childImageSharp.fluid
                }
                timeToRead={node.timeToRead}
                excerpt={node.excerpt}
              />
            </Item>
          ))}
        </List>
      </Container>
    </Wrapper>
  );
}

const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
