import React from "react";
import { Wrapper, Container, Item } from "./styles";

export default function Menu({ items }) {
  return (
    <Wrapper>
      <Container>
        {items.map(item => (
          <Item key={item.label} to={item.url}>
            {item.label}
          </Item>
        ))}
      </Container>
    </Wrapper>
  );
}
