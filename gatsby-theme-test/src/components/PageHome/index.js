import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import CardList from "../CardList";
import Header from "../Header";
import PageLayout from "../PageLayout";
import Menu from "../Menu";
import { MenuWrapper, Content } from "./styles";
import { getPostCards } from "../../utils/mappers";

export default function PageHome({ data, posts, authors }) {
  const {
    site: {
      siteMetadata: { mainMenu },
    },
  } = useStaticQuery(query);

  const cards = getPostCards(posts, authors);

  return (
    <PageLayout>
      <Header
        title={data.frontmatter.title}
        description={data.frontmatter.excerpt}
        background={data.frontmatter.feature_image.childImageSharp.fluid}
      />
      <Content>
        <MenuWrapper>
          <Menu items={mainMenu} />
        </MenuWrapper>
        <CardList cards={cards} />
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
