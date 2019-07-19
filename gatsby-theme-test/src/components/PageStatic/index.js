import React from "react";
import SeoPost from "./seo";
import PageLayout from "../PageLayout";
import Author from "../Author";
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

export default function PageStatic({ post, authors }) {
  const frontmatter = post.frontmatter;
  const author =
    authors && authors.edges.find(({ node }) => node.id === frontmatter.author);

  return (
    <PageLayout singlePage opaque>
      <Wrapper>
        <SeoPost data={post} />

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
            {author && <Author author={author && author.node} />}
          </Container>
        </Main>
      </Wrapper>
    </PageLayout>
  );
}
