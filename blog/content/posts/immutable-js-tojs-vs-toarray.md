---
layout: post
author: jan
title: ImmutableJS .toJS() vs .toArray()
excerpt: >-
  Be careful with ImmutableJS and use .toArray() method rather than .toJS() if
  you need an array output.
meta_description: >-
  General advice is never converting ImmutableJS data structures with .toJS(),
  consider using .toArray() or any other conversion method.
meta_title: null
slug: immutable-js-tojs-vs-toarray
date: '2018-09-15T17:19:51.000Z'
date_created: '2018-07-29T11:46:14.000Z'
date_updated: '2018-09-15T18:41:36.000Z'
feature_image: >-
  img/photo-1522115900503-5dc493006ffd.jpg
featured: false
draft: false
tags:
  - javascript
---
General advice is to never convert data from [Immutable](https://facebook.github.io/immutable-js/) to native JS types. But if you have to do it use `.toArray()` rather than `.toJS()` of course if you work with some array-like data structure.

## Problem

Immutable is a great library if you need immutability of your code, unfortunately conversion between Immutable and native JS is terribly inefficient process.

## Solution

Here is my test case created using [benchmark](https://benchmarkjs.com/) library.

```javascript
const Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

const { List } = require('immutable');
const list = new List([1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10]));

// add tests
return suite

.add('toArray()', function() {
  const b = list.toArray();
})
.add('toJS()', function() {
  const b = list.toJS();
})

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
  .run();
```

You may copy/paste it if you want and run with:

```bash
node benchmark.js
```

Where **benchmark.js** is a path to the file with mentioned benchmark JS script.

Here are my results:

```bash
toArray() x 657,624 ops/sec ±0.99% (89 runs sampled)
toJS() x 189,606 ops/sec ±5.62% (64 runs sampled)
Fastest is toArray()
```

So try to avoid `.toJS()` whenever you can.
