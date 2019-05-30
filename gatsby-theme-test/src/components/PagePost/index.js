import React from "react";
import SeoPost from "./seo";

export default function PagePost({ data }) {
  return (
    <article>
      <img src={data.frontmatter.image.childImageSharp.sizes.originalImg} />
      <SeoPost data={data} />
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
