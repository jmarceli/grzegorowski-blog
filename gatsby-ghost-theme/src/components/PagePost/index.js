import dayjs from "dayjs";
import { Link } from "gatsby";
import { Disqus } from "gatsby-plugin-disqus";
import React from "react";
import { AmpContext } from "../../utils/ampContext";
import Author from "../Author";
import PageLayout from "../PageLayout";
import SimilarPosts from "../SimilarPosts";
import Seo from "../Seo";
import {
  Comments,
  CommentsContainer,
  Container,
  Content,
  Divider,
  Header,
  HeaderContent,
  HeaderImage,
  Main,
  Subtitle,
  Title,
  TopImage,
  Wrapper,
  DateCreated,
} from "./styles";

// Create DOM document if not in browser environment (e.g. rendering pages with Node)
const getDocument = () => {
  if (typeof document === "undefined") {
    // eslint-disable-next-line no-eval
    const JSDOM = eval('require("jsdom")').JSDOM;
    const DOM = new JSDOM();
    return DOM.window.document;
  }
  return document;
};

// AMP has it's own preloading and background-image with base64 encoding breaks AMP compilancy
const removePlaceholderImages = htmlString => {
  const document = getDocument();
  const body = document.createElement("div");
  body.innerHTML = htmlString;
  body.querySelectorAll(".gatsby-resp-image-background-image").forEach(el => {
    el.style.backgroundImage = "";
  });
  return body.outerHTML;
};

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
    tags &&
    post.frontmatter.tags &&
    tags.find(({ node }) => node.slug === post.frontmatter.tags[0]);
  const author = authors.edges.find(
    ({ node }) => node.slug === frontmatter.author,
  );
  let disqusConfig = {
    url: `https://www.grzegorowski.com/${frontmatter.slug}`,
    identifier: frontmatter.slug,
    title: frontmatter.title,
  };
  const ampContext = React.useContext(AmpContext);

  const featureImage =
    frontmatter &&
    frontmatter.feature_image &&
    frontmatter.feature_image.childImageSharp;

  const htmlBody = ampContext.isAmp
    ? removePlaceholderImages(post.html)
    : post.html;

  return (
    <PageLayout singlePage opaque>
      <Seo data={post} author={author} />

      <Wrapper>
        <Header>
          <HeaderContent>
            <DateCreated dateTime={frontmatter.date_created}>
              {date.format("DD MMMM YYYY")}
            </DateCreated>
            <Title>{frontmatter.title}</Title>
            <Subtitle>
              {tags.length > 0 &&
                tags.map(({ node: tag }, index) => (
                  <React.Fragment key={tag.slug}>
                    {index !== 0 && <Divider>/</Divider>}
                    <Link to={`/tag/${tag.slug}`}>{tag.name}</Link>
                  </React.Fragment>
                ))}
            </Subtitle>
          </HeaderContent>
        </Header>

        <TopImage>
          {featureImage &&
            featureImage.fluid &&
            (ampContext.isAmp ? (
              <amp-img
                src={featureImage.fluid.src}
                srcSet={featureImage.fluid.srcSet}
                alt={frontmatter.title}
                width={featureImage.fluid.aspectRatio}
                height="1"
                layout="responsive"
              />
            ) : (
              <HeaderImage
                title={frontmatter.title}
                alt={frontmatter.title}
                fluid={featureImage.fluid}
                objectFit="cover"
                objectPosition="50% 50%"
              />
            ))}
        </TopImage>

        <Main>
          <Container>
            <Content
              dangerouslySetInnerHTML={{
                __html: htmlBody,
              }}
            />
            {author && author.node && (
              <Author
                slug={author.node.slug}
                name={author.node.name}
                image={author.node.profile_image_large.childImageSharp.fixed}
                bio={author.node.bio}
              />
            )}
          </Container>
        </Main>

        <Comments>
          <CommentsContainer>
            <Disqus config={disqusConfig} />
          </CommentsContainer>
        </Comments>

        {mainTag && (tagPosts.edges.length > 0 || similarPosts.length > 0) && (
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
