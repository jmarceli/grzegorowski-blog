---
layout: post
author: jan
title: Secure Docker Grafana container with SSL through Traefik proxy
excerpt: How to setup free SSL encryption for Grafana dashboards using Traefik 2.0 and Let's Encrypt
meta_description: How to setup Let's Encrypt SSL for Grafana Docker container using Traefik 2.0 proxy
meta_title: Secure Docker Grafana container with SSL through Traefik 2.0 proxy
slug: secure-docker-grafana-container-with-ssl-through-traefik-proxy
date_created: 2019-07-18T10:00:00.000Z
date_updated: 2019-07-18T10:00:00.000Z
feature_image: img/john-salvino-bqGBbLq_yfc-unsplash.jpg
featured: false
draft: false
tags:
  - docker
  - backend
---

You are wondering how to auto-generate free and auto-renewable SSL certificate for you Grafana container?
This was also my concern some time ago, so I did create not so ideal Grafana, Nginx-proxy, Let's Encrypt setup which was suppose to do this. It was a lot of configuration and effects are not as good as I would expect. The challenging part was connected with certificate auto-renewal and providing that renewed certificate to Grafana container.
It turns out that I was doing it wrong.

Say hello to the [Traefik 2.0.0-beta edge router](https://docs.traefik.io/v2.0/).

## Overview

In this tutorial I will show you how to setup Grafana Docker container sitting behind Traefik 2.0.0-beta proxy. Traefik will auto-generate and auto-renew free SSL certificate thanks to the Let's Encrypt magic. The only thing which you will need is a domain and VPS server (or some Docker capable service).

## Solution

Create **docker-compose.yml** file with content similar to the code below.

Replace:

- `YOUR.DOMAIN.TEST` with your domain name
- `SECURE_USERNAME` with some username
- `SECURE_PASS` with some secure password
- `YOUR_EMAIL_ADDRESS` with your email address

**docker-compose.yml**

```yml
version: "3"

services:
  grafana:
    labels:
      # SSL redirect requires a separate router (https://github.com/containous/traefik/issues/4688#issuecomment-477800500)
      - "traefik.http.routers.some-name.entryPoints=port80"
      - "traefik.http.routers.some-name.rule=host(`YOUR.DOMAIN.TEST`)"
      - "traefik.http.middlewares.some-name-redirect.redirectScheme.scheme=https"
      - "traefik.http.middlewares.some-name-redirect.redirectScheme.permanent=true"
      - "traefik.http.routers.some-name.middlewares=some-name-redirect"
      # SSL endpoint
      - "traefik.http.routers.some-name-ssl.entryPoints=port443"
      - "traefik.http.routers.some-name-ssl.rule=host(`YOUR.DOMAIN.TEST`)"
      - "traefik.http.routers.some-name-ssl.tls=true"
      - "traefik.http.routers.some-name-ssl.tls.certResolver=le-ssl"
      - "traefik.http.routers.some-name-ssl.service=some-name-ssl"
      - "traefik.http.services.some-name-ssl.loadBalancer.server.port=3000"
    image: grafana/grafana:6.3.2 # or probably any other version
    volumes:
      - grafana-data:/var/lib/grafana
    environment:
      - GF_SERVER_ROOT_URL=https://YOUR.DOMAIN.TEST
      - GF_SERVER_DOMAIN=YOUR.DOMAIN.TEST
      - GF_USERS_ALLOW_SIGN_UP=false
      - GF_SECURITY_ADMIN_USER=SECURE_USERNAME
      - GF_SECURITY_ADMIN_PASSWORD=SECURE_PASS

  traefik:
    image: traefik:v2.0.0-beta1
    ports:
      - "80:80"
      - "443:443"
      # expose port below only if you need access to the Traefik API
      #- "8080:8080"
    command:
      #- "--log.level=DEBUG"
      #- "--api=true"
      - "--providers.docker=true"

      - "--entryPoints.port443.address=:443"
      - "--entryPoints.port80.address=:80"

      - "--certificatesResolvers.le-ssl.acme.tlsChallenge=true"
      - "--certificatesResolvers.le-ssl.acme.email=YOUR_EMAIL_ADDRESS"
      - "--certificatesResolvers.le-ssl.acme.storage=/letsencrypt/acme.json"
    volumes:
      - traefik-data:/letsencrypt/
      - /var/run/docker.sock:/var/run/docker.sock

volumes:
  traefik-data:
  grafana-data:
```

Now you are ready to go with `docker-compose up -d` command executed inside the folder where **docker-compose.yml** file is saved.

That's it. You are done.

Now your Grafana connections are secured with free Let's Encrypt SSL certificate. What is more you don't have to worry about certificate renewal, because Traefik will do it for you.

NOTE: Most of `some-name` or `some-name-...` and `le-ssl` may be replaced with your own names. Just make sure that those names are unique across all containers handled by the Traefik.

## Description

For those who want to know more than just copy/paste code above I've prepared more detailed description of some configuration aspects.

### Traefik

This is a "place" where the most of magic happens.

Every request starts by entering some entry point (ingress port) defined as Traefik container label, here we have two entry points `80` (HTTP) and `443` (HTTPS).

Then traffic from ports is routed according to the routing rules specified inside containers labels e.g. `host` rule used in this example tells Traefik that every request for given domain should be routed to the container with this label.

After that there may be some middleware, in this example we have `redirectScheme` defined which redirects requests to `https` entry point. It is basically a set of "transformations" applied on the routed traffic.

At the end some `service` may be defined which can for example specify a port. By default Grafana exposes `3000` port, so the `loadBalancer` service is used to redirect requests to that port.

The official docs got all of this covered https://docs.traefik.io/v2.0/routing/overview/

### Ports

You (probably) should open ports only on Traefik container and then route the incoming traffic to other containers with Traefik routing rules.

### Labels

Labels are the way of providing configuration for the Traefik container. It is named a "Dynamic configuration" in Traefik docs and you can find a reference [here](https://docs.traefik.io/v2.0/reference/dynamic-configuration/docker/) or "Static Configuration" [here](https://docs.traefik.io/v2.0/reference/static-configuration/cli/).

Static configuration is defined with CLI flags e.g. `--providers.docker=true` which has to be set as labels for Traefik container.

Dynamic configuration is connected with other containers which are "behind" Traefik proxy e.g. `traefik.http.routers.some-name.entryPoints=port80`.

Dynamic and Static Configuration keys defined by labels are not case sensitive, so `--certificatesresolvers.le-ssl.acme.tlschallenge` will work same as `--CertificatesResolvers.le-ssl.acme.TlsChallenge` or
`--certificatesResolvers.le-ssl.acme.tlsChallenge`. Use whichever you prefer (I would go for readability with camelCase).

### Debugging

In order to get more verbose output from Traefik container you can define `--log.level=DEBUG` flag. It is also useful during the development to enable Traefik API with `--api=true` label assigned to the Traefik container. It will open HTTP endpoint on `8080` port where you can fetch some more details about current configuration [here are the URLS](https://docs.traefik.io/v2.0/operations/api/#endpoints) one more very useful is `/api/rawdata` which returns entire configuration in JSON format.

Be aware of possible collision of Traefik API with some entryPoint which you may define. It's probably better to avoid creating any entry point connected with `8080` port.

### SSL

In development it might be a good idea to define for Traefik container `--certificatesResolvers.sample.acme.caServer="https://acme-staging-v02.api.letsencrypt.org/directory"` this will let you avoid Let's Encrypt errors connected with issuing too many certificates for given domain.

```
Unable to obtain ACME certificate for domains ...
Error creating new order :: too many certificates already issued for exact set of domains ...
... see https://letsencrypt.org/docs/rate-limits/ ...
```

Note that SSL encryption ensured by the Traefik is terminated by default on the "edge" of the network. So in our case it means that traffic between Traefik and Grafana containers is not encrypted. That is why we don't have to set any SSL related flags on Grafana container. The SSL encryption is ensured "only" between user browser and Traefik, which is in most cases more than enough.

### Watch mode

By default Traefik is in watch mode which means that if you change a labels for some container you don't have to restart Traefik container for changes to take effect.

### Persistence

Data persistence ensured by the `volumes` directive let's us reuse SSL certificates generated during first Traefik run and ensures that Grafana related configuration is not lost after executing `docker-compose down`. This is a handy feature of a Docker but it is good to know where to look for actual files. Docker volumes (on Ubuntu) are usually located inside `/var/lib/docker/volumes/` directory. You may check yours with `docker volume ls` and then `docker volume inspect [VOLUME_NAME]`.

### Grafana

`GF_SERVER_ROOT_URL` and `GF_SERVER_DOMAIN` are important because by default Grafana is not aware of the proxy between its container and the Internet, so in order to generate correct links you have to define the public URL.

## Add Influx

If you would like to add some database, which is probably most of the Grafana use cases, you can easily define additional container. Just extend your **docker-compose.yml** file with:

```yml
influx:
  image: influxdb:1.7 # or any other recent version
  labels:
    # SSL endpoint
    - "traefik.http.routers.some-name-influx-ssl.entryPoints=port8086"
    - "traefik.http.routers.some-name-influx-ssl.rule=host(`YOUR.DOMAIN.TEST`)"
    - "traefik.http.routers.some-name-influx-ssl.tls=true"
    - "traefik.http.routers.some-name-influx-ssl.tls.certResolver=le-ssl"
    - "traefik.http.routers.some-name-influx-ssl.service=some-name-influx-ssl"
    - "traefik.http.services.some-name-influx-ssl.loadBalancer.server.port=8086"
  restart: always
  volumes:
    - influx-data:/var/lib/influxdb
  environment:
    - INFLUXDB_DB=SOME_DB_NAME # set any other to create database on initialization
    - INFLUXDB_HTTP_ENABLED=true
    - INFLUXDB_HTTP_AUTH_ENABLED=true

    - INFLUXDB_ADMIN_USER=SECURE_USERNAME
    - INFLUXDB_ADMIN_PASSWORD=SECURE_PASS
```

Extend `volumes` section with `influx-data` volume:

```yml
volumes:
  #...
  influx-data:
```

Add another entry point to the Traefik container by opening `8086` port:

```yml
ports:
  #...
  - "8086:8086"
```

and adding a label:

```yml
labels:
  #...
  - "--entryPoints.port8086.address=:8086"
```

Now you have also a fully functional Influx database secured with SSL.

## Sources

- Official docs - https://docs.traefik.io/v2.0/user-guides/docker-compose/acme-tls/
- Request flow - https://docs.traefik.io/v2.0/routing/overview/
- Dynamic Configuration - https://docs.traefik.io/v2.0/reference/dynamic-configuration/docker/
- Static Configuration - https://docs.traefik.io/v2.0/reference/static-configuration/cli/
- TLS redirect middleware related issue - https://github.com/containous/traefik/issues/4688#issuecomment-477800500
- [The old article with some more information](/grafana-with-lets-encrypt-ssl-on-docker)
