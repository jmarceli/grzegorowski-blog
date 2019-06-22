---
layout: post
author: Ghost
title: Wordpress Roots Sage 9 translations
excerpt: null
meta_description: >-
  How to setup and generate translations for Wordpress Roots Sage 9 theme.
  Common folders structure and Blade templates support for Poedit.
meta_title: Wordpress Roots Sage 9 translations (Blade and Poedit)
slug: wordpress-roots-sage-9-translations
date: '2017-08-31T01:26:13.000Z'
date_created: '2017-08-31T00:57:15.000Z'
date_updated: '2017-09-22T22:17:04.000Z'
image: ./img/letters.jpg
featured: false
draft: false
tags:
  - Wordpress
---
Adding translations to the current Roots Sage version (which is 9.0.0-beta.4) is not as easy and standard as it was in previous versions.

First of all, you have to configure your Poedit editor in order to support Blade templates. Described configuration is taken from [the official forum](https://discourse.roots.io/t/localization-of-blade-templates/9331/6#post_6):

1. Open **Poedit**
2. Go to **Preferences -> Extractors**
3. Add a new Extractor with following settings:
Language: **Blade**
Extension: ***.scout.php, *.blade.php**
Parser command: **xgettext --language=Python --add-comments=TRANSLATORS --force-po -o %o %C %K %F**
An item in keyword list: **-k%k**
An item in input files list: **%f**
Source code charset: **--from-code=%c**
4. Click Ok

Now when your Poedit is ready to handle Blade template files go to the **Sources paths** setup (it's in **Catalogue -> Properties** menu).

It's important to set theme **resources/** subdirectory as a root and then exclude **assets/** subdirectory.

![Wordpress Sage Poedit setup](./img/poedit_sage_source_paths.png)

In order to avoid **non ASCII** error message please setup **Source code charset** as **UTF-8** (it's inside **Translation properties** tab).

![Poedit non ASCII bug fix](./img/poedit_non_ascii_fix.png)

And last but not least. Your **lang/** subdirectory where all translation files lives should also be placed inside **resources/** directory. Here is how your folder structure may look like:

![Sage translations files structure](./img/sage_translations_files.png)

One more thing is placing the following code inside **functions.php** file:

```php
add_action('after_setup_theme', function () {
    // Community translations can be found at https://github.com/roots/sage-translations
    load_theme_textdomain('sage', get_template_directory() . '/lang');
});
```

This code will tell the Wordpress where it should look for the translations files.

That's it. If you place your Poedit generated translations inside **resources/langs** folder it should work as usual.
