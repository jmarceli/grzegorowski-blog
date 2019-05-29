---
layout: post
author: Ghost
title: PHP default values with array_merge
excerpt: null
meta_description: null
meta_title: null
slug: php-default-values-with-array_merge
date: '2017-08-17T17:49:15.000Z'
date_created: '2017-08-17T17:36:01.000Z'
date_updated: '2017-09-22T22:21:01.000Z'
image: ./img/keyboard-computer-keys-white-1.jpg
featured: false
draft: false
tags:
  - php
---
In PHP there is no option to provide default values for an associative array as an argument.

E.g. (is not possible)

```php
function test($args = array('first' => 1, 'second' => 2, 'third' => 3)) {
  // some PHP code
}
```

In order to solve that issue one may use `array_merge` [function](http://php.net/manual/en/function.array-merge.php).

Example code:

```php
function test($args) {
  $args = array_merge(
    array('first' => 1, 'second' => 2, 'third' => 3),
    $args
  );

  // some PHP code
}
```

In the example above `$args` variable will have default values for `first`, `second` and `third` key if there is no value provided.
