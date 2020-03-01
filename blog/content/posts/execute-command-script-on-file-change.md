---
layout: post
author: jan
title: Track file changes and automate script execution
excerpt: null
meta_description: >-
  Live synchronization of local files with a remote host directory through the
  entr script. It might be used for any other file tracking task.
meta_title: Track file changes and automate script execution
slug: execute-command-script-on-file-change
date_created: "2017-12-14T19:34:12.000Z"
date_updated: "2018-03-18T21:37:33.000Z"
feature_image: img/dockerized-influxdb-restore.png
featured: false
draft: false
tags:
  - tools
---

Recently I came across an issue of "live" synchronization of my local files with a remote host. It was necessary to upload project files as they are modified.

Normally it would require thousands of `rsync ...` executions but thanks to **entr** everything was fully automatic.

**entr** is an Open Source project which helps to detect file changes and automates script rerunning. Example:

```bash
ag -l | entr ./sync.sh
```

Where:

- `ag -l` lists all the files found by [the Silver Searcher](https://github.com/ggreer/the_silver_searcher) but it might be any other files listing command like `ls *`
- `sync.sh` is a custom bash script for file syncing, in my case it was `rsync` based one-liner like `rsync -avzh * my_vm:my_dir --exclude .git`

## Installation

Fortunately **entr** is **available on Homebrew**, so installation (for MacOS) is extremely easy:

```bash
brew install entr
```

## Sources

http://entrproject.org/ - official **entr** website with much more examples and documentation
