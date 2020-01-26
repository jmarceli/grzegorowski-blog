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

export default ({ cards, allEven }) => (
  <Container>
    <List>
      {cards.map((card, index) => (
        <Item
          key={card.id}
          size={itemSize(index, allEven)}
          featured={!allEven && index === 0}
        >
          <CardPost
            title={card.title}
            slug={card.slug}
            timeToRead={card.timeToRead}
            size={itemSize(index, allEven)}
            excerpt={card.excerpt}
            image={card.image}
            tag={card.tag}
            author={card.author}
            dateCreated={card.dateCreated}
          />
        </Item>
      ))}
    </List>
  </Container>
);
