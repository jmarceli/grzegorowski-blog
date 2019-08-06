---
layout: post
author: jan
title: >-
  RabbitMQ amqplib - "Error: Channel closed by server: 406 (PRECONDITION-FAILED)
  with message "PRECONDITION_FAILED - unknown delivery tag 1"
excerpt: >-
  How to handle Error: Channel closed by server: 406 (PRECONDITION-FAILED) with
  message "PRECONDITION_FAILED - unknown delivery tag 1" and what are the
  reasons of this error message.
meta_description: >-
  How to handle "RabbitMQ 406 Error precondition-failed with unknown delivery
  tag" and what are the reasons for this error message.
meta_title: Channel closed by server 406 precondition failed unknown delivery tag
slug: rabbitmq-406-channel-closed-precondition-failed
date: '2018-08-09T08:25:00.000Z'
date_created: '2018-07-29T04:59:48.000Z'
date_updated: '2018-09-20T10:18:10.000Z'
feature_image: >-
  img/photo-1534279172812-fed91fae8966.jpg
featured: false
draft: false
tags:
  - backend
---
If you are struggling with the **406 error** message which is included in title of this post you may be interested in reading the whole story.

## Problem

I was using [amqplib](https://github.com/squaremo/amqp.node) for conneting NodeJS based messages processor with RabbitMQ broker.
Everything seems to be working fine, but from time to time **406 (PRECONDINTION-FAILED)** message shows up in the log:

> "Error: Channel closed by server: 406 (PRECONDITION-FAILED) with message "PRECONDITION_FAILED - unknown delivery tag 1"

## Solution

Keeping things simple:
- You have to ACK messages in same order as they arrive to your system
- You can't ACK messages on a different channel than that they arrive on

If you break any of these rules you will face **406 (PRECONDITION-FAILED)** error message.
