---
layout: post
author: Ghost
title: Wordpress rewrite rules and pagination
excerpt: null
meta_description: >-
  Example of add_rewrite_rule function usage for Wordpress Custom Post Type
  pagination fixes. Restricting some slugs in Wordpress with wp_unique_post_slug
meta_title: Wordpress rewrite rules and pagination add_rewrite_rule
slug: wordpress-rewrite-rules
date: '2017-07-17T16:54:23.000Z'
date_created: '2017-07-15T15:13:43.000Z'
date_updated: '2017-08-30T02:21:57.000Z'
image: null
featured: false
draft: false
tags:
  - Wordpress
---
If you are making larger Wordpress site at some point you will definitely come across custom rewrite rules configuration.

## The tools (plugins)

I would suggest [Rewrite Analyzer](https://wordpress.org/plugins/monkeyman-rewrite-analyzer/) as it shows matched URL parts which is very convenient for debugging.

## Prioritize pagination over Custom Post Type (CPT) slug

So you want to have clean URL structure for your CPT archive, so the list page has the same URL as single CPT pages **slug** prefix.

Here is the URLs structure I'm talking about:

- `/career` - page with CPT archive
- `/career/page/2` - second page of CPT archive
- `/career/some-position-offer` - single CPT page

Such URL structure requires defining a custom rewrite rule.

Out of the box Wordpress fail to route to the `/career/page/2`, because before looking for the second page it will try to find CPT (named `career` in this example) with `page/2` slug. As a result the visitor will go to the 404 page instead of the second page for the Post archive.

It's quite easy to solve with `add_rewrite_rule` function. Write following PHP code into your theme/plugin `functions.php` file (or anywhere else where you store custom PHP code for Wordpress):

```php
// functions.php
// prioritetize pagination over displaying custom post type content
add_action('init', function() {
  add_rewrite_rule('(.?.+?)/page/?([0-9]{1,})/?$', 'index.php?pagename=$matches[1]&paged=$matches[2]', 'top');
});
```

If you do that the Wordpress will try to find next page before it tries to find the CPT single page.

For more info about `add_rewrite_rule` check out the official documentation [https://developer.wordpress.org/reference/functions/add_rewrite_rule/](https://developer.wordpress.org/reference/functions/add_rewrite_rule/).

## Restricting selected slugs in Wordpress

Sometimes, especially when you start messing with the default URL structure there might be a necessity of restricting some slugs. Here is an example which will show how to prevent Post slug collisions with the existing Categories slugs `functions.php`:

```php
// functions.php
// Prevent category - post slug collisions
// Restrict selected slugs for posts
add_filter( 'wp_unique_post_slug', function( $slug, $post_ID, $post_status, $post_type ) {
  if ( 'post' == $post_type ) {
    $categories = get_categories();
    $categories = array_map(function($c) { return $c->slug; }, $categories);

    if ( in_array($slug, $categories) ) {
      return $slug . '-' . $post_ID;
    }
  }
  return $slug;
}, 10, 4 );
```

This code will append `-[post_ID]` to the end of the Post slug if it happens to be same as on of the slugs for existing categories.

All examples are written for PHP >= 5.4.

## Issues

Problems with pagination, rewrite rules and generally URL structure.

1. Don't name query variable same as existing taxonomy slug. So if you have taxonomy with slug `company` avoid using `?company=xyz` as a query variable.
2. If you want to change number of `posts_per_page` on default Wordpress post list page you should change this number not only in `query_args` array but also in Wordpress settings. In other case (if you change just `query_args`) you will get into troubles with pagination.
