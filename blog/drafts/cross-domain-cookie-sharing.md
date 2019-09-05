---
layout: post
author: jan
title: Cross-domain cookie sharing
excerpt: null
meta_description: null
meta_title: null
slug: cross-domain-cookie-sharing
date_created: '2017-12-09T06:22:33.000Z'
date_updated: '2018-09-15T13:25:21.000Z'
feature_image: null
featured: false
draft: true
tags: []
---
A few days ago I was asked to modify existing sites to share some info written inside a cookie files. My first response was "This is impossible because of cookie security policies", but after a moment I've realized that such cookie sharing scenario might be achieved using an old `<img src="..." />` trick. Here is how I manage to share a cookie stored informations across two completely different domains. Sharing across subdomains is much easier and doesn't require any "magic" (so it's not a subject of this article).

## How to share a cookie across domains?
It is of course impossible using standard solutions, no Javascript nor PHP or any other language can write a cookie info for a different domain than it's origin domain. This is crucial to ensure cookies security.

So how it can be done you may ask. The standard `<img/>` tag comes to the rescue.
On each website create an invisible image which source will be pointing to the other domain with some arbitrary GET argument which will have a value of you cookie value (urlencoded of course). This way each time your first site is opened the other page gets also required information about current cookie value.

Of course you have to write approperiate GET request handler for each site connected that way. Such code should set cookie value based on GET variable content (GET variables are automatically urldecoded).

## Cross-domain cookie caveats
As with every non-standard solution you should think about all possible quirks and bugs that may hit you.
Ajax requests for starters. Each request may change current cookie value which should be somehow handled by you website without page refreshing. 
