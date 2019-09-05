---
layout: post
author: jan
title: Wordpress WMPL Post Type Switcher support
excerpt: null
meta_description: >-
  How to add WPML support to the Post Type Switcher plugin in order to change
  post type for all translations in one click.
meta_title: null
slug: wordpress-wmpl-post-type-switcher-support
date_created: '2017-10-05T19:28:03.000Z'
date_updated: '2017-10-05T19:40:21.000Z'
feature_image: null
featured: false
draft: false
tags:
  - wordpress
  - wordpress-plugins
  - php
---
Adding WPML support to PostType Switcher plugin is easy. My solution is based on https://wordpress.org/support/topic/simple-hack-to-add-wpml-support/ posts.

### Open Post Type Switcher plugin PHP file
It is located at **wp-content/plugins/post-type-switcher/post-type-switcher.php**
### Find lines
```
// Update post type
$data['post_type'] = $post_type;
```
### Add following code above them
```
// Update WPML translations as well
global $wpdb, $sitepress;
include_once( WP_PLUGIN_DIR . '/sitepress-multilingual-cms/inc/wpml-api.php' );

$post_trid = apply_filters( 'wpml_element_trid', NULL, $postarr['ID'], 'post_' . $data['post_type'] );
$translations = apply_filters( 'wpml_get_element_translations', NULL, $post_trid, 'post_' . $data['post_type'] );

if( is_array( $translations ) && !empty( $translations ) && function_exists('icl_object_id') ) {
  foreach( $translations as $translation ){
    $elem_id = $translation->element_id;

    // skip currently switched element
    if ( $elem_id == $postarr['ID'] ) continue;

    // Set the new post type.
    set_post_type( $elem_id, $post_type );

  }
}
```

After applying described changes your Post Type Switcher plugin will be compatible with WPML. Now each time you change a post type (eg. from **post** to **page**) all translations will be moved as well.
