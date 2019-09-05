---
layout: post
author: jan
title: How to backup and restore InfluxDB which runs inside Docker container
excerpt: null
meta_description: >-
  Restoring dockerized InfluxDB requires a little more effort than you may
  expect. You shouldn't execute restore process on the running InfluxDB
  container.
meta_title: How to backup and restore InfluxDB which runs inside Docker container
slug: how-to-backup-and-restore-influxdb-which-runs-inside-docker-container
date_created: '2017-11-16T15:13:50.000Z'
date_updated: '2017-12-07T21:24:24.000Z'
feature_image: img/dockerized-influxdb-restore.png
featured: false
draft: false
tags:
  - docker
  - backend
---
Running InfluxDB inside Docker container is extremely easy with the official image available on Docker Hub https://hub.docker.com/_/influxdb/. Things get a little more complicated when it comes to creating and restoring Dockerized database.

This was tested with **InfluxDB 1.3** and Docker **17.11** on Ubuntu **16.04**, of course it should work regardless of you OS or Docker version.

## Creating InfluxDB backup from a running Docker container
This is a simple scenario in which we have a running Docker container with InfluxDB inside. Our task is to perform a backup of a selected database.

### Get container ID
First of all you should get an ID from a running InfluxDB container. You may check it with a `docker ps` command (CONTAINER ID is the first column):
```sh
CONTAINER ID        IMAGE          COMMAND             CREATED             STATUS            PORTS                              NAMES
e94f5db005a2        influx1.3      "/entrypoint.sh"    3 hours ago         Up About an hour    8083/tcp, 0.0.0.0:8086->8086/tcp   influx_1
```

### Create a backup
It's easy, just execute:
```sh
docker exec -it e94f5 influxd backup -database mydb_to_backup dirname
```
Where:

- **e94f5** - is your InfluxDb container ID
- **mydb_to_backup** - is a name of database you want to backup
- **dirname** - is the name of internal container folder where DB backup will be placed (just make sure it's an empty directory, it will be used in the next command)

Then copy backup files to local directory with:
```sh
docker cp e94f5:dirname local_backup
```
Here:

- **e94f5** - is your container ID
- **dirname** - is you container directory with backup files
- **local_backup** - is your folder path on the local machine

After executing this two commands you should have all backup files inside **local_backup** folder. Now it's time to restore this backup to the other InfluxDB container (which may be placed on the other host e.g. some VM on Azure or AWS).

## Restore backup on Dockerized InfluxDB
Let's get to the restoring process which is a little more complicated than the backup. I assume that you already know how to get the ID of the target container with another InfluxDB. The overall recipe for the restoring is to create a temporary container which won't use Influx as an entrypoint (detailed process is described below).

First of all, you have to stop the container with InfluxDB. This is important to ensure correct database restoration process (it might be possible in future to restore database on a running container but it's not possible now):
```sh
docker stop e94f5
```
Of course, you should replace `e94f5` with your **CONTAINER_ID** first few characters.

Now it's time for magic. You have to create new Influx container which will not run Influx as a root process. Here is the command to do this:

```sh
docker run --rm \
 --entrypoint /bin/bash \
 -v influx_data_dir:/var/lib/influxdb \
 -v local_backup:/backups \
 influxdb:1.3 \
 -c "influxd restore -metadir /var/lib/influxdb/meta -datadir /var/lib/influxdb/data -database [DB_NAME] /backups/[BACKUP_DIR_NAME]"
```
Where:

- **influx\_data\_dir** - is the directory which is used by your stopped Influx container to store DB info
- **local_backup** - is the directory with DB backup
- **db_name** - is name of the restored DB
- **backup\_dir\_name** - is name of database backup folder inside **local_backup** directory

Wait a few moments (or longer), some restoring messages should be visible in the output.
Then your database is restored you may start you stopped Influx container:

```sh
docker start e94f5
```

Everything should be fine. Your database should be available, which you may check via Influx CLI.

## Notes
Some caveats encountered during the work with Docker backup/restore process.

### Usage with Docker Volumes
In case of using Docker Volumes make sure that volume name specified for **/var/lib/influxdb** is correct. The easiest way to discover Volume name used by a running container is executing:
```sh
docker inspect e94f5 | grep volumes
```
Where:

- **e94f5** - is your primary/running Influx container ID

Here is the example output:
```js
"Source": "/var/lib/docker/volumes/my_influx-data/_data"
```
Which means that your data volume name is **my_influx-data**.

## Sources
Places where I've found informations which help me write this tutorial:

- [Official docs](https://docs.influxdata.com/influxdb/v1.3/administration/backup_and_restore/)
- [Community forum](https://community.influxdata.com/t/backup-and-restore-influxdb-inside-docker/1636)
- [Github issue](https://github.com/influxdata/influxdb/issues/8551)
- [Gist](https://gist.github.com/mark-rushakoff/36b4491f97b8781198da36752ecd949b) - many thanks for that
