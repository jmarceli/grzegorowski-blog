import React from "react";
import { Wrapper, Scroller, Container, List, Item, Link } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Menu({ className, items }) {
  return (
    <Wrapper className={className}>
      <Scroller>
        <Container>
          <List>
            {items.map(item => (
              <Item key={item.label}>
                <Link to={"/" + item.slug}>{item.label}</Link>
              </Item>
            ))}
          </List>
          <List>
            <Item>
              <Link to="https://facebook.com">
                <FontAwesomeIcon
                  icon={["fab", "facebook-f"]}
                  size="sm"
                />
              </Link>
            </Item>
            <Item>
              <Link to="https://twitter.com">
                <FontAwesomeIcon
                  icon={["fab", "twitter"]}
                  size="sm"
                />
              </Link>
            </Item>
          </List>
        </Container>
      </Scroller>
    </Wrapper>
  );
}
