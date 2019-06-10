import React from "react";
import { Wrapper, Container, Photo, Info, Name, About, More } from "./styles";

export default function Author({ author }) {
  return (
    <Wrapper>
      <Container
        to={"/author/" + author.id}
        title={`Read more posts by ${author.id}`}
      >
        <Photo fixed={author.avatar.childImageSharp.fixed} />
        <Info>
          <Name>{author.id}</Name>
          <About>{author.bio}</About>
        </Info>
      </Container>
      <More
        to={"/author/" + author.id}
        title={`Read more posts by ${author.id}`}
      >
        Read More
      </More>
    </Wrapper>
  );
}
