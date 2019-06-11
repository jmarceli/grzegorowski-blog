import React from "react";
import CardPost from "../CardPost";
import { Container, List, Item } from "./styles";

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
        <Item key={post.id} size={itemSize(index)}>
          <CardPost
            {...post.frontmatter}
            timeToRead={post.timeToRead}
            size={itemSize(index)}
            excerpt={post.excerpt}
            image={
              post.frontmatter.image &&
              post.frontmatter.image.childImageSharp.fluid &&
              post.frontmatter.image.childImageSharp.fluid.src
            }
            tag={post.frontmatter.tags && post.frontmatter.tags[0]}
            author={post.author}
          />
        </Item>
      ))}
    </List>
  </Container>
);
