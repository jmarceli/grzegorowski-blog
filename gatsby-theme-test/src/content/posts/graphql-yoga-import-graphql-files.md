---
layout: post
author: ghost
title: graphql-yoga import .graphql files
excerpt: >-
  How to ensure modularization of .graphql files when working with graphql-yoga
  project.
meta_description: null
meta_title: null
slug: graphql-yoga-import-graphql-files
date: '2018-05-05T14:34:55.000Z'
date_created: '2018-05-12T19:59:43.000Z'
date_updated: '2018-05-05T14:34:55.000Z'
image: >-
  ./img/photo-1444312645910-ffa973656eba.jpg
featured: false
draft: false
tags:
  - Javascript
  - graphql
---
It is possible to split you type definitions to multiple `.graphql` files and then merge them back using [merge-graphql-schemas](https://github.com/okgrow/merge-graphql-schemas) ensuring graphql modularization.

This was one of the key features I was looking for when working with **graphql-yoga**. The example available in their repo [modular-resolvers](https://github.com/graphcool/graphql-yoga/tree/master/examples/modular-resolvers) is really helpfull but it doesn't explain how to handle `.graphql` files in subfolders.

In order to achieve this kind of modularization you will have to change:
**typeDefs/index.ts**
```javascript
import * as path from "path";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";

const typesArray = fileLoader(path.join(__dirname, "./"));
const typesMerged = mergeTypes(typesArray);

export default typesMerged;
```
to:
```javascript
import * as path from "path";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";

const typesArray = fileLoader(path.join(__dirname, "."), { recursive: true });
const typesMerged = mergeTypes(typesArray, { all: true });

export default typesMerged;
```

That's all and that's easy if you know the available options.

Now instead of:
```bash
▾ typeDefs/
    index.ts
    user.typedefs.graphql
    welcome.typedefs.graphql
```
You may have more granular structure like this:
```bash
▾ typeDefs/
  ▾ Mutation/
      User.graphql
  ▾ Subscription/
      User.graphql
  User.graphql
  Welcome.graphql
  Query.graphql
  index.ts
```
Is it better in any way than example from **graphql-yoga** repo? I don't know, maybe not, but if it suits you better you may use it.

**NOTE**
These are versions of the relevant packages:
**package.json** (part of it)
```json
"dependencies": {
    "graphql-yoga": "^1.13.1",
    "merge-graphql-schemas": "^1.5.1"
}
```
They may differ from the official example [package.json](https://github.com/graphcool/graphql-yoga/blob/master/examples/modular-resolvers/package.json) file.

## Sidenotes
My other attempt to split grapql into multiple files uses [graphql-import](https://github.com/graphcool/graphql-import). Unfortunatelly it wasn't a good option because of lack of support for extending types (see [graphql-import issue#42](https://github.com/graphcool/graphql-import/issues/42)) e.g.:
```graphql
extend type Query {
  allUsers: [User]
}
```
This was for me one of the core features required to split files easily, so I've decided to go with **merge-graphql-schemas** instead.

Another option which I manage to avoid was adding Webpack for bundling server files. While it should/may work as discussed in [graphql-tools issue#273](https://github.com/apollographql/graphql-tools/issues/273) I think that keeping **graphql-yoga** as simple as possible is generally a good idea.

## Sources
https://github.com/graphcool/graphql-yoga/tree/master/examples/modular-resolvers
https://github.com/okgrow/merge-graphql-schemas
https://github.com/apollographql/graphql-tools/issues/273
https://github.com/graphcool/graphql-import/issues/42
