(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"4+BU":function(e,t,a){"use strict";a.r(t),a.d(t,"query",(function(){return l}));a("GkPX");var i=a("mXGw"),n=a.n(i),r=(a("5EGp"),a("TF5C")),s=a("sD6U"),c=a("MnT5");t.default=function(e){var t=e.data,a=e.pageContext;if(n.a.useContext(c.a).setIsAmp(a.isAmp),!a.tag_slug){var i=t.tags.edges.map((function(e){var t=e.node;return{id:t.id,slug:"tag/"+t.slug,title:t.name,image:t&&t.feature_image&&t.feature_image.childImageSharp.fluid,excerpt:t.description}}));return n.a.createElement(r.a,{main:{title:"All tags",description:"List of all tags"},cardList:i,isAmp:a.isAmp})}var l=Object(s.a)(t.posts.edges,t.authors.edges);return n.a.createElement(r.a,{cardList:l,main:{image:t.tag.feature_image&&t.tag.feature_image.childImageSharp.fluid,title:t.tag.name,description:t.tag.description},authors:t.authors.edges,isAmp:a.isAmp})};var l="3492286946"},TF5C:function(e,t,a){"use strict";var i=a("mXGw"),n=a.n(i),r=a("eEx4"),s=a("vnMS"),c=a("59u9"),l=a("UutA"),m=a("aDhp"),o=l.a.div.withConfig({displayName:"styles__Content",componentId:"vzllmx-0"})(["position:relative;z-index:1;display:block;margin:-","px auto 0;max-width:","px;flex:1 0 auto;"],m.g,m.f),d=a("scJI");function p(e){var t=e.main,a=e.cardList,i=e.isAmp,l=void 0!==i&&i;return n.a.createElement(c.a,{singlePage:!0},n.a.createElement(d.a,{data:{frontmatter:{title:t.title,excerpt:t.description}},contentType:"website",isAmp:l}),n.a.createElement(s.a,{background:t.image,title:t.title,description:t.description,isAmp:l}),n.a.createElement(o,null,n.a.createElement(r.a,{cards:a,allEven:!0})))}a.d(t,"a",(function(){return p}))}}]);
//# sourceMappingURL=component---gatsby-ghost-theme-src-auto-pages-tag-js-fd82355a88f573551cc0.js.map