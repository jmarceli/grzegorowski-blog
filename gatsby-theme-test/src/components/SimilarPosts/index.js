import React from "react";
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
  return (
    <Wrapper>
      <Container>
        <List>
          {tagPosts.edges.length > 0 && (
            <Item key="tag-summary">
              <CardSummary
                siteName={siteName}
                title={tag.name}
                slug={tag.id}
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
                  node.frontmatter.image &&
                  node.frontmatter.image.childImageSharp.fluid
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
