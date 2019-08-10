import React from "react";
import Helmet from "react-helmet";
import {
  schemaBlogPosting,
  schemaWebsite,
  schemaPerson,
  schemaArticle,
} from "../../utils/seo";

export default function Seo({ data, author, contentType }) {
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
      "https://grzegorowski.com/" + data.frontmatter.feature_image.relativePath,
    articleBody: data.rawMarkdownBody,
    copyrightYear: data.frontmatter.date_created,
    author: author && author.node && author.node.name,
  };
  console.log("seoData", seoData);

  const schema =
    contentType === "website"
      ? schemaWebsite(
          { ...seoData, url: "https://www.grzegorowski.com" },
          seoData.author,
        )
      : contentType === "author"
      ? schemaPerson({
          name: seoData.headline,
          imageUrl: seoData.imageUrl,
          url: "https://www.grzegorowski.com/" + data.slug,
        })
      : contentType === "article"
      ? schemaArticle(seoData, seoData.author)
      : schemaBlogPosting(seoData, seoData.author);

  return (
    <Helmet script={schema}>
      <title>{seoData.headline}</title>
      <meta name="description" content={seoData.description} />
      {seoData.author && <meta name="author" content={seoData.author} />}
    </Helmet>
  );
}
