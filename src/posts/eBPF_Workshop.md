---
title: eBPF Workshop
date: "2024-09-04"
tags: [eBPF, kernel]
description: "eBPF is a technology to dynamically program the kernel for efficient networking, observability, tracing, and security"
permalink: posts/{{ title | slug }}/index.html
author_name: Anirudh Sudhir & Navneet Nayak
author_link: "https://github.com/homebrew-ec-foss"
---

eBPF is a technology that’s being used for tracing, networking, security, and observability in innovative ways. Let’s learn about how you can give your kernel superpowers using eBPF!

# Prerequisites

**Please ensure that you download and setup the necessary prerequisites before attending the workshop.**

This workshop requires participants to use Linux. You may either run Linux on a bare machine or use a virtual machine (VM). It is **highly recommended** to use a VM over solutions such as Docker containers.

You may use your preferred Linux distribution or follow the guide below to setup an Ubuntu Server 24.04 LTS VM. The eBPF setup guide specifies instructions for distributions using `apt`, which may be modified for other package managers.

An alternative option is to use the cloud virtual machines provided by Isovalent as part of their labs ([https://isovalent.com/labs/ebpf-getting-started/](https://isovalent.com/labs/ebpf-getting-started/)). Setup and usage instructions can be found below. **However, we highly recommend that you setup a VM on your personal device over using the cloud VM**.

## Windows / Linux

Setting up an Ubuntu Server Virtual Machine(VM) using Oracle VirtualBox on Windows or Linux:

1. Download and install VirtualBox ([https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)) by choosing the appropriate platform.
2. Download the Ubuntu Server 24.04 LTS disk image ([https://ubuntu.com/download/server](https://ubuntu.com/download/server)).
3. Open VirtualBox and select the `New` option. Set a name for the VM and the path to the ISO downloaded in the previous step. Select the `Skip Unattended Installation` option and click `Next`.
4. Choose the memory and number of processors for the VM and select `Next` . A minimum of 3GB RAM and 2 CPUs are recommended.
5. Select the `Virtual Hard Disk Now` option, specify the amount of disk space required, select the `Pre-allocate Full Size` option and click `Next`. A minimum of 10GB is recommended.
6. Check if the configuration is accurate and select `Finish` .
7. Once the VM has been created, select and start it. Select the `Try or Install Ubuntu Server` option using the arrow and enter keys and wait for the installation to complete.
8. Select the desired `Language` and `Keyboard` and continue. Select the non-minimized `Ubuntu Server` as the base for the installation. Proceed to the `Network Comfiguration` and `Proxy` sections.
9. Wait for the mirror tests to complete and continue. You may proceed with the default Storage Layout. Continue with the installation step.
10. Set the username, password and other fields. Skip Ubuntu Pro and select the OpenSSH installation. Skip the other snap installations and continue.
11. Once the installation completes, select the `Reboot Now` option. Press Enter if an error appears asking for the removal of the medium.
12. After the VM restarts, press Enter after `END SSH HOST KEYS` is displayed on the screen.
13. Enter the username, enter and repeat the same for the password.
14. Use `poweroff` to turn off the VM.

## macOS

Setting up an x86-64 Ubuntu Server Virtual Machine(VM) using Lima([https://lima-vm.io](https://lima-vm.io/)):

1. Install `brew`, if not already present, using the following command:

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)”
   ```

2. Run `brew version` in the terminal to confirm a successful installation.
3. Install lima by running`brew install lima`.
4. Create the virtual machine. Select `Proceed with the current configuration` to install an Ubuntu Server 24.04 LTS image:

   ```bash
   limactl create --arch=x86_64 --name=<insert_the_name_here_without_the_angular_brackets>
   ```

5. Start the VM and attach to its shell:

   ```bash
   limactl start <name_of_the_vm_without_angular_brackets>
   limactl attach <name>
   cd
   ```

6. Use Ctrl+D to exit the VM shell and run the following command to stop the VM:

   ```bash
   limactl stop <name>
   ```

## eBPF Toolchain Setup Guide (To be run in the VM/Ubuntu bare machine)

For non -`apt` distributions, replace the `apt` install and update commands with the suitable package manager.

Update the VM after logging-in:

```bash
sudo apt update
sudo apt upgrade
```

1. Create a new folder to store the cloned repositories and builds:

   ```bash
   cd
   mkdir ebpf-workshop
   cd ebpf-workshop
   ```

2. Install the necessary tools and dependencies:

   ```bash
   sudo apt install gcc clang make llvm
   ```

3. Install the `libbpf` library:

   ```bash
   sudo apt install libbpf-dev
   ```

4. Clone the `bpftool` repository, build and install it:

   ```bash
   #dependencies
   sudo apt install libz-dev libelf-dev libcap-dev binutils-dev

   git clone --recurse-submodules https://github.com/libbpf/bpftool.git
   cd bpftool/src
   sudo make install

   cd ../..
   ```

## Alternative to the above prerequisites

As an alternative, participants can use the virtual machines provided by Isovalent as part of their labs. While this is an easier option with minimal setup, we encourage setting up a VM on your personal device instead.

1. Visit the Isovalent labs page ([https://isovalent.com/labs/ebpf-getting-started/](https://isovalent.com/labs/ebpf-getting-started/)) and register to access the lab VM.
2. Change directories and install the `libbpf-dev` package:

   ```bash
   cd ../..
   mkdir workshop
   cd workshop

   apt install libbpf-dev
   ```

3. The VM is now ready for use! To create and edit files, you may use `Vim` or `Nano` . To create a file named `hello.c` with `nano` , run:

```bash
nano hello.c
```

You may now type in the active buffer. To save and exit, press `Control` and `X` (`Ctrl + X` ). Nano will ask if you want to save the modified buffer. Enter `Y` . It then prompts you for the file name. Enter a filename (or use the default name) and `Enter` to save the file.

---

Stay tuned for further updates!
