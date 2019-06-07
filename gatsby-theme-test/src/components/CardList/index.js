import React from "react";
import PostCard from "../PostCard";
import { Wrapper, Container, List, Item } from "./styles";

const itemSize = index => {
  if (index % 6 === 0) {
    return "large";
  }
  if (index % 6 === 4 || index % 6 === 5) {
    return "medium";
  }
  return "small";
};

export default ({ posts }) => (
  <Container>
    <List>
      {posts.map((post, index) => (
        <Item key={post.node.id} size={itemSize(index)}>
          <PostCard
            {...post.node.frontmatter}
            timeToRead={post.node.timeToRead}
            size={itemSize(index)}
            excerpt={post.node.excerpt}
            image={
              post.node.frontmatter.image &&
              post.node.frontmatter.image.childImageSharp.sizes &&
              post.node.frontmatter.image.childImageSharp.sizes.src
            }
          />
        </Item>
      ))}
    </List>
  </Container>
);
