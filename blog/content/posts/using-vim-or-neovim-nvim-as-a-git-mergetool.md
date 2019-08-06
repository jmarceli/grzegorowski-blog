---
layout: post
author: jan
title: Using Vim or NeoVim as a git mergetool
excerpt: >-
  Using Vim or NeoVim as a Git mergetool with a nice 3 windows view instead of
  the default complicated 4 windows version.
meta_description: null
meta_title: null
slug: using-vim-or-neovim-nvim-as-a-git-mergetool
date: '2018-08-09T09:20:00.000Z'
date_created: '2018-08-22T21:42:00.000Z'
date_updated: '2018-09-12T11:16:26.000Z'
feature_image: >-
  img/photo-1436377991866-f9af228d2b47.jpg
featured: false
draft: false
tags:
  - vim
  - tools
---
The "ugly" 4 window view of the default `vimdiff` configuration can scare you out even if you were using Vim for a while. It's just too much information for most of the common merge cases.

## Problem
How to configure **vim** or **nvim** with **git** to get a comfortable mergetool experience?

Not 4 windows...
![4 windows vimdiff view](img/screen-shot-2018-08-10-at-22.30.12.png)
## Solution

Install [vim-fugitive](https://github.com/tpope/vim-fugitive) and use following configuration in your `~/.gitconfig` file:
```
[mergetool "nvim"]
  cmd = nvim -f -c \"Gdiff\" \"$MERGED\"
```

It will give you a "nice" view with 3 windows horizontally splitted.
![vim 3 window vimdiff view](img/screen-shot-2018-08-10-at-22.19.52.png)
On the left side you have a current working copy (LOCAL).
On the right side you can view the remote (merged) file (REMOTE).
The central part of your screen shows a result (MERGED).

What is good about that setup (and why I use it all the time)?

1. In Vim **normal** mode place the cursor inside a right window in a merge conflict section (it is marked with a violet/pink highlight).
![nvimdiff merging](img/screen-shot-2018-08-10-at-22.17.47.png)
2. Hit the keys **dp** (a shortcut from `:diffput`).
3. Code under the cursor will replace conflicted part in the MERGED file.
4. Conflict solved, you are good to go.
![nvimdiff merged](img/screen-shot-2018-08-10-at-22.18.12.png)
Repeat above steps for all merge conflicts (if you have more of them). You can navigate between left (LOCAL) and right (REMOTE) windows making diffputs to MERGED file as well as making manual changes directly inside merged content.

## Hints

You may execute `:Gw!` command in any of the opened windows. The window where you execute that command will be commited and marked as a merge resolution. It is very useful if you want to use just REMOTE or just LOCAL version without any further merge resolution steps.

Want more?
When in the central window use `d2o` or `d3o` to pull changes from LOCAL or REMOTE file.

## Sources

Where does it come from? Check out this tutorial if you would like to know the details [vimcasts #33](http://vimcasts.org/episodes/fugitive-vim-resolving-merge-conflicts-with-vimdiff/).
Also vim-fugitive docs are very helpful. Check out the https://github.com/tpope/vim-fugitive
