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

export function schemaArticle(data, authorName) {
  // see: https://developers.google.com/search/docs/data-types/article#type_definitions
  return [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "http://schema.org",
        "@type": "Article", // "Article",
        publisher: authorName && {
          "@type": "Organization",
          logo: {
            type: "ImageObject",
            url: "https://grzegorowski.com/favicon.ico",
          },
          name: authorName,
        },
        author: authorName && {
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
        articleBody: data.rawMarkdownBody,
        copyrightHolder: authorName,
        copyrightYear: data.copyrightYear,
        creator: authorName,
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
        image: data.imageUrl && {
          "@type": "ImageObject",
          url: data.imageUrl,
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

export function schemaWebsite(data, authorName) {
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
        publisher: authorName && {
          "@type": "Organization",
          logo: {
            type: "ImageObject",
            url: "https://grzegorowski.com/favicon.ico",
          },
          name: authorName,
        },
        author: authorName && {
          "@type": "Person",
          name: authorName,
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified,
        image: data.imageUrl && [
          {
            "@type": "ImageObject",
            url: data.imageUrl,
          },
        ],
        copyrightHolder: authorName,
        copyrightYear: data.copyrightYear,
        creator: authorName,
        inLanguage: "en",
      }),
    },
  ];
}
