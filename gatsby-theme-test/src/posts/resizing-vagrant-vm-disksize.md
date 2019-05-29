---
layout: post
author: Ghost
title: Adding new partition to the existing Vagrant VM
excerpt: null
meta_description: >-
  How to add a new partition to the existing Vagrant Box based Virtual Machine
  using vagrant-disksize plugin and fdisk command line utility
meta_title: ''
slug: resizing-vagrant-vm-disksize
date: '2018-04-06T01:00:00.000Z'
date_created: '2018-04-15T18:50:52.000Z'
date_updated: '2018-04-06T18:29:00.000Z'
image: >-
  ./img/photo-1520194057472-0410cf11178e.jpg
featured: false
draft: false
tags:
  - Web developer toolset
---
This will be a tutorial about adding **new** partition to the existing Vagrant (Virtual Box) machine. It should be safe to follow but **please backup your data before proceeding**.

Use **vagrant-disksize** plugin from https://github.com/sprotheroe/vagrant-disksize

## Installation is easy
Execute inside you Vagrant VM folder:
```bash
vagrant plugin install vagrant-disksize
```

## Then configure
Modify your **Vagrantfile** according to plugin **Usage** section:
```ruby
Vagrant.configure('2') do |config|
  config.vm.box = 'ubuntu/xenial64'
  config.disksize.size = '50GB'
end
```

## Finally
```
vagrant up
```

## Now the tricky part
If you are not an experienced Linux user it might be not so easy. You will have to create and format new partition using command line.

### Enter your Vagrant box
```bash
vagrant ssh
```

### Become root user
```bash
sudo su -
```

### Enter partitioning utility
```bash
fdisk /dev/sda
```

1. Press `p` to check current partitions table (just for your information)
2. Press `n` in order to create new partition
3. Press `e` to create extended (logical) partition
4. Select its number (or hit ENTER to leave the default selection which should be OK in most cases)
5. Select first sector (or hit ENTER to leave the default number which should be OK in most cases)
6. Select last sector (hit ENTER to leave the default number which should ensure that entire available space will be used)
7. Press `p` and check that you have now a new partition (compared to step 1.)
8. Press `w` to save your modifications

After these steps you should see output similar to this one:

```bash
The partition table has been altered.
Calling ioctl() to re-read partition table.
Re-reading the partition table failed.: Device or resource busy

The kernel still uses the old table. The new table will be used at the next reboot or after you run partprobe(8) or kpartx(8).
```
You shouldn't worry about `...: Device or resource busy` message

### Exit your Vagrant box
```bash
exit
exit
```
Yes execute it two times: first one leaves root and second one exits Vagrant.

### Restart your Vagrant box
```bash
vagrant reload
```
(or `vagrant halt` and `vagrant up` if you prefer)

### Reenter Vagrant
```bash
vagrant ssh
```
You may check with `df -h` that your new partition is not currently mounted

### Format new partition
Assuming that you new partition is located at `/dev/sda3`
```
sudo mkfs -t ext4 /dev/sda3
```
If it asks you about proceeding **Proceed anyway?** you should probably answer with `y`.

### Mount your new partition!
```
sudo mkdir /mnt/new_partition
sudo mount /dev/sda3 /mnt/new_partition
```
So it is now available on `/mnt/new_partition` path.

That's it you are done.

## Automounting new partition
After setting up new partition you will probably want it to mount on VM startup without need for manual `mount`.

Check the https://askubuntu.com/a/165462/175659 for info about automount setup using `/etc/fstab` file.

## Sources

If you want to play with resizing existing disk please refer to the: https://gist.github.com/christopher-hopper/9755310
and/or (I had no luck with this solution but it might work):
https://askubuntu.com/a/116367/175659
