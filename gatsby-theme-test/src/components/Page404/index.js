import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import PageLayout from "../PageLayout";
import HeaderTitle from "../HeaderTitle";
import CardList from "../CardList";
import Menu from "../Menu";
import { Header, Content, LinkHomepage } from "./styles";

export default function Page404({ posts, authors }) {
  const {
    site: {
      siteMetadata: { mainMenu },
    },
  } = useStaticQuery(query);

  const postsWithAuthors = posts.map(({ node }) => {
    const author = authors.find(
      ({ node: author }) => author.slug === node.frontmatter.author,
    );
    return {
      node: {
        ...node,
        author: author && author.node,
      },
    };
  });

  return (
    <PageLayout singlePage opaque>
      <HeaderTitle title="404" description="Page not found">
        <LinkHomepage to="/">Go to the front page →</LinkHomepage>
      </HeaderTitle>
      <Content>
        <CardList posts={postsWithAuthors} allEven />
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
