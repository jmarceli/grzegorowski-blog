import React from "react";
import {
  Wrapper,
  AvatarMobile,
  Avatar,
  BackgroundMobile,
  Background,
  NoBackground,
  Container,
  Title,
  Description,
} from "./styles";

export default function Header({
  background,
  profileImage,
  title,
  postsNumber,
  links,
  description,
  children,
  withTopBar = false,
  banner = false,
  isAmp = false,
}) {
  // position: "absolute" is required because of gatsby-image
  return (
    <Wrapper withTopBar={withTopBar} white={banner} large={banner}>
      {background ? (
        isAmp ? (
          <BackgroundMobile>
            <amp-img
              class="cover"
              src={background.src}
              srcSet={background.srcSet}
              sizes={background.sizes}
              layout="fill"
            />
          </BackgroundMobile>
        ) : (
          <Background
            fluid={background}
            objectFit="cover"
            objectPosition="50% 50%"
            alt="Title"
            style={{ position: "absolute" }}
          />
        )
      ) : (
        <NoBackground white={banner} />
      )}
      <Container>
        {profileImage &&
          (isAmp ? (
            <AvatarMobile>
              <amp-img
                src={profileImage.src}
                srcSet={profileImage.srcSet}
                sizes={profileImage.sizes}
                width={100}
                alt={title}
                height={100}
                layout="fixed"
              />
            </AvatarMobile>
          ) : (
            <Avatar fixed={profileImage} alt={title} />
          ))}
        {title && <Title large={banner}>{title}</Title>}
        {description && <Description>{description}</Description>}
        {children}
      </Container>
    </Wrapper>
  );
}
