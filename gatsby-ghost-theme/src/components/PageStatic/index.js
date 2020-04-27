import React from "react";
import PageLayout from "../PageLayout";
import Menu from "../Menu";
import {
  Wrapper,
  Header,
  HeaderContent,
  Title,
  TopImage,
  HeaderImageMobile,
  HeaderImage,
  Main,
  Container,
  MenuWrapper,
  Content,
} from "./styles";
import Seo from "../Seo";

export default function PageStatic({ post, authors, isAmp = false }) {
  const frontmatter = post.frontmatter;
  const author =
    authors &&
    authors.edges.find(({ node }) => node.slug === frontmatter.author);

  return (
    <PageLayout singlePage opaque>
      <Seo data={post} author={author} contentType="article" isAmp={isAmp} />

      <Wrapper>
        <Header>
          <HeaderContent>
            <Title>{frontmatter.title}</Title>
          </HeaderContent>
        </Header>

        <TopImage>
          {frontmatter.feature_image &&
            (isAmp ? (
              <HeaderImageMobile>
                <amp-img
                  class="cover"
                  src={frontmatter.feature_image.childImageSharp.fluid.src}
                  srcSet={
                    frontmatter.feature_image.childImageSharp.fluid.srcSet
                  }
                  sizes={frontmatter.feature_image.childImageSharp.fluid.sizes}
                  layout="fill"
                />
              </HeaderImageMobile>
            ) : (
              <HeaderImage
                title={frontmatter.title}
                alt={frontmatter.title}
                fluid={frontmatter.feature_image.childImageSharp.fluid}
                objectFit="cover"
                objectPosition="50% 50%"
              />
            ))}
        </TopImage>

        <Main>
          <Container>
            <MenuWrapper>
              <Menu />
            </MenuWrapper>
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
