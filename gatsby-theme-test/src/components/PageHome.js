import React from "react";
import PostCard from "./PostCard";

export default ({ data }) => (
  <div>
    <ul>
      {data.allMarkdownRemark.edges.map(edge => (
        <li key={edge.node.id}>
          <PostCard data={edge.node.frontmatter} />
        </li>
      ))}
    </ul>
    {/*JSON.stringify(data)}
    <div
      dangerouslySetInnerHTML={{
        __html: data.allMarkdownRemark.edges[0].node.html,
      }}
    />*/}
  </div>
);
