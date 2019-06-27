import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Wrapper,
  Avatar,
  Background,
  Container,
  Title,
  Contact,
  Posts,
  Account,
} from "./styles";

export default function HeaderAuthor({
  background,
  avatar,
  title,
  postsNumber,
  links,
}) {
  return (
    <Wrapper>
      <Background
        fluid={background}
        objectFit="cover"
        objectPosition="50% 50%"
        alt="Title"
      />
      <Container>
        <Avatar fixed={avatar} alt={title} />
        <Title>{title}</Title>
        <Contact>
          <Posts>
            <FontAwesomeIcon icon={["fas", "signal"]} size="sm" /> {postsNumber}
            posts
          </Posts>
          {links.map(link => (
            <Account key={link.url} href={link.url}>
              <FontAwesomeIcon icon={link.icon} size="sm" /> {link.name}
            </Account>
          ))}
        </Contact>
      </Container>
    </Wrapper>
  );
}
