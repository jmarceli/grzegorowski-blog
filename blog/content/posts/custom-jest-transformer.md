---
layout: post
author: jan
title: Custom Jest transformer CSV example
excerpt: How to write a custom Jest transformer for CSV file imported into your application with csv-loader and Papaparse
slug: custom-jest-transformer
date_created: "2019-09-04T18:28:50.000Z"
date_updated: "2019-09-04T18:28:50.000Z"
feature_image: img/arseny-togulev-liAwyJ64wHE-unsplash.jpg
featured: false
draft: false
tags:
  - javascript
  - webpack
---

Sometimes you may need a custom Jest transformer.
In my case this was a CSV transformer which was needed to test tabular data provided to the frontend application through the [Webpack csv-loader](https://www.npmjs.com/package/csv-loader) and imported CSV file.

## Problem

When you try to test a component which uses CSV import handled by **csv-loader** plugin you will find out that this is not as straight forward as you expect.
While Jest is a very well documented I didn't find any example of a simple custom transformer which is necessary to handle CSV imports in tested code.

## Example

This is an application which just loads some CSV file through a **csv-loader** Webpack plugin and **papaparse** CSV parsing library.
I won't include all the commands and files because final example project is published on the Github https://github.com/jmarceli/custom-jest-transformer.
Lets focus on the most "interesting" parts of this project.
A Webpack configuration file:

**webpack.config.js**

```js
const webpack = require("webpack");
const path = require("path");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.csv$/,
        loader: "csv-loader",
      },
    ],
  },
};

module.exports = config;
```

Then `src/` directory with three simple files:

**src/data.js**

```js
import input from "./input.csv";

// A silly function which appends given number to every input cell
export default function data(number) {
  return input.map(row => Object.values(row).map(value => value + number));
}
```

**src/index.js**

```js
import data from "./data";

console.log("CSV data", data);
```

and

**src/input.csv**

```csv
col1, col2, col3
1, 2, 3
11, 12, 13
21, 22, 23
```

Now we should be able to run `webpack -d --mode development` and `node dist/bundle.js`.
That's fine for a start but a the end we want to use Jest to test our `src/data.js` file.
Let say that we want to run this extremely simple and naive test:

**data.test.js**

```js
import data from "./data";

describe("data", () => {
  test("adds 1 to every field", () => {
    expect(data(1)).toEqual([
      ["col11", "col21", "col31"],
      ["11", "21", "31"],
      ["111", "121", "131"],
      ["211", "221", "231"],
    ]);
  });
});
```

"Of course" it is failing with the following message:

> ReferenceError: col1 is not defined

This happens because Jest is unable to process our CSV import statement.
`import input from "./input.csv";` line is working perfectly fine when we run code through the Webpack because of **csv-loader** conversion but Jest doesn't run tests through the Webpack and doesn't know what **csv-loader** is.

Say hello to the custom Jest transformers! (transformer is more or less Jest name for a Webpack loader)

But wait, is there any documentation, example or some starting point?

I would suggest starting with https://jestjs.io/docs/en/configuration.html#transform-object-string-pathtotransformer-pathtotransformer-object

Now when everything is unclear and you are missing some simple example here it is:

**jest-csv-transformer.js**

```js
"use strict";

const Papa = require("papaparse");
const { transform } = require("@babel/core");
const jestPreset = require("babel-preset-jest");

module.exports = {
  process(fileContent) {
    return (
      "module.exports = " + JSON.stringify(Papa.parse(fileContent).data) + ";"
    );
  },
};
```

As you can see (or not) the **process(fileContent, filePath)** function exported from the transformer file accepts two arguments:

- **fileContent** - content of a transformed file (plain text)
- **filePath** - path to the transformed file (also a plain text, not used in this example)

Those two parameters should be enough to write a reasonably functional transformer.

What is very important is that your transformer should return a string which will be possible to understand by Javascript engine (NodeJS in this case).
For example if you provide an empty CSV file this transformer will return an empty array:

```js
module.exports = [];
```

Finally you will have to create/update your Jest configuration.
If you choose to setup Jest inside **package.json** just add a **transform** key to your **jest** configuration object:

**package.json**

```json
{
  "...": "...",
  "jest": {
    "transform": {
      "^.+\\.csv$": "./jest-csv-transformer.js",
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  }
}
```

As you can see in order to set a proper transformer for CSV files you will also have to restore a transformer for JS/TS files.
By default those files are transformed with **babel-jest** but because our configuration has to override entire **transform** key you will also have to redefine this mapping (and install appropriate packages: **babel-jest**, **@babel/core**).

That's all. Your Jest CSV transformer is ready.
Feel free to use https://github.com/jmarceli/custom-jest-transformer repository as an example.

## Debugging

When you try to write your own Jest transformer use `npx jest --clearCache` for clearing transformer cache and `npx jest --no-cache` to run tests and transformers without Jest caching.
This is really important because by default Jest will cache all transformers and you won't be able to see results of your modifications to the developed transformer.

## Sources

- Official Jest docs - https://jestjs.io/docs/en/configuration.html#transform-object-string-pathtotransformer-pathtotransformer-object
- Example repository - https://github.com/jmarceli/custom-jest-transformer
- Official babel-jest docs - https://www.npmjs.com/package/babel-jest
- Another example - https://github.com/keplersj/jest-raw-loader/blob/master/index.js
- Webpack base config - https://createapp.dev/webpack
