import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageLayout from "../PageLayout";
import Header from "../Header";
import CardList from "../CardList";
import { Contact, Posts, Account, Content, Container } from "./styles";
import { getPostCards } from "../../utils/mappers";

export default function PageAuthor({ data, posts }) {
  const cards = getPostCards(posts, [{ node: data }]);

  return (
    <PageLayout singlePage>
      <Header
        withTopBar
        title={data.name}
        background={data.cover_image.childImageSharp.fluid}
        profileImage={data.profile_image.childImageSharp.fixed}
      >
        {posts.length && data.links && data.links.length && (
          <Contact>
            <Posts>
              <FontAwesomeIcon icon={["fas", "signal"]} size="sm" />{" "}
              {posts.length}
              posts
            </Posts>
            {data.links.map(link => (
              <Account key={link.url} href={link.url}>
                <FontAwesomeIcon icon={link.icon} size="sm" /> {link.name}
              </Account>
            ))}
          </Contact>
        )}
      </Header>
      <Content>
        <Container>
          <CardList cards={cards} allEven />
        </Container>
      </Content>
    </PageLayout>
  );
}
