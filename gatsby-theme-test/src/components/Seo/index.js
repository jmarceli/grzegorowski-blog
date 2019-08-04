import React from "react";
import Helmet from "react-helmet";
import { schemaBlogPosting } from "../../utils/seo";

// TODO: create Seo for each content type
export default function Seo({ data, author }) {
  const seoData = {
    headline: data.frontmatter.meta_title || data.frontmatter.title,
    description: data.frontmatter.meta_description || data.excerpt,
    datePublished: data.frontmatter.date_created,
    dateModified: data.frontmatter.date_updated,
    keywords: data.frontmatter.tags && data.frontmatter.tags.join(", "),
    imageUrl:
      data.frontmatter.feature_image &&
      "https://grzegorowski.com/" + data.frontmatter.feature_image.relativePath,
    articleBody: data.rawMarkdownBody,
    copyrightYear: data.frontmatter.date_created,
    author: author && author.node && author.node.name,
  };
  return (
    <Helmet script={schemaBlogPosting(seoData)}>
      <title>{seoData.headline}</title>
      <meta name="description" content={seoData.description} />
      {seoData.author && <meta name="author" content={seoData.author} />}
    </Helmet>
  );
}
