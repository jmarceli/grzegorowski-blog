import React from "react";
import {
  Wrapper,
  Scroller,
  Container,
  List,
  Item,
  Link,
  ExternalLink,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Menu({ className, items, socialMedia }) {
  return (
    <Wrapper className={className}>
      <Scroller>
        <Container>
          {items && items.length && (
            <List>
              {items.map(item => (
                <Item key={item.label}>
                  <Link to={item.slug}>{item.label}</Link>
                </Item>
              ))}
            </List>
          )}
          {socialMedia && socialMedia.length && (
            <List>
              {socialMedia.map(social => (
                <Item key={social.name}>
                  <ExternalLink href={social.url}>
                    <FontAwesomeIcon icon={social.icon} size="sm" />
                  </ExternalLink>
                </Item>
              ))}
            </List>
          )}
        </Container>
      </Scroller>
    </Wrapper>
  );
}
