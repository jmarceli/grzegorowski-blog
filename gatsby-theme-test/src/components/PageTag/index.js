import React from "react";
import CardList from "../CardList";
import HomeHeader from "../HomeHeader";
import PageLayout from "../PageLayout";
import Menu from "../Menu";
import { Header, Content } from "./styles";

export default function PageTag({ posts, tag, authors }) {
  const postsWithAuthors = posts.map(({ node }) => {
    const author = authors.find(
      ({ node: author }) => author.id === node.frontmatter.author,
    );
    return {
      ...node,
      author: author && author.node,
    };
  });
  console.log(posts, authors, postsWithAuthors);

  return (
    <PageLayout singlePage>
      <HomeHeader title={tag.name} description={tag.description} />
      <Content>
        <CardList posts={postsWithAuthors} allEven />
      </Content>
    </PageLayout>
  );
}
