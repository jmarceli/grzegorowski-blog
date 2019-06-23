import React from "react";
import CardPost from "../CardPost";
import { Container, List, Item } from "./styles";

// TODO: support CardPost layout for PageTag
const itemSize = (index, even = false) => {
  if (!even) {
    if (index % 6 === 0) {
      return "large";
    }
    if (index % 6 === 4 || index % 6 === 5) {
      return "medium";
    }
  }
  return "small";
};

export default ({ posts, allEven }) => (
  <Container>
    <List>
      {posts.map(({ node }, index) => (
        <Item
          key={node.id}
          size={itemSize(index, allEven)}
          featured={!allEven && index === 0}
        >
          <CardPost
            {...node.frontmatter}
            timeToRead={node.timeToRead}
            size={itemSize(index, allEven)}
            excerpt={node.excerpt}
            image={
              node.frontmatter.image &&
              node.frontmatter.image.childImageSharp.fluid
            }
            tag={node.frontmatter.tags && node.frontmatter.tags[0]}
            author={node.author}
          />
        </Item>
      ))}
    </List>
  </Container>
);
