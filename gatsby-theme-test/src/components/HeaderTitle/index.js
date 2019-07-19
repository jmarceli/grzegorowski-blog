import React from "react";
import {
  Wrapper,
  Background,
  NoBackground,
  Container,
  Title,
  Description,
} from "./styles";

export default function HeaderTitle({
  background,
  title,
  description,
  children,
}) {
  return (
    <Wrapper>
      <NoBackground />
      <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
        {children}
      </Container>
    </Wrapper>
  );
}
