import React from "react";
import Helmet from "react-helmet";

export default function SeoPost({ data }) {
  // see: https://developers.google.com/search/docs/data-types/article#type_definitions
  const schema = {
    type: "application/ld+json",
    innerHTML: JSON.stringify({
      "@context": "http://schema.org",
      "@type": "BlogPosting", // "Article",
      publisher: {
        "@type": "Organization",
        logo: {
          type: "ImageObject",
          slug: "https://grzegorowski.com/favicon.ico",
        },
        name: "Jan Grzegorowski",
      },
      author: {
        "@type": "Person",
        name: "Jan Grzegorowski",
      },
      headline: data.frontmatter.meta_title || data.frontmatter.title,
      description: data.frontmatter.meta_description || data.excerpt,
      datePublished: data.frontmatter.date_created,
      dateModified: data.frontmatter.date_updated,
      image: data.frontmatter.feature_image && [
        {
          "@type": "ImageObject",
          slug: data.frontmatter.feature_image.childImageSharp.fluid.originalImg,
        },
      ],
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://grzegorowski.com/" + data.frontmatter.slug,
      },
      // articleBody: data.rawMarkdownBody,
      // copyrightHolder: "Jan Grzegorowski",
      // copyrightYear: data.frontmatter.date_created,
      // creator: "Jan Grzegorowski",
      // inLanguage: "en",
    }),
  };

  return (
    <Helmet script={[schema]}>
      <title>{data.frontmatter.title}</title>
    </Helmet>
  );
}
