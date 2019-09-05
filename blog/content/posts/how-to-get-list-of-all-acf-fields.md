---
layout: post
author: jan
title: How to get list of all ACF fields?
excerpt: null
meta_description: null
meta_title: null
slug: how-to-get-list-of-all-acf-fields
date_created: '2017-04-19T21:47:43.000Z'
date_updated: '2017-10-17T02:13:16.000Z'
feature_image: null
featured: false
draft: false
tags:
  - wordpress
  - acf
---
Getting a list of all ACF fields may be useful e.g. if you want the user to select one of them as a data source. In my case, I needed that list to provide a choices list for an ACF select field.

This is an easy task if you know where to look :)

## Getting a list of all ACF fields (example)
```php
$options = array();

$field_groups = acf_get_field_groups();
foreach ( $field_groups as $group ) {
  // DO NOT USE here: $fields = acf_get_fields($group['key']);
  // because it causes repeater field bugs and returns "trashed" fields
  $fields = get_posts(array(
    'posts_per_page'   => -1,
    'post_type'        => 'acf-field',
    'orderby'          => 'menu_order',
    'order'            => 'ASC',
    'suppress_filters' => true, // DO NOT allow WPML to modify the query
    'post_parent'      => $group['ID'],
    'post_status'      => 'any',
    'update_post_meta_cache' => false
  ));
  foreach ( $fields as $field ) {
    $options[$field->post_name] = $field->post_title;
  }
}
```

As a result in the `$options` variable, you will have an associative array of all the fields, labels keyed by the field name.

## More details
In the above example, `$field_groups` variable is an array with all field groups. Here is the output of a `var_dump($fied_groups)`:
```php
array (size=3)
  0 =>
    array (size=13)
      'ID' => int 1747
      'key' => string 'group_58f769278b155' (length=19)
      'title' => string 'Some title' (length=11)
      'fields' =>
        array (size=0)
          empty
      'location' =>
        array (size=1)
          0 =>
            array (size=1)
              ...
      'menu_order' => int 0
      'position' => string 'normal' (length=6)
      'style' => string 'default' (length=7)
      'label_placement' => string 'top' (length=3)
      'instruction_placement' => string 'label' (length=5)
      'hide_on_screen' => string '' (length=0)
      'active' => int 1
      'description' => string '' (length=0)
  1 => ...
```
If you want to get only fields which are defined by user/admin via the ACF editor you may filter all the field groups by `ID`. Groups created with [ACF PHP API](https://www.advancedcustomfields.com/resources/register-fields-via-php/) will have `ID = 0`.
