---
layout: post
author: ghost
title: Use ACF image field as thumbnail input
excerpt: null
meta_description: null
meta_title: null
slug: use-acf-image-field-as-thumbnail-input
date: '2017-03-23T09:23:36.000Z'
date_created: '2017-03-23T09:13:43.000Z'
date_updated: '2017-03-23T09:25:05.000Z'
image: null
featured: false
draft: false
tags:
  - Wordpress
  - ACF
---
Standard Wordpress thumbnail input may be replaced with an [ACF image field](https://www.advancedcustomfields.com/resources/image/) which is far more flexible/customizable.
In order to do that you just have to give it a name of `_thumbnail_id`. I'm not sure if it is possible with a visual editor (because I don't use it), but for sure you can do that using [ACF PHP API](https://www.advancedcustomfields.com/resources/register-fields-via-php/). Here is the code which will generate a field for thumbnail image selection:

```php
array(
  'key' => 'field_thumbnail_id',
  'name' => '_thumbnail_id',
  'type' => 'image',
  'label' => 'Custom thumbnail input',
  'instructions' => 'Some more instructions below the label',
  'return_format' => 'id',
),
```

Of course all other image field settings might be used here e.g. `min_width`, `min_height`, `max_size` etc. For more info please refer to the official image field documentation at https://www.advancedcustomfields.com/resources/register-fields-via-php/.

Here is a complete example of a thumbnail field replaced by ACF image field for a *Post* content type.

TODO: add example
