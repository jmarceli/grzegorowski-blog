import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import {
  Placeholder,
  Wrapper,
  Container,
  Name,
  InnerName,
  MainMenu,
} from "./styles";

export default function TopBar({ opaque }) {
  const {
    site: { siteMetadata },
  } = useStaticQuery(query);

  return (
    <>
      {opaque && <Placeholder />}
      <Wrapper opaque={opaque}>
        <Container>
          <Name to="/">
            <InnerName>{siteMetadata.title}</InnerName>
          </Name>
          <MainMenu
            items={siteMetadata.mainMenu}
            socialMedia={siteMetadata.socialMedia}
          />
        </Container>
      </Wrapper>
    </>
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
