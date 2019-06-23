import React from "react";
import SeoPost from "./seo";
import PageLayout from "../PageLayout";
import HeaderAuthor from "../HeaderAuthor";
import CardList from "../CardList";
import Author from "../Author";
import {
  Wrapper,
  Header,
  HeaderContent,
  Title,
  TopImage,
  HeaderImage,
  Main,
  Container,
  Content,
} from "./styles";

export default function PageAuthor({ data, posts }) {
  return (
    <PageLayout singlePage>
      <HeaderAuthor
        title={data.name}
        background={data.profile_image.childImageSharp.fluid}
        avatar={data.avatar.childImageSharp.fixed}
        postsNumber={posts.length}
        email={data.email}
      />
      <Content>
        <CardList posts={posts} allEven />
      </Content>
    </PageLayout>
  );
}
