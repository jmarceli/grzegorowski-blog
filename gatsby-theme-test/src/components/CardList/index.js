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
      {posts.map((edge, index) => (
        <Item key={edge.node.id} size={itemSize(index)}>
          <PostCard
            {...edge.node.frontmatter}
            timeToRead={edge.node.timeToRead}
            size={itemSize(index)}
          />
        </Item>
      ))}
    </List>
  </Container>
);
