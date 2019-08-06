---
layout: post
author: jan
title: Vim registers - how to use Vim multiple clipboards feature
excerpt: null
meta_description: >-
  One of the core Vim features which are the registers. Thanks to them you can
  efficiently copy/paste inside Vim using multiple clipboards.
meta_title: null
slug: vim-using-registers
date: '2017-05-28T18:21:20.000Z'
date_created: '2017-05-28T18:13:40.000Z'
date_updated: '2017-10-15T13:58:04.000Z'
feature_image: img/keyboard-computer-keys-white-1.jpg
featured: false
draft: false
tags:
  - tools
  - vim
---
Using registers in Vim is like having a [large] number of clipboards where you can copy and paste from whenever you want.
Here is how to use that feature.

Just prepend `"[register_name]` to your regular copy/paste command. A `register_name` could be anything (any letter or number).

Examples:

* Vim copy current line to the register `w`

```vim
"wyy
```

* Vim paste from `w` register

```vim
"wp
```

* Vim copy selection to the register `w`. First select some text in e.g. visual mode.
```vim
"wy
```
