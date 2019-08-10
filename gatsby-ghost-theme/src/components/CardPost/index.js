import React from "react";
import Tile from "../Tile";
import { AmpContext } from "../../utils/ampContext";
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
  const { isAmp } = React.useContext(AmpContext);
  const url = "/" + slug + (isAmp ? "/amp/" : "");

  return (
    <Tile>
      <Article>
        <Link to={url} title={title} size={size}>
          {image ? (
            isAmp ? (
              <amp-img
                src={image.src}
                srcSet={image.srcSet}
                alt={title}
                width={image.aspectRatio}
                height="1"
                layout="responsive"
              />
            ) : (
              <Thumbnail
                large={size === "large"}
                fluid={image}
                alt={title}
                objectFit="cover"
                objectPosition="50% 50%"
              />
            )
          ) : (
            <NoThumbnail large={size === "large"} />
          )}
          <Content large={size === "large"}>
            {tag && <Tag>{tag}</Tag>}
            <Title>{title}</Title>
            <Excerpt>{excerpt}</Excerpt>
            {(author || timeToRead) && (
              <Footer>
                {author && (
                  <Author>
                    {isAmp ? (
                      <amp-img
                        src={author.image.src}
                        srcSet={author.image.srcSet}
                        alt={author.name}
                        width={author.image.width}
                        height={author.image.height}
                        layout="fixed"
                      />
                    ) : (
                      <Avatar
                        fixed={author.image}
                        objectFit="cover"
                        objectPosition="50% 50%"
                        alt={author.name}
                      />
                    )}
                  </Author>
                )}
                {timeToRead && <TimeToRead>{timeToRead} min read</TimeToRead>}
              </Footer>
            )}
          </Content>
        </Link>
      </Article>
    </Tile>
  );
}
