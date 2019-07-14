import React from "react";
import PageLayout from "../PageLayout";
import HeaderAuthor from "../HeaderAuthor";
import CardList from "../CardList";
import { Content, Container } from "./styles";

export default function PageAuthor({ data, posts }) {
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
          <CardList posts={posts} allEven />
        </Container>
      </Content>
    </PageLayout>
  );
}
