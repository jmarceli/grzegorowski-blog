import React from "react";
import CardList from "../CardList";
import Header from "../Header";
import PageLayout from "../PageLayout";
import Menu from "../Menu";
import { MenuWrapper, Content, ButtonWrapper, ButtonMore } from "./styles";
import { getPostCards } from "../../utils/mappers";
import Seo from "../Seo";

export default function PageHome({ data, posts, authors, isAmp = false }) {
  const cards = getPostCards(posts, authors);

  const author = authors.find(
    ({ node }) => node.slug === data.frontmatter.author,
  );

  return (
    <PageLayout>
      <Seo data={data} author={author} contentType="website" isAmp={isAmp} />

      <Header
        title={data.frontmatter.title}
        description={data.frontmatter.excerpt}
        background={
          data.frontmatter.feature_image &&
          data.frontmatter.feature_image.childImageSharp &&
          data.frontmatter.feature_image.childImageSharp.fluid
        }
        isAmp={isAmp}
      />
      <Content>
        <MenuWrapper>
          <Menu />
        </MenuWrapper>
        <CardList cards={cards} />
        <ButtonWrapper>
          <ButtonMore to="/archive" title="Show all posts">
            View All Posts
          </ButtonMore>
        </ButtonWrapper>
      </Content>
    </PageLayout>
  );
}
