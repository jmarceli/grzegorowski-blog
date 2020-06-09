---
layout: post
author: jan
title: React Typescript library with Rollup and Jest - tests setup
excerpt: How to add Jest to React Typescript library with React Testing Library framework
meta_description: null
meta_title: null
slug: react-typescript-library-rollup-jest-tests-setup
date_created: "2020-05-02T14:11:00.000Z"
feature_image: img/dollar-gill-9SF_lNr5Cz8-unsplash.jpg
featured: false
tags:
  - react
  - javascript
  - frontend
---

If you are starting from this page I would suggest you to go back to the [part 1 of this tutorial](https://www.grzegorowski.com/react-typescript-library-rollup-jest-initialization) where initial Rollup and Typescript setup is described.
You can check https://github.com/jmarceli/jmarceli-react-ts-library for fully working project setup.

## Overview

In this part of the tutorial I will show you how to add automated tests and documentation to your React components library.
My framework of choice for testing is Jest because of its ease of use and React Testing Library which helps you write maintainable tests for React applications.

## Add simple Typescript file with function exported

To ease things a bit I will start by adding a simple Typescript file which exports just one function.
This will let me test Jest without need to install any other framework.

**src/common/someFunction.ts**

```js
export const someFunction = () => {
  return "test";
};
```

If you want to make this function available after importing your package it should be also exported from the entrypoint file which is in this case **src/index.ts**.

**src/index.ts**

```js
// existing file content...
export { someFunction } from "./common/someFunction";
```

Next I will go and try to test this function with Jest testing framework.

## Automated Jest tests

Adding Javascript tests with Jest is extremely simple, the only thing you have to do is installing `jest` package in your project.
Unfortunately if you need a full Typescript support `jest` package won't be enough.
Once more you will have to choose from Babel and Typescript for source code transpilation.
Similarly to the case with project code transpilation this time also Babel will give you limited TS support (https://jestjs.io/docs/en/getting-started#using-typescript) while the other approach `ts-jest` can give you more.
I will stay with full Typescript support and present the solution based on `ts-jest`.
Here is what you will need to install before adding any test files.

```bash
npm install --save-dev jest ts-jest @types/jest
```

Now you should also adjust content of the **package.json** file:

By adding `"test"` script definition, so it will run Jest by default:

```js
// file content...
"scripts": {
  // existing scripts...
  "test": "jest"
},
// remaining content...
```

Then appending following lines to enable Typescript detection and transpilation:

```js
  // file content...
  "jest": {
    "transform": {
      ".(ts|tsx)": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js"
    ]
  },
  // remaining content...
```

That's it.
Now you can try to run `npm run test` to see that Jest is trying to run your tests.
But wait, you are probably getting an error right now similar to this one:

```bash
No tests found, exiting with code 1
Run with `--passWithNoTests` to exit with code 0
In /Your/project/path
  13 files checked.
  testMatch:  - 0 matches
  testPathIgnorePatterns: /node_modules/ - 13 matches
  testRegex: (/__tests__/.*|\.(test|spec))\.(ts|tsx|js)$ - 0 matches
```

The reason is as obvious as you may think.
As for now we didn't write even single test, so there is nothing for Jest to run.
In the next point I will show how we can improve that.

## Adding simple Jest test

Thanks to creating our simple Typescript file **src/common/someFunction.ts** we can now start with a very basic Jest test.
This as simple as adding following file.

**src/common/someFunction.test.ts**

```js
import { someFunction } from "./someFunction";

describe("someFunction()", () => {
  test("return value", () => {
    expect(someFunction()).toBe("test");
  });
});
```

Now `npm run test` should return something similar to:

```bash
 PASS  src/common/someFunction.test.ts
  someFunction()
    ✓ return value (1ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.38s, estimated 2s
Ran all test suites.
```

It means that Jest is properly setup and ready to use.

## React and Jest with React Testing Library

Testing Typescript functions is one thing but ultimately we are aiming at testing React components through rendering them.
A convenient way to write implementation agnostic tests is React Testing Library (https://testing-library.com/docs/react-testing-library/intro).
This framework will encourage you to write tests which are output oriented instead of tight to the implementation details.
Let's start with React Testing Library installation, you will also need `react-dom` for rendering tested components to HTML.

```bash
npm install --save-dev @testing-library/react react-dom
```

Now when we have the framework in place it's time to add a test.
Here is a file with test code.

**src/component/Component.test.tsx**

```js
import React from "react";
import { render, screen } from "@testing-library/react";

import { Component } from "./Component";

describe("<Component />", () => {
  test("rendered text", () => {
    render(<Component />);
    expect(screen.getByText("sample component")).toBeDefined();
  });
});
```

Once more running tests should be successful.
Jest will automatically detect new test file and report two passed test cases.

```bash
 PASS  src/common/someFunction.test.ts
 PASS  src/component/Component.test.tsx

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        3.296s
Ran all test suites.
```

## Next steps

After completing tests setup it's probably time to ensure proper documentation of our React components library with Storybook.
It will be a topic for the next part of this tutorial (it is still a work in progress).

## Sources

- https://jestjs.io/docs/en/getting-started#using-typescript - Jest - Typescript interoperability
- https://testing-library.com/docs/react-testing-library/intro - React Testing Library
