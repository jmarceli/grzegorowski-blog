---
layout: post
author: jan
title: How to remap single Mac keyboard key
excerpt: How to remap a single Mac OS X keyboard key without installation of any additional applications or tools
meta_description: null
meta_title: null
slug: how-to-remap-single-mac-keyboard-key
date_created: "2020-04-25T14:11:00.000Z"
feature_image: ./img/kaitlyn-baker-vZJdYl5JVXY-unsplash.jpg
featured: false
tags:
  - mac
  - tools
---

How to remap one Mac OS X keyboard key to the other without using any external tools?
Is it even possible to do without being a mac developer?
It turns out to be pretty simple in the new macOS X 10.12 Sierra using a little util named `hidutil`.

## Problem

You don't like your Mac keyboard layout, or worse you have to work with a different layout at work than you have at home.
In either case you can install some external tool which will do the remapping for you but maybe you don't like to have additional application just for remapping a single key?
My problem was connected with having [British keyboard](<https://en.wikipedia.org/wiki/File:KB_United_Kingdom_Mac_-_Apple_Keyboard_(MC184B).svg>) at home and [American](https://en.wikipedia.org/wiki/File:KB_US-International.svg) at work.
While it is IMO not a problem to get used to any of those switching between them on a daily basis is annoying.
There was one key in particular which makes things a bit hard from a developer perspective.
It was a [tilde key](https://en.wikipedia.org/wiki/Tilde) **`**.
Tilde key is placed next to the **1/!** on the American keyboard and replaced by a [section sign](https://en.wikipedia.org/wiki/Section_sign) **§** key on the British one.

## Solution

As it turns out for macOS X 10.12 Sierra you don't have to do anything more than running a short piece of code to do the required remapping.

Here is an simple example for the problem which I was facing which was remapping **§**/**£** to **`**/**~** key.

```bash
hidutil property --set '{"UserKeyMapping":
    [{"HIDKeyboardModifierMappingSrc":0x700000064,
      "HIDKeyboardModifierMappingDst":0x700000035}]
}'
```

As you can see you have to place appropriate values (usage ID) for `HIDKeyboardModifierMappingSrc` and `HIDKeyboardModifierMappingDst` which you will have to find in a [table in the official docs](https://developer.apple.com/library/archive/technotes/tn2450/_index.html#//apple_ref/doc/uid/DTS40017618-CH1-KEY_TABLE_USAGES).
What is more for each "Usage ID (hex)" you will have to calculate bitwise "OR" with `0x700000000` which is very easy in most cases, but if you are facing any difficulties with that you can also use the following Bash command:

```bash
printf '%X\n' "$(( 0x700000000 | 0x64 ))"
```

Where `0x64` should be replaced with a value from "Usage ID (hex)" column.

In order to check current/effective mappings you can run:

```bash
hidutil property --get "UserKeyMapping"
```

And last but not least. In order to reset everything you have setup so far just execute:

```bash
hidutil property --set '{"UserKeyMapping":
    []
}'
```

> NOTE
>
> All changes made with `hidutil` are immediate, so you don't have to restart anything.

## Issues

I have only one issue with this problem which was finding an appropriate "Usage ID (hex)" for the section sign **§** key.
As it turns out it was named in the Apple docs as **Keyboard Non-US \ and |**.
In order to find that out I've used trial and error approach, so nothing fancy.
If you will come across any better way of finding "Usage ID (hex)" codes please share.

## Sources

- https://developer.apple.com/library/archive/technotes/tn2450/_index.html - Apple Technical Note regarding key remapping in macOS X Sierra
- https://apple.stackexchange.com/questions/283252/how-do-i-remap-a-key-in-macos-sierra-e-g-right-alt-to-right-control - Stack Overflow topic about that
- https://en.wikipedia.org/wiki/British_and_American_keyboards - possible keyboard layouts
