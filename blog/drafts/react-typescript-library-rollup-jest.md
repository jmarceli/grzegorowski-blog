---
layout: post
author: jan
title: React Typescript library with Rollup and Jest
excerpt:
meta_description: null
meta_title: null
slug: react-typescript-library-rollup-jest
date_created: "2020-03-15T14:11:00.000Z"
feature_image: null
featured: false
draft: true
tags:
  - react
  - javascript
  - frontend
---

Here is a tutorial which will show you how to create your own NPM package with React components written in Typescript.

## Motivation

As for now it seems that there is no reliable React library builder which you can safely base on while creating your own React package. The two most popular (at the time of writing this post) are:

- [create-react-library](https://github.com/transitive-bullshit/create-react-library)
- [tsdx](https://github.com/jaredpalmer/tsdx)

Unfortunately, both of them seems to be not actively maintained thus all dependencies are outdated which might cause significant issues. While it is possible to upgrade create-react-library on your own it is not that easy in case of tsdx which is not a boilerplate but a standalone CLI.

## Description

## Sources

https://github.com/facebook/jest/issues/3094#issuecomment-385164816
https://jestjs.io/docs/en/webpack

https://www.typescriptlang.org/docs/handbook/compiler-options.html

https://www.google.com/search?q=parceljs+ENOENT%3A+no+such+file+or+directory%2C+open+bundle.js&pws=0&gl=us&gws_rd=cr

https://createapp.dev/parcel

https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#name
