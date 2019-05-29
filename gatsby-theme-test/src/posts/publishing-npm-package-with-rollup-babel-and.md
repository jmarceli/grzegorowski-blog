---
layout: post
author: Ghost
title: 'Publishing NPM package with Rollup, Babel, Flow, Jest and ESLint'
excerpt: >-
  Description of tools used to publish modern NPM Javascript package - Rollup,
  Babel, Flow, Jest, ESLint and Travis CI.
meta_description: >-
  Example NPM Javascript package published with Rollup, Babel, Flow, Jest,
  ESLint and Travis CI with a description of each tool used.
meta_title: null
slug: publishing-npm-package-with-rollup-babel-and
date: '2018-10-01T02:57:00.000Z'
date_created: '2018-11-05T01:31:45.000Z'
date_updated: '2018-10-02T21:48:08.000Z'
image: >-
  ./img/photo-1520038410233-7141be7e6f97.jpg
featured: false
draft: false
tags:
  - Javascript
---
Here is a description of common tools and files used to create a modern NPM package. Don't hesitate to clone my [npm-lib-package-boilerplate](https://github.com/jmarceli/npm-lib-package-boilerplate) repository to check the results before spending any time on reading this.

Let's start with a list of development dependencies which I'm going to use throughout this article:

- [Babel](https://babeljs.io/) - ES6-8 features transpiled to ES5
- [Jest](https://jestjs.io/) - running tests and generate coverage reports
- [Flow](https://flow.org/) - Javascript type checking
- [ESLint](https://eslint.org/) - Javascript linting
- [Travis CI](https://travis-ci.org/) - continuous integration
- [Rollup](https://rollupjs.org) - package files building


At the end of this text you should be more or less familiar with a purpose and usage of all packages listed above.

NOTE: This build is aimed at generating NodeJS/Browser libraries but is not suitable for building/publishing web applications.


![babel](./img/babel.jpg)
## Babel

Transpile (converts) ES6-8 Javascript syntax into ES5 compliant code.

NOTE: These instructions are for Babel@6 despite the fact that Babel@7 is already available. It is so due to the fact that the latter is still not supported by all other dependencies. Especially Jest support for Babel@7 is not complete.

Here is a command to execute in order to install Babel:

```bash
yarn add --dev babel-core babel-cli babel-preset-env babel-plugin-transform-object-rest-spread
```

Short explanation:

- `babel-preset-env` - a starting point for all Babel custom presets (instructions what should be transpiled and how)
- `babel-plugin-transform-object-rest-spread` - if you use spread operator anywhere you will need this one

Finally an example of **.babelrc** file:

```js
{
  // ensures most commonly used transpilations e.g. import
  "presets": ["env"],
  // some additional plugins: Flow and Rewire (described in the Jest section)
  "plugins": ["transform-flow-strip-types", "babel-plugin-rewire"]
}
```

It will only be used for tests. You won't need it during build process because it will be handled by a [Rollup](#rollup).


![jest](./img/jest.jpg)
## Jest

Next important package after Babel transpiler is Jest. Facebook alternative to the well known Mocha test runner. Here is an installation command:

```bash
yarn add --dev jest babel-jest babel-plugin-rewire
```

First two packages are more or less self-explanatory but the last one `babel-plugin-rewire` is in my opinion particularly useful. It let's you [test even non-exported functions](https://github.com/speedskater/babel-plugin-rewire) by getting their definitions through `__get__` method.

As usual you will require some configuration file, which is named **jest.config.js**. It might be auto-generated with:

```bash
yarn jest --init
```

For start I would suggest you to leave **jest.config.js** without any changes as it should work in most cases.


![flow](./img/flow.jpg)
## Flow

Type checking the Facebook way. As for React based development Flow seems to me as more natural choice than Typescript, I've decided to use it also for my non-React projects.

```bash
yarn add --dev flow-bin flow-typed babel-plugin-transform-flow-strip-types
```

- `flow-typed` is a library with typings (something similar to Typescript DefinitelyTyped)
- `babel-plugin-transform-flow-strip-types` allows for using flow with Babel transpiler by stripping flow annotations when necessary

Flow default configuration available in **.flowconfig** should match your base requirements.

After all packages are in installed with Yarn execute `yarn flow-typed install` to get most recent types definitions.


![eslint](./img/eslint.jpg)
## ESLint

Having some linter is always a good idea so I've decided to go with probably most popular one which is ESLint. Just execute:

```bash
yarn add --dev eslint eslint-config-airbnb-base eslint-plugin-flowtype eslint-plugin-jest babel-eslint eslint-plugin-import
```

As you can see we have to install a plugin for every package used in development: Flow, Jest and Babel to prevent false positives. As it is a description of creating non-React package you should probably use `eslint-config-airbnb-base` instead of `eslint-config-airbnb` for base of your linting rules.
What is more `eslint-plugin-import` package is required to support ES6 import statements.

ESLint configuration is stored in **.eslintrc**:

```javascript
{
  "extends": [
    "airbnb-base",
    "plugin:jest/recommended",
    "plugin:flowtype/recommended",
  ],
  "plugins": [
    "jest",
    "flowtype",
  ],
  "rules": {
    // special case for rewire __get__
    "no-underscore-dangle": ["error", { "allow": ["__get__"] }]
  },
}
```


![travisci](./img/travisci.jpg)
## Travis CI

Continuous integration is a nice and useful addition to every publicly available project. In order to use Travis CI you only have to register with your Github account on [Travis CI](https://travis-ci.org/), which is FREE for every open-source project. After registration you should select your repository and activate it (which is fairly simple and intuitive).

In order to make continuous integration work just add a file **.travis.yml** to the root folder of your project. It should have a content similar to the one presented below:

```yml
language: node_js
node_js:
  - '8'
script:
  - yarn test
  - yarn build
install:
  - yarn install
branches:
  only:
    - master
```

This file tell Travis to:
- use language `node_js`
- in version `8` (it will be selected with `nvm` by Travis)
- `yarn install` packages (with Yarn - instead of default NPM installation)
- run scripts `yarn test` and `yarn build` - they will determine the process output, if any of them fails entire building result will be negative
- and use only `master` branch of your repo

One thing worth noting during package configuration is a behaviour of `prepublish` hook which you may be tempted to implement in **package.json** file. It might be not so obvious that `prepublish` scripts will be run **also** after initial installation, not only before package publishing. You would probably like to use `prepublishOnly` instead of `prepublish`.


![rollup](./img/rollup.jpg)
## Rollup

Finally, one of the least known packages. Rollup, a package building tool without complicated configuration. Here is a command to install Rollup and all recommended plugins:

```bash
yarn add --dev rollup rollup-plugin-babel@3 rollup-plugin-flow rollup-plugin-cpy babel-plugin-external-helpers
```

After finishing installation create one fairly simple **rollup.config.js** file. Here is a commented example:

```js
// plugins that we are going to use
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-cpy';
import flow from 'rollup-plugin-flow';

// list of plugins used during building process
const plugins = targets => ([
  // remove flow annotations from output
  flow(),
  // use Babel to transpile to ES5
  babel({
    // ignore node_modules/ in transpilation process
    exclude: 'node_modules/**',
    // ignore .babelrc (if defined) and use options defined here
    babelrc: false,
    // use recommended babel-preset-env without es modules enabled
    // and with possibility to set custom targets e.g. { node: '8' }
    presets: [['env', { modules: false, targets }]],
    // solve a problem with spread operator transpilation https://github.com/rollup/rollup/issues/281
    plugins: ['babel-plugin-transform-object-rest-spread'],
    // removes comments from output
    comments: false,
  }),
  // copy Flow definitions from source to destination directory
  copy({
    files: ['src/*.flow'],
    dest: 'lib',
  }),
]);

// packages that should be treated as external dependencies, not bundled
const external = []; // e.g. ['axios']

export default [{
  // source file / entrypoint
  input: 'src/index.js',
  // output configuration
  output: {
    // name visible for other scripts
    name: 'npmLibPackageExample',
    // output file location
    file: 'lib/index.esm.js',
    // format of generated JS file, also: esm, and others are available
    format: 'esm',
    // add sourcemaps
    sourcemap: true,
  },
  external,
  // build es modules for node 8
  plugins: plugins({ node: '8' }),
}, {
  input: 'src/index.js',
  output: {
    name: 'npmLibPackageExample',
    file: 'lib/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  external,
  // build common JS for node 6
  plugins: plugins({ node: '6' }),
}];
```

Some more or less important findings are:

- use `rollup-plugin-cpy` instead of `rollup-plugin-copy` in order to avoid [non-existing output directory problem](https://github.com/meuter/rollup-plugin-copy/issues/7)
- `rollup-plugin-babel@3` you may use version 4 if you upgrade Babel to version 7
- as you may noticed as a result of this Rollup configuration you will get two files: [ES module standard and CommonJS one](https://github.com/rollup/rollup/wiki/pkg.module)


## Scripts

Custom scripts defined inside **package.json** which are used during development and publishing. Here is a list:

- `"clean": "rimraf lib"` - remove `lib/` directory with build results
- `"test": "yarn jest src"` - run tests defined inside `src/` directory with Jest
- `"test:watch": "yarn jest src --watch --notify"` - run tests and watch for changes as well as display notifications with results
- `"cover": "jest src --coverage"` - generate test coverage report
- `"lint": "eslint src"` - run linting with ESLint
- `"build": "yarn rollup -c"` - build output using Rollup
- `"precommit": "yarn flow src && yarn lint && yarn test"` - run before each commit to ensure commited code quality
- `"prepublishOnly": "yarn clean && yarn lint && yarn test && yarn build"` - run [ONLY before](https://docs.npmjs.com/misc/scripts) `yarn publish` to ensure quality and most recent output


## Other tools and files

List of useful tools/files:

- `rimraf` - cross-platform directory cleaning
- `husky` - additional Git hooks e.g. testing code just before making a commit
- `.editorconfig` - recommended editor configuration
- `.npmignore` - list of ignored files/dirs when publishing to NPM registry
- `LICENSE` - info about license e.g. [MIT](https://en.wikipedia.org/wiki/MIT_License)

Another important thing is last part of **package.json** file:

```json
  "husky": {
    "hooks": {
      "pre-commit": "yarn precommit"
    }
  }
```

These are lines which actually trigger `yarn precommit` before each Git commit thanks to [husky](https://github.com/typicode/husky) provided hooks.

You will find all files/tools listed above in my [boilerplate project on Github](https://github.com/jmarceli/npm-lib-package-boilerplate) or [on NPM](https://www.npmjs.com/package/npm-lib-package-boilerplate)


## Sources

- https://codeburst.io/publish-your-own-npm-package-ff918698d450 - great article with slightly different setup
- https://github.com/rollup/rollup/wiki/pkg.module - ES module, CommonJS and others explained
- https://github.com/rollup/rollup/issues/281 - Rollup spread operator transpilation
- https://github.com/rollup/rollup-plugin-babel#configuring-babel
- https://github.com/meuter/rollup-plugin-copy/issues/7 - rollup-plugin-copy problem
