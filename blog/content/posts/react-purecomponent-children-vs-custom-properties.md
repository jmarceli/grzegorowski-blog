---
layout: post
author: jan
title: React.PureComponent - children vs custom properties
excerpt: >-
  Is there any catch in using children property with React.PureComponent? It can
  be used with children property as long as you are using component carefully.
meta_description: >-
  Is there any catch in using children property with React.PureComponent?
  Children property can be used as long as you are using component carefully.
meta_title: null
slug: react-purecomponent-children-vs-custom-properties
date_created: '2019-02-27T14:11:00.000Z'
date_updated: '2019-02-23T13:04:06.000Z'
feature_image: >-
  img/photo-1503847752244-32e931070a43.jpg
featured: false
draft: false
tags:
  - react
  - javascript
  - frontend
---
Can I use the `children` property with React.PureComponent, or do I have to use only custom properties?

TLDR; You can use `children` with React.PureComponent as long as you use your component carefully. It is much easier to make a "mistake" with `children`.

## Overview

Pure Components were introduced to facilitate limiting the re-rendering after component properties/state update.
They do this by using a shallow equality comparison inside `shouldComponentUpdate()`, [see the official React documentation](https://reactjs.org/docs/react-api.html#reactpurecomponent)
This comparison is used for every property, including `children` property as well as component internal state.

## Example

Here's an example with different implementations that use React.Component or React.PureComponent as a base class.

<iframe src="https://codesandbox.io/embed/r0k3oywn44?fontsize=14&view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

<br/>

Components used in this example:

- PureWithChildren - React PureComponent, which uses the `children` property
- PureWithLabel - React PureComponent, which uses the `label` property
- RegularWithChildren - React Component, which uses the `children` property
- RegularWithLabel - React Component, which uses the `label` property

Regular React.Component is re-rendered each time it receives new properties, even if they are equal to old.
On the other, hand React.PureComponent is re-rendered only if new properties are different from the old ones.

## Description

The above example shows that using PureComponents is much easier when they have custom properties such as `label` instead of the generic `children` property.
This is especially important if we look at interpolated strings.
For the `label` property it works expected, but in the case of `children` additional renders may surprise the developer.
The reason for this behavior is that `children` are passed as an array while `label` is simply a string (interpolated but still a string).
Arrays are not shallow equal to each other and therefore `children` are always re-rendered despite the lack of changes.

React.PureComponent can be used with the `children` property, but with caution (probably along with some type checking using Flow/Typescript/PropTypes).
The above example can be refactored to prevent problematic array values for `children` by adding:

```js
PureWithChildren.propTypes = {
  children: PropTypes.string
};
```

Then the correct component usage would be:

```js
<PureWithChildren>{`string ${data}`}</PureWithChildren>
```

## Sources

Official documentation for React.PureComponent:
https://reactjs.org/docs/react-api.html#reactpurecomponent

Other interesting posts on this topic:
https://blog.cloudboost.io/react-purecomponents-children-979e3da15ba8
https://medium.com/@antonkorzunov/2-things-about-purecomponent-you-probable-should-know-b04844a90d4
https://blog.shakacode.com/react-purecomponent-pitfalls-d057882f4b6e
