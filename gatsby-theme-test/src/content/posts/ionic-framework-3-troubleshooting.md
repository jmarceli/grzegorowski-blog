---
layout: post
author: Ghost
title: Ionic Framework 3 - troubleshooting
excerpt: ''
meta_description: >-
  Ionic Framework v3. Error: The selector ion-app did not match any elements
  problem with descriptive solution
meta_title: null
slug: ionic-framework-3-troubleshooting
date: '2018-04-11T03:03:00.000Z'
date_created: '2018-04-13T02:00:28.000Z'
date_updated: '2018-09-15T12:23:50.000Z'
image: >-
  ./img/photo-1536349156324-682aa16f0c26.jpg
featured: false
draft: false
tags:
  - Javascript
  - Frontend
---
While playing with Ionic Framework v3 I came across few errors/problems which I would like to describe here.

## ion-app did not match eny elements

Exact error message is:

> ERROR Error: The selector "ion-app" did not match any elements

or/and:

> Unhandled Promise rejection: The selector "ion-app" did not match any elements ; Zone: <root> ; Task: Promise.then ; Value: Error: The selector "ion-app" did not match any elements

For me this wasn't descriptive enough to troubleshoot the issue instantly, but after spending some time debugging and rewriting my App I find out that this error means:

Application can't find `<ion-app></ion-app>` DOM element, so there is probably some issue with "root/main" template and Javascript interpreter/compiler can't find `<ion-app></ion-app>` inside this template. That is why Ionic is not rendered/bootstraped.

### Here is my case

My initial (buggy) `main.html` template:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Todos</title>
</head>

<body>
  <ion-app></ion-app>
</body>
</html>
```

It turns out that wrapping Ionic template with:
```html
<html>
</html>
```
was a terrible idea.

### Solution

In my case it was just removing `<html></html>` tags which wraps entire app template. So after modification `main.html` file looks as follows:

```html
<head>
  <title>Todos</title>
</head>

<body>
  <ion-app></ion-app>
</body>
```

Easy? Very easy if know what's going on...

## Auto opening new browser tab on every Ionic App start
That one drives me crazy. While it is fine for first run to pop-up a new tab with a developed App it doesn't make any sense in a long run. App restarts are required from time to time and auto-opening new tab becomes very annoying.

### Solution
Quick and easy if you know where to look for it. Head to the **package.json** file, find `"scripts"` section and replace:
```json
    "ionic:serve": "ionic-app-scripts serve"
```
with:
```json
    "ionic:serve": "ionic-app-scripts serve --nobrowser"
```
Now you may restart your App server as many times as you want without worring about opening new browser tab on each start.
