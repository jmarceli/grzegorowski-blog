---
layout: post
author: ghost
title: Traefik - Nginx replacement for Docker based deployment
excerpt: null
meta_description: null
meta_title: null
slug: traefik
date: null
date_created: '2018-10-21T09:59:51.000Z'
date_updated: '2018-11-06T00:07:28.000Z'
image: null
featured: false
draft: true
tags: []
---
Traefik is a relatively new alternative for Nginx proxy especially useful when used with Docker containers. There will be an example of Traefik configuration and usage with other containers.

In the end Traefik turns to be a really good choice but at the beginning I was having a lot of troubles with proper configuration. That's why I've decided to write this short post with sample setup.

## Problem
I was looking for an universal solution which will give me:
- Gzip compression
- Let's Encrypt SSL certificate
- routing to selected containers based on port number
