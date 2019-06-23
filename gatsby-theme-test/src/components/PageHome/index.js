import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import CardList from "../CardList";
import HomeHeader from "../HomeHeader";
import PageLayout from "../PageLayout";
import Menu from "../Menu";
import { Header, Content } from "./styles";

export default function PageHome({ data, posts, authors }) {
  const {
    site: {
      siteMetadata: { mainMenu },
    },
  } = useStaticQuery(query);

  const postsWithAuthors = posts.map(({ node }) => {
    const author = authors.find(
      ({ node: author }) => author.id === node.frontmatter.author,
    );
    return {
      node: {
        ...node,
        author: author && author.node,
      },
    };
  });

  return (
    <PageLayout>
      <HomeHeader
        title={data.frontmatter.title}
        description={data.frontmatter.excerpt}
        background={data.frontmatter.image.childImageSharp.fluid}
      />
      <Content>
        <Header>
          <Menu items={mainMenu} />
        </Header>
        <CardList posts={postsWithAuthors} />
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
