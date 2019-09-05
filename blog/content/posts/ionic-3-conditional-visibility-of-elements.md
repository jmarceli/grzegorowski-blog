---
layout: post
author: jan
title: Ionic 3 show/hide content based on screen size
excerpt: >-
  How to add CSS classes hidden-xs, hidden-sm to Ionic 3 Framework in order to
  hide content based on current screen size.
meta_description: null
meta_title: null
slug: ionic-3-conditional-visibility-of-elements
date_created: '2018-07-02T09:23:24.000Z'
date_updated: '2018-06-14T10:50:47.000Z'
feature_image: >-
  img/photo-1464380573004-8ca85a08751a.jpg
featured: false
draft: false
tags:
  - frontend
---
Here is a complete Bootstrap-like solution for showing and hiding selected Ionic components based on screen size.

[Go to solution](#solution)
# Introduction
In Ionic 3 Framework we already have an option to show or hide elements for selected devices using [showWhen](https://ionicframework.com/docs/api/components/show-hide-when/ShowWhen/) and [hideWhen](https://ionicframework.com/docs/api/components/show-hide-when/HideWhen/). It is very convenient and well documented but it won't allow you to handle different screen sizes which is required sooner or later if your Ionic App handles both mobile and desktop devices.

One thing I try to avoid is building a non-reusable project specific solution. To achieve this the only possible solution seems to be using standard Ionic SCSS breakpoints as a base. Here is a default definition:
```scss
$screen-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px
)
```
It is taken from inside Ionic Framework SCSS files (you shouldn't do a copy/paste of above code) and it doesn't look like something that will change frequently. `$screen-breakpoints` are widely used by all Ionic SCSS files/rules and documented on official [overriding-ionic-variables](https://ionicframework.com/docs/theming/overriding-ionic-variables/) page. Let say that `$screen-breakpoints` looks like a fairly reliable choice for the purpose of creating universal Ionic show/hide solution.

The key benefit from using `$screen-breakpoints` is that generated CSS styles will work regardless of any changes/customizations that might be done to this SCSS variable. This covers adding/removing some breakpoint or changing breakpoint value. You may test it using [this gist](https://www.sassmeister.com/gist/d2af1ee566d454337663caa4b462c9b).

# Solution
It's time to write some SCSS code. My solution will be based on Bootstrap 4 convention `hidden-*` where elements with given class are hidden on selected screen size ([see bootstrap docs](https://v4-alpha.getbootstrap.com/layout/responsive-utilities/#available-classes)). Replicating `hidden-*-up` or `hidden-*-down` should be equally easy.

```scss
$breakpoints-keys: map-keys($screen-breakpoints);
$breakpoints-values: map-values($screen-breakpoints);
@for $i from 1 to length($breakpoints-keys)+1 {
  @if $i < length($breakpoints-keys) {
    .hidden-#{nth($breakpoints-keys, $i)} {
      @media (min-width: nth($breakpoints-values, $i)) and (max-width: #{nth($breakpoints-values, $i+1)}) {
        display: none;
      }
    }
  } @else {
    .hidden-#{nth($breakpoints-keys, $i)} {
      @media (min-width: nth($breakpoints-values, $i)) {
        display: none;
      }
    }
  }
}
```
Why it looks so scary? Well I didn't find any other option to iterate over a [SCSS map](http://sass-lang.com/documentation/Sass/Script/Functions.html) with numerical index. The only option was to get map keys with `map-keys()` and then iterate over them with a regular `@for` loop.

If you would like to see a CSS output of the code please check my [SCSS gist](https://www.sassmeister.com/gist/d2af1ee566d454337663caa4b462c9ba).

# How to use it?
Just declare mentioned **SCSS** code somewhere in you Ionic SCSS files e.g. inside **src/app/show-hide-screen-size.scss** and then import it (with `@import "./show-hide-screen-size";`) to the main SCSS file e.g. **src/app/app.scss**.

Now you may add `hidden-xs hidden-sm hidden-md hidden-lg hidden-xl` classes to any HTML element to hide it for selected screen size e.g.
```html
<div class="hidden-xs hidden-lg">
Not visible on XS and LG screens, but visible on any other screen sizes
</div>
```

# Code description
Let's start from the beginning.

First we need to get keys (e.g. `xs`, `sm`, etc.) and values (e.g. `0`, `576px`, etc.) from `$screen-breakpoints` map to be able to reference them using numerical index which will allow to look ahead of current index and get `max-width` value.
```scss
$breakpoints-keys: map-keys($screen-breakpoints);
$breakpoints-values: map-values($screen-breakpoints);
```

Then there is a loop over all breakpoints which generates a CSS rules. Please note that lists in SCSS are indexed from `1` to `n+1` (which is kind of tricky if you are used to any "normal" programming language).
```scss
@for $i from 1 to length($breakpoints-keys)+1 {
  ...
}
```

Unfortunately there is no easy/readable way of handling an edge case which is last breakpoint `hidden-xl` where `max-width` limit should be omitted thus this ugly `@if` construction seems to be required:
```scss
  @if $i < length($breakpoints-keys) {
    ...
  } @else {
    ...
  }
}
```

Now look at code which generates a common CSS rule `@media (min-width: ...) and (max-width: ...)`. As you can see for a lower bound `min-width` we take current index `$i` while an upper bound `max-width` is generated using next index `$i+1`. A second value selected from `$breakpoints-values` will always be larger than the first one. This is exactly what we need here.
```scss
.hidden-#{nth($breakpoints-keys, $i)} {
  @media (min-width: nth($breakpoints-values, $i)) and (max-width: #{nth($breakpoints-values, $i+1)}) {
    display: none;
  }
}
```

Lastly an "edge case" of last CSS rule has to be handled. It is generated using same structure as before but without upper bound `max-width:...`
```scss
.hidden-#{nth($breakpoints-keys, $i)} {
  @media (min-width: nth($breakpoints-values, $i)) {
    display: none;
  }
}
```

# Sources
https://forum.ionicframework.com/t/how-do-i-hide-or-show-content-depending-on-screen-size/94081/11
https://ionicframework.com/docs/theming/overriding-ionic-variables/
http://sass-lang.com/documentation/Sass/Script/Functions.html
