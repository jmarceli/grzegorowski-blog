export function schemaBlogPosting(data, authorName) {
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
          name: authorName,
        },
        author: {
          "@type": "Person",
          name: authorName,
        },
        headline: data.headline,
        description: data.description,
        datePublished: data.datePublished,
        dateModified: data.dateModified,
        keywords: data.keywords,
        image: data.imageUrl && [
          {
            "@type": "ImageObject",
            url: data.imageUrl,
          },
        ],
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://grzegorowski.com/",
        },
        articleBody: data.articleBody,
        copyrightHolder: {
          "@type": "Person",
          name: authorName,
        },
        copyrightYear: data.copyrightYear,
        creator: {
          "@type": "Person",
          name: authorName,
        },
        inLanguage: "en",
      }),
    },
  ];
}

export function schemaArticle(data, author) {
  // see: https://developers.google.com/search/docs/data-types/article#type_definitions
  return [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "http://schema.org",
        "@type": "Article", // "Article",
        publisher: author && {
          "@type": "Organization",
          logo: {
            type: "ImageObject",
            url: "https://grzegorowski.com/favicon.ico",
          },
          name: author,
        },
        author: author && {
          "@type": "Person",
          name: author,
        },
        headline: data.frontmatter.meta_title || data.frontmatter.title,
        description: data.frontmatter.meta_description || data.excerpt,
        datePublished: data.frontmatter.date_created,
        dateModified: data.frontmatter.date_updated,
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
        copyrightHolder: author,
        copyrightYear: data.frontmatter.date_created,
        creator: author,
        inLanguage: "en",
      }),
    },
  ];
}

export function schemaPerson(data) {
  // see: https://developers.google.com/search/docs/data-types/article#type_definitions
  return [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "http://schema.org",
        "@type": "Person",
        name: data.name,
        url: data.url,
        image: data.image && {
          "@type": "ImageObject",
          url: "https://grzegorowski.com/" + data.image,
        },
        nationality: "Polish",
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "Warsaw University of Technology",
            sameAs: [
              "https://en.wikipedia.org/wiki/Warsaw_University_of_Technology",
              "https://www.pw.edu.pl/engpw",
            ],
          },
        ],
        gender: "Male",
        description: "Full-stack developer",
        jobTitle: "Senior Software Engineer",
        worksFor: [
          {
            "@type": "Organization",
            name: "Equinix Inc.",
            sameAs: [
              "https://www.equinix.com/",
              "https://www.linkedin.com/company/equinix/",
              "https://twitter.com/equinix",
            ],
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Warsaw",
          addressCountry: "Poland",
        },
      }),
    },
  ];
}

export function schemaWebsite(data, author) {
  // see: https://developers.google.com/search/docs/data-types/article#type_definitions
  return [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "http://schema.org",
        "@type": "WebSite",
        url: data.url,
        headline: data.headline,
        description: data.description,
        publisher: author && {
          "@type": "Organization",
          logo: {
            type: "ImageObject",
            url: "https://grzegorowski.com/favicon.ico",
          },
          name: author,
        },
        author: author && {
          "@type": "Person",
          name: author,
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified,
        image: data.image && [
          {
            "@type": "ImageObject",
            url: "https://grzegorowski.com/" + data.image,
          },
        ],
        copyrightHolder: author,
        copyrightYear: data.copyrightYear,
        creator: author,
        inLanguage: "en",
      }),
    },
  ];
}
