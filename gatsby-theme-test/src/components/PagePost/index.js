import React from "react";
import { Link } from "gatsby";
import SeoPost from "./seo";
import dayjs from "dayjs";
import PageLayout from "../PageLayout";
import Author from "../Author";
import SimilarPosts from "../SimilarPosts";
import {
  Wrapper,
  Header,
  HeaderContent,
  Title,
  Subtitle,
  Divider,
  TopImage,
  HeaderImage,
  Main,
  Container,
  Content,
} from "./styles";

export default function PagePost({
  post,
  similarPosts,
  authors,
  tags,
  tagPosts,
}) {
  const frontmatter = post.frontmatter;
  const date = dayjs(frontmatter.date_created);
  const mainTag =
    tags && tags.find(({ node }) => node.slug === post.frontmatter.tags[0]);
  const author = authors.edges.find(
    ({ node }) => node.slug === frontmatter.author,
  );

  return (
    <PageLayout singlePage opaque>
      <Wrapper>
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
                  <React.Fragment key={tag.slug}>
                    <Divider>/</Divider>
                    <Link to={`/tag/${tag.slug}`}>{tag.name}</Link>
                  </React.Fragment>
                ))}
            </Subtitle>
          </HeaderContent>
        </Header>

        <TopImage>
          {frontmatter.feature_image && (
            <HeaderImage
              title={frontmatter.title}
              alt={frontmatter.title}
              fluid={frontmatter.feature_image.childImageSharp.fluid}
              objectFit="cover"
              objectPosition="50% 50%"
            />
          )}
        </TopImage>

        <Main>
          <Container>
            <Content
              dangerouslySetInnerHTML={{
                __html: post.html,
              }}
            />
            {author && author.node && (
              <Author
                slug={author.node.slug}
                name={author.node.name}
                bio={author.node.bio}
                image={author.node.profile_image.childImageSharp.fixed}
              />
            )}
          </Container>
        </Main>

        {(tagPosts.edges.length > 0 || similarPosts.length > 0) && (
          <SimilarPosts
            tag={mainTag.node}
            tagPosts={tagPosts}
            similarPosts={similarPosts}
            authors={authors.edges}
          />
        )}
      </Wrapper>
    </PageLayout>
  );
}
