---
layout: post
author: ghost
title: DNS configuration to delegate only website to other hosting
excerpt: null
meta_description: >-
  How to delegate only www website hosting and keep email handling for current
  hosting provider.
meta_title: Delegate hosting to other provider without full DNS delegation
slug: dns-configuration-to-delegate-only-website-to-other-hosting
date: '2018-03-11T03:01:41.000Z'
date_created: '2018-01-24T10:14:58.000Z'
date_updated: '2018-03-11T03:01:41.000Z'
image: ./img/deploy.jpg
featured: false
draft: false
tags:
  - Hostings
---
That was the case in my recent project where a client wants to use his current hosting provider for email but generally, it was advisable to change hosting due to performance reasons.

The solution is easy if you have done it at least once :)
It's enough to change domain **A** record to point the target hosting provider sever IP.

Example:
Let's say I own **grzegorowski.com** and my hosting provider is **myprovider.test** with server IP **10.10.0.1**, so my DNS record looks similar to:

```
Record Type: A
Record Name: grzegorowski.com
Target: 10.10.0.1
```

If I want to change only hosting provider to **otherprovider.test** with server IP **10.10.5.5** without changing email configuration, I will have to modify my DNS **A** record to:

```
Record Type: A
Record Name: grzegorowski.com
Target: 10.10.5.5
```

Of course, in order to serve a website from **otherprovider.test** server I will have to prepare SOA zone in his admin panel for the delegated **grzegorowski.com** domain (similarly to the regular full DNS delegation).

The SOA zone is generaly created by adding your target domain to the server admin panel.
