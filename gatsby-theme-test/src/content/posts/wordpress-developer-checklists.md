---
layout: post
author: ghost
title: Wordpress developer checklists
excerpt: null
meta_description: null
meta_title: null
slug: wordpress-developer-checklists
date: null
date_created: '2017-04-06T03:07:55.000Z'
date_updated: '2018-07-19T15:35:44.000Z'
image: null
featured: false
draft: true
tags: []
---
As a big fan of the "Air Crash Investigation" series, I came up with an idea of creating a checklist just like pilots have in their airplanes before every take-off and landing. Comparing web development to the flying  I think that beginning of the work might be compared to the take-off and deploying on a production server is like landing. Following that path, two lists would be necessary.

## Development checklist
These are the steps that should be checked before the website development process.

- website design confirmed by the client (there is no point in starting the work if you don't know exactly what to do)
- ensure correct filenames for uploaded files (Clean Image Filenames)

## Production checklist
All of them should be checked after page deployment to the production server.

- SEO check with some external SEO analysis tool
- backup configuration (BackWPup)
- Google Analytics and Google Search Console integration (Monster Insights, Yoast Seo)
- refresh FB Open Graph data using https://developers.facebook.com/tools/debug/sharing/ and **Scrape Again** button
- make a CRON job for `wp-cron.php` script (and turn off default CRON)

#### validate HTML markup
Use e.g. https://validator.w3.org/nu/

#### Set browser caching
From https://varvy.com/pagespeed/leverage-browser-caching.html:
> It is important to specify one of Expires **or** Cache-Control max-age, and one of Last-Modified **or** ETag, for all cacheable resources. It is redundant to specify both Expires and Cache-Control: max-age, or to specify both Last-Modified and ETag.

Example:

```
## EXPIRES CACHING ##
<IfModule mod_expires.c>
ExpiresActive On
ExpiresByType application/pdf "access 1 month"
ExpiresByType application/x-shockwave-flash "access 1 month"
ExpiresByType image/x-icon "access 1 year"
ExpiresDefault "access 1 day"
</IfModule>
## EXPIRES CACHING ##

# 1 Month for most static assets
# see: https://regex101.com/r/iV9eS3/5 for regex clarification
<FilesMatch ".(woff|woff2|css|jpg|jpeg|png|gif|js|ico)(\?ve?r?=[a-zA-Z0-9\.-]+)?$">
Header set Cache-Control "max-age=2592000, public"
</FilesMatch>
```

#### Ensure automatic updates
That is the case especially if you are using Wordpress Roots Bedrock (because updates are disabled by default). Inside `config/environments/production.php` set:
```
define('WP_AUTO_UPDATE_CORE', 'minor');
define('DISALLOW_FILE_MODS', false);
define('AUTOMATIC_UPDATER_DISABLED', false);
```
You may check the [Background Update Tester](https://wordpress.org/plugins/background-update-tester/) plugin to verify that everything is OK.

#### Ensure enough memory for Wordpress (especially with WPML)

Just add `define('WP_MEMORY_LIMIT', '128M');` in `config/environments/production.php` (if you are using Roots Bedrock) or in `wp-config.php` for standard Wordpress.


#### Protect your site
E.g. with Wordfence.

#### Ensure correct redirects
In case of updated/redesigned sites it is important to redirect as may old URLs as possible.
