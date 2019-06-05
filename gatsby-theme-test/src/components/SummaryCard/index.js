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

export default function PostCard({ siteName, title, url, posts, postsTotal }) {
  return (
    <Tile>
      <Content>
        <TopLine>
          <SiteName>{siteName}</SiteName>
          <LinkTop to={url} title={title}>
            <Title>{title}</Title>
          </LinkTop>
        </TopLine>
        {posts.length > 0 && (
          <List>
            {posts.map(post => (
              <Item key={post.url}>
                <Link to={post.url} title={post.title}>
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
