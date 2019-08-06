---
layout: post
author: jan
title: Docker for Mac OS X
excerpt: null
meta_description: >-
  Docker files location, performance problems, persistence of container files
  and size of a Docker VM problem.
meta_title: Setup Docker for Mac OS X
slug: docker-for-mac-os-x
date: '2017-06-06T20:09:10.000Z'
date_created: '2017-05-30T21:51:40.000Z'
date_updated: '2017-06-11T12:53:10.000Z'
feature_image: img/containers-2.jpg
featured: false
draft: false
tags:
  - docker
  - tools
---
This will be a set of questions and answers related to the Docker usage under OS X.

## Where are my Docker files? They are supposed to be inside `/var/lib/Docker` but there is no such directory.
That's right Docker for Mac store all the data inside Virtual Machine which is located inside `/Users/username/Library/Containers/com.docker.docker`

## The size of `/Users/username/Library/Containers/com.docker.docker/Data` directory is enormous 16GB+.
This is the normal behaviour because Docker for Mac doesn't implement TRIM to free unused space. You may find more details on [Github](https://github.com/docker/for-mac/issues/371). As for now the only working solution for me was resetting Docker (which means removing all images, containers and volumes).

## Persistence in Docker for Mac.
You probably shouldn't use recommended Volumes API because it will store all your data inside Docker VM instead of your local file system. It means that when you make Docker reset (e.g. to free some space) you will loose your "persisted" data. As for now I think that the best (safest) option is staying with Data Volume Containers. As they will be normally backed up by your Time Machine backups.

## Docker is running slow (extremely slow) on OS X.
Add following line to the `/etc/hosts` file.

```bash
127.0.0.1	localunixsocket.local
```

More details can be found in [this Github issue](https://github.com/docker/for-mac/issues/1557).
