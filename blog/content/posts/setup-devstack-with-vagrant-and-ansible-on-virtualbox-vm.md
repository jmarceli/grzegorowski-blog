---
layout: post
author: jan
title: Devstack set up on the Virtualbox VM
excerpt: null
meta_description: >-
  How to set up a new Devstack instance locally using a Virtualbox VM?
  Tutorial which shows how to use Vagrant and Ansible to automate Virtualbox VM set up for a Devstack local cloud.
meta_title: null
slug: setup-devstack-with-vagrant-and-ansible-on-virtualbox-vm
date_created: "2020-11-07T19:28:03.000Z"
feature_image: img/c-dustin-K-Iog-Bqf8E-unsplash.jpg
featured: false
draft: false
tags:
  - tools
  - backend
  - devops
---

This tutorial will show you how to set up and deploy a simple OpenStack based local cloud.
Thanks to the automation you will be able to create and destroy your cloud with minimal effort.

TLDR; Clone https://github.com/jmarceli/devstack-vagrant-setup, execute the `vagrant up` command, wait until it finishes and open http://10.123.123.123 in your browser.

## Prerequisites

Here is a list of tools which will let you create a repeatable configuration:

- Virtualbox (https://www.virtualbox.org)
- Vagrant (https://www.vagrantup.com)
- Ansible (https://www.ansible.com/)

Don't worry if you are not familiar will all of them, this shouldn't be a show stopper as I will do my best to describe everything in a step by step instructions.
Those tools will be used to deploy DevStack (OpenStack development environment) locally without touching your local system configuration.

## Virtualbox installation

Install Virtualbox for your system using the official download available on https://www.virtualbox.org/wiki/Downloads
As for now, this would be a 6.1.16 version of the Oracle Virtualbox.
It will be required later on to easily create and destroy virtual machines (VMs).

## Ubuntu Server Cloud Image

If you don't want to manually install Ubuntu Server each time a new VM is created then Ubuntu Server Cloud Images seems to be a pretty good choice.
Current LTS Ubuntu Server is named "Focal Fossa", hence the download directory link https://cloud-images.ubuntu.com/focal/current/ and an image file itself https://cloud-images.ubuntu.com/focal/current/focal-server-cloudimg-amd64-vagrant.box.
Please note that `.box` is the extension for Virtualbox VM images.
This image download link will be used later on in a Vagrant configuration, so as for now there is nothing you have to do.

## Vagrant setup

Vagrant - this cool automation tool will let you define the exact configuration to spin up the OpenStack VM.
As usually the official download page https://www.vagrantup.com/downloads is a good source for the Vagrant installation package.
After installation is done you should prepare a directory where you place files used in this project, it can be anywhere in your filesystem e.g. **~/devstack/**.
Inside this folder create a file named **Vagrantfile** which will contain a Virtualbox VM configuration.
Here is the code that you can copy/paste:

```ruby
Vagrant.configure("2") do |config|
  # Give a custom name for a VM created by this script for a Vagrant CLI
  config.vm.define "focal-server-cloudimg-amd64-vagrant"

  # Name for the box image downloaded from the box_url
  # it will be used to create a folder inside ~/.vagrant.d/boxes to avoid re-downloading
  config.vm.box = "focal-server-cloudimg-amd64-vagrant"

  # URL used as a source for the vm.box defined above
  config.vm.box_url = "https://cloud-images.ubuntu.com/focal/current/focal-server-cloudimg-amd64-vagrant.box"

  # Create additional network interface to make this VM available on the fixed IP address
  # NOTE: I assume that 10.123.123.123 IP is not used in your network
  config.vm.network "private_network", ip: "10.123.123.123", nic_type: "virtio"

  config.vm.provider "virtualbox" do |v|
    # Name visible inside your Virtualbox UI
    v.name = "cloud-ubuntu"
    # Amount of memory assigned for your VM
    v.memory = 8192 # <--- Adjust this number according to your needs
    # Number of CPUs assigned for your VM
    v.cpus = 4 # <--- Adjust this number according to your needs


    # Enable nested virtualization, so it will be possible to run VMs inside your VM
    v.customize ["modifyvm", :id, "--nested-hw-virt", "on"]
    # Enable promiscuous mode for the network interface number "2"
    v.customize ["modifyvm", :id, "--nicpromisc2", "allow-all"]
  end

  # Enable provisioning with Ansible
  config.vm.provision "ansible" do |ansible|
    # Name of the file with Ansible Playbook definition
    ansible.playbook = "install-devstack.yml"
  end
end
```

What is "provisioning" in Vagrant?
This is a step after `vagrant up` completion when a set of tasks/commands is executed on the newly created VM.
It allows for VM pre-configuration/setup without a need to execute commands by hand.
Another option to trigger the provisioning stage is executing `vagrant provision`.
As you can see Ansible is used as a provisioning tool and a file **install-devstack.yml** will contain the initial setup, so-called Playbook.

Why the default/primary/first network interface is not reconfigured and a new is added instead?
The default Vagrant VM interface is connected to the local NAT which lets you easily connect with the VM through the `vagrant ssh` command without any further modifications.
It is far easier and safer (check the Sources section at the bottom of this post) to add a new network interface to change the default one that is why it is left alone.

## Ansible Playbook definition

After your **Vagrantfile** is ready it is time to write the Ansible Playbook defined in the `ansible.playbook = "install-devstack.yml"` line.
Ideally, Ansible Playbooks should be idempotent.
It means that no matter how many times you will execute the given Playbook final VM configuration should remain the same.
Your Playbook file should be located in the same directory as your **Vagrantfile**.

Here is the code for **install-devstack.yml** ready to be copy/pasted:

```yml
- name: VM initialization
  hosts: all
  become: yes
  become_user: root
  tasks:
    - name: Add the 'stack' user for devstack
      user:
        name: stack
        comment: Dev stack user
        shell: /bin/bash
        # Definition of a custom user HOME directory, according to the DevStack recommendation
        home: /opt/stack

    - name: Make 'stack' a privileged user
      copy:
        content: "stack ALL=(ALL) NOPASSWD: ALL"
        dest: /etc/sudoers.d/stack
        mode: 0440

    # Without the `acl` package you may (and probably will) experience permission related issues
    - name: Install acl to fix unprivileged user error
      package:
        name: acl
        state: present

    # DevStack scripts uses `python` directly to system has to ensure `python` command availability and map it to the Python 3
    - name: Install python-is-python3 to ensures that python means python3
      package:
        name: python-is-python3
        state: present

- name: DevStack setup as 'stack' user
  hosts: all
  become: yes
  become_user: stack
  tasks:
    - name: Clone devstack
      git:
        repo: https://opendev.org/openstack/devstack
        dest: /opt/stack/devstack
        version: stable/victoria

    - name: Copy file with configuration
      copy:
        src: ./devstack/local.conf
        dest: /opt/stack/devstack/local.conf

    - name: Test if DevStack is installed by checking /opt/stack/tempest existence
      shell:
        # According to the https://docs.openstack.org/devstack/victoria#profit
        # /opt/stack/tempest dir should exist after devstack installation is completed
        # this is not an ideal way of testing but at least it is something
        cmd: 'test -d "/opt/stack/tempest" && echo "yes" || echo "no"'
      # Save command result to Ansible variable
      register: is_devstack_installed
      ignore_errors: true

    - debug: var=is_devstack_installed

    - name: Install devstack, this step may take up to 30 minutes or even more
      # Use Ansible variable to check if installation should be executed
      when: is_devstack_installed.stdout == "no"
      shell:
        chdir: /opt/stack/devstack
        cmd: ./stack.sh
      register: devstack_output

    - debug: var=devstack_output.stdout_lines
```

As you can see in the Playbook source code an additional file **local.conf** with a configuration is required and it should be placed inside **devstack**.
The **devstack** directory should be created inside a folder where the **install-devstack.yml** file is located.

Here is the content for **devstack/local.conf**:

```
[[local|localrc]]
ADMIN_PASSWORD=secret
DATABASE_PASSWORD=$ADMIN_PASSWORD
RABBIT_PASSWORD=$ADMIN_PASSWORD
SERVICE_PASSWORD=$ADMIN_PASSWORD
HOST_IP=10.123.123.123
```

Every password is set to be the same as `ADMIN_PASSWORD` which is set to `secret` and the `10.123.123.123` IP is used for the `HOST_IP` value.
`HOST_IP` is used during the DevStack set up process, so in order to change it after DevStack installation, you will have to manually re-trigger the installation process.

Why there is the "Test if DevStack is installed..." step?
It is here to avoid a time consuming DevStack installation on each `vagrant provision` execution.
The validation step itself is not anything official or very reliable, so if you are experiencing some issues with that step you can disable it.

## Initial DevStack run

Now both Vagrant and Ansible are properly set, so it is very easy to run your local cloud on the OpenStack.
If you have followed the previous steps I expect you to have somewhere in your file system a directory with the following files:

```sh
Vagrantfile
install-devstack.yml
devstack/local.conf
```

The only thing you need to do now is opening a terminal inside this directory and execute the `vagrant up` command.
If for some reason you don't manage to finish the Ansible provisioning step it should be safe to execute `vagrant provision` again to re-provision the VM.
After a successful finish of the Ansible provisioning, you should see the complete output created after Devstack installation.
The OpenStack dashboard (called Horizon) should be available on http://10.123.123.123/ unless you have changed the IP address in the **Vagrantfile** and `HOST_IP` inside **devstack/local.conf** file.

> To enter the administrator panel use:
>
> Login: `admin`
> Password: `secret`

After you are done playing with your local OpenStack instance you can easily shut it down with the `vagrant halt` command or destroy/remove using `vagrant destroy`.
The difference between `halt` and `destroy` is that the latter frees all used resources, so you will lose all manual changes you have introduced (it is like "format C" on Windows).
On the other hand `halt` preserves all the data but the disk space will not be freed, the upside is that the next time you execute `vagrant up` your VM should be exactly in a state in which you have "halted" it.
Another important/useful command is `vagrant ssh` which lets you enter your VM which is running OpenStack, it is especially useful if you need to get the IP address of your VM after restarting it with `halt` and `up` commands.
The current IP address is quickly accessible after `vagrant ssh` on the system banner displayed in the console output together with some more details regarding running VM configuration.

## Bridged network interface configuration

> NOTE
>
> This is just an alternative setup. You don't have to follow these instructions unless you know this is something that you need.

I believe that for various reasons you may prefer exposing an OpenStack instance as a separate machine in your local network.
If that is the case please find out the right IP address first which will be appropriate for your LAN network.
It may look as follows `192.168.1.123` provided that your local network is using the `192.168.1.0 – 192.168.1.255` address range (like in my case).

You can always check if the chosen address is free to use by executing `ping 192.168.1.123` and checking the results:

```bash
PING 192.168.1.123 (192.168.1.123): 56 data bytes
Request timeout for icmp_seq 0
Request timeout for icmp_seq 1
```

Something similar to this will confirm that the `192.168.1.123` IP is not used by any host in your network (in most cases).

As you now have the IP address you should now change the **Vagrantfile** by replacing:

```ruby
  config.vm.network "private_network", ip: "10.123.123.123", nic_type: "virtio"
```

with:

```ruby
  config.vm.network "public_network", bridge: "en0: Wi-Fi (AirPort)", ip: "192.168.1.123", nic_type: "virtio", name: "vboxnet2"
```

Of course, this change will require you to destroy your current VM and recreate it from scratch.
Please remember to change the `HOST_IP` value inside **devstack/local.conf** as well to the IP you have chosen.

What is the "bridged connection" in Virtualbox?
This kind of setup makes your VM visible inside your LAN network as a separate machine with a separate IP address.
From the network perspective, your VM will look like a separate device.
`nic_type: "virtio"` defines performance optimized network virtualization.

## Sources

https://stackoverflow.com/questions/10155708/where-does-vagrant-download-its-box-files-to - Vagrant box files location
https://docs.oracle.com/en/virtualization/virtualbox/6.0/user/vboxmanage-modifyvm.html - Virtualbox CLI reference
https://docs.ansible.com/ansible/latest/collections/ansible/builtin/ - Ansible modules reference
https://askubuntu.com/questions/320996/how-to-make-python-program-command-execute-python-3 - ensure that `python` will be an alias for `python3`
https://stackoverflow.com/questions/46352173/ansible-failed-to-set-permissions-on-the-temporary - fix for `Failed to set permissions on the temporary files Ansible needs to create when becoming an unprivileged user`
https://www.openstack.org/ - OpenStack official page
https://docs.openstack.org/devstack/victoria/ - DevStack installation guide
https://cloud-images.ubuntu.com/ - Ubuntu Cloud Images source
https://www.virtualbox.org/manual/ch06.html#nichardware - More info about network hardware virtualization
https://linuxhint.com/install_openstack_virtualbox/ - a bit legacy but still useful tutorial on the OpenStack setup
https://superuser.com/questions/752954/need-to-do-bridged-adapter-only-in-vagrant-no-nat - the default Vagrant network interface should not be changed from NAT
