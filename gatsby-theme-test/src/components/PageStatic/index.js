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

export default function PagePost({ post, authors }) {
  const frontmatter = post.frontmatter;
  const author = authors.edges.find(
    ({ node }) => node.id === frontmatter.author,
  );

  return (
    <PageLayout singlePage>
      <Wrapper>
        <SeoPost data={post} />

        <Header>
          <HeaderContent>
            <Title>{frontmatter.title}</Title>
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
            {author && <Author author={author && author.node} />}
          </Container>
        </Main>
      </Wrapper>
    </PageLayout>
  );
}
