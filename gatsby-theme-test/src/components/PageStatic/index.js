import React from "react";
import Helmet from "react-helmet";
import PageLayout from "../PageLayout";
import { schemaArticle } from "../../utils/seo";
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
    authors &&
    authors.edges.find(({ node }) => node.slug === frontmatter.author);

  return (
    <PageLayout singlePage opaque>
      <Wrapper>
        <Helmet
          script={schemaArticle(
            post,
            author && author.node && author.node.name,
          )}
        >
          <title>{frontmatter.title}</title>
        </Helmet>

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
