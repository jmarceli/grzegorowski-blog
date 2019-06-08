import React from "react";
import { Wrapper, Scroller, Container, List, Item } from "./styles";

export default function Menu({ className, items }) {
  return (
    <Wrapper className={className}>
      <Scroller>
        <Container>
          <List>
            {items.map(item => (
              <Item key={item.label} to={"/" + item.slug}>
                {item.label}
              </Item>
            ))}
          </List>
          <List>
            <Item to="https://facebook.com">f</Item>
            <Item to="https://twitter.com">t</Item>
            <Item to="https://google.com">r</Item>
          </List>
        </Container>
      </Scroller>
    </Wrapper>
  );
}
