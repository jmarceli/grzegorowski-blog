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

export default function CardPost({
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
              backgroundImage: image ? "url(" + image + ")" : undefined,
            }}
          />
          <Content large={size === "large"}>
            {tag && <Tag>{tag}</Tag>}
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
