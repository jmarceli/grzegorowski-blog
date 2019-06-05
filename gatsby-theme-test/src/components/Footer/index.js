import React from "react";
import { Wrapper, Container, Name } from "./styles";
import Menu from "../Menu";

export default function Footer() {
  return (
    <Wrapper>
      <Container>
        <Name to="/">Site name © 2019</Name>
      </Container>
    </Wrapper>
  );
}
