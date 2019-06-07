import React from "react";
import { Link } from "gatsby";
import SeoPost from "./seo";
import dayjs from "dayjs";
import PageLayout from "../PageLayout";
import SimilarPosts from "../SimilarPosts";
import {
  BP_SMALL,
  BP_MEDIUM,
  BP_LARGE,
  CONTENT_MAX_WIDTH,
  ARTICLE_OFFSET_TOP,
  CONTENT_OVERLAP_HEIGHT,
} from "../variables";
import {
  Header,
  HeaderContent,
  Title,
  Subtitle,
  Divider,
  AuthorInfo,
  Photo,
  Name,
  Info,
  TopImage,
  HeaderImage,
  Main,
  Content,
} from "./styles";

const similarPosts = {
  siteName: "— Blog name —",
  mainTag: {
    slug: "/javascript",
    label: "Javascript",
    posts: [
      { slug: "/r1", title: "React multiple event handlers performance" },
      {
        slug: "/r2",
        title: "React.PureComponent - different ways of writing event handlers",
      },
      {
        slug: "/r3",
        title: "React.PureComponent - children vs custom properties",
      },
    ],
    postsTotal: 16,
  },
  featuredPosts: [
    {
      tag: "FRONTEND",
      slug: "/i1",
      title:
        "Integration tests with Jest, Selenium and BrowserStack - part 2 - multiple browsers",
      excerpt:
        "Running automatically tests for multiple browsers and OSes with BrowserStack service.",
      timeToRead: 2,
    },
    {
      tag: "JAVASCRIPT",
      slug: "/j1",
      title:
        "Time Series Admin - Electron-based alternative to Admin UI for InfluxDB",
      excerpt:
        "Release notes for Time Series Admin - an alternative to Admin UI and Chronograf interface for InfluxDB.",
      timeToRead: 11,
    },
  ],
};

export default function PagePost({ data }) {
  const date = dayjs(data.frontmatter.date_created);
  const tags = data.frontmatter.tags || [];
  return (
    <PageLayout>
      <article>
        <SeoPost data={data} />

        <Header>
          <HeaderContent>
            <Title>{data.frontmatter.title}</Title>
            <Subtitle>
              <time dateTime={data.frontmatter.date_created}>
                {date.format("DD MMMM YYYY")}
              </time>
              {tags.length > 0 &&
                tags.map(tag => (
                  <React.Fragment key={tag}>
                    <Divider>/</Divider>
                    <Link to={`tag/${tag}`}>{tag}</Link>
                  </React.Fragment>
                ))}
            </Subtitle>
          </HeaderContent>
        </Header>

        <TopImage>
          {data.frontmatter.image && (
            <HeaderImage
              title={data.frontmatter.title}
              alt={data.frontmatter.title}
              srcSet={data.frontmatter.image.childImageSharp.sizes.srcSet}
              src={data.frontmatter.image.childImageSharp.sizes.src}
            />
          )}
        </TopImage>

        <Main>
          <Content>
            <div
              dangerouslySetInnerHTML={{
                __html: data.html,
              }}
            />
          </Content>
        </Main>

        <SimilarPosts
          mainTag={similarPosts.mainTag}
          siteName={similarPosts.siteName}
          featuredPosts={similarPosts.featuredPosts}
        />
      </article>
    </PageLayout>
  );
}
