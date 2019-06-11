import React from "react";
import CardList from "../CardList";
import HomeHeader from "../HomeHeader";
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
    <div>
      <HomeHeader />
      <Content>
        <Header>
          <Menu items={menuItems} />
        </Header>
        <CardList posts={postsWithAuthors} />
      </Content>
    </div>
  );
};
