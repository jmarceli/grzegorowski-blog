---
layout: post
author: jan
title: Wordpess theme responsive images
excerpt: null
meta_description: null
meta_title: null
slug: wordpess-theme-responsive-images
date: '2017-03-28T19:04:46.000Z'
date_created: '2017-03-18T19:05:47.000Z'
date_updated: '2017-03-28T19:07:15.000Z'
feature_image: img/banner-772x250.png
featured: false
draft: false
tags:
  - wordpress
  - wordpress-plugins
---
Ensuring good responsive images support in Wordpress can be a quite complicated task. When you try to provide dedicated image size for each supported device your images directory will become far larger than the necessary minimum because of generating even unused images by the default `add_image_size()` function.

The solution of that problem wasn't an easy one, until now!

Thanks to the [Fly Dynamic Image Resizer](https://wordpress.org/plugins/fly-dynamic-image-resizer/) by [Junaid Bhura](http://www.junaidbhura.com/) there is now an option to generate only necessary image sizes "on the fly". You will never need to regenerate thumbnails again and what's more important WordPress `upload/` directory will stay as small as possible.

Fly Dynamic Image Resizer is, of course, a developer plugin so in order to use it your active theme **have to use** `fly_` prefixed functions instead of their `wp_` counterparts. Having said so it's not that hard to convert existing theme to use Fly Dynamic Image Resizer simple *find & replace* will be a helpful tool. The only thing you should take care about is checking the replaced functions results. Fly functions will produce slightly different results e.g. `fly_get_attachment_image_src` outputs an associative array with different keys than the default `wp_get_attachment_image_src`.

One of the biggest advantages of this plugin is a fact that it is available on Github https://github.com/junaidbhura/fly-dynamic-image-resizer, so you can fork it, report issues and get a quick response from the author.

## Examples

### Default Wordpress
(probably) your theme configuration:
```php
<?php add_image_size('my-custom-size', array(200, 200); ?>
```
template:
```php
<?php $image = wp_get_attachment_image_src($img_id, 'my-custom-size'); ?>
<img src="<?= $image[0]; ?>" width="<?= $image[1]; ?>" height="<?= $image[2]; ?>" />
```

### Wordpress with Fly Dynamic Image Resizer
no need for any configuration/initialization!
template:

```php
<?php $image = wp_get_attachment_image_src($img_id, array(200, 200)); ?>
<img src="<?= $image['src']; ?>" width="<?= $image['width']; ?>" height="<?= $image['height']; ?>" />
```

In case of `wp_get_attachment_image` there is also approperiate `fly_` helper function which will produce `<img>` tag:

```php
<?= fly_get_attachment_image( $img_id, array(200, 200) ); ?>
```

These were just examples. I encourage you to read official documentation on Github (https://github.com/junaidbhura/fly-dynamic-image-resizer) which is really easy to use and provides a comprehensive description of all plugin capabilities.

## .svg support

Fly Dynamic Image Resizer doesn't work with `.svg` images (so as the Wordpress without any plugins). If you would like to support them just check for the empty result and replace it with the default Wordpress functions providing `full` as the desired image size.

Here is an example of my custom helper function which falls back to the default Wordpress `.svg` handling if image happens to be a `.svg`:

```php
/**
 * Gets a dynamically generated image URL from the Fly Images with SVG fallback.
 *
 * @param  integer  $attachment_id
 * @param  mixed    $size
 * @param  boolean  $crop
 * @return array
 */
function get_image_src( $attachment_id = 0, $size = '', $crop = null ) {
  $img = fly_get_attachment_image_src( $attachment_id, $size, $crop );

  if ( !empty( $img ) ) {
    return $img;
  }

  // Something went wrong (this might be a .svg image)
  $img = wp_get_attachment_image_src( $attachment_id, 'full' );
  if ( ! empty( $img ) ) {
    return array(
      'src' => $img[0],
      'width' => $size[0],
      'height' => $size[1],
    );
  }

  // Totally wrong (there is no 'full' image)
  return array();
}
```

Use it exactly the same as the `fly_get_attachment_image_src` you will just get `svg` support. Here is an example:

```php
<?php $img = get_src($attachment_id, array(400, 300)); ?>
<img src="<?= $img['src']; ?>" alt="The .svg image" />
```

## responsive background
Providing good responsive background images (with various sizes) is complicated because it requires generating *CSS* code out of *PHP* (also there is no option to minify this or merge with the rest of your *CSS*). As far as I know there is no option to generate responsive background images in any other way. In order to ease this process I made a custom function (which is of course based on Fly Dynamic Image Resizer plugin):

```php
/**
 * Returns style string with media queries background-image for various screen sizes
 * @param string  $css_selector - Unique CSS selector for element with background image
 * @param array $sizes  - Array with media query and screen/image dimensions
 *  $sizes = [
 *    [
 *      'id' - (int) Attachment image ID
 *      'media' - (string) media query argument e.g. 'min-width'
 *      'w' - (int) image width
 *      'h' - (int) image height (default: 0)
 *      'crop' - (bool) crop image? (default: false)
 *    ], ...
 *  ]
 *  e.g.
 *  ```
 *  array(
 *    array('id' => 123, 'media' => 'min-width: 1280px', 'w' => 1280, 'h' => 600),
 *    array('id' => 22, 'w' => 375, 'h' => 667, 'crop' => true)
 *  )
 *  ```
 */
function bgImage( $css_selector, $sizes ) {
  $style = '';

  foreach ( $sizes as $size ) {
    // set default values
    $size = array_merge( array( 'h' => 0, 'crop' => false ), $size );

    $img = fly_get_attachment_image_src($size['id'], array( $size['w'], $size['h'] ), $size['crop'] );

    // conditionally wrap with media query
    if ( empty( $size['media'] ) ) {
      $style .= $css_selector . '{ background-image:url(' . $img['src'] . ') }';
    } else {
      $style .= '@media(' . $size['media'] . ') {' .
        $css_selector . '{ background-image:url(' . $img['src'] . ') }' .
        '}';
    }
  }
  return $style;
}
```

Usage is simple, just use it inside `wp_head` action like this:

```php
// add responsive background images for .full-background section
add_action( 'wp_head', function() {
  $img_id = get_post_thumbnail_id(); // or any other function that returns image ID
  // do nothing if image ID is empty
  if ( empty( $img_id ) ) return;

  $css = bgImage('.full-background', array(
    array( 'id' => $img_id, 'w' => 0, 'h' => '700' ),
    array( 'id' => $img_id, 'media' => 'min-width:400px', 'w' => 800 ),
    array( 'id' => $img_id, 'media' => 'min-width:800px', 'w' => 1400 ),
    array( 'id' => $img_id, 'media' => 'min-width:1400px', 'w' => 1920 ),
  ));
  // print out CSS inside page header
  echo '<style type="text/css">' . $css . '</style>';
});

```

As a result, you will get following CSS (this is formatted version for better readability):

```css
.full-background{
  background-image:url(http://yourdomain.com/app/uploads/fly-images/46/527528428-0x700.jpeg)
}
@media(min-width:400px) {
  .full-background{
    background-image:url(http://yourdomain.com/app/uploads/fly-images/46/527528428-800x0.jpeg)
  }
}
@media(min-width:800px) {
  .full-background{
    background-image:url(http://yourdomain.com/app/uploads/fly-images/46/527528428-1400x0.jpeg)
  }
}
@media(min-width:1400px) {
  .full-background{
    background-image:url(http://yourdomain.com/app/uploads/fly-images/46/527528428-1920x0.jpeg)
  }
}
```

Enhanced `.full-background` element will now have four sizes of `background-image` adjusted to the supported screen sizes.


## Note
I would probably try to turn these modifications into a plugin when I will have more spare time.
