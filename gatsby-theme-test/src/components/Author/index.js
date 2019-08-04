import React from "react";
import { AmpContext } from "../../utils/ampContext";
import { Wrapper, Container, Photo, Info, Name, About, More } from "./styles";

export default function Author({ slug, name, image, bio }) {
  const ampContext = React.useContext(AmpContext);

  return (
    <Wrapper>
      <Container to={"/author/" + slug} title={`Read more posts by ${name}`}>
        {ampContext.isAmp ? (
          <amp-img
            src={image.src}
            srcSet={image.srcSet}
            alt={name}
            width={image.width}
            height={image.height}
            layout="fixed"
          />
        ) : (
          <Photo fixed={image} />
        )}
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
