(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{211:function(e,t,a){"use strict";a.r(t);var i=a(0),n=a.n(i),r=(a(214),a(223)),o=a(222),d=a(225),l=a(229),s=a(213),c=a(219),p=a(215),m=a(217),u=s.a.div.withConfig({displayName:"styles__MenuWrapper",componentId:"sc-1qfwxir-0"})(["padding:0 12px;margin:0 0 -12px;"]),g=s.a.div.withConfig({displayName:"styles__Content",componentId:"sc-1qfwxir-1"})(["position:relative;z-index:1;display:block;margin:-","px auto 0;max-width:","px;flex:1 0 auto;"],p.g,p.f),f=s.a.div.withConfig({displayName:"styles__ButtonWrapper",componentId:"sc-1qfwxir-2"})(["margin:24px 12px 48px;@media (min-width:","px){margin:24px 24px 48px;}display:flex;justify-content:flex-end;"],p.d),h=Object(s.a)(c.a).withConfig({displayName:"styles__ButtonMore",componentId:"sc-1qfwxir-3"})(["color:#999;border-radius:20px;border:1px solid #999;padding:8px 16px;font-size:","rem;font-family:",";line-height:1.2;min-width:120px;text-align:center;&:hover{color:",";border-color:",";}"],Object(m.b)(12),m.a,p.e,p.e),y=a(224),w=a(220);function x(e){var t=e.data,a=e.posts,i=e.authors,s=Object(y.a)(a,i),c=i.find(function(e){return e.node.slug===t.frontmatter.author});return n.a.createElement(d.a,null,n.a.createElement(w.a,{data:t,author:c,contentType:"website"}),n.a.createElement(o.a,{title:t.frontmatter.title,description:t.frontmatter.excerpt,background:t.frontmatter.feature_image&&t.frontmatter.feature_image.childImageSharp&&t.frontmatter.feature_image.childImageSharp.fluid}),n.a.createElement(g,null,n.a.createElement(u,null,n.a.createElement(l.a,null)),n.a.createElement(r.a,{cards:s}),n.a.createElement(f,null,n.a.createElement(h,{to:"/archive",title:"Show all posts"},"View All Posts"))))}a(218);var b=a(221);a.d(t,"query",function(){return _});t.default=function(e){var t=e.data,a=e.pageContext;return n.a.useContext(b.a).setIsAmp(a.isAmp),n.a.createElement(x,{data:t.page,posts:t.posts.edges,authors:t.authors.edges})};var _="2970849127"},220:function(e,t,a){"use strict";a(12),a(43);var i=a(0),n=a.n(i),r=a(226),o=a.n(r);function d(e){var t=e.data,a=e.author,i=e.contentType,r={headline:t.frontmatter.meta_title||t.frontmatter.title,description:t.frontmatter.meta_description||t.frontmatter.excerpt||t.excerpt,datePublished:t.frontmatter.date_created,dateModified:t.frontmatter.date_updated,keywords:t.frontmatter.tags&&t.frontmatter.tags.join(", "),imageUrl:t.frontmatter.feature_image&&"https://grzegorowski.com/"+t.frontmatter.feature_image.relativePath,copyrightYear:t.frontmatter.date_created,author:a&&a.node&&a.node.name},d="website"===i?function(e,t){return[{type:"application/ld+json",innerHTML:JSON.stringify({"@context":"http://schema.org","@type":"WebSite",url:e.url,headline:e.headline,description:e.description,publisher:t&&{"@type":"Organization",logo:{type:"ImageObject",url:"https://grzegorowski.com/favicon.ico"},name:t},author:t&&{"@type":"Person",name:t},datePublished:e.datePublished,dateModified:e.dateModified,image:e.imageUrl&&[{"@type":"ImageObject",url:e.imageUrl}],copyrightHolder:t,copyrightYear:e.copyrightYear,creator:t,inLanguage:"en"})}]}(Object.assign({},r,{url:"https://www.grzegorowski.com"}),r.author):"author"===i?function(e){return[{type:"application/ld+json",innerHTML:JSON.stringify({"@context":"http://schema.org","@type":"Person",name:e.name,url:e.url,image:e.imageUrl&&{"@type":"ImageObject",url:e.imageUrl},nationality:"Polish",alumniOf:[{"@type":"CollegeOrUniversity",name:"Warsaw University of Technology",sameAs:["https://en.wikipedia.org/wiki/Warsaw_University_of_Technology","https://www.pw.edu.pl/engpw"]}],gender:"Male",description:"Full-stack developer",jobTitle:"Senior Software Engineer",worksFor:[{"@type":"Organization",name:"Equinix Inc.",sameAs:["https://www.equinix.com/","https://www.linkedin.com/company/equinix/","https://twitter.com/equinix"]}],address:{"@type":"PostalAddress",addressLocality:"Warsaw",addressCountry:"Poland"}})}]}({name:r.headline,imageUrl:r.imageUrl,url:"https://www.grzegorowski.com/"+t.slug}):"article"===i?function(e,t){return[{type:"application/ld+json",innerHTML:JSON.stringify({"@context":"http://schema.org","@type":"Article",publisher:t&&{"@type":"Organization",logo:{type:"ImageObject",url:"https://grzegorowski.com/favicon.ico"},name:t},author:t&&{"@type":"Person",name:t},headline:e.headline,description:e.description,datePublished:e.datePublished,dateModified:e.dateModified,keywords:e.keywords,image:e.imageUrl&&[{"@type":"ImageObject",url:e.imageUrl}],mainEntityOfPage:{"@type":"WebPage","@id":"https://grzegorowski.com/"},copyrightHolder:t,copyrightYear:e.copyrightYear,creator:t,inLanguage:"en"})}]}(r,r.author):function(e,t){return[{type:"application/ld+json",innerHTML:JSON.stringify({"@context":"http://schema.org","@type":"BlogPosting",publisher:{"@type":"Organization",logo:{type:"ImageObject",url:"https://grzegorowski.com/favicon.ico"},name:t},author:{"@type":"Person",name:t},headline:e.headline,description:e.description,datePublished:e.datePublished,dateModified:e.dateModified,keywords:e.keywords,image:e.imageUrl&&[{"@type":"ImageObject",url:e.imageUrl}],mainEntityOfPage:{"@type":"WebPage","@id":"https://grzegorowski.com/"},articleBody:e.articleBody,copyrightHolder:{"@type":"Person",name:t},copyrightYear:e.copyrightYear,creator:{"@type":"Person",name:t},inLanguage:"en"})}]}(r,r.author);return n.a.createElement(o.a,{script:d},n.a.createElement("title",null,r.headline),n.a.createElement("meta",{name:"description",content:r.description}),r.author&&n.a.createElement("meta",{name:"author",content:r.author}))}a.d(t,"a",function(){return d})},222:function(e,t,a){"use strict";var i=a(0),n=a.n(i),r=a(213),o=a(218),d=a.n(o),l=a(217),s=a(215),c=r.a.header.withConfig({displayName:"styles__Wrapper",componentId:"sc-11bybzw-0"})(["position:relative;padding-top:","px;padding-bottom:","px;min-height:","px;height:30vh;color:",";background:",";display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;"],function(e){return e.withTopBar?0:50},function(e){return e.withTopBar?0:s.g},function(e){var t=e.withTopBar,a=e.large;return t?450:a?600:400},function(e){return e.white?"#aaa":"#fff"},function(e){return e.white?"#fff":"rgba(0, 0, 0, 0.6)"}),p=Object(r.a)(d.a).withConfig({displayName:"styles__Background",componentId:"sc-11bybzw-1"})(["position:absolute !important;z-index:-1;top:0;bottom:0;left:0;right:0;width:100%;"]),m=r.a.div.withConfig({displayName:"styles__NoBackground",componentId:"sc-11bybzw-2"})(["position:absolute !important;z-index:-1;top:0;bottom:0;left:0;right:0;width:100%;background:",";"],function(e){return e.white?"#fff":"#000"}),u=r.a.div.withConfig({displayName:"styles__Container",componentId:"sc-11bybzw-3"})(["padding:12px 24px;max-width:900px;font-size:","rem;"],Object(l.b)(15)),g=Object(r.a)(d.a).withConfig({displayName:"styles__Avatar",componentId:"sc-11bybzw-4"})(["position:relative;border-radius:50%;overflow:hidden;box-shadow:0 0 0 6px hsla(0,0%,100%,0.1);"]),f=r.a.h1.withConfig({displayName:"styles__Title",componentId:"sc-11bybzw-5"})(["font-family:",";font-size:","rem;font-weight:600;margin:12px 0;"],l.a,function(e){var t=e.large;return Object(l.b)(t?128:24)}),h=r.a.h2.withConfig({displayName:"styles__Description",componentId:"sc-11bybzw-6"})(["font-family:",";font-size:","rem;font-weight:400;margin:0;"],l.a,Object(l.b)(16));function y(e){var t=e.background,a=e.profileImage,i=e.title,r=(e.postsNumber,e.links,e.description),o=e.children,d=e.withTopBar,l=void 0!==d&&d,s=e.banner,y=void 0!==s&&s;return n.a.createElement(c,{withTopBar:l,white:y,large:y},t?n.a.createElement(p,{fluid:t,objectFit:"cover",objectPosition:"50% 50%",alt:"Title"}):n.a.createElement(m,{white:y}),n.a.createElement(u,null,a&&n.a.createElement(g,{fixed:a,alt:i}),i&&n.a.createElement(f,{large:y},i),r&&n.a.createElement(h,null,r),o))}a.d(t,"a",function(){return y})},223:function(e,t,a){"use strict";var i=a(0),n=a.n(i),r=a(227),o=a(213),d=a(215),l=(o.a.aside.withConfig({displayName:"styles__Wrapper",componentId:"sc-29jysb-0"})(["background:#f4f8fb;"]),o.a.div.withConfig({displayName:"styles__Container",componentId:"sc-29jysb-1"})(["display:block;margin:0 auto;max-width:","px;"],d.f)),s=o.a.ul.withConfig({displayName:"styles__List",componentId:"sc-29jysb-2"})(["margin:0;padding:12px 0;@media (min-width:","px){padding:12px;}list-style:none;display:flex;flex-wrap:wrap;"],d.d),c={small:"50%",medium:"50%",large:"100%"},p={small:"33.333%",medium:"50%",large:"100%"},m=o.a.li.withConfig({displayName:"styles__Item",componentId:"sc-29jysb-3"})(["display:flex;flex:1 0 100%;@media (min-width:","px){flex:1 0 ",";}@media (min-width:","px){flex:1 0 ",";}width:100%;@media (min-width:","px){width:",";}@media (min-width:","px){width:",";}margin:0;@media (min-width:","px){min-height:","px;}padding:12px 8px;@media (min-width:","px){padding:12px;}",""],d.d,function(e){var t=e.size;return c[t]},d.c,function(e){var t=e.size;return p[t]},d.d,function(e){var t=e.size;return c[t]},d.c,function(e){var t=e.size;return p[t]},d.d,function(e){return"large"===e.size?"400":"460"},d.d,function(e){return e.featured?"padding: 6px;":""}),u=function(e,t){if(void 0===t&&(t=!1),!t){if(e%6==0)return"large";if(e%6==4||e%6==5)return"medium"}return"small"};t.a=function(e){var t=e.cards,a=e.allEven;return n.a.createElement(l,null,n.a.createElement(s,null,t.map(function(e,t){return n.a.createElement(m,{key:e.id,size:u(t,a),featured:!a&&0===t},n.a.createElement(r.a,{title:e.title,slug:e.slug,timeToRead:e.timeToRead,size:u(t,a),excerpt:e.excerpt,image:e.image,tag:e.tag,author:e.author,dateCreated:e.dateCreated}))})))}},224:function(e,t,a){"use strict";a.d(t,"a",function(){return i});a(216),a(43),a(214);var i=function(e,t){return e.map(function(e){var a=e.node,i=t.find(function(e){return e.node.slug===a.frontmatter.author});return n(a,i)})},n=function(e,t){return{id:e.id,slug:e.frontmatter.slug,tag:e.frontmatter&&e.frontmatter.tags&&e.frontmatter.tags[0],title:e.frontmatter.title,image:e.frontmatter&&e.frontmatter.feature_image&&e.frontmatter.feature_image.childImageSharp.fluid,excerpt:e.frontmatter.excerpt||e.excerpt,timeToRead:e.timeToRead,dateCreated:e.frontmatter.date_created||e.date_created,author:t&&t.node&&{name:t.node.name,image:t.node.profile_image&&t.node.profile_image.childImageSharp&&t.node.profile_image.childImageSharp.fixed}}}}}]);
//# sourceMappingURL=component---gatsby-ghost-theme-src-templates-home-js-62a5caff1fd5eb6bd826.js.map