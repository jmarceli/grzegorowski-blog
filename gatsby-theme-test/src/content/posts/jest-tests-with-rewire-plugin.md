---
layout: post
author: Ghost
title: How to run Jest tests with Rewire plugin
excerpt: >-
  How to make rewire work with Jest based test suite. Use babel-plugin-rewire to
  run Jest tests with rewire plugin. It will allow you to test Javascript module
  functions that are not exported.
meta_description: >-
  How to make Rewire work with Jest based test suite. Use babel-plugin-rewire to
  run tests with Rewire. It will allow you to test Javascript module functions
  that are not exported.
meta_title: How to run Jest tests with Rewire plugin
slug: jest-tests-with-rewire-plugin
date: '2018-07-20T08:33:17.000Z'
date_created: '2018-07-25T02:36:15.000Z'
date_updated: '2018-10-17T12:09:33.000Z'
image: >-
  ./img/photo-1478809956569-c7ce9654a947.jpg
featured: false
draft: false
tags:
  - Javascript
---
Another Jest connected post. How to test internal module functions that are not exported?

## Problem

I want to test internal function defined inside **./index.js** file without exporting it with `module.exports`. Let say that **./index.js** looks similar to this (implementation details are irrelevant):
```js
function someFunction(something) {
  return 'anything';
}
```

This function is not a part of public interface so exporting it just for testing with Jest seems like a bad idea/solution.
Of course the following test won't work:
```js
const someFunction = require('./index').__get__('someFunction');
describe('someFunction', () => {
  it('should work', () => {
    expect(someFunction()).toEqual('anything');
  });
});
```
The error message may looks as follows:

> TypeError: require(...).\_\_get__ is not a function

This is caused by lack of [rewire](https://github.com/jhnns/rewire) package (as you may expect).

## Solution

Use [babel-plugin-rewire](https://www.npmjs.com/package/babel-plugin-rewire) it's extremly easy to do. Just:

1. Install it with `yarn add --dev babel-plugin-rewire`
2. If you don't have `babel-jest` installed execute also `yarn add --dev babel-jest`
3. Add plugin to the **.babelrc** config file:

```javascript
{
  "plugins": ["babel-plugin-rewire"]
}
```

Now just run your tests as usual `yarn jest`. Everything should work smoothly.
You don't have to install `rewire` itself.

If you are trying/willing to run Jest tests with Flow typed Javascript files check my other article [Running Jest tests with Flow typed Javascript files](https://grzegorowski.com/jest-tests-flow-type).

## Issues

The one which cost me a lot of time to figure it out.

> TypeError: _get__(...) is not a function

According to the @joshnuss [Github answer](https://github.com/speedskater/babel-plugin-rewire/issues/109#issuecomment-202526786) with **babel-plugin-rewire** you can't actually use `__get__` method (or any other e.g. `__Rewire__`) for function/constant which is not referenced anywhere in your module file.

Example of a "buggy" module code which you won't be able to rewire and use `__get__` method.

```javascript
const test123 = () => {
  return true;
}
```

A "fixed" version (just reference `test123` anywhere it doesn't have to be even executed):

```javascript
const test123 = () => {
  return true;
}
test123;
```

And here is a test case which will fail if we use "buggy" implementation of the module.

```javascript
const test123 = require('./index').__get__('test123');

test('test123', () => {
  expect(test123()).toEqual(true);
});
```

When such case might happen? Well, for example if you try to test some currently unused function (e.g. just a new internal module function).

## Sources

https://www.npmjs.com/package/babel-plugin-rewire
https://github.com/facebook/jest/issues/1003
https://www.npmjs.com/package/babel-plugin-rewire
