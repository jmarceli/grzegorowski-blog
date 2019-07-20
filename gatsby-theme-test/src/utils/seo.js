export function schemaBlogPosting(data, author) {
  // see: https://developers.google.com/search/docs/data-types/article#type_definitions
  return [
    {
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
          name: author,
        },
        author: {
          "@type": "Person",
          name: author,
        },
        headline: data.frontmatter.meta_title || data.frontmatter.title,
        description: data.frontmatter.meta_description || data.excerpt,
        datePublished: data.frontmatter.date_created,
        dateModified: data.frontmatter.date_updated,
        keywords: data.frontmatter.tags && data.frontmatter.tags.join(", "),
        image: data.frontmatter.feature_image && [
          {
            "@type": "ImageObject",
            url:
              "https://grzegorowski.com/" +
              data.frontmatter.feature_image.relativePath,
          },
        ],
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://grzegorowski.com/",
        },
        articleBody: data.rawMarkdownBody,
        copyrightHolder: {
          "@type": "Person",
          name: author,
        },
        copyrightYear: data.frontmatter.date_created,
        creator: {
          "@type": "Person",
          name: author,
        },
        inLanguage: "en",
      }),
    },
  ];
}
