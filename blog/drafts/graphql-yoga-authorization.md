---
layout: post
author: jan
title: Graphql-yoga authorization
excerpt: null
meta_description: null
meta_title: null
slug: untitled
date_created: '2018-05-08T17:15:40.000Z'
date_updated: '2018-05-07T09:47:36.000Z'
feature_image: null
featured: false
draft: true
tags: []
---
https://github.com/LawJolla/prisma-auth0-example/blob/master/server/src/index.js
https://github.com/maticzav/graphql-shield
https://blog.graph.cool/graphql-directive-permissions-authorization-made-easy-54c076b5368e

authentication
http://www.passportjs.org/docs/authenticate/

There is no "Devise for NodeJS" except [Ooth](https://github.com/nmaro/ooth). Unfortunatelly Ooth doesn't have any programmatic API, so you can't use it with your custom (e.g. Graphql) "routes". It might be used as standalone microservice or integrated with its own routes `/auth/...`.
