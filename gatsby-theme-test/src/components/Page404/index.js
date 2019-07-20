import React from "react";
import PageLayout from "../PageLayout";
import Header from "../Header";
import CardList from "../CardList";
import { Content, LinkHomepage } from "./styles";
import { getPostCards } from "../../utils/mappers";

export default function Page404({ posts, authors }) {
  const cards = getPostCards(posts, authors);

  return (
    <PageLayout singlePage opaque>
      <Header banner title="404" description="Page not found">
        <LinkHomepage to="/">Go to the front page →</LinkHomepage>
      </Header>
      <Content>
        <CardList cards={cards} allEven />
      </Content>
    </PageLayout>
  );
}
