import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Wrapper, Container, Name } from "./styles";

export default function Footer() {
  const {
    site: { siteMetadata },
  } = useStaticQuery(query);

  return (
    <Wrapper>
      <Container>
        <Name to="/">{siteMetadata.copyrights} © 2019</Name>
      </Container>
    </Wrapper>
  );
}

const query = graphql`
  {
    site {
      siteMetadata {
        copyrights
      }
    }
  }
`;
