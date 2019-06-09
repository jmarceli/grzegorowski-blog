import React from "react";
import { Link } from "gatsby";
import SeoPost from "./seo";
import dayjs from "dayjs";
import PageLayout from "../PageLayout";
import SimilarPosts from "../SimilarPosts";
import {
  Header,
  HeaderContent,
  Title,
  Subtitle,
  Divider,
  TopImage,
  HeaderImage,
  Main,
  Content,
} from "./styles";

export default function PagePost({
  post,
  similarPosts,
  author,
  tags,
  tagPosts,
}) {
  const frontmatter = post.frontmatter;
  const date = dayjs(frontmatter.date_created);
  const mainTag =
    tags && tags.find(({ node }) => node.name === post.frontmatter.tags[0]);
  return (
    <PageLayout>
      <article>
        <SeoPost data={post} />

        <Header>
          <HeaderContent>
            <Title>{frontmatter.title}</Title>
            <Subtitle>
              <time dateTime={frontmatter.date_created}>
                {date.format("DD MMMM YYYY")}
              </time>
              {tags.length > 0 &&
                tags.map(({ node: tag }) => (
                  <React.Fragment key={tag.id}>
                    <Divider>/</Divider>
                    <Link to={`/tag/${tag.id}`}>{tag.name}</Link>
                  </React.Fragment>
                ))}
            </Subtitle>
          </HeaderContent>
        </Header>

        <TopImage>
          {frontmatter.image && (
            <HeaderImage
              title={frontmatter.title}
              alt={frontmatter.title}
              srcSet={frontmatter.image.childImageSharp.sizes.srcSet}
              src={frontmatter.image.childImageSharp.sizes.src}
            />
          )}
        </TopImage>

        <Main>
          <Content>
            <div
              dangerouslySetInnerHTML={{
                __html: post.html,
              }}
            />
          </Content>
        </Main>

        <SimilarPosts
          tag={mainTag.node}
          tagPosts={tagPosts}
          siteName={"— Blog name —"}
          similarPosts={similarPosts}
        />
      </article>
    </PageLayout>
  );
}
