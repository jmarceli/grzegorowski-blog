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
              url={mainTag.url}
              posts={mainTag.posts}
              postsTotal={mainTag.postsTotal}
            />
          </Item>
          {featuredPosts.map(post => (
            <Item key={post.url}>
              <PostCard
                title={post.title}
                tag={post.tag}
                url={post.url}
                image={false}
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
