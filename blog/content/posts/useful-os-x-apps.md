---
layout: post
author: jan
title: Useful OS X Apps
excerpt: null
meta_description: null
meta_title: null
slug: useful-os-x-apps
date_created: "2017-03-19T02:52:18.000Z"
date_updated: "2017-03-19T03:04:22.000Z"
feature_image: img/black-and-gray-digital-device-193003.jpg
featured: false
draft: false
tags:
  - mac
---

This is a list of applications and utilities which I find most useful for my everyday tasks.

## Spectacle

You can live without the Spectacle app, but why would you like to do so?
It makes moving windows around so much easier that you definitely should give it a try.

For me those three Spectacle shortcuts are more than enough:

- Left Half (**CTRL** + **CMD** + **LEFT ARROW**)
- Right Half (**CTRL** + **CMD** + **RIGHT ARROW**)
- Fullscreen (**CTRL** + **CMD** + **UP ARROW**)

I was used to simplified mapping, just **ALT** + **ARROW** but from time to time it collides with some other applications, so I would suggest staying with three keys mappings.

Visit https://www.spectacleapp.com/ for download.

## Homebrew

Probably from the beginning Mac OS was missing a decent package manager and Homebrew is a good substitute. Of course it is not official but you can find there nearly everything you may want to install.

One important note for the newcomers is that there are two main Homebrew commands:

- `brew install [package_name]`
- `brew cask install [package_name]`
  The only difference between them is that the former helps you with command line utilities e.g. `brew install wget`.
  While the latter is capable of installing MacOS apps (those which would normally display you some GUI in order to install) e.g. `brew cask install drawio`.

The main advantage of using Homebrew is one place for packages update with `brew upgrade` command.

Visit https://brew.sh/ for more information about installation process and download.

## VirtualBox

Do I have to explain why this is one of the most useful tools? The opportunity to run other operating systems on top of your Mac OS is crucial if you want to thoroughly test your applications or just use other OSes from time to time. What is more (at least as for now) the only way to use Docker on Mac is through a VirtualBox VM.

Download and install it from https://www.virtualbox.org/

## Docker

The ability to quickly give a test drive to any containerized solution is so convenient and tempting that the only thing you should watch out is free space on your hard drive.
You can simply download an image (which is usually a pre-prepared system ready for start) and run it everywhere in a couple of minutes.

Meet the Docker https://www.docker.com/

## Draw.io

I think that this is one of the most useful tools if you are about to draw any technical image like a diagram, chart or a schema of a system.
You can easily install it with `brew cask install drawio` but of course it is always a good idea to visit the online app https://draw.io before installing a desktop version.
