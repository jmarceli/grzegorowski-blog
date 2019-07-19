import React from "react";
import CardList from "../CardList";
import HomeHeader from "../HomeHeader";
import PageLayout from "../PageLayout";
import { Content } from "./styles";

export default function PageWithList({ main, cardList }) {
  return (
    <PageLayout singlePage>
      <HomeHeader
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
