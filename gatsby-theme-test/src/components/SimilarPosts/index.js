import React from "react";
import PostCard from "../PostCard";
import SummaryCard from "../SummaryCard";
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
          <Item key="tag-summary">
            <SummaryCard
              siteName={siteName}
              title={tag.name}
              slug={tag.id}
              posts={tagPosts.edges}
              postsTotal={tagPosts.totalCount}
            />
          </Item>
          {similarPosts.map(({ node }) => (
            <Item key={node.frontmatter.slug}>
              <PostCard
                title={node.frontmatter.title}
                tag={node.frontmatter.tags && node.frontmatter.tags[0]}
                slug={node.frontmatter.slug}
                image={
                  node.frontmatter.image &&
                  node.frontmatter.image.childImageSharp.sizes.src
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
