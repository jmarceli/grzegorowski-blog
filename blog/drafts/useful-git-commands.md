---
layout: post
author: jan
title: Useful Git commands
excerpt: null
meta_description: null
meta_title: null
slug: useful-git-commands
date: null
date_created: '2017-04-07T18:57:45.000Z'
date_updated: '2017-04-07T19:04:21.000Z'
feature_image: null
featured: false
draft: true
tags: []
---
This will be a list of non-obvious Git commands that I frequently use with a short explanation.

## Adding git tag to selected commit
There is sometimes need for adding git tag to a specific commit.
```bash
git tag -a v2.1.1 1e75228 -m 'Another git tag'
```
Where:

- after `-a` there is a label in this case version number `v2.1.1`
- then there is the commit SHA in short version `1e75228`
- at the end after `-m` is the message
