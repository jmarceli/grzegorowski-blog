import React from "react";
import CardList from "../CardList";
import Header from "../Header";
import PageLayout from "../PageLayout";
import { Content } from "./styles";
import Seo from "../Seo";

export default function PageWithList({ main, cardList }) {
  return (
    <PageLayout singlePage>
      <Seo
        data={{ frontmatter: { title: main.title, excerpt: main.description } }}
        contentType="website"
      />

      <Header
        background={main.image}
        title={main.title}
        description={main.description}
      />
      <Content>
        <CardList cards={cardList} allEven />
      </Content>
    </PageLayout>
  );
}
