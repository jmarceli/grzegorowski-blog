(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{L1ug:function(e,t,a){"use strict";a.r(t);a("GkPX");var n=a("mXGw"),i=a.n(n),l=(a("BTfu"),a("GAEk")),r=a("59u9"),o=a("vnMS"),s=a("eEx4"),c=a("UutA"),p=a("aDhp"),d=c.a.div.withConfig({displayName:"styles__Contact",componentId:"sc-1xx7etj-0"})(["margin-top:12px;display:flex;justify-content:center;max-width:100%;padding:0 24px;"]),m=c.a.div.withConfig({displayName:"styles__Posts",componentId:"sc-1xx7etj-1"})(["margin-left:20px;justify-content:center;"]),u=c.a.a.withConfig({displayName:"styles__Account",componentId:"sc-1xx7etj-2"})(["display:block;margin-left:20px;&:first-child{margin-left:0;}"]),g=c.a.div.withConfig({displayName:"styles__Container",componentId:"sc-1xx7etj-3"})(["position:relative;width:100%;max-width:","px;margin:-100px auto 0;padding:36px 8px 12px;@media (min-width:","px){padding:36px 24px 12px;}@media (min-width:","px){padding:36px 48px 12px;}"],p.f,p.d,p.c),x=c.a.div.withConfig({displayName:"styles__Content",componentId:"sc-1xx7etj-4"})(["display:block;"]),f=a("sD6U"),h=a("scJI");function v(e){var t=e.data,a=e.posts,n=Object(f.a)(a,[{node:t}]);return i.a.createElement(r.a,{singlePage:!0},i.a.createElement(h.a,{data:{slug:t.slug,frontmatter:{title:t.name,feature_image:t.profile_image_large,excerpt:t.bio}},contentType:"author"}),i.a.createElement(o.a,{withTopBar:!0,title:t.name,description:t.bio,background:t.cover_image.childImageSharp.fluid,profileImage:t.profile_image_large.childImageSharp.fixed},a.length&&t.links&&t.links.length&&i.a.createElement(d,null,i.a.createElement(m,null,i.a.createElement(l.a,{icon:["fas","signal"],size:"sm"})," ",a.length," posts"),t.links.map((function(e){return i.a.createElement(u,{key:e.url,href:e.url,target:"_blank"},i.a.createElement(l.a,{icon:e.icon,size:"sm"})," ",e.name)})))),i.a.createElement(x,null,i.a.createElement(g,null,i.a.createElement(s.a,{cards:n,allEven:!0}))))}var E=a("TF5C"),w=(a("5EGp"),a("MnT5"));a.d(t,"query",(function(){return y}));t.default=function(e){var t=e.data,a=e.pageContext;if(i.a.useContext(w.a).setIsAmp(a.isAmp),!a.author_slug){var n=t.authors.edges.map((function(e){var t=e.node;return{id:t.id,slug:"author/"+t.slug,title:t.name,image:t&&t.cover_image&&t.cover_image.childImageSharp.fluid,excerpt:t.bio}}));return i.a.createElement(E.a,{main:{title:"All authors",description:"List of all authors"},cardList:n})}return i.a.createElement(v,{data:t.author,posts:t.posts.edges})};var y="2860926173"},TF5C:function(e,t,a){"use strict";var n=a("mXGw"),i=a.n(n),l=a("eEx4"),r=a("vnMS"),o=a("59u9"),s=a("UutA"),c=a("aDhp"),p=s.a.div.withConfig({displayName:"styles__Content",componentId:"vzllmx-0"})(["position:relative;z-index:1;display:block;margin:-","px auto 0;max-width:","px;flex:1 0 auto;"],c.g,c.f),d=a("scJI");function m(e){var t=e.main,a=e.cardList;return i.a.createElement(o.a,{singlePage:!0},i.a.createElement(d.a,{data:{frontmatter:{title:t.title,excerpt:t.description}},contentType:"website"}),i.a.createElement(r.a,{background:t.image,title:t.title,description:t.description}),i.a.createElement(p,null,i.a.createElement(l.a,{cards:a,allEven:!0})))}a.d(t,"a",(function(){return m}))}}]);
//# sourceMappingURL=component---gatsby-ghost-theme-src-templates-author-js-e229f3433a7fe9c42021.js.map