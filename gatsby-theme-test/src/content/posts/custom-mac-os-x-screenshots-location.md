---
layout: post
author: Ghost
title: Custom Mac OS X screenshots location and format
excerpt: null
meta_description: null
meta_title: null
slug: custom-mac-os-x-screenshots-location
date: '2017-03-19T02:42:08.000Z'
date_created: '2017-03-19T02:39:20.000Z'
date_updated: '2017-03-19T03:14:40.000Z'
image: null
featured: false
draft: false
tags:
  - mac
---
Default screenshots location on Macs is your Desktop which is not very convenient. After a few months, it will look (probably always) like one big mess with a lot of random files scattered around. Wouldn't be great to store all your screenshots in one place?

## Custom location
In order to adjust screenshot location follow these steps:

1. Open terminal
2. Execute (you may adjust location by changing the last part with path `~/Documents/Screenshots` to fit your needs):

        defaults write com.apple.screencapture location ~/Documents/Screenshots
  There is one catch. Target directory **has to** exist before executing that command, this is an advice from my personal experience.

3. Execute to apply changes:

        killall SystemUIServer

4. It's done

## Custom format

A custom file format can be set in a way similar to a [custom location](#customlocation), just in step `2` execute:

    defaults write com.apple.screencapture type jpg

You may adjust `type jpg` to suit your needs here is a list of available values: `jpg`, `gif`, `pdf`, `png`, `tiff`.
