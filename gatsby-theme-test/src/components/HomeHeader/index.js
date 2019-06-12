import React from "react";
import { Wrapper, Container, Title, Description } from "./styles";

export default function HomeHeader({ title, description }) {
  return (
    <Wrapper>
      <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Container>
    </Wrapper>
  );
}
