---
layout: post
author: jan
title: ACF PHP API the missing docs
excerpt: null
meta_description: >-
  Documentation for ACF fields which are not described on the official ACF PHP
  API page: ACF Repeater, Google Maps, Date Picker and others.
meta_title: "ACF PHP API Repeater, Google Maps, Date Picker"
slug: acf-php-api-the-missing-docs
date_created: "2017-04-27T12:05:05.000Z"
date_updated: "2017-08-18T13:09:10.000Z"
feature_image: null
featured: false
draft: false
tags:
  - wordpress
  - acf
---

The most useful feature of the ACF Wordpress plugin is its PHP API. Unfortunately, it is not fully documented on the official [page](https://www.advancedcustomfields.com/resources/register-fields-via-php/).

Here are the missing fields:

## ACF Repeater field

Code example.

```php
array(
  'key' => 'field_reference_section',
  'label' => 'Some label',
  'name' => 'reference_section',
  'type' => 'repeater',
  'layout' => 'table', // also 'block' and 'row' are available
  'required' => 1,
  'min' => 1,
  'button_label' => 'Add another attachment',
  'sub_fields' => array(
    array(
      'key' => 'field_reference_name',
      'label' => 'Name',
      'name' => 'reference_name',
      'type' => 'text',
    ),
    array(
      'key' => 'field_reference_value',
      'label' => 'Value',
      'name' => 'reference_value',
      'type' => 'text',
    )
  )
)
```

## ACF Date Picker field

Code example:

```php
  array (
    'key' => 'field_578f5d95e81fa',
    'label' => 'test',
    'name' => 'datatest',
    'type' => 'date_picker',
    'instructions' => '',
    'required' => 0,
    'conditional_logic' => 0,
    'wrapper' => array (
      'width' => '',
      'class' => '',
      'id' => '',
    ),
    'display_format' => 'd/m/Y',
    'return_format' => 'd/m/Y',
    'first_day' => 1, // 1 - monday
  ),
```

## ACF Google Maps field

Code example:

```php
array (
  'key' => 'field_position',
  'label' => 'Position on the map',
  'name' => 'position',
  'type' => 'google_map',
  'required' => 1,
  'center_lat' => 50.3091691,
  'center_lng' => 19.2547187,
  'zoom' => 11,
  'height' => 400
),
```

**// TODO: add some comments and improve this documentation**

## hide_on_screen

Hide on screen is an ACF field group option which allows hiding selected admin page elements when the group is active (current page matches group `location` parameter). Here is the list of available `hide_on_screen` values. You may provide one or more value as an array.

```php
acf_add_local_field_group(array (
  //... (other options)
  'hide_on_screen' => array (
    'permalink',
    'the_content',
    'excerpt',
    'custom_fields',
    'discussion',
    'comments',
    'revisions',
    'slug',
    'author',
    'format',
    'page_attributes',
    'featured_image',
    'categories',
    'tags',
    'send-trackbacks',
  ),
));
```
