import React from "react";
import Tile from "../Tile";
import {
  Article,
  Link,
  Thumbnail,
  NoThumbnail,
  Content,
  Tag,
  Title,
  Excerpt,
  Footer,
  Author,
  Avatar,
  TimeToRead,
} from "./styles";

export default function CardPost({
  size,
  title,
  tag,
  slug,
  excerpt,
  image,
  author,
  timeToRead,
}) {
  return (
    <Tile>
      <Article>
        <Link to={"/" + slug} title={title} size={size}>
          {image ? (
            <Thumbnail
              large={size === "large"}
              fluid={image}
              objectFit="cover"
              objectPosition="50% 50%"
            />
          ) : (
            <NoThumbnail large={size === "large"} />
          )}
          <Content large={size === "large"}>
            {tag && <Tag>{tag}</Tag>}
            <Title>{title}</Title>
            <Excerpt>{excerpt}</Excerpt>
            <Footer>
              {author && (
                <Author>
                  <Avatar
                    fixed={
                      author.avatar &&
                      author.avatar.childImageSharp &&
                      author.avatar.childImageSharp.fixed
                    }
                    objectFit="cover"
                    objectPosition="50% 50%"
                    alt={author.id}
                  />
                </Author>
              )}
              <TimeToRead>{timeToRead} min read</TimeToRead>
            </Footer>
          </Content>
        </Link>
      </Article>
    </Tile>
  );
}
