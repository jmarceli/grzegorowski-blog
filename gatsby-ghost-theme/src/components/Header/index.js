import React from "react";
import {
  Wrapper,
  Avatar,
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
}) {
  // position: "absolute" is required because of gatsby-image
  return (
    <Wrapper withTopBar={withTopBar} white={banner} large={banner}>
      {background ? (
        <Background
          fluid={background}
          objectFit="cover"
          objectPosition="50% 50%"
          alt="Title"
          style={{ position: "absolute" }}
        />
      ) : (
        <NoBackground white={banner} />
      )}
      <Container>
        {profileImage && <Avatar fixed={profileImage} alt={title} />}
        {title && <Title large={banner}>{title}</Title>}
        {description && <Description>{description}</Description>}
        {children}
      </Container>
    </Wrapper>
  );
}
