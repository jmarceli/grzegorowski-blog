---
layout: post
author: jan
title: Electron opening link in a new window
excerpt: How to open link inside Electron application in a new window
slug: electron-open-in-new-window
date_created: "2019-05-11T18:28:50.000Z"
date_updated: "2019-05-11T18:28:50.000Z"
feature_image: ./img/raphael-biscaldi-5PEy9UraJ5c-unsplash.jpg
featured: false
draft: false
tags:
  - javascript
---

Opening a link in a new window/tab is not a big deal when working with a regular single page application rendered inside browser.
Usually all you have to do is define additional `target="_blank"` attribute for your `<a></a>` element.
This is a bit different story when it comes to the Electron desktop applications.

## Problem

How to open link in your Electron application in a system browser instead of replacing the application?

I would say that this is a very common requirement if you are referring to any online content like documentation.
By default every link defined inside Electron application will be opened in the same window replacing your application which is a bit confusing as a user doesn't know why it is not opened in the system browser as usual.
Unfortunately, simple `target="_blank"` attribute added to the `<a></a>` element will not work with Electron.

The simplest way of solving this issue seems to be:

```js
require("electron").shell.openExternal(YOUR_URL_HERE);
```

This is a bit oversimplified.
First of all you may not have an access to the `electron` package from your frontend code (e.g. in case of externally loaded React application).
What is more with that solution you would have to rewrite all the links to use `onClick` event instead of a very convenient `href` attribute.

Because of those limitations I would rather go with another approach.

## Solution

In your **electron.js** file you should be able to define new event handler which will handle all [`new-window` events](https://github.com/electron/electron/blob/master/docs/api/web-contents.md#event-new-window).
These events are dispatched when user clicks on `<a>` link with `target="_blank"` attribute.

**electron.js**

```js
const { app, shell, BrowserWindow } = require("electron");

// Create the browser window.
mainWindow = new BrowserWindow({
  width: 1300,
  height: 800,
});

// Load your React app or any other HTML which creates your Electron app content
mainWindow.loadFile("./build/index.html");

// This is the actual solution
mainWindow.webContents.on("new-window", function(event, url) {
  event.preventDefault();
  shell.openExternal(url);
});
```

Here we are also using mentioned [Electron shell API](https://electronjs.org/docs/api/shell#shellopenexternalurl-options) but thanks to the event-based approach there is no need rewrite existing application code.
What is more it lets you reuse same codebase for desktop and web application.
With a regular `<a href="..." target="_blank"></a>` and a custom handler Electron will open given URL in a new window/tab in a default system browser (Google Chrome in my case).

## Possible issues

However there is one catch, if you add mentioned handler to `mainWindow` instead of `mainWindow.webContents` you will end up with opening new Electron window instead of a new tab in the default system browser.
Electron windows doesn't have any controls or address bar, so effectively they are looking like application pop-ups, which might be not the best option to present external websites.

Here is the invalid implementation:

```js
// This is an INVALID solution
mainWindow.on("new-window", function(event, url) {
  event.preventDefault();
  shell.openExternal(url);
});
```

## Sources

- Github issue - https://github.com/electron/electron/issues/1344
- Official docs (shell.openExternal()) - https://electronjs.org/docs/api/shell#shellopenexternalurl-options
- Official docs (new-window event) - https://github.com/electron/electron/blob/master/docs/api/web-contents.md#event-new-window
