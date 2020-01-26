import React from "react";
import { useStaticQuery, graphql } from "gatsby";
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

export default function Menu({ className }) {
  const {
    site: {
      siteMetadata: { mainMenu: items, socialMedia },
    },
  } = useStaticQuery(query);

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
                  <ExternalLink
                    href={social.url}
                    target="_blank"
                    rel="noopener"
                  >
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

const query = graphql`
  {
    site {
      siteMetadata {
        title
        mainMenu {
          label
          slug
        }
        socialMedia {
          name
          url
          icon
        }
      }
    }
  }
`;
