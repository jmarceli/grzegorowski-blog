import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import CardList from "../CardList";
import Header from "../Header";
import PageLayout from "../PageLayout";
import Menu from "../Menu";
import { MenuWrapper, Content } from "./styles";
import { getPostCards } from "../../utils/mappers";
import Seo from "../Seo";

export default function PageHome({ data, posts, authors }) {
  const {
    site: {
      siteMetadata: { mainMenu },
    },
  } = useStaticQuery(query);

  const cards = getPostCards(posts, authors);

  const author = authors.find(
    ({ node }) => node.slug === data.frontmatter.author,
  );

  return (
    <PageLayout>
      <Seo data={data} author={author} contentType="website" />

      <Header
        title={data.frontmatter.title}
        description={data.frontmatter.excerpt}
        background={
          data.frontmatter.feature_image &&
          data.frontmatter.feature_image.childImageSharp &&
          data.frontmatter.feature_image.childImageSharp.fluid
        }
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
