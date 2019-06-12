import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Wrapper, Container, Title, Description } from "./styles";

export default function HomeHeader() {
  const {
    site: { siteMetadata },
  } = useStaticQuery(query);

  return (
    <Wrapper>
      <Container>
        <Title>{siteMetadata.title}</Title>
        <Description>{siteMetadata.description}</Description>
      </Container>
    </Wrapper>
  );
}

const query = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
