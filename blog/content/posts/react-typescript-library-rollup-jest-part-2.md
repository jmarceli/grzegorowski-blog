---
layout: post
author: jan
title: React Typescript library with Rollup and Jest - adding React
excerpt: How to setup React and Typescript to build a NPM package
meta_description: null
meta_title: null
slug: react-typescript-library-rollup-jest-adding-react
date_created: "2020-04-18T14:11:00.000Z"
feature_image: img/susan-yin-2JIvboGLeho-unsplash.jpg
featured: false
tags:
  - react
  - javascript
  - frontend
---

If you are starting from this page I would suggest you to go back to the [part 1 of this tutorial](https://www.grzegorowski.com/react-typescript-library-rollup-jest-initialization) where initial Rollup and Typescript setup is described.
You can check https://github.com/jmarceli/jmarceli-react-ts-library for fully working project setup.

## React with Rollup and Typescript

As our Rollup + Typescript configuration is ready it's a good time to add support for React.
The first step will be adding latest React as a **peerDependency**, of course you may lower the React version according to your requirements.
As we are using Typescript it will be also required to install **@types/react** as a development dependency.
Putting everything into practice should result in such command execution:

```sh
npm install --save-dev react @types/react
```

You probably noticed that React has been installed as DEV dependency, this is because there is no native support for peerDependencies installation.
You will have to manually adjust **package.json** file and copy **react** package from `devDependencies` to `peerDependencies`, so you should end up with **package.json** similar to this:

**./package.json**

```js
// keep the beginning of package.json file untouched
  "devDependencies": {
    "react": "^16.13.1",
    // remaining content...
  },
// create "peerDependencies" key by copying "react" sub-key from "devDependencies"
  "peerDependencies": {
    "react": "^16.13.1"
  }
```

> HINT
>
> Be aware of commas when working with **.json** files.

The next required change for React is **tsconfig.json** adjustment:

**./tsconfig.json**

```js
// add following key to the "compilerOptions"
  "jsx": "react",
// leave remaining configuration unchanged
```

After all this initial adjustments it is time to the last thing which is **rollup.config.js** file.
Thanks to the previously imported **package.json** you can use its content to automatically adjust **external** option used during building process.

**./rollup.config.js**

```js
// just above plugins declaration add
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];
// then for each output declaration add external key and value
export default [
  {
    input,
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    plugins,
    external,
  },
  {
    input,
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    plugins,
    external,
  },
];
```

This adjustment prevents Rollup from trying to include dependencies and peerDependencies in your bundled Javascript code.
It will help you keep your builds small.

When you are ready you can check if current code is still compiling by executing `npm run build`.

## Creating sample React components

In order to fully verify that our bundling setup is working as expected it sounds like a good idea to create a sample React component.
Inside **./src/** directory create a folder named **component/** then inside it create a **Component.tsx** file with the following content:

**./src/component/Component.tsx**

```js
import React from "react";

export const Component: React.FC = () => {
  return (
    <div>
      <div>jmarceli-react-ts-library</div>
      <div>sample component</div>
    </div>
  );
};
```

This is just a very basic React code which will output a few DIVs with some text inside.
When your component is ready it is time to export it, so it can be imported by whoever wants to use your library.
As **./src/index.ts** is defined inside **./rollup.config.js** as an entrypoint you should modify it to export your component.
It can be achieved by adding the following line at the bottom of the file:

**./src/index.ts**

```js
// you can keep existing file content, just add this line at the bottom
export { Component } from "./component/Component";
```

Now you can one more time test your bundling process by executing:

```sh
npm run build
```

It should compile you TS files and place them inside **./dist/** directory together with appropriate **.d.ts** files.

## Next steps

You should have a working React Typescript library bundled with Rollup, so the main goal was achieved.
It's probably a good time to enhance a library by adding some tests which will described in the [part 3 of this tutorial](https://grzegorowski.com/react-typescript-library-rollup-jest-tests-setup).

## Sources

- https://stackoverflow.com/questions/35207380/how-to-install-npm-peer-dependencies-automatically - It is not possible to install NPM peerDependencies directly from command line
- https://www.typescriptlang.org/docs/handbook/compiler-options.html - available Typescript compiler options
