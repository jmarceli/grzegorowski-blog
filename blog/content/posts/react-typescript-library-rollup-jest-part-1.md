---
layout: post
author: jan
title: React Typescript library with Rollup and Jest - initialization
excerpt: Initial setup for a Typescript library build with Rollup
meta_description: null
meta_title: null
slug: react-typescript-library-rollup-jest-initialization
date_created: "2020-03-15T14:11:00.000Z"
feature_image: img/person-s-holds-brown-gift-box-842876.jpg
featured: false
tags:
  - react
  - javascript
  - frontend
---

Here is a tutorial which will show you how to create your own NPM package with React components written in Typescript.
You can check https://github.com/jmarceli/jmarceli-react-ts-library for fully working project setup.

## Motivation

As for now it seems that there is no reliable React library builder which you can safely base on while creating your own React package. The two most popular (at the time of writing this post) are:

- [create-react-library](https://github.com/transitive-bullshit/create-react-library)
- [tsdx](https://github.com/jaredpalmer/tsdx)

Unfortunately, both of them seems to be not actively maintained thus all dependencies are outdated which might cause significant issues. While it is possible to upgrade create-react-library on your own it is not that easy in case of tsdx which is not a boilerplate but a standalone CLI.

## Prerequisites

So here we are with a blank javascript project. Let's get started building your own React library from scratch!
It will definitely take some time but thanks to tools like Rollup, Babel and Jest it won't be as complicated as you may think.

I will assume that your basic developer tools are already in place.
I mean favorite shell client (e.g. iTerm2), package manager (NPM) and version control system (GIT).

## Initialize NPM package

Start by creating a new directory for your library (let's name it **my-library** throughout the entire tutorial):

```sh
mkdir my-library
```

Then inside this directory execute:

```sh
npm init
```

Now answer a bunch of questions. You don't have to worry much about the answers as everything may be changed later.
For start I would suggest setting the **package name** according to your needs, **version** you may start small with e.g. **0.0.1** and license which is usually **MIT**.
In case you don't have **init-author-name** set inside **~/.npmrc** you will be also asked for author name.
NPM package is ready.

## Initialize GIT repository

It is always a good first step to add version control system, so execute:

```sh
git init
```

After initialization is done add all files to the repository and commit changes with:

```sh
git add .
git commit -m "Initial commit"
```

## Setup consistent formatting with Prettier

This step is an optional prerequisite.
Prettier will help you keep consistent code style when collaborating with multiple developers.
It is easy to install and setup so why not?
Install Prettier with:

```sh
npm install --save-dev prettier
```

So everyone will use the same Prettier version.
Then create **prettier.config.js** file with the following content:

```js
module.exports = {
  parser: "typescript",
};
```

Of course you can adjust Prettier configuration however you want, just check available options on https://prettier.io/docs/en/options.html.
The **parser** key let's us specify that **"typescript"** specific parse will be used instead of the default one **"bablyon"** which will work as well in most cases.

> HINT
>
> In order to enable Prettier support in your IDE you should install IDE specific plugin.
> For VSCode it is [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and as far as I'm aware every popular IDE has it's own plugin.

## Start with Typescript

Let's make your package independent from the global system Typescript version (if any), execute:

```sh
npm install --save-dev typescript
```

This downloads latest Typescript, installs it inside **node_modules/** directory and creates **package-lock.json** file.
It ensures that regardless of the system on which you package will be build it will always have the same version of Typescript used for **.ts** files compilation.

Now when you have latest Typescript version installed you can initialize project configuration file.
Inside directory (**my-library**) which you created in the first step execute:

```sh
npx tsc --init
```

This command initializes Typescript configuration file for your package which you can verify by opening **tsconfig.json** file.
So far so good.

It's time for another commit. But before you do that you should create **.gitignore** file to avoid adding **node_modules/** to the GIT.
Inside **.gitignore** file add the following line:

```
node_modules
```

Save the file and commit your changes with:

```sh
git add .
git commit -m "Typescript added"
```

## Setup Rollup package bundler

There are actually two possibilities when it comes to the Rollup Typescript support.
You can either go with the **rollup-plugin-typescript2** or choose **@babel/preset-typescript** way.
The main difference between those two is the different approach to Typescript interpretation.
While the former gives you full support with **tsc** under the hood, you can also go with the latter to simply strip the TS types from your code (see more about Babel approach [here](https://babeljs.io/docs/en/next/babel-plugin-transform-typescript)).
The choice is yours, but because we want to have full TS support I will go with **rollup-plugin-typescript2**.

> NOTE
>
> There is also an official **@rollup/plugin-typescript**, but I didn't find any way to configure single file output (with multiple targets **esm** and **cjs**) together with types definition generation.
> In future it sounds like a good idea to switch to the official Typescript plugin but right now **rollup-plugin-typescript2** is a solid and popular choice.

Let's proceed to the configuration. Install required packages with:

```sh
npm install --save-dev rollup rollup-plugin-typescript2
```

And create Rollup configuration file **rollup.config.js**:

```js
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const input = "src/index.ts";

const plugins = [
  typescript({
    typescript: require("typescript"),
  }),
];

export default [
  {
    input,
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    plugins,
  },
  {
    input,
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    plugins,
  },
];
```

As you can see we are using **package.json** as a source for our output paths and there will be two versions of our package produced **cjs** (CommonJS) and **esm** (ES Modules).
What is more for both formats we would like to use same plugins set which currently contains only **rollup-plugin-typescript2**.
Please note plugin configuration which sets one option `typescript: require("typescript")` this ensures that instead of global Typescript a locally installed Typescript version will be used by the plugin.
In order to make this Rollup configuration valid you will also have to ensure **module** and **main** fields inside **package.json** file.
I would suggest you to open **package.json** file and add/modify following lines:

```js
// replace
// "main": "index.js"
// line with those two:
"main": "dist/index.js",
"module": "dist/index.esm.js",
// leave remaining lines untouched
```

This way you are telling NPM that your package has two possible entrypoints either **dist/index.esm.js** for those users who are willing to proceed with ES Modules and **dist/index.js** for the rest of the world.
As you probably remember those two fields are used inside Rollup configuration, so we should be good.

Now it is time to create a source file.
According to the **rollup.config.js** file sources should be located inside **src/** directory.
Go ahead and create directory **src/** and then add **index.ts** inside that directory.
Here is a sample **index.ts** content which will help us ensure that TS to JS transpilation works as expected:

```ts
const enum EnumTest {
  VALUE1 = 1,
  VALUE2 = 2,
}

const test = (): string => {
  const abc = [EnumTest.VALUE1, EnumTest.VALUE2];
  if (abc[0] === EnumTest.VALUE1) {
    return "test1";
  }
  return "test2";
};

console.log(test());
```

Before you will be able to start bundling your code you should also adjust Typescript configuration inside **./tsconfig.json** file:

**./tsconfig.json**

```js
{
  "compilerOptions": {
    // leave other options without changes
    "module": "es2015", // "es2015" makes Typescript compiler output compatible with Rollup
    "declararion": true, // generates .d.ts files inside the output directory
    // remaining options
  },
  "include":["src/**/*"] // Only files from ./src/ directory will be processed and generated folder structure will be relative to ./src/
}
```

Finally, it's time to test this setup. Execute:

```sh
npx rollup -c
```

This command should start Rollup build taking our **rollup.config.js** file into account.
Everything should go smooth at this point and you should see console output similar to this:

```sh
src/index.ts → dist/index.esm.js...
created dist/index.esm.js in 591ms

src/index.ts → dist/index.js...
created dist/index.js in 292ms
```

Which means that your Typescript library has been compiled and files are available inside **dist** directory.
Go and check them.

> HINT
>
> If you are seeing `UnhandledPromiseRejectionWarning: Error: Cannot find module 'tslib/tslib.es6.js'` this is because you forgot to install **tslib** package.
> Fix that with `npm install --save-dev tslib`.

> HINT
>
> If you are seeing `You must specify a --file (-o) option when creating a file with a sourcemap` you probably forgot to add **"main"** and **"module"** keys to your **package.json** file.
> Go back a few instructions back and adjust your **package.json** content accordingly.

In order to clean thing a bit I would suggest creating a custom **script** entry inside our **package.json** file.
Open the file and add a sub-key to **"scripts"** key:

```js
// leave content before "scripts" untouched
"scripts": {
  "build": "npx rollup -c",
  // remaining scripts
},
// leave content after "scripts" untouched
```

That's all as for Typescript compilation.
You should be able now to run the Rollup with `npm run build` command.

One more thing to do is committing your work in GIT with `git commit` command but before you do so please remember to adjust your **.gitignore** file and add this line:

```sh
# leave existing content untouched
dist
```

This way you are ignoring files inside the **dist/** directory and avoid tracking them with your version control system.

## Next steps

Now you have a complete setup for Typescript package build with Rollup and it's probably a good time to add React support.
Please move to the [part 2 of this tutorial](https://grzegorowski.com/react-typescript-library-rollup-jest-adding-react) if you are interested (or leave a comment).

## Sources

- https://prettier.io/docs/en/options.html - Prettier options described
- https://babeljs.io/docs/en/next/babel-plugin-transform-typescript - Typescript plugin for Babel
- https://www.npmjs.com/package/rollup-plugin-typescript2 - Rollup Typescript plugin
- https://www.typescriptlang.org/docs/handbook/compiler-options.html - available Typescript compiler options
