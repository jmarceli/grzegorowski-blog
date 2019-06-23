import React from "react";
import {
  Wrapper,
  Background,
  NoBackground,
  Container,
  Title,
  Description,
} from "./styles";

export default function HomeHeader({ background, title, description }) {
  return (
    <Wrapper>
      {background ? (
        <Background
          fluid={background}
          objectFit="cover"
          objectPosition="50% 50%"
          alt="Title"
        />
      ) : (
        <NoBackground />
      )}
      <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Container>
    </Wrapper>
  );
}
