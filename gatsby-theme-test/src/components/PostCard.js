import React from "react";

export default ({ data }) => (
  <article>
    <a href={data.slug} title={data.title}>
      <div>
        <img alt={data.title} title={data.title} src={data.image} />
      </div>
      <div>
        <h2>{data.title}</h2>
        <p>{data.excerpt}</p>
      </div>
    </a>
  </article>
);
