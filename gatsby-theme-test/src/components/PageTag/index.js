import React from "react";
import CardList from "../CardList";
import HomeHeader from "../HomeHeader";
import PageLayout from "../PageLayout";
import { Content } from "./styles";

export default function PageTag({ posts, tag, authors }) {
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
    <PageLayout singlePage>
      <HomeHeader
        background={tag.image && tag.image.childImageSharp.fluid}
        title={tag.name}
        description={tag.description}
      />
      <Content>
        <CardList posts={postsWithAuthors} allEven />
      </Content>
    </PageLayout>
  );
}
