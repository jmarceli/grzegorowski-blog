---
layout: post
author: jan
title: How to mock global window variables with Jest
excerpt: Surprisingly mocking global variables with Jest is not as straight forward as you may expect
slug: how-to-mock-global-window-with-jest
date_created: "2020-01-12T14:00:00.000Z"
feature_image: ./img/photo-of-clear-glass-measuring-cup-lot-1366942.jpg
tags:
  - javascript
  - frontend
---

While generally everything is extremely easy using Jest,
mocking global variables is one thing which is left up to developer.
You can achieve mocked global variables using couple of different approaches.
Here I will describe three of them but definitely you can think of more.

## Example 1. Mocking already existing window variables

As we can see tested function uses globally available `window.location` variables.
Those variables are provided by `jsdom` by default which let's us to mock them using
built-in `jest` methods `jest.spyOn()`, `.mockImplementation()` and restore with `.mockRestore()`.

```js
const navigateToNextLocation = () => {
  const loc = window.location.href + "/next";
  window.location.replace(loc);
};

test("window nested variables mocking", () => {
  // setup
  const mockedReplace = jest.fn();
  // without making a copy you will have a circular dependency problem during mocking
  const originalWindow = { ...window };
  const windowSpy = jest.spyOn(global, "window", "get");
  windowSpy.mockImplementation(() => ({
    ...originalWindow,
    location: {
      ...originalWindow.location,
      href: "http://my.test/page",
      replace: mockedReplace,
    },
  }));

  // tests
  navigateToNextLocation();

  // assertions
  expect(mockedReplace).toBeCalledWith("http://my.test/page/next");

  // cleanup
  windowSpy.mockRestore();
});
```

Please note that if you try to mock those variables directly
(as in the second example e.g. `window.location.href = 'http://my.test/page'`)
you will get an error message:

```bash
Error: Not implemented: navigation (except hash changes)
```

Which means that `jsdom` doesn't implement changing current page through direct `window.location.href` assignment.
That is why `jest.spyOn()` and `.mockImplementation()` looks like a best option for mocking existing `window` variables.

Of course this approach might be also used for other `window` variables like `window.open` or `window.origin` etc.

## Example 2. Mocking non-existent globals

In case of variables which are globally available but are not provided by `jsdom` by default
e.g. various API libraries like Google Maps API `google` or `window.google` variable the only option is to
mock them by direct assignment at the beginning of the test.
An important point here is to not forget about resetting them back after test is done.
Here is the example.

```js
const getGoogleMaps = () => {
  return global.google.maps;
};

test("direct global variable", () => {
  // setup
  const originalGoogle = global.google;
  global.google = { maps: "test" };

  // tests
  const maps = getGoogleMaps();

  // assertions
  expect(maps).toBe("test");

  // cleanup
  global.google = originalGoogle;
});
```

### Example 3. Don't use globals directly

There is also one last approach to writing code, which is don't use globals directly anywhere just re-export them from a file.
Such an approach let's you decouple from direct dependency on problematic globals and eases testing through the standard Jest API.
It seems to be the cleanest solution if only you are able to apply necessary changes to the codebase.
Referring to our previous Google Maps API example your code and tests might look like this:

**./googleApi.js**

```js
export const googleApi = window.google;
```

**./getGoogleMaps.js**

```js
import { googleApi } from "./googleApi";
const getGoogleMaps = () => {
  return googleApi.maps;
};
```

**./getGoogleMaps.test.js**

```js
test("it works", () => {
  // setup
  jest.resetModules(); // to make sure that require will return a new module instance
  jest.mock("./googleApi", () => ({ googleApi: { maps: "test" } })); // mock whatever you want, even constants
  const { getGoogleMaps } = require("./getGoogleMaps"); // import tested module

  // tests
  const maps = getGoogleMaps();

  // assertions
  expect(maps).toBe("test");

  // cleanup
  jest.resetModules(); // not required if you resetModules() at the beginning of each test case
});
```

It is fairly easy to use Jest here, one important thing is to properly mock
variable exported by the global wrapper file (in this case I mean **./googleApi.js**).
The approach shown above is covering the case when you want to mock a constant exported
from a module.

If you decide to export your globals as a result of a module function execution you
will get even cleaner tests using standard `.mockImplementation()` approach.
Here is an example:

**./getGoogleApi.js**

```js
export const getGoogleApi = () => {
  return window.google;
};
```

**./getGoogleMaps.js**

```js
import { getGoogleApi } from "./getGoogleApi";
const getGoogleMaps = () => {
  return getGoogleApi().maps;
};
```

**./getGoogleMaps.test.js**

```js
import { getGoogleMaps } from "./getGoogleMaps";
import { getGoogleApi } from "./getGoogleApi";
jest.mock("./getGoogleApi");

test("it works", () => {
  // setup
  getGoogleApi.mockImplementation(() => ({ maps: "test" }));

  // tests
  const maps = getGoogleMaps();

  // assertions
  expect(maps).toBe("test");

  // cleanup
  jest.resetModules(); // not required if you resetModules() at the beginning of each test case
});
```

## Summary

I hope this was a helpful guide for mocking global variables with Jest.
As you could see there are several ways to achieve desired goal and
as usual preferred solution should depend on a given test context.

## Sources

- Great article about module mocking https://medium.com/trabe/mocking-different-values-for-the-same-module-using-jest-a7b8d358d78b
- Jest API documentation https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname
- Stack Overflow topic which was an inspiration https://stackoverflow.com/questions/41885841/how-to-mock-the-javascript-window-object-using-jest/59704706#59704706
