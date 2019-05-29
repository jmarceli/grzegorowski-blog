import React from "react";

export default function PagePost({ data }) {
  return (
    <article>
      <header>
        <h1>{data.frontmatter.title}</h1>
        <time dateTime={data.frontmatter.date_created}>
          {data.frontmatter.date_created}
        </time>
      </header>
      <div>{data.html}</div>
    </article>
  );
}
