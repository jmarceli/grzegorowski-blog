---
layout: post
author: jan
title: React Typescript library with Rollup and Jest - Storybook setup
excerpt:
meta_description: null
meta_title: null
slug: react-typescript-library-rollup-jest-part-storybook-setup
date_created: "2020-05-10T14:11:00.000Z"
feature_image: null
featured: false
draft: true
tags:
  - react
  - javascript
  - frontend
---

In this part of React Typescript library setup tutorial I will describe how you can add Storybook base documentation for your components.
If you want to start from the beginning you may go back to the [part 1](https://www.grzegorowski.com/react-typescript-library-rollup-jest-initialization) where initial Rollup and Typescript setup is described.

TLDR; You can check https://github.com/jmarceli/jmarceli-react-ts-library for fully working project setup.

## Overview

Without an automated (or at least semi-automated) documentation tool it is hard to convince others to use your custom React components.
Regardless if you are aiming at open source community or company internal project a nice looking documentation page will always be a very welcome feature.
Storybook is (currently in May 2020) the most popular tool used for this purpose.

## Install & setup Storybook

It is extremely easy to do with `npx` just execute:

```bash
npx -p @storybook/cli sb init --type react
```

After it finishes you should see two new directories created inside you project directory:

- **.storybook/** - configuration files for Storybook (with only one `main.js` file inside)
- **stories/** - examples of Storybook stories (story is just a fancy name for a component documentation page)

What is more you will see some additional Storybook related packages installed as well as two new commands `storybook` and `build-storybook`
which you can run through `npm` e.g. `npm run storybook` will start Storybook server with livereload.

## Customize Storybook

## Next steps

After completing tests setup it's probably time to ensure proper documentation of our React components library with Storybook.
It will be a topic for the next part of this tutorial (it is still a work in progress).

## Sources

- https://jestjs.io/docs/en/getting-started#using-typescript - Jest - Typescript interoperability
- https://testing-library.com/docs/react-testing-library/intro - React Testing Library

https://github.com/facebook/jest/issues/3094#issuecomment-385164816
https://jestjs.io/docs/en/webpack

https://www.typescriptlang.org/docs/handbook/compiler-options.html

https://www.google.com/search?q=parceljs+ENOENT%3A+no+such+file+or+directory%2C+open+bundle.js&pws=0&gl=us&gws_rd=cr

https://createapp.dev/parcel

https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#name
