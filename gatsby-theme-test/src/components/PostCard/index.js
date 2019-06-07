import React from "react";
import Tile from "../Tile";
import {
  Article,
  Link,
  Thumbnail,
  Content,
  Tag,
  Title,
  Excerpt,
  Footer,
  Author,
  TimeToRead,
} from "./styles";

export default function PostCard({
  size,
  title,
  tag,
  slug,
  excerpt,
  image,
  authorIcon,
  timeToRead,
}) {
  return (
    <Tile>
      <Article>
        <Link to={"/" + slug} title={title} size={size}>
          <Thumbnail
            large={size === "large"}
            style={{
              backgroundImage: "url(" + image + ")",
              backgroundPosition: "center center",
            }}
          />
          <Content large={size === "large"}>
            <Tag>{tag}</Tag>
            <Title>{title}</Title>
            <Excerpt>{excerpt}</Excerpt>
            <Footer>
              <Author>{authorIcon}</Author>
              <TimeToRead>{timeToRead} min read</TimeToRead>
            </Footer>
          </Content>
        </Link>
      </Article>
    </Tile>
  );
}
