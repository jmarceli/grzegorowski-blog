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
  title,
  tag,
  url,
  children,
  image,
  authorIcon,
  timeToRead,
}) {
  return (
    <Tile>
      <Article>
        <Link to={url} title={title}>
          <Thumbnail>
            {image && <img alt={title} title={title} src={image} />}
          </Thumbnail>
          <Content>
            <Tag>{tag}</Tag>
            <Title>{title}</Title>
            <Excerpt>{children}</Excerpt>
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
