(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{211:function(e,t,a){"use strict";a.r(t);a(43);var i=a(0),n=a.n(i),r=(a(216),a(234)),o=a(225),l=a(223),d=a(222),s=a(213),c=a(215),m=s.a.div.withConfig({displayName:"styles__Contact",componentId:"sc-1xx7etj-0"})(["margin-top:12px;display:flex;justify-content:center;max-width:100%;padding:0 24px;"]),p=s.a.div.withConfig({displayName:"styles__Posts",componentId:"sc-1xx7etj-1"})(["margin-left:20px;justify-content:center;"]),g=s.a.a.withConfig({displayName:"styles__Account",componentId:"sc-1xx7etj-2"})(["display:block;margin-left:20px;&:first-child{margin-left:0;}"]),u=s.a.div.withConfig({displayName:"styles__Container",componentId:"sc-1xx7etj-3"})(["position:relative;width:100%;max-width:","px;margin:-100px auto 0;padding:36px 8px 12px;@media (min-width:","px){padding:36px 24px 12px;}@media (min-width:","px){padding:36px 48px 12px;}"],c.f,c.d,c.c),f=s.a.div.withConfig({displayName:"styles__Content",componentId:"sc-1xx7etj-4"})(["display:block;"]),h=a(224),y=a(220);function w(e){var t=e.data,a=e.posts,i=Object(h.a)(a,[{node:t}]);return n.a.createElement(o.a,{singlePage:!0},n.a.createElement(y.a,{data:{slug:t.slug,frontmatter:{title:t.name,feature_image:t.profile_image_large,excerpt:t.bio}},contentType:"author"}),n.a.createElement(l.a,{withTopBar:!0,title:t.name,description:t.bio,background:t.cover_image.childImageSharp.fluid,profileImage:t.profile_image_large.childImageSharp.fixed},a.length&&t.links&&t.links.length&&n.a.createElement(m,null,n.a.createElement(p,null,n.a.createElement(r.a,{icon:["fas","signal"],size:"sm"})," ",a.length," posts"),t.links.map(function(e){return n.a.createElement(g,{key:e.url,href:e.url,target:"_blank"},n.a.createElement(r.a,{icon:e.icon,size:"sm"})," ",e.name)}))),n.a.createElement(f,null,n.a.createElement(u,null,n.a.createElement(d.a,{cards:i,allEven:!0}))))}var x=a(229),b=(a(218),a(221));a.d(t,"query",function(){return _});t.default=function(e){var t=e.data,a=e.pageContext;if(n.a.useContext(b.a).setIsAmp(a.isAmp),!a.author_slug){var i=t.authors.edges.map(function(e){var t=e.node;return{id:t.id,slug:"author/"+t.slug,title:t.name,image:t&&t.cover_image&&t.cover_image.childImageSharp.fluid,excerpt:t.bio}});return n.a.createElement(x.a,{main:{title:"All authors",description:"List of all authors"},cardList:i})}return n.a.createElement(w,{data:t.author,posts:t.posts.edges})};var _="2860926173"},220:function(e,t,a){"use strict";a(12),a(43);var i=a(0),n=a.n(i),r=a(226),o=a.n(r);function l(e){var t=e.data,a=e.author,i=e.contentType,r={headline:t.frontmatter.meta_title||t.frontmatter.title,description:t.frontmatter.meta_description||t.frontmatter.excerpt||t.excerpt,datePublished:t.frontmatter.date_created,dateModified:t.frontmatter.date_updated,keywords:t.frontmatter.tags&&t.frontmatter.tags.join(", "),imageUrl:t.frontmatter.feature_image&&"https://grzegorowski.com/"+t.frontmatter.feature_image.relativePath,copyrightYear:t.frontmatter.date_created,author:a&&a.node&&a.node.name},l="website"===i?function(e,t){return[{type:"application/ld+json",innerHTML:JSON.stringify({"@context":"http://schema.org","@type":"WebSite",url:e.url,headline:e.headline,description:e.description,publisher:t&&{"@type":"Organization",logo:{type:"ImageObject",url:"https://grzegorowski.com/favicon.ico"},name:t},author:t&&{"@type":"Person",name:t},datePublished:e.datePublished,dateModified:e.dateModified,image:e.imageUrl&&[{"@type":"ImageObject",url:e.imageUrl}],copyrightHolder:t,copyrightYear:e.copyrightYear,creator:t,inLanguage:"en"})}]}(Object.assign({},r,{url:"https://www.grzegorowski.com"}),r.author):"author"===i?function(e){return[{type:"application/ld+json",innerHTML:JSON.stringify({"@context":"http://schema.org","@type":"Person",name:e.name,url:e.url,image:e.imageUrl&&{"@type":"ImageObject",url:e.imageUrl},nationality:"Polish",alumniOf:[{"@type":"CollegeOrUniversity",name:"Warsaw University of Technology",sameAs:["https://en.wikipedia.org/wiki/Warsaw_University_of_Technology","https://www.pw.edu.pl/engpw"]}],gender:"Male",description:"Full-stack developer",jobTitle:"Senior Software Engineer",worksFor:[{"@type":"Organization",name:"Equinix Inc.",sameAs:["https://www.equinix.com/","https://www.linkedin.com/company/equinix/","https://twitter.com/equinix"]}],address:{"@type":"PostalAddress",addressLocality:"Warsaw",addressCountry:"Poland"}})}]}({name:r.headline,imageUrl:r.imageUrl,url:"https://www.grzegorowski.com/"+t.slug}):"article"===i?function(e,t){return[{type:"application/ld+json",innerHTML:JSON.stringify({"@context":"http://schema.org","@type":"Article",publisher:t&&{"@type":"Organization",logo:{type:"ImageObject",url:"https://grzegorowski.com/favicon.ico"},name:t},author:t&&{"@type":"Person",name:t},headline:e.headline,description:e.description,datePublished:e.datePublished,dateModified:e.dateModified,keywords:e.keywords,image:e.imageUrl&&[{"@type":"ImageObject",url:e.imageUrl}],mainEntityOfPage:{"@type":"WebPage","@id":"https://grzegorowski.com/"},copyrightHolder:t,copyrightYear:e.copyrightYear,creator:t,inLanguage:"en"})}]}(r,r.author):function(e,t){return[{type:"application/ld+json",innerHTML:JSON.stringify({"@context":"http://schema.org","@type":"BlogPosting",publisher:{"@type":"Organization",logo:{type:"ImageObject",url:"https://grzegorowski.com/favicon.ico"},name:t},author:{"@type":"Person",name:t},headline:e.headline,description:e.description,datePublished:e.datePublished,dateModified:e.dateModified,keywords:e.keywords,image:e.imageUrl&&[{"@type":"ImageObject",url:e.imageUrl}],mainEntityOfPage:{"@type":"WebPage","@id":"https://grzegorowski.com/"},articleBody:e.articleBody,copyrightHolder:{"@type":"Person",name:t},copyrightYear:e.copyrightYear,creator:{"@type":"Person",name:t},inLanguage:"en"})}]}(r,r.author);return n.a.createElement(o.a,{script:l},n.a.createElement("title",null,r.headline),n.a.createElement("meta",{name:"description",content:r.description}),r.author&&n.a.createElement("meta",{name:"author",content:r.author}))}a.d(t,"a",function(){return l})},222:function(e,t,a){"use strict";var i=a(0),n=a.n(i),r=a(227),o=a(213),l=a(215),d=(o.a.aside.withConfig({displayName:"styles__Wrapper",componentId:"sc-29jysb-0"})(["background:#f4f8fb;"]),o.a.div.withConfig({displayName:"styles__Container",componentId:"sc-29jysb-1"})(["display:block;margin:0 auto;max-width:","px;"],l.f)),s=o.a.ul.withConfig({displayName:"styles__List",componentId:"sc-29jysb-2"})(["margin:0;padding:12px 0;@media (min-width:","px){padding:12px;}list-style:none;display:flex;flex-wrap:wrap;"],l.d),c={small:"50%",medium:"50%",large:"100%"},m={small:"33.333%",medium:"50%",large:"100%"},p=o.a.li.withConfig({displayName:"styles__Item",componentId:"sc-29jysb-3"})(["display:flex;flex:1 0 100%;@media (min-width:","px){flex:1 0 ",";}@media (min-width:","px){flex:1 0 ",";}width:100%;@media (min-width:","px){width:",";}@media (min-width:","px){width:",";}margin:0;@media (min-width:","px){min-height:","px;}padding:12px 8px;@media (min-width:","px){padding:12px;}",""],l.d,function(e){var t=e.size;return c[t]},l.c,function(e){var t=e.size;return m[t]},l.d,function(e){var t=e.size;return c[t]},l.c,function(e){var t=e.size;return m[t]},l.d,function(e){return"large"===e.size?"400":"460"},l.d,function(e){return e.featured?"padding: 6px;":""}),g=function(e,t){if(void 0===t&&(t=!1),!t){if(e%6==0)return"large";if(e%6==4||e%6==5)return"medium"}return"small"};t.a=function(e){var t=e.cards,a=e.allEven;return n.a.createElement(d,null,n.a.createElement(s,null,t.map(function(e,t){return n.a.createElement(p,{key:e.id,size:g(t,a),featured:!a&&0===t},n.a.createElement(r.a,{title:e.title,slug:e.slug,timeToRead:e.timeToRead,size:g(t,a),excerpt:e.excerpt,image:e.image,tag:e.tag,author:e.author,dateCreated:e.dateCreated}))})))}},223:function(e,t,a){"use strict";var i=a(0),n=a.n(i),r=a(213),o=a(218),l=a.n(o),d=a(217),s=a(215),c=r.a.header.withConfig({displayName:"styles__Wrapper",componentId:"sc-11bybzw-0"})(["position:relative;padding-top:","px;padding-bottom:","px;min-height:","px;height:30vh;color:",";background:",";display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;"],function(e){return e.withTopBar?0:50},function(e){return e.withTopBar?0:s.g},function(e){var t=e.withTopBar,a=e.large;return t?450:a?600:400},function(e){return e.white?"#aaa":"#fff"},function(e){return e.white?"#fff":"rgba(0, 0, 0, 0.6)"}),m=Object(r.a)(l.a).withConfig({displayName:"styles__Background",componentId:"sc-11bybzw-1"})(["position:absolute !important;z-index:-1;top:0;bottom:0;left:0;right:0;width:100%;"]),p=r.a.div.withConfig({displayName:"styles__NoBackground",componentId:"sc-11bybzw-2"})(["position:absolute !important;z-index:-1;top:0;bottom:0;left:0;right:0;width:100%;background:",";"],function(e){return e.white?"#fff":"#000"}),g=r.a.div.withConfig({displayName:"styles__Container",componentId:"sc-11bybzw-3"})(["padding:12px 24px;max-width:900px;font-size:","rem;"],Object(d.b)(15)),u=Object(r.a)(l.a).withConfig({displayName:"styles__Avatar",componentId:"sc-11bybzw-4"})(["position:relative;border-radius:50%;overflow:hidden;box-shadow:0 0 0 6px hsla(0,0%,100%,0.1);"]),f=r.a.h1.withConfig({displayName:"styles__Title",componentId:"sc-11bybzw-5"})(["font-family:",";font-size:","rem;font-weight:600;margin:12px 0;"],d.a,function(e){var t=e.large;return Object(d.b)(t?128:24)}),h=r.a.h2.withConfig({displayName:"styles__Description",componentId:"sc-11bybzw-6"})(["font-family:",";font-size:","rem;font-weight:400;margin:0;"],d.a,Object(d.b)(16));function y(e){var t=e.background,a=e.profileImage,i=e.title,r=(e.postsNumber,e.links,e.description),o=e.children,l=e.withTopBar,d=void 0!==l&&l,s=e.banner,y=void 0!==s&&s;return n.a.createElement(c,{withTopBar:d,white:y,large:y},t?n.a.createElement(m,{fluid:t,objectFit:"cover",objectPosition:"50% 50%",alt:"Title"}):n.a.createElement(p,{white:y}),n.a.createElement(g,null,a&&n.a.createElement(u,{fixed:a,alt:i}),i&&n.a.createElement(f,{large:y},i),r&&n.a.createElement(h,null,r),o))}a.d(t,"a",function(){return y})},224:function(e,t,a){"use strict";a.d(t,"a",function(){return i});a(216),a(43),a(214);var i=function(e,t){return e.map(function(e){var a=e.node,i=t.find(function(e){return e.node.slug===a.frontmatter.author});return n(a,i)})},n=function(e,t){return{id:e.id,slug:e.frontmatter.slug,tag:e.frontmatter&&e.frontmatter.tags&&e.frontmatter.tags[0],title:e.frontmatter.title,image:e.frontmatter&&e.frontmatter.feature_image&&e.frontmatter.feature_image.childImageSharp.fluid,excerpt:e.frontmatter.excerpt||e.excerpt,timeToRead:e.timeToRead,dateCreated:e.frontmatter.date_created||e.date_created,author:t&&t.node&&{name:t.node.name,image:t.node.profile_image&&t.node.profile_image.childImageSharp&&t.node.profile_image.childImageSharp.fixed}}}},229:function(e,t,a){"use strict";var i=a(0),n=a.n(i),r=a(222),o=a(223),l=a(225),d=a(213),s=a(215),c=d.a.div.withConfig({displayName:"styles__Content",componentId:"vzllmx-0"})(["position:relative;z-index:1;display:block;margin:-","px auto 0;max-width:","px;flex:1 0 auto;"],s.g,s.f),m=a(220);function p(e){var t=e.main,a=e.cardList;return n.a.createElement(l.a,{singlePage:!0},n.a.createElement(m.a,{data:{frontmatter:{title:t.title,excerpt:t.description}},contentType:"website"}),n.a.createElement(o.a,{background:t.image,title:t.title,description:t.description}),n.a.createElement(c,null,n.a.createElement(r.a,{cards:a,allEven:!0})))}a.d(t,"a",function(){return p})}}]);
//# sourceMappingURL=component---gatsby-ghost-theme-src-templates-author-js-275cfec9905ef1947d1d.js.map