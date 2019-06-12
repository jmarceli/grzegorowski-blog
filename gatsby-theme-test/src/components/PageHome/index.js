import React from "react";
import CardList from "../CardList";
import HomeHeader from "../HomeHeader";
import PageLayout from "../PageLayout";
import Menu from "../Menu";
import { Header, Content } from "./styles";

const menuItems = [
  { label: "Home", slug: "/" },
  { label: "Contact", slug: "/contact" },
  { label: "Cookies", slug: "/cookies" },
];

export default ({ posts, authors }) => {
  const postsWithAuthors = posts.map(({ node }) => {
    const author = authors.find(
      ({ node: author }) => author.id === node.frontmatter.author,
    );
    return {
      ...node,
      author: author && author.node,
    };
  });

  return (
    <PageLayout>
      <HomeHeader />
      <Content>
        <Header>
          <Menu items={menuItems} />
        </Header>
        <CardList posts={postsWithAuthors} />
      </Content>
    </PageLayout>
  );
};
