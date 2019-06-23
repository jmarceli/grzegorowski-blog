import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Wrapper,
  Avatar,
  Background,
  Container,
  Title,
  Contact,
  Email,
  Accounts,
  Account,
} from "./styles";

export default function HeaderAuthor({
  background,
  avatar,
  title,
  postsNumber,
  email,
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
          <div>
            <FontAwesomeIcon icon={["fas", "signal"]} size="sm" /> {postsNumber}
            posts
          </div>
          <Email href={`mailto: ${email}`}>
            <FontAwesomeIcon icon={["far", "envelope"]} size="sm" /> show email
            address
          </Email>
        </Contact>
        <Accounts>
          <Account href="https://stackoverflow.com">
            <FontAwesomeIcon icon={["fab", "stack-overflow"]} size="sm" /> Stack
            Overflow
          </Account>
          <Account href="https://github.com">
            <FontAwesomeIcon icon={["fab", "github"]} size="sm" /> Github
          </Account>
        </Accounts>
      </Container>
    </Wrapper>
  );
}
