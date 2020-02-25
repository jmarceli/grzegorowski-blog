---
layout: post
author: jan
title: What is an NPM dist-tag?
excerpt: null
meta_description: null
meta_title: null
slug: what-is-npm-dist-tag
date_created: "2020-02-22T12:20:44.000Z"
feature_image: null
featured: false
draft: true
tags:
  - javascript
  - frontend
---

While developing or using NPM package registry you may come across `npm dist-tag` command.
The first and most important question is why you may want to use it?

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

Unlike versions dist tags might be modified after first publish as they are not tight to a specific package content.
This is the reason for existence of all `npm dist-tag ...` commands.

You can add a dist tag to the published NPM package version.

Example which tags **0.0.12** version of **jmarceli-npm-tests** package with **next** dist tag:

```bash
npm dist-tag add jmarceli-npm-tests@0.0.12 next
```

Of course you can also delete/remove assigned tag with:

```bash
npm dist-tag rm jmarceli-npm-tests next
```

Example which adds dist tag named `test` to `jmarceli-npm-tests@0.0.11-ci.0` package version:

```bash
npm dist-tag add jmarceli-npm-tests@0.0.11-ci.0 test
```

NOTE: You may have multiple tags pointing at the same package version

If you are not using `npm dist-tag` before publishing to NPM your package will be published using dist tag named `latest`.
Only `latest` dist tag versions are used to build your package "home" page on NPM and only those versions are displayed in package summary sidebar as your current package version.

You can check how different dist tags works on my example package (https://www.npmjs.com/package/jmarceli-npm-tests) where `lastest` version is (currently) `0.0.10` while `test` dist tag already has `0.0.11-ci.0` version available.
What is more when you (or anyone else) runs `npm install [PACKAGE_NAME]` he will install by default the latest version of your package but only this available under `latest` dist tag.
In order to install from dist tag other than `latest` you have to explicitly set it during the install command execution by using `@dist-tag-name` notation.

This command will install last version available on `test` dist tag for `jmarceli-npm-tests` package:

```bash
npm install jmarceli-npm-tests@test
```

The tricky part is that dist tags doesn't divide you package versions name space.
For example you can't have two `0.0.10` versions, one for each dist tag.
Version numbers has to be unique across your entire package.

## Conclusion

I'm not 100% sure what is the reasoning behind dist tag feature on NPM, but I found them when I was trying to release package only for test purpose before making it widely available (under `latest` tag).
You can also see that some projects are using `next` dist tag for releasing latest/unstable builds.

## Sources

- https://docs.npmjs.com/cli/dist-tag - official NPM documentation for dist-tag feature
