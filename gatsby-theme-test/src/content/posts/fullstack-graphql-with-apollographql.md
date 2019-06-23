---
layout: post
author: ghost
title: Fullstack GraphQL with ApolloGraphql - first impressions
excerpt: null
meta_description: null
meta_title: null
slug: fullstack-graphql-with-apollographql
date: null
date_created: '2018-09-24T21:32:39.000Z'
date_updated: '2018-09-21T17:57:04.000Z'
image: null
featured: false
draft: true
tags: []
---
<p>CONS</p><p>return null; catch</p><p>local state management not so intuitive (apollo-link-state)</p><p>subscriptions with Websockets it is a trap?</p><p>Verbose queries (especially mutations)</p><p>Not so much resources to learn from (e.g. refetch or other less used features are not documented)</p><p>catching errors (not working as expected)</p><p>hard to work with complex data (like deeply nested JSON format)</p><p>noticeable overhead for data transfer</p><p>hard to debug (at first) e.g. missing default value for local state, writeToStore.js:117 missing field ... in { ... }</p><p></p><p>PROS</p><p>Awesome for merging APIs/databases</p><p>loading, error states forces you to handle them</p><p>refetch - a nice addition</p><p>links concept - adding auth or WS is extremely easy</p><p>ease of use...</p>
