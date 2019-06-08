import React from "react";
import PostCard from "../PostCard";
import SummaryCard from "../SummaryCard";
import { Wrapper, Container, List, Item } from "./styles";

// TODO: seo similar
export default function SimilarPosts({ siteName, mainTag, featuredPosts }) {
  return (
    <Wrapper>
      <Container>
        <List>
          <Item key="tag-summary">
            <SummaryCard
              siteName={siteName}
              title={mainTag.label}
              slug={mainTag.slug}
              posts={mainTag.posts}
              postsTotal={mainTag.postsTotal}
            />
          </Item>
          {featuredPosts.map(post => (
            <Item key={post.slug}>
              <PostCard
                title={post.title}
                tag={post.tag}
                slug={post.slug}
                image={false}
                timeToRead={post.timeToRead}
              >
                {post.excerpt}
              </PostCard>
            </Item>
          ))}
        </List>
      </Container>
    </Wrapper>
  );
}
