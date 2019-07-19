import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import PageLayout from "../PageLayout";
import Header from "../Header";
import CardList from "../CardList";
import Menu from "../Menu";
import { Content, LinkHomepage } from "./styles";
import { getPostCards } from "../../utils/mappers";

export default function Page404({ posts, authors }) {
  const {
    site: {
      siteMetadata: { mainMenu },
    },
  } = useStaticQuery(query);

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

const query = graphql`
  {
    site {
      siteMetadata {
        mainMenu {
          label
          slug
        }
      }
    }
  }
`;
