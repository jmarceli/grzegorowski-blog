---
layout: post
author: jan
title: Flow type checking for Axios
excerpt: >-
  How you may use Flow type checking with popular Axios library. An example of
  Flow annotations for async/await function with Axios based querying.
meta_description: >-
  How you may use Flow type checking with popular Axios library. An example of
  Flow annotations for async/await function with Axios based querying.
meta_title: null
slug: flow-type-checking-for-axios
date_created: "2018-10-17T05:48:40.000Z"
feature_image: img/time-lapse-photography-of-waterfalls-1486902.jpg
featured: false
draft: false
tags:
  - javascript
---

Type checking with Flow is a nice addition to your code. Unfortunately, it is not so intuitive to use Flow with libraries like Axios. The main problem is lack of easily available usage examples.

## Problem

Using Axios type annotations `$AxiosXHR` and `$AxiosXHRConfig` may result in error messages similar to this:

> Cannot call resolve with result bound to result because string [1] is incompatible with object type [2] in type argument T [3]

or this:

> Cannot call resolve with result bound to result because object type [1] is incompatible with string [2] in type argument R [3].

What are `T` and `R` and how to fix that?

## Solution

If you would like to find out the answer yourself you will have to read the source code of Axios Flow implementation. The code is not so complicated if you have some experience with Flow types, but for newcomers it looks cryptic (at best).

Moving forward...

`$AxiosXHR` is defined as `$AxiosXHR<T, R=T>` which means that we have to provide at least one argument `T` and optionally another `R`.

- `T` - input data **T**ype, should be a type of `data` parameter in your Axios request
- `R` - **R**esponse type, should define expected type for a response

As you may noticed `R` is optional and equals `T` by default which is useful especially when dealing with no request data (e.g. all `GET` queries) or no response data (e.g. `POST` query with just `200 OK` as a response).

## Example

As usual we have to begin with `// @flow` declaration, import of Axios library and appropriate type definitions:

```javascript
// @flow
import axios from "axios";
import type { $AxiosXHR } from "axios";
```

Let's define expected Axios response structure type:

```javascript
export type RateLimit = {
  limit: number,
  remaining: number,
  reset: number,
};
type RateLimitResponse = {
  resources: {
    core: RateLimit,
    search: RateLimit,
    graphql: RateLimit,
  },
  rate: RateLimit,
};
```

Now it's time for a "magical" `$AxiosXHR` type annotation:

```javascript
const getRateLimit = async (): Promise<$AxiosXHR<RateLimitResponse>> =>
  axios(`https://api.github.com/rate_limit`);
```

We know that Github API endpoint `/rate_limit` is going to return something which should match `RateLimitResponse`. As we don't have any input data type there is no need to define more than one `$AxiosXHR` parameter (`R` equals `T` by default).

What is more, we know that `async` function should return a promise, thus we wrap returned type with `Promise<....>`.

Now we can use Axios with Flow typings.

**NOTE**
As mentioned by @Joey M. you may replace:

```javascript
Promise<$AxiosXHR<RateLimitResponse>>
```

with

```javascript
AxiosPromise<RateLimitResponse>
```

It's a hand wrapper which simplifies typings a bit. Of course it has to be imported before usage: `import type { AxiosPromise } from 'axios';`

## Another example

Let say we have an API endpoint `http://your-api-enpoint.test` which will respond with string `OK` to every POST request with JSON `data` body: `{ getStatus: true }`.

In this case Axios Flow typing for request is going to look like this:

```javascript
type StatusRequest = {
  getStatus: boolean,
};
const getStatus = async (): AxiosPromise<StatusRequest, string> =>
  axios({
    method: "post",
    data: { getStatus: true },
    url: "http://your-api-enpoint.test",
  });
```

That's all?

Unfortunately, I don't know yet if it is possible to add Flow typings without wrapping Axios call in a wrapper function.

Ideally something like this might be possible:

```javascript
const response: $AxiosXHR<RateLimitResponse> = await axios(
  `https://api.github.com/rate_limit`,
);
```
