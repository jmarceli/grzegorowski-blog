---
layout: post
author: ghost
title: React.PureComponent - different ways of writing event handlers
excerpt: >-
  Which handler implementation should be used with React.PureComponent to avoid
  unnecessary re-rendering.
meta_description: >-
  Which handler implementation should be used with React.PureComponent to avoid
  unnecessary re-rendering.
meta_title: null
slug: react-different-ways-of-passing-handlers-through-the-props
date: '2019-02-19T22:55:00.000Z'
date_created: '2019-03-03T23:56:03.000Z'
date_updated: '2019-02-24T10:36:11.000Z'
image: >-
  ./img/photo-1501281668745-f7f57925c3b4.jpg
featured: false
draft: false
tags:
  - React
  - Javascript
  - Frontend
---

There are many ways to define event handlers in React. Are there any differences between them?

TLDR; You should probably avoid the inline arrow functions and handlers defined in the `render()` method.

## Overview

Writing React handlers is easy, just take care of "it" and you're good to go.

```jsx
<button onClick={() => console.log('it works', this)}>Click me</button>
```

Are you sure?

## Example

A brief example of the various handler defining methods and their impact on the re-rendering of React.PureComponent based elements.

<iframe src="https://codesandbox.io/embed/wom604pn85?fontsize=14" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
<br/>

NOTE: You may open console in above example to see a value of `this` for each handler.

## Description

In the above example, you can see five ways to write click handlers.

### Handler defined outside of a component

Easy to write, but you won't be able to access `this` from within the handler, that's why most of the time it is not so useful.

```jsx
const handleClickOutsideClass = () => {
  console.log('click', this);
};
```

### Handler as a class method

This is probably the most "classic" way of handling events in React components.

```javascript
handleClickMethodBound() {
  console.log("click", this);
}
```

In most cases, you should remember to bind handler methods in the class constructor or remember that `this` will be `undefined` inside the handler.
Here is a binding implementation example:

```javascript
constructor(props) {
  super(props);
  this.handleClickMethodBound = this.handleClickMethodBound.bind(this);
}
```

While it might be important for your code to bind the handler method, it's also worth knowing that binding will slow down your code, [a little bit, but still](https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1#e821).

### Handler as a class property

The most elegant way to define event handler is through the Babel class properties.

```javascript
handleClickClassProp = () => {
  console.log('click', this);
};
```

In this method you can avoid binding inside the class constructor and still keep expected `this` assignment.
Of course you will have to use [@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) in order to make this work.
One more drawback of this method is a Babel transpilation result.
Class properties are transpiled to arrow functions in the class constructor.
It means that you won't be able to access them from outside the class e.g. to mock/spy them in tests, or use with super in subclasses.

### Handler inside render() method

In this method, a new handler function will be created on each re-render, which is probably not the desired behavior.

```javascript
render() {
  const handleClickInRender = () => {
    console.log("click", this);
  };
  // ... Remaining implementation
```

### Handler as an inline arrow function

Arrow functions may quickly solve `this` related issues.
This method has similar disadvantages to the handlers defined inside `render()` method.

```jsx
return <button onClick={() => console.log('click', this)}>Click me</button>;
```

You can use the inline arrow functions to avoid binding class methods in the class constructor, but drawbacks are still the same.
On each render, a new handler method will be created.

## Summary

As you can see it is easy to create handler function on each render, which is not necessarly something you want to do.
It seems that class methods with optional binding (if necessary) are still the best option to define event handlers.

## Sources

Official React guide on event handling is something worth checking https://reactjs.org/docs/handling-events.html
Detailed analysis of class properties solution
https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1
Comparison of transpiled class properties vs class methods
Stack Overflow question: https://stackoverflow.com/questions/49065425/should-class-methods-be-created-with-arrow-functions
Direct Babel REPL [link](https://babeljs.io/repl/#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=MYGwhgzhAEBiD29oFMAeAXZA7AJjASsmMOgHQDC8AtgA7xbbrQDeAUNNMPROgE4CuJeLwAUNXvBoQAlC3YdoEfjWSjxkmfI7oAFgEsIpHWFwhkAIXDQAvNF0GjJnGcthSAIz24R9zRwC-rPLGphbgIrJs8oGBrKCQMAjwAEwoGNh40ITEZJS09IxywU4uVrYRNgB8RQGs_kA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=es2015%2Creact%2Cstage-0&prettier=false&targets=&version=7.3.3)
