---
layout: post
author: jan
title: Docker Private Registry - Harbor with Let's encrypt
excerpt: null
meta_description: null
meta_title: null
slug: docker-private-registry-harbor-with-lets-encrypt
date_created: '2018-01-19T22:12:45.000Z'
date_updated: '2018-05-07T02:08:23.000Z'
feature_image: null
featured: false
draft: true
tags: []
---
Rolling your own Docker Private Registry might be necessary step if you don't want or can't use external resources. In this post I will describe Harbor as my favourite solution.

There are several ways of creating Private Docker Registry, here are those which I've tested so far:

- Docker Registry + frontend UI
- Portus
- Harbor

From all those options I've found Harbor the most completed and easiest to use solution.

## Harbor + Let's encrypt

1. Issue a certificate with `docker-compose.get-letsencrypt.yml`
2. Install Harbor according to its installation guide (in `harbor.cfg` set cert files generated with Let's encrypt container)
3. At this point Harbor service should work on specified URL with SSL encryption, please check it before going to the next step. In case of any issues I would advise to check containers logs if `docker logs ...` doesn't work use `sudo cat /var/log/harbor/[container-name].log`
4. Now it's time to setup SSL autorenewal using **jwilder/nginx-proxy** and **jrcs/letsencrypt-nginx-proxy-companion** (the most popular Let's encrypt Docker container)

other option:

Add something like:
```
    # let's encrypt support
    location /.well-known/acme-challenge/ {
      proxy_pass http://le-nginx/.well-known/acme-challenge/;
      proxy_set_header Host $$http_host;
      proxy_set_header X-Real-IP $$remote_addr;
      proxy_set_header X-Forwarded-For $$proxy_add_x_forwarded_for;

      # When setting up Harbor behind other proxy, such as an Nginx instance, remove the below line if the proxy already has similar settings.
      proxy_set_header X-Forwarded-Proto $$scheme;
      proxy_buffering off;
      proxy_request_buffering off;
    }
    # \let's encrypt support
```
to nginx.conf file (it doesn't work as expected anyway).

1. Create empty cert files (just to pass validation) with `touch` command
2. Run `./prepare`
3. Remove generated blank cert files
4. Start with `docker-compose up -d`
5. Wait several minutes to generate SSL certificate (you may track the progress with `docker logs -f le`)
6. You are done! Go visit your SSL protected Private Docker Registry

## Known issues

Some error messages which I manage to pass through.

### [FATAL] [main.go:46]: failed to initialize the system: read /etc/adminserver/key: is a directory
Check your **secretkey_path** configuration in **harbor.cfg**. Probably you shouldn't change it or if you do (have to) remember about updating **docker-compose.yml** paths.
https://github.com/vmware/harbor/issues/2208

### KeyError: u'host'
Check files inside **common/templates** directory. Probably you've tried to use some undefined variable inside one of the templates (it was **$host** in this case, which should be **$$host**).

## Sources

https://mtarnawa.org/2017/11/10/running-secured-private-docker-registry-nginx-proxy-letsencrypt/
