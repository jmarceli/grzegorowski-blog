---
layout: post
author: ghost
title: Ionic Framework - ionic-app-scripts live reload shows old content
excerpt: >-
  A solution for live reload "bug" while using ionic-app-scripts which causes
  showing old content after automatic page refresh.
meta_description: null
meta_title: null
slug: ionic-framework-live-reloading
date: '2018-05-09T14:54:00.000Z'
date_created: '2018-05-13T16:40:46.000Z'
date_updated: '2018-05-10T10:56:01.000Z'
image: >-
  ./img/photo-1504966981333-1ac8809be1ca.jpg
featured: false
draft: false
tags:
  - Frontend
---
A solution for live reload "bug" while using [ionic-app-scripts](https://github.com/ionic-team/ionic-app-scripts) which causes showing old content after automatic page refresh.

If you are developing Ionic PWA (Progressive Web App) you may encounter this strange and annoying live reload bug. Your content is updated only after refreshing page manually after the live reload triggers first page refresh.

**This behavior may be caused by the Service Workers inside your browser!**

Just update them after each page reload by checking an option **Update on reload** in Google Chrome Developer Tools inside **Application > Service Workers**:

![Screen-Shot-2018-05-10-at-08.41.43](./img/screen-shot-2018-05-10-at-08.41.43.png)

That should solve it, at least in my case that helps instantly.

## Sources
https://github.com/ionic-team/ionic-app-scripts/issues/825
https://github.com/ionic-team/ionic-app-scripts/issues/1432
https://github.com/ionic-team/ionic-app-scripts/issues/1132
and many more... (may or may be not related to that issue)
