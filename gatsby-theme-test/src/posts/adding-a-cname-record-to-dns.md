---
layout: post
author: Ghost
title: Adding a CNAME record to the DNS
excerpt: null
meta_description: >-
  After adding new records to the DNS you should ensure that your changes works
  as expected. In order to do this without waiting for the DNS propagation you
  should query modified DNS directly. 
meta_title: Adding a CNAME record to the DNS
slug: adding-a-cname-record-to-dns
date: '2017-05-23T18:17:21.000Z'
date_created: '2017-05-23T18:09:33.000Z'
date_updated: '2017-05-28T19:00:00.000Z'
image: ./img/pexels-photo-325223.jpg
featured: false
draft: false
tags:
  - Web developer toolset
  - Hostings
  - Backend
---
In order to check your current DNS records, you may use this tool https://www.samdns.com/

![DNS records checking tool](./img/dns_records_checking_tool.png)

It allows you to specify DNS server, so you don't need to wait for the DNS propagation or clearing any cache.

It is especially useful if you are unsure how does your provider DNS panel work and to check if all the records you have edited/added are correct.

If you don't know your provider DNS server IP address use a command line utility like `ping` or just paste DNS domain name inside "DNS Lookup" Domain field. In this example I'm looking for the IP of the `dns1.mydevil.net` DNS server.

![Looking for DNS IP address](./img/dns_find_ip.png)

Then click "Go". As a result you will find A record for your DNS domain name which is an IP address you are looking for.

![DNS server IP address](./img/dns_lookup_result.png)

### An example check for CNAME record.

Enter the DNS record you are looking for, select its type and fill the DNS IP address (your provider DNS).

![DNS CNAME check](./img/dns_cname_checking.png)

Here is how results may look like. In case of the CNAME record in the **Answer** column you will see the domain which is pointed by your source domain.

![DNS CNAME check result](./img/dns_cname_check_results.png)

### CNAME configuration example
Adding a subdomain CNAME record to the DNS is just adding a record to your main domain DNS records list. For example, if you want to add a CNAME record which will point `blog.grzegorowski.com` to some other domain (let say `example.domain.com`) you would probably add the following line to the main domain records list:

![CNAME record](./img/cname_record.png)

All your domain DNS records may look as follows:

![CNAME record - domain DNS records list](./img/cname_record_domain_records_list.png)

This example is from my current hosting provider (Mydevil.net), but depending on the provider configuration you may need to end **Target** domain with a dot e.g. `example.domain.com.`.
