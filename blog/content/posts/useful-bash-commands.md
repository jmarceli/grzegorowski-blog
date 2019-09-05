---
layout: post
author: jan
title: Useful Bash commands
excerpt: null
meta_description: >-
  List files by date, check the sizes of all files in folder or rename multiple
  files using regex.
meta_title: A set of useful bash commands
slug: useful-bash-commands
date_created: '2017-04-11T12:25:28.000Z'
date_updated: '2017-11-20T21:40:07.000Z'
feature_image: img/pexels-photo-30193.jpg
featured: false
draft: false
tags:
  - tools
---
This is a list of Bash commands that I frequently use with a short explanation. It may help you in everyday usage of your Unix based system. Tested on OS X but should also work on Ubuntu and others.

## Listing files/folders sorted by time
When you need to find most recently edited file/folder in a directory this will be a useful command:

```bash
ls -t
```
Command details:

- `ls` List directory contents
- `-t` Sort by time modified (most recently modified first) before sorting the operands by lexicographical order

---

## Rename files and folders recursively with find
The command is pretty simple:
```bash
find . -name some_name -execdir mv {} other_name \;
```
It will rename all `some_name.*` files and `some_name` directories to `other_name` recursively.

Command details:

- `find` Walks a file hierarchy
- `.` Path where to start searching for files
- `-name some_name` Name of the files and/or directories which will be renamed
- `-execdir mv {} other_name \;` Command to execute for each file found where:
 - `mv` Move file
 - `{}` Current file name
 - `other_name` New file name
 - `\;` Command termination

---

## Rename multiple files inside folder with rename
For example changing a file extension in the current directory might look like this:
```bash
rename 's/.js/.jsx/g' *
```
Command details:

- `rename` Renames multiple files
- `'s/.js/.jsx/g'` Regexp which will be applied to the name of every file
- `*` Path for the modified files e.g. `imports/client/components`

---

## List sizes of all folders inside a directory
This is very useful if you want to find largest directories:
```sh
du -sh *
```
Command details:

- `du` Display disk usage statistics
- `-s` Display a summary for each specified file. (Equivalent to -d 0)
- `-h` "Human-readable" output. Use unit suffixes: Byte, Kilobyte, Megabyte, Gigabyte, Terabyte and Petabyte.
- `*` Path for the files to list

**NOTE**: If you want to sort that list by size you may use:
```
du -sh * | sort -h
```
Where `-h` in sort referes to the:

> -h --human-numeric-sort compare human readable numbers (e.g., 2K 1G)

On OS X you will have to install `coreutils` package (it is as easy as typing `brew install coreutils`). If you don't use [Homebrew](https://brew.sh/) you should definitely start using it.
For Mac OS X the command will look as follows:
```sh
du -sh * | gsort -h
```
