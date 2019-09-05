---
layout: post
author: jan
title: Vim regex examples
excerpt: >-
  A list of Vim regex examples which might be useful for code/text refactoring.
  Remove non-matching characters at the beginning of the line.
meta_description: null
meta_title: null
slug: vim-regex-examples
date_created: '2017-04-15T20:14:45.000Z'
date_updated: '2018-05-07T02:17:02.000Z'
feature_image: >-
  img/photo-1461749280684-dccba630e2f6.jpg
featured: false
draft: false
tags:
  - vim
  - tools
---
A list of Vim regex examples which might be useful for code/text refactoring.

## Not something (excluding some character)
The regex below will match every non-space character and replace it with nothing (so it will be removed).

```bash
s/[^ ]*//c
```

Example line:
`2017-0-05 13:05:15` will become ` 13:05:15`

Explanation:
From the beginning of the line all non-space characters will be removed. Because there is no `g` (global) modifier the replacement process will stop after first encountered space.
