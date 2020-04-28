---
layout: post
author: jan
title: What is and how to use Google Tag Manager
excerpt: Google Tag Manager lets you change you page without touching its codebase with predefined set of available Tags/modifications.
meta_description: null
meta_title: null
slug: what-is-and-how-to-use-google-tag-manager
date_created: "2019-05-12T14:11:00.000Z"
feature_image: img/rajeshwar-bachu-K4txLik7pnY-unsplash.jpg
featured: false
tags:
  - frontend
  - tools
---

Google Tag Manager (GTM) is a tool made by Google which lets you modify content of your website without touching its codebase.
It adds a small Javascript snippet to your page and then you can define what it will do through the GTM administration panel.
There are number of pre-defined modifications like adding "Google Analytics", "Google Ads" or even arbitrary HTML which allows you for injecting custom Javascript (if you need that).
What is more whenever you publish new changes with GTM a new version is created so you can easily rollback if required.

## Basic concepts

There are a couple of names used in GTM admin panel:

- Tags - modifications made to your page, like adding "Google Analytics"
- Triggers - describes when those modifications should be applied e.g. "All Pages", "Scroll Depth"
- Containers - sets of Tags and Triggers published to your website, they are versioned to ease any rollbacks and provide history

These are just basic concepts but they should be enough in order not to hurt yourself.
I would suggest to find appropriate tutorials for the first few changes made with GTM as it might be not so obvious how to use that tool.

## Q&A

### Is it possible to share one GTM Container across regular website and its AMP version?

As far as I know it is not possible to do as AMP websites need a different type of container which has type of "AMP".
Such Container has different set of Tags and Triggers available.
If you would like to have same set of Tags added through the GTM on your both website versions you will have to create two separate containers and maintain them independently.
This is not very convenient but there is probably no other way (right now).

### Is it possible to add custom Javascript with GTM?

Definitely, but I wouldn't recommend such approach for deploying larger code bases as it might be hard to maintain in the future.
All you need to do is creating a new Tag of "Custom HTML" type.
Then inside "HTML" textarea you should put your Javascript code wrapped with HTML `<script>` tags.
It might look as follows:

```html
<script type="text/javascript">
  console.log("Hello from GTM");
</script>
```

The above code will print `Hello from GTM` to the browser console each time you enter your website.
Of course it will do so only if you publish Container with that Tag.

### Is it possible to track scrolling depth with Google Tag Manager and Google Analytics

Of course you can use Google Tag Manager to track scrolling depth on Google Analytics.
This is especially useful if you have a page when most of users are not clicking any links, just scroll it down and exit after reading the content.
By implementing scroll tracking you will probably reduce bounce rate reported by Google Analytics.
If you would like to get the details I will write a separate post about that.

### How does Google Tag Manager Preview feature works?

After you click "Preview" button in the top right corner you will get an URL which after entering creates a special cookie in you browser.
Thanks to that cookie you can view you website with changes which are not currently visible to the other visitors.
It is very useful for testing purposes if you are not sure if your GTM configuration will work as you expect.

### Does Container name matters?

Container name in GTM doesn't have to be the same as your website URL.
This is just a convention which you may find easy to use but you can name your GTM Containers however you want.

## Sources

- https://developers.google.com/tag-manager/quickstart - GTM quick start docs
