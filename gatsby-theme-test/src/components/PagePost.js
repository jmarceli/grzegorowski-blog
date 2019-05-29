import React from "react";
import Helmet from "react-helmet";

export default function PagePost({ data }) {
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
          url: "https://grzegorowski.com/favicon.ico",
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
      image: [
        {
          "@type": "ImageObject",
          url: data.frontmatter.image.childImageSharp.sizes.originalImg,
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
    <article>
      <Helmet script={[schema]}>
        <title>{data.frontmatter.title}</title>
      </Helmet>
      <header>
        <h1>{data.frontmatter.title}</h1>
        <time dateTime={data.frontmatter.date_created}>
          {data.frontmatter.date_created}
        </time>
      </header>
      <div
        dangerouslySetInnerHTML={{
          __html: data.html,
        }}
      />
    </article>
  );
}
