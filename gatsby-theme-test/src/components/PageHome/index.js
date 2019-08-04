import React from "react";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import CardList from "../CardList";
import Header from "../Header";
import PageLayout from "../PageLayout";
import Menu from "../Menu";
import { MenuWrapper, Content } from "./styles";
import { getPostCards } from "../../utils/mappers";
import { schemaWebsite } from "../../utils/seo";

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
      <Helmet
        script={schemaWebsite(
          {
            url: "https://www.grzegorowski.com",
            description: data.frontmatter.excerpt,
            headline: data.frontmatter.title,
            datePublished: data.frontmatter.date_published,
            dateModified: data.frontmatter.date_modified,
            image:
              data.frontmatter.feature_image &&
              data.frontmatter.feature_image.relativePath,
          },
          author && author.node && author.node.name,
        )}
      >
        <title>{data.frontmatter.title}</title>
      </Helmet>

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
