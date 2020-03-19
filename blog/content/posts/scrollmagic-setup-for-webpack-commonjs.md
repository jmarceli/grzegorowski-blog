---
layout: post
author: jan
title: ScrollMagic setup for Webpack (a CommonJS setup)
excerpt: null
meta_description: >-
  How to integrate ScrollMagic library with a custom Webpack build. CommonJS
  setup with npm dependency management.
meta_title: null
slug: scrollmagic-setup-for-webpack-commonjs
date_created: "2017-04-04T05:00:53.000Z"
date_updated: "2018-12-13T18:51:42.000Z"
feature_image: img/background-blur-bokeh-bright-220067.jpg
featured: false
draft: false
tags:
  - javascript
  - webpack
---

ScrollMagic is a great JS library which makes you page look lively. Here is how I manage to integrate it with my Webpack based build process.

For starters, install the ScrollMagic and GSAP via npm:

```bash
npm install --save-dev scrollmagic gsap
```

Adjust Webpack config (`webpack.config.js`) by adding:

```javascript
  resolve: {
    alias: {
        "TweenLite": path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
        "TweenMax": path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
        "TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
        "TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
        "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    },
  },
```

Then in your JS file use the following sample code, this is the file where you write all JS for your site e.g. `assets/js/custom.js` (name and path depends on your Webpack config):

```javascript
import ScrollMagic from "scrollmagic/scrollmagic/uncompressed/ScrollMagic";
import "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";
import TweenMax from "gsap/src/uncompressed/TweenMax";
import TimelineMax from "gsap/src/uncompressed/TimelineMax";

// init controller
const controller = new ScrollMagic.Controller();

// build scene
const scene = new ScrollMagic.Scene({
  triggerElement: "main.content",
  duration: 300,
  offset: -100,
})
  .setTween(".post-title", 0.5, { scale: 2.5 }) // trigger a TweenMax.to tween
  .addIndicators({ name: "2 (duration: 300)" }) // add indicators (requires plugin)
  .addTo(controller);
```

**NOTE**: If you want to use minified version (and you probably should in production) replace all _uncompressed_ with _minified_ and add _.min_ extensions to the file names. You should replace file paths in both places: JS file (e.g. `assets/js/custom.js`) and Webpack configuration (`webpack.config.js`).

If you use compressed version in you JS file and uncompressed inside Webpack config you will end up with the following error (or similar):

`Error: Cannot resolve module 'TweenMax'` or `Error: Cannot resolve module 'TimelineMax'`.

Examples for minified version:

```javascript
  resolve: {
    alias: {
        "TweenLite": path.resolve('node_modules', 'gsap/src/minified/TweenLite.min.js'),
        "TweenMax": path.resolve('node_modules', 'gsap/src/minified/TweenMax.min.js'),
        "TimelineLite": path.resolve('node_modules', 'gsap/src/minified/TimelineLite.min.js'),
        "TimelineMax": path.resolve('node_modules', 'gsap/src/minified/TimelineMax.min.js'),
        "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/ScrollMagic.min.js'),
        "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js'),
        "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js')
    },
  },
```

and

```javascript
import ScrollMagic from "scrollmagic/scrollmagic/minified/ScrollMagic.min";
import "scrollmagic/scrollmagic/minified/plugins/animation.gsap.min";
import "scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min";
import TweenMax from "gsap/src/minified/TweenMax.min";
import TimelineMax from "gsap/src/minified/TimelineMax.min";

// remaining JS code...
```

## Sources

https://github.com/janpaepke/ScrollMagic/wiki/Getting-Started-:-Using-AMD
