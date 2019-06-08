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

export default function PostCard({ siteName, title, slug, posts, postsTotal }) {
  return (
    <Tile>
      <Content>
        <TopLine>
          <SiteName>{siteName}</SiteName>
          <LinkTop to={"/" + slug} title={title}>
            <Title>{title}</Title>
          </LinkTop>
        </TopLine>
        {posts.length > 0 && (
          <List>
            {posts.map(post => (
              <Item key={post.slug}>
                <Link to={"/" + post.slug} title={post.title}>
                  {post.title}
                </Link>
              </Item>
            ))}
            {postsTotal > 1 && (
              <Item>
                <Link to={"/all"} title={"See all"}>
                  See all {postsTotal} posts
                </Link>
              </Item>
            )}
          </List>
        )}
      </Content>
    </Tile>
  );
}
