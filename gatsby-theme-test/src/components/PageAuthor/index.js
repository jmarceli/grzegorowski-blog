import React from "react";
import PageLayout from "../PageLayout";
import HeaderAuthor from "../HeaderAuthor";
import CardList from "../CardList";
import { Content, Container } from "./styles";
import { getPostCards } from "../../utils/mappers";

export default function PageAuthor({ data, posts }) {
  const cards = getPostCards(posts, [{ node: data }]);

  return (
    <PageLayout singlePage>
      <HeaderAuthor
        title={data.name}
        background={data.cover_image.childImageSharp.fluid}
        profileImage={data.profile_image.childImageSharp.fixed}
        postsNumber={posts.length}
        links={data.links}
      />
      <Content>
        <Container>
          <CardList cards={cards} allEven />
        </Container>
      </Content>
    </PageLayout>
  );
}
