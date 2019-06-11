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
    tags && tags.find(({ node }) => node.name === post.frontmatter.tags[0]);
  const author = authors.edges.find(
    ({ node }) => node.id === frontmatter.author,
  );

  return (
    <PageLayout>
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
              fluid={frontmatter.image.childImageSharp.fluid}
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
            <Author author={author && author.node} />
          </Container>
        </Main>

        {(tagPosts.edges.length > 0 || similarPosts.length > 0) && (
          <SimilarPosts
            tag={mainTag.node}
            tagPosts={tagPosts}
            siteName={"— Blog name —"}
            similarPosts={similarPosts}
          />
        )}
      </Wrapper>
    </PageLayout>
  );
}
