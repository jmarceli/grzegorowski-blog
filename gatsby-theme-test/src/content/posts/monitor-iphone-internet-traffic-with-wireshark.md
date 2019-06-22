---
layout: post
author: Ghost
title: Monitor iPhone network traffic with Wireshark
excerpt: null
meta_description: null
meta_title: null
slug: monitor-iphone-internet-traffic-with-wireshark
date: '2018-04-02T23:11:34.000Z'
date_created: '2017-10-24T04:27:29.000Z'
date_updated: '2018-04-02T23:11:34.000Z'
image: ./img/iphone-wireshark-network-monitoring.jpg
featured: false
draft: false
tags:
  - Web developer toolset
  - iOS
  - mac
---
Use `rvictl` and Wireshark.

In order to user **rvictl** you have to have **latest Xcode installed** and launched at least once (during first run Xcode downloads some additional tools, one of them is **rvictl**).

When **rvictl** command is available in terminal check your device UUID (in **Xcode > Window > Devices and Simulators**)

Then execute:

```bash
rvictl -s [UUID]
```

Now you should have **rvi0** interface available.

Just use Wireshark on that interface, it will show all packages sent and received by your iPhone.
