---
layout: post
author: ghost
title: Resizing existing VM partition
excerpt: How to resize existing vagrant disk using vagrant-disksize plugin.
meta_description: null
meta_title: null
slug: resizing-existing-vm-partition
date: '2018-04-25T03:49:00.000Z'
date_created: '2018-04-09T14:07:30.000Z'
date_updated: '2018-05-07T01:53:52.000Z'
image: >-
  ./img/photo-1494412685616-a5d310fbb07d.jpg
featured: false
draft: false
tags:
  - Web developer toolset
---
Use vagrant-disksize plugin from https://github.com/sprotheroe/vagrant-disksize

### Set required disk size
Inside **Vagrantfile**
```bash
Vagrant.configure('2') do |config|
  config.vm.box = 'ubuntu/xenial64'
  config.disksize.size = '100GB'
end
```

### Start Vagrant
```bash
vagrant up
```
or just reload it (if it's already up) with:
```bash
vagrant reload
```

### Enter partitioning tool
```bash
sudo fdisk /dev/sda3
```

1. Press `p` to check current partitions setup
2. Press `d` to delete last partition
3. Press `n` to create new partition
4. Press `t` to adjust filesystem to match previous settings
5. Press `p` and make sure that new setup looks similar to the base one (from step 1.)
6. Press `w` to save settings

You are suppose to see that message:
```bash
The partition table has been altered.
Calling ioctl() to re-read partition table.
Re-reading the partition table failed.: Device or resource busy

The kernel still uses the old table. The new table will be used at the next reboot or after you run partprobe(8) or kpartx(8).
```

### Exit Vagrant
```bash
exit
exit
```

Restart Vagrant
```bash
vagrant reload
```

Enter Vagrant
```bash
vagrant ssh
```

Resize existing partition to span to new available space
```bash
sudo resize2fs /dev/sda3
```

Hopefully it's working now and you have much more free space!


## Sources
https://askubuntu.com/a/116367/175659
