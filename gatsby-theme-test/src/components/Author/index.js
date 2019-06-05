import React from "react";
import { Wrapper, Container, Photo, Info, Name, About } from "./styles";

export default function TopBar() {
  const author = "Author Name";
  const about = "A few words about author";
  return (
    <Wrapper>
      <Container>
        <Photo />
        <Info>
          <Name>{author}</Name>
          <About>{about}</About>
        </Info>
      </Container>
    </Wrapper>
  );
}
