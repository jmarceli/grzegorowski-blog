import React from "react";
import Tile from "../Tile";
import {
  Content,
  TopLine,
  SiteName,
  Title,
  LinkTop,
  Link,
  List,
  Item,
} from "./styles";

export default function CardPost({ siteName, title, slug, posts, postsTotal }) {
  // all current post to a total number of posts in selected tag
  const allPostsNumber = postsTotal + 1;
  return (
    <Tile>
      <Content>
        <TopLine>
          <SiteName>{siteName}</SiteName>
          <LinkTop to={"/tag/" + slug} title={title}>
            <Title>{title}</Title>
          </LinkTop>
        </TopLine>
        {posts.length > 0 && (
          <List>
            {posts.map(({ node }) => (
              <Item key={node.frontmatter.slug}>
                <Link
                  to={"/" + node.frontmatter.slug}
                  title={node.frontmatter.title}
                >
                  {node.frontmatter.title}
                </Link>
              </Item>
            ))}
            <Item>
              <Link to={"/tag/" + slug} title={"See all"}>
                See all {allPostsNumber} posts
              </Link>
            </Item>
          </List>
        )}
      </Content>
    </Tile>
  );
}
