---
layout: post
author: jan
title: Custom scrollbars for HTML elements
excerpt: null
meta_description: null
meta_title: null
slug: custom-scrollbars-for-html-elements
date_created: '2017-03-20T21:43:13.000Z'
date_updated: '2017-03-30T16:57:43.000Z'
feature_image: null
featured: false
draft: false
tags:
  - javascript
  - frontend
  - github-libraries
---
Sometimes your website may need inner scrolling for an element with overflowing content. In most cases using simple:

```css
overflow: scroll;
```

is not enough to achieve the desired result (nice scrollbars for HTML element e.g. `<div>`).

Styling scrollbars for overflowing content is a nightmare using pure CSS techniques (if you want a decent browser support). The only reasonable solution seems to be a solid JS library. Fortunately, there is one available as a [perfect-scrollbar](https://github.com/noraesae/perfect-scrollbar) Github project.

With this awesome library, all you need to do is just initialize it with a wrapper selector for your overflowing content.

```javascript
$('.wrapper').perfectScrollbar();
```

`.wrapper` is an element which width or height is smaller than its content and it should have following styles applied (if you don't want to use default `perfect-scrollbar` css):

```css
.wrapper {
  overflow: hidden;
  position: relative;
}
```

The examples provided in the docs should be just enough to get you started, so I won't rewrite them here.

## A use case

Here is how it looks on one of my recent projects (real usage example). The website was a simple long page with one horizontally scrolled section which was expanded on mobile to one long column:

```javascript
import $ from 'jquery';
require('perfect-scrollbar/jquery')($);

export default class HorizontalSection {
  constructor() {
    this.ready = this.ready.bind(this);
    this.resize = this.resize.bind(this);

    $(document).ready(this.ready);
  }

  // initialize after document is ready
  ready() {
    this.$element = $('.Days-wrapper');

    $(window).resize(this.resize);

    this.resize();
  }

  // handles scrollbars after resizing screen
  resize() {
    if ( $('html').hasClass('touchevents') && $(window).width() < 540 ) {
      // disable for small mobile screens
      this.$element.perfectScrollbar('destroy');
      return;
    }

    if ( this.$element.hasClass('ps-container') ) {
      // is already initialized
      this.$element.perfectScrollbar('update');
    } else {
      // initialize
      this.init();
    }
  }

  // initialize scrollbars
  init() {
    this.$element.perfectScrollbar({
      suppressScrollY: true
    });
  }
}

```

As you may see for smaller screens where horizontal scrolling is not used I've disabled the perfect-scrollbar because it may prevent the user from scrolling vertically (in some edge cases).
