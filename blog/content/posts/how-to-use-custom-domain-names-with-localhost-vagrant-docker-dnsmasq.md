---
layout: post
author: jan
title: DNSmasq for custom development domain name
excerpt: null
meta_description: >-
  How to setup a development domain name for Vagrant/Docker/localhost hosted
  site. Use DNSmasq to point every *.dev domain to your development environment.
meta_title: DNSmasq for custom development domain name
slug: how-to-use-custom-domain-names-with-localhost-vagrant-docker-dnsmasq
date: '2017-06-17T16:45:00.000Z'
date_created: '2017-05-30T10:01:29.000Z'
date_updated: '2017-06-17T17:03:45.000Z'
feature_image: img/dnsmasq-custom-local-domain.jpg
featured: false
draft: false
tags:
  - tools
  - docker
---
Setting up a custom domain name for a local development may be really useful especially when you want to test multisite setup (e.g. for Wordpress multisite site). In the tutorial below I will show how to point all `*.dev` addresses back to your localhost (or any other IP e.g. Vagrant host or Docker container).

Install Dnsmasq. On OS X it is available via [homebrew](https://brew.sh/) package manager.

```bash
brew up
brew install dnsmasq
```
> For Ubuntu you may install dnsmasq via `sudo apt-get install dnsmasq` ([official docs](https://help.ubuntu.com/community/Dnsmasq))

Then you should be able to configure address redirections in the **Dnsmasq** config file (`/usr/local/etc/dnsmasq.conf` on OS X) e.g.

```bash
address=/.dev/127.0.0.1
```

Above instructions will redirect every `*.dev` address to the localhost, which may be useful if you are using localhost as a development server or a Docker with 80 port bound to your localhost.

>In case you are using Vagrant you would probably write something like this in your dnsmasq config (if you Vagrant host is available on `192.168.50.4` IP address).

>`address=/.dev/192.168.50.4`

Next thing to do after adjusting Dnsmasq config file is restarting the Dnsmasq service.

```bash
sudo launchctl stop homebrew.mxcl.dnsmasq
sudo launchctl start homebrew.mxcl.dnsmasq
```

Now when you enter any address which ends with `.dev` to the browser you will see the content of your localhost/Docker container/Vagrant host. For example if this site would be developed with that approach I would probably have a local development copy under the `http://grzegorowski.dev` address.
