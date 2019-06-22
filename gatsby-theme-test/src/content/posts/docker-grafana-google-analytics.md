---
layout: post
author: Ghost
title: Grafana Docker container and Google Analytics
excerpt: null
meta_description: >-
  Add environment variable to your Grafana Docker container with Google
  Analytics UA code.
meta_title: Grafana Docker container and Google Analytics
slug: docker-grafana-google-analytics
date: '2017-12-20T12:44:47.000Z'
date_created: '2017-12-20T12:39:48.000Z'
date_updated: '2017-12-29T23:30:35.000Z'
image: ./img/docker-containers.jpg
featured: false
draft: false
tags:
  - Docker
  - Backend
---
How easy is adding Google Analytics support to Grafana Docker container?

It's trivial.

Just add an environment variable to the Grafana container:

```sh
GF_ANALYTICS_GOOGLE_ANALYTICS_UA_ID=[YOUR_UA_ID]
```

Where:
- `YOUR_UA_ID` is your Google Analytics UA ID code e.g. UA-123123123-1

Of course, it will require container restart.

**NOTICE**

If you are using Ad Block plugin (like I do) you will have to disable it for your domain in order to test Google Analytics.
