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

export default function TopBar() {
  const {
    site: { siteMetadata },
  } = useStaticQuery(query);

  return (
    <>
      <Placeholder />
      <Wrapper>
        <Container>
          <Name to="/">
            <InnerName>{siteMetadata.title}</InnerName>
          </Name>
          <MainMenu items={siteMetadata.mainMenu} />
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
      }
    }
  }
`;
