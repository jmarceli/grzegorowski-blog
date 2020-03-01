---
layout: post
author: jan
title: What are NPM dist tags and how to use them
excerpt: What are NPM distribution tags and how you can use npm dist-tag command to create multiple distribution channels for your NPM package. Tutorial with examples of npm dist-tag usages.
meta_description: null
meta_title: null
slug: what-are-npm-dist-tags-how-to-use-them
date_created: "2020-02-22T12:20:44.000Z"
feature_image: img/jez-timms-aw4ctKdmC7k-unsplash.jpg
featured: false
draft: false
tags:
  - javascript
  - frontend
---

While developing or using NPM package registry you may come across `npm dist-tag` command or multiple dist tags available for one package e.g. **next** tag.
What are dist tags and how to use them in your package?
I will try to explain based on available documentation and my own experience with them.

## Overview

Normally for releasing NPM packages you would use e.g. `npm version minor` followed by `npm publish` and then you package is available on NPM with a new version number.
Super easy.
What you may not be aware of is that by default `npm publish` marks all your published versions with a **latest** dist tag (check the "Versions" tab on NPM to verify).
It means that the published version will be installed by default after executing `npm install [PACKAGE_NAME]`.
If by any reason you would like to publish to NPM but avoid the default behavior then you should dive into a **dist-tag** concept.

## Publishing with dist tag

After you add version number to your package with `npm version ...` command you may decide to publish it to some other tag that **latest**.
You can do this with `npm publish --tag [DIST_TAG]`.
If you do so, the published version will be possible to install only with `npm install [PACKAGE_NAME]@[DIST_TAG]` or when someone provides published version explicitly with `npm install [PACKAGE_NAME]@[VERSION]`.

Example:

Let's publish a new version (**0.0.13**) of our package to the **test** dist tag:

```bash
npm version 0.0.13
npm publish --tag test
```

If you would like to install such package (let's assume it is named **jmarceli-npm-tests**) you can do this in two ways:

```bash
npm install jmarceli-npm-tests@test
```

or

```bash
npm install jmarceli-npm-tests@0.0.13
```

As you can see there is nothing which prevents you from installing **0.0.13** version if you provided it explicitly after **@** sign even if the version is not published to the default **latest** dist tag.
What is more you can't split version naming space with dist tags.
I mean that you can't have a different package content for **0.0.13** marked with **latest** tag than **0.0.13** with **test** tag.

## Adding and modifying dist tags

Unlike versions dist tags are meant to be modified after first publish as they are not tight to a specific package content.
This is the reason for existence of all `npm dist-tag ...` commands.

You can add a dist tag to the published NPM package version.

Example which tags **0.0.12** version of **jmarceli-npm-tests** package with **next** dist tag:

```bash
npm dist-tag add jmarceli-npm-tests@0.0.12 next
```

NOTE: You can mark one package version with multiple dist tags if needed.

Of course you can also delete/remove assigned tags with:

```bash
npm dist-tag rm jmarceli-npm-tests next
```

NOTE: You don't need to remove existing dist tag before reassigning it to another (probably newer) package version, it will be done automatically.

The last operation possible with `npm dist-tag` command is listing all available dist tags:

```bash
npm dist-tag ls jmarceli-npm-tests
```

NOTE: You can skip package name in order to target package which is in currently active directory.

## Conclusion

You can compare NPM distribution tags with GIT tags, the main difference is that you can't reassign existing GIT tag to the current commit while it is perfectly ok with NPM tags.
Most community packages have only one, default **latest** dist tag for others you may sometimes see **next** tag for their unreleased/development versions.
Multiple tags are commonly used by enterprise grade packages which provides more distribution channels than only single **latest** version.
For example [React](https://www.npmjs.com/package/react) (as for now) has four NPM dist tags: **latest**, **next**, **experimental**, **canary**.

## Sources

- https://docs.npmjs.com/cli/dist-tag - official NPM documentation for dist-tag feature
- https://docs.npmjs.com/cli/publish - official NPM documentation for the publish command
- https://docs.npmjs.com/cli/install - official NPM documentation for the install command
- https://www.npmjs.com/package/jmarceli-npm-tests - example NPM package with different dist tags
