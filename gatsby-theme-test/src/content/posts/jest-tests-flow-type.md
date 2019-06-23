---
layout: post
author: ghost
title: Running Jest tests with Flow typed Javascript files
excerpt: How to support Flow type checking in Jest testing framework.
meta_description: >-
  How to support Flow type checked files in Jest testing framework. Use babel
  plugin to add Jest Flow support.
meta_title: Running Jest tests on Flow type checked Javascript files
slug: jest-tests-flow-type
date: '2018-07-18T09:29:00.000Z'
date_created: '2018-07-28T14:51:37.000Z'
date_updated: '2018-10-17T12:12:45.000Z'
image: >-
  ./img/photo-1518133910546-b6c2fb7d79e3.jpg
featured: false
draft: false
tags:
  - Javascript
---
This will be a simple tutorial about running Jest tests with Flow typed Javascript files in NodeJS project.

## Problem

Recently I've started adding [Flow](https://github.com/facebook/flow) types to my existing NodeJS project which uses [Jest](https://github.com/facebook/jest) testing framework. It turns out immidiately that there is no "out of the box" support for Flow in Jest. This is strange for me because both are Facebook products, so I was hoping for seamless integration.

## Solution

There is a quite simple solution which is based on two Babel originated packages: [babel-jest](https://github.com/babel/babel-jest) and [babel-plugin-transform-flow-strip-types](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-flow-strip-types).
Install them with:
```bash
yarn add --dev babel-jest babel-plugin-transform-flow-strip-types
```

Then adjust configuration inside **.babelrc** file as described on [babel-plugin-transform-flow-strip-types](https://www.npmjs.com/package/babel-plugin-transform-flow-strip-types) NPM repository page:

```json
{
  "plugins": ["transform-flow-strip-types"]
}
```

Now after executing `yarn jest` all my Flow type hinted JS files works as expected.

No **jest.config.js** modification required!

## Issues

While trying to get Jest tests to work with Flow I've got one problem - a dead end. It was [jest-flow-transform](https://www.npmjs.com/package/jest-flow-transform) package. Despite declaring approperiate configuration inside **jest.config.js** file in `transform` section I was constantly getting a message:

> TypeError: ...mockResolvedValue is not a function

I didn't find any solution for that and move on to **babel-jest** which is described above in a [solution](#solution) section.

## Create React App (CRA) Jest tests

If you are using [Create React App](https://github.com/facebookincubator/create-react-app) and Jest tests reports a lot of Flow bugs just install `jest` directly with:
```bash
yarn flow-typed install jest@20.0.4
```

You should replace `20.0.4` with whichever Jest version is currently used by CRA (check it with `yarn list | grep jest`). Unfortunatelly, there seems to be no way to automatically install Flow definitions for Jest. See [CRA #3904](https://github.com/facebook/create-react-app/issues/3904) for more info.
