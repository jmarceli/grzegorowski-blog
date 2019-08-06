---
layout: post
author: jan
title: How to restore selected files from Time Machine backup
excerpt: null
meta_description: >-
  How to find out which files has been modified, removed or created since your
  last Time Machine backup. How to use a Time Machine CLI tmutils.
meta_title: null
slug: time-machine-restore-backup
date: '2017-05-06T22:05:45.000Z'
date_created: '2017-04-28T18:33:01.000Z'
date_updated: '2017-05-07T11:57:44.000Z'
feature_image: img/pexels-photo-121734.jpeg
featured: false
draft: false
tags:
  - mac
  - tools
---
Don't ask me why I've made this post...

If you accidentally delete half of your projects I hope you have a recent backup available. Even if that's the case the graphical interface of Time Machine seems to be very limited. There is no easy way to tell which files are missing.

> Use the CLI Luke!

So the CLI you say. OK.
Time Machine has a CLI command `tmutils` which is really handy if only you know how to use it.

Example.
You deleted some of your files from `/Users/someone/files` directory (I'm glad it's not a root directory).

So you will need to execute:
```bash
tmutil listbackups
```
to get backups list. Something like this will be an output:
```bash
...
/Volumes/DISKNAME/Backups.backupdb/COMPUTER_NAME/2016-11-10-211600
/Volumes/DISKNAME/Backups.backupdb/COMPUTER_NAME/2016-11-19-195117
/Volumes/DISKNAME/Backups.backupdb/COMPUTER_NAME/2016-11-26-173122
```
Looks easy, the last part is a date and a time. Pick one of them which suits you best.

Then execute:
```bash
tmutil compare -D 1 /Users/someone/files /Volumes/DISKNAME/Backups.backupdb/COMPUTER_NAME/2016-11-26-173122/Macintosh\ HD/Users/someone/files
```
Where:

- `-D 1` - means comparing only one level deep
- `/Users/someone/files` - is a directory which you want to compare
- `Macintosh\ HD/` - is the name of your hard drive (probably same as in this example)
- `/Volumes/DISKNAME/Backups.backupdb/COMPUTER_NAME/2016-11-26-173122` - is the name/path of choosen backup

Then you will get a list which looks like this:
```bash
!         (mtime)               /Users/someone/files
- 4.3M                          /Volumes/DISKNAME/Backups.backupdb/COMPUTER_NAME/2017-04-23-133603/Macintosh HD/Users/someone/files/file_name
+ 58.0M                         /Volumes/DISKNAME/Backups.backupdb/COMPUTER_NAME/2017-04-23-133603/Macintosh HD/Users/someone/files/file_name
! 377B    (size, mtime)         /Volumes/DISKNAME/Backups.backupdb/COMPUTER_NAME/2017-04-23-133603/Macintosh HD/Users/someone/files/file.name

-------------------------------------
Added:         215.9M
Removed:       3.8G
Changed:       14.4K
```
Where:

- `-` means that file/folder was removed
- `+` means that file/folder was added
- `!` means that size has changed

That's it. Now you should know what to restore.


**Sources**

https://ss64.com/osx/tmutil.html
https://apple.stackexchange.com/questions/19453/how-is-it-possible-to-compare-files-on-your-hard-drive-with-those-in-your-time
