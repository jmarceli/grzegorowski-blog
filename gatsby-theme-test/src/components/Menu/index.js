import React from "react";
import { Wrapper, Scroller, Container, Item } from "./styles";

export default function Menu({ className, items }) {
  return (
    <Wrapper className={className}>
      <Scroller>
        <Container>
          {items.map(item => (
            <Item key={item.label} to={item.url}>
              {item.label}
            </Item>
          ))}
        </Container>
      </Scroller>
    </Wrapper>
  );
}
