import React from "react";
import PageLayout from "../PageLayout";
import {
  Wrapper,
  Header,
  HeaderContent,
  Title,
  TopImage,
  HeaderImage,
  Main,
  Container,
  Content,
} from "./styles";
import Seo from "../Seo";

export default function PageStatic({ post, authors }) {
  const frontmatter = post.frontmatter;
  const author =
    authors &&
    authors.edges.find(({ node }) => node.slug === frontmatter.author);

  return (
    <PageLayout singlePage opaque>
      <Seo data={post} author={author} contentType="article" />

      <Wrapper>
        <Header>
          <HeaderContent>
            <Title>{frontmatter.title}</Title>
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
          </Container>
        </Main>
      </Wrapper>
    </PageLayout>
  );
}
