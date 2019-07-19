import React from "react";
import { Wrapper, Container, Photo, Info, Name, About, More } from "./styles";

export default function Author({ slug, name, image, bio }) {
  return (
    <Wrapper>
      <Container to={"/author/" + slug} title={`Read more posts by ${name}`}>
        <Photo fixed={image} />
        <Info>
          <Name>{name}</Name>
          <About>{bio}</About>
        </Info>
      </Container>
      <More to={"/author/" + slug} title={`Read more posts by ${name}`}>
        Read More
      </More>
    </Wrapper>
  );
}
