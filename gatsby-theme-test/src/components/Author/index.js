import React from "react";
import { Wrapper, Container, Photo, Info, Name, About, More } from "./styles";

export default function Author({ author }) {
  return (
    <Wrapper>
      <Container
        to={"/author/" + author.slug}
        title={`Read more posts by ${author.name}`}
      >
        <Photo fixed={author.cover_image.childImageSharp.fixed} />
        <Info>
          <Name>{author.name}</Name>
          <About>{author.bio}</About>
        </Info>
      </Container>
      <More
        to={"/author/" + author.slug}
        title={`Read more posts by ${author.name}`}
      >
        Read More
      </More>
    </Wrapper>
  );
}
