---
layout: post
author: jan
title: >-
  React.Component vs React.PureComponent vs React Stateless Functional Component
  rendering performance
excerpt: null
meta_description: null
meta_title: null
slug: >-
  react-component-vs-react-purecomponent-vs-react-stateless-functional-component-rendering-performance
date: null
date_created: '2019-03-22T01:48:58.000Z'
date_updated: '2019-03-21T00:11:01.000Z'
feature_image: null
featured: false
draft: true
tags: []
---
Is there any difference in terms of rendering performance between React.Component, React.PureComponent and Stateless Functional Component?

## Example

<iframe src="https://codesandbox.io/embed/24181026rr?fontsize=14&view=editor" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Results

As we can see/measure, there are no big differences in terms of rendering time for each of the components, however each time I run those tests Functional Stateless components turns to be a bit faster that the others.
The real deal breaker is conversion of Functional Component into a simple function, the peformance improvement in this simple test was massive.

## Description

15 runs of example code results in the following avarage rendering times:

- **2 ms** - FuncNoMountTest
- 54 ms - FuncTest
- 57 ms - Test
- 57 ms -PureTest


## Links
https://medium.com/missive-app/45-faster-react-functional-components-now-3509a668e69f - functional components made faster
https://github.com/reactjs/reactjs.org/issues/639 - functional components improvements in React 16
