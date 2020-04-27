import React from "react";
import Helmet from "react-helmet";
import {
  schemaBlogPosting,
  schemaWebsite,
  schemaPerson,
  schemaArticle,
} from "../../utils/seo";

const baseUrl = "https://www.grzegorowski.com";

const getCanonicalUrl = (contentType, data) => {
  if (!contentType) {
    // post has no contentType assigned
    return baseUrl + "/" + data.frontmatter.slug;
  }
  // TODO: add canonical to other pages
  return "";
};

export default function Seo({ data, author, contentType, isAmp }) {
  const seoData = {
    headline: data.frontmatter.meta_title || data.frontmatter.title,
    description:
      data.frontmatter.meta_description ||
      data.frontmatter.excerpt ||
      data.excerpt,
    datePublished: data.frontmatter.date_created,
    dateModified: data.frontmatter.date_updated,
    keywords: data.frontmatter.tags && data.frontmatter.tags.join(", "),
    imageUrl:
      data.frontmatter.feature_image &&
      baseUrl + data.frontmatter.feature_image.relativePath,
    copyrightYear: data.frontmatter.date_created,
    author: author && author.node && author.node.name,
  };

  const schema =
    contentType === "website"
      ? schemaWebsite({ ...seoData, url: baseUrl }, seoData.author)
      : contentType === "author"
      ? schemaPerson({
          name: seoData.headline,
          imageUrl: seoData.imageUrl,
          url: baseUrl + data.slug,
        })
      : contentType === "article"
      ? schemaArticle(seoData, seoData.author)
      : schemaBlogPosting(seoData, seoData.author);

  const canonical = getCanonicalUrl(contentType, data);

  return (
    <Helmet script={schema}>
      <title>{seoData.headline}</title>
      <meta name="description" content={seoData.description} />
      {seoData.author && <meta name="author" content={seoData.author} />}
      {!isAmp && canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
}
