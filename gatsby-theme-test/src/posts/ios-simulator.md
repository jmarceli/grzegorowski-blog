---
layout: post
author: Ghost
title: iOS simulator SSL certificates problems
excerpt: >-
  Mac OS X iOS simulator problem with SSL secured connections when using
  antivirus program
meta_description: >-
  Mac OS X iOS Simulator problem This Connection Is Not Private with SSL secured
  connections when using an antivirus program
meta_title: null
slug: ios-simulator
date: '2018-04-02T14:35:00.000Z'
date_created: '2018-04-08T01:11:57.000Z'
date_updated: '2018-04-02T23:37:15.000Z'
image: >-
  ./img/photo-1517503733723-8ea1cf616798.jpg
featured: false
draft: false
tags:
  - Web developer toolset
---
iOS simulator is a handy tool available for every OS X user but you may encounter **This Connection Is Not Private** or other strange bugs when using it along some antivirus software.

## Problem

If you have a problem with running your iOS App/WebApp inside simulator please check if you can establish **any** SSL connection. In my case it wasn't possible to connect to even https://apple.com.
![Screen-Shot-2018-04-02-at-21.23.58](./img/screen-shot-2018-04-02-at-21.23.58.png)
After scratching my head a couple of times I finally found a solution which was changing Avast Security settings. Let's start from the beginning.

## Solution

Open your Avast antivirus program and you should see something like this.
![Screen-Shot-2018-04-02-at-21.16.46](./img/screen-shot-2018-04-02-at-21.16.46.png)
Under **Tools** tab you will find this popup.
![Screen-Shot-2018-04-02-at-21.16.50](./img/screen-shot-2018-04-02-at-21.16.50.png)
Then you may try to click on **Disable** button next to **Web Shield** option and check if this resolves the issue.
If so reenable the **Web Shield** and proceed to the less **radical** solution :)

Click on the **Settings** link under the **Disable** button and you should see the following configuration.
![Screen-Shot-2018-04-02-at-21.17.04](./img/screen-shot-2018-04-02-at-21.17.04.png)
The preffered solution would be adding **Excluded servers** with plus sign on the bottom of the excluded servers list. In the popup type in desired server address e.g. **apple.com** and select **https** in **Service** selection.
![Screen-Shot-2018-04-02-at-21.17.08](./img/screen-shot-2018-04-02-at-21.17.08.png)

If you don't know the address or need more universal solution you may uncheck **Scan secured connections** checkbox but I think that this is less desirable solution.

This solution probably may be applied to other antiviruses which are scanning your SSL secured connections. Fell free to comment if you come across similar problem.

## Sources

Official Apple forum - https://forums.developer.apple.com/thread/90510

