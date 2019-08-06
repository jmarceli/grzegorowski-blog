import React from "react";
import Img from "gatsby-image";
import { AmpContext } from "../../utils/ampContext";
import { Wrapper, Container, Photo, Info, Name, About, More } from "./styles";

export default function Author({ slug, name, image, bio }) {
  const ampContext = React.useContext(AmpContext);

  return (
    <Wrapper>
      <Container to={"/author/" + slug} title={`Read more posts by ${name}`}>
        <Photo>
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
            <Img fixed={image} />
          )}
        </Photo>
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
