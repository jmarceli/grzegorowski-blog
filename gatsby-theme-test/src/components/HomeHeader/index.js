import React from "react";
import { Wrapper, Background, Container, Title, Description } from "./styles";

export default function HomeHeader({ background, title, description }) {
  return (
    <Wrapper>
      <Background
        fluid={background}
        objectFit="cover"
        objectPosition="50% 50%"
        alt="Title"
      />
      <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Container>
    </Wrapper>
  );
}
