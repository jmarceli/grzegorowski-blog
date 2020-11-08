---
layout: post
author: jan
title: How to test cloud-init locally with Vagrant
excerpt: null
meta_description: If you are looking for an easy way to test your cloud-init file locally I believe that Vagrant is a right choice for you together with its experimental cloud_init flag
meta_title: null
slug: how-to-test-cloud-init-locally-with-vagrant
date_created: "2020-11-01T19:28:03.000Z"
feature_image: img/annie-spratt-6G6Q1I-QW8M-unsplash.jpg
featured: false
draft: false
tags:
  - tools
  - backend
  - devops
---

How to test a cloud-init file locally?
The most straight forward choice seems to be VirtualBox and Vagrant.
I will show you how to set up the Vagrant experimental `cloud_init` flag to test your cloud-init files on the locally deployed VM.
This way you can quickly validate the expected results without spinning up a real VM inside your cloud provider panel.

TLDR; Clone https://github.com/jmarceli/test-cloud-init-vagrant, adjust the **cloud-init-test.yml** file, execute the `vagrant up` command and check the results with `vagrant ssh`.

## Prerequisites

It will be useful to have at least basic knowledge about the following tools:

- Virtualbox (download and install the latest version from https://www.virtualbox.org/wiki/Downloads)
- Vagrant (download and install the latest version from https://www.vagrantup.com/downloads)

In this tutorial I will be using Ubuntu Server Cloud Images from https://cloud-images.ubuntu.com.
For the Virtualbox an appropriate image with the `.box` extension might be https://cloud-images.ubuntu.com/focal/current/focal-server-cloudimg-amd64-vagrant.box
You don't have to download it manually as this will URL will be included in your Vagrantfile and handled automatically.

## Vagrant setup

Create a directory for this project somewhere in your local filesystem e.g. **~/cloud-init-tests/**.
Then create a **Vagrantfile** inside that directory.
This file will contain all the required configuration:

```ruby
Vagrant.configure("2") do |config|
  config.env.enable # enable .env support plugin (it will let us easily enable cloud_init support)

  # Give a custom name for a VM created by this script for a Vagrant CLI
  config.vm.define "focal-server-cloudimg-amd64-vagrant"

  # Name for the box image downloaded from the box_url
  # it will be used to create a folder inside ~/.vagrant.d/boxes to avoid re-downloading
  config.vm.box = "focal-server-cloudimg-amd64-vagrant"

  # URL used as a source for the vm.box defined above
  config.vm.box_url = "https://cloud-images.ubuntu.com/focal/current/focal-server-cloudimg-amd64-vagrant.box"

  config.vm.provider "virtualbox" do |v|
    # Name visible inside your Virtualbox UI
    v.name = "cloud-init-ubuntu-test"
  end

  # cloud-init script
  config.vm.cloud_init do |cloud_init|
    # With Ubuntu cloud images you have to use cloud_init to get an access
    cloud_init.content_type = "text/cloud-config"
    cloud_init.path = "cloud-init-test.yml"
  end
end
```

## Vagrant experimental flags

The next file which has to be created is **.env**.
It should be placed in the same directory as your **Vagrantfile**.
Content of the **.env** file should be as follows:

```
VAGRANT_EXPERIMENTAL="cloud_init,disks"
```

Together with previously mentioned line `config.env.enable` this will enable **cloud_init** and **disks** experimental flags.

> NOTE
>
> **cloud_init** will NOT work without a **disks** flag, so this is very important to enable both of them.
> What is strange this information is not currently provided on the Vagrant docs pages.

## Tested cloud-init file

The last but not least, your cloud-init file which in my example is named **cloud-init-test.yml**.
It can have any content supported by the cloud-init and in my example, it will be a `yml` file with the following lines:

```yml
packages:
  - python-is-python3
users:
  - name: test_user_unique_name
    groups: sudo
    homedir: /custom/home/dir
    shell: /bin/bash
    sudo: ["ALL=(ALL) NOPASSWD:ALL"]
    # ssh-authorized-keys:
    #   - ssh-rsa USE_YOUR_RSA_KEY_HERE_IF_NEEDED
```

## Executing the test

Now it is time to test the setup.
Just execute `vagrant up` inside the folder where you placed the **Vagrantfile**.
If you set everything properly the following output should appear:

```bash
==> vagrant: You have requested to enabled the experimental flag with the following features:
==> vagrant:
==> vagrant: Features:  cloud_init, disks
==> vagrant:
==> vagrant: Please use with caution, as some of the features may not be fully
==> vagrant: functional yet.
Bringing machine 'focal-server-cloudimg-amd64-vagrant' up with 'virtualbox' provider...
==> focal-server-cloudimg-amd64-vagrant: Importing base box 'focal-server-cloudimg-amd64-vagrant'...
```

After a few seconds (maybe minutes depending on your cloud-init file) your VM should be up and running.
Now you can check the results by executing `vagrant ssh`.
In my example it is easy to verify that a user `test_user_unique_name` is present by executing `cat /etc/passwords` and that a package `python-is-python3` was installed with `python --version` (it outputs `Python 3.`)

After you will finish with the examination of the provisioned VM you can safely destroy it to retrieve all resources allocated for its existence.
Just execute the `vagrant destroy` command followed by `y` answer to the confirmation question.

## Sources

https://www.vagrantup.com/docs/cloud-init/usage - official Vagrant docs
https://www.vagrantup.com/docs/cloud-init/configuration - different formats of cloud-init supported by Vagrant
https://cloudinit.readthedocs.io/en/latest/topics/modules.html - cloud-init modules list
https://cloudinit.readthedocs.io/en/latest/topics/examples.html - cloud-init examples
