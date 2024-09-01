---
title: Buzzing with eBPF
date: "2024-09-04"
tags: [eBPF, kernel]
description: "eBPF is a technology to dynamically program the kernel for efficient networking, observability, tracing, and security"
permalink: posts/{{ title | slug }}/index.html
author_name: Anirudh Sudhir & Navneet Nayak
author_link: "https://github.com/homebrew-ec-foss"
---

eBPF is a technology that’s being used for tracing, networking, security, and observability in innovative ways. Let’s learn about how you can give your kernel superpowers using eBPF!

---

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

---

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
limactl shell <name>
cd
```

6. Use Ctrl+D to exit the VM shell and run the following command to stop the VM:

   ```bash
   limactl stop <name>
   ```

---

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
export PATH="$PATH:/tmp/lima/bpftool/src"

cd ../..
```

---

### Alternative to the above prerequisites

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

# Introduction

Before we begin, we’d like to mention that this article is an introduction to the world of eBPF. It is imperative that you explore eBPF and its associated topics on your own. If you’re curious about anything mentioned here, just search about it to learn more. A great start would be to check out all the links to the research papers, websites and books linked in this article. Happy learning!

**eBPF** stands for **_extended_** Berkeley Packet Filter. Since the name implies that it is an extension of the Berkeley Packet Filter (BPF), it only makes sense that we understand what BPF is first. To do that, let’s

### Rewind back to 1992

The 1990s, a time of tremendous technological innovation and progress that began reshaping the world. With the advent of the internet, new challenges emerged, including the need for effective packet filtering. This need arose from the necessity to protect systems from malicious actors and manage network traffic more efficiently. Let’s take a brief look at the state of network packet filtering back then.

Most packet filtering tools ran in the userspace of a machine, meaning that any packet received would have to be copied from the kernel-space to the userspace where applications would filter them.

The userspace packet filtering applications needed to make system calls to the kernel to perform almost any operation such as reading packets. Needless to say, this method was extremely inefficient and slow.

![Userspace packet filtering](https://imgur.com/j6pg93W.png)

1. Packet Filtering was very slow due to packets being copied to user space and packet filtering applications having to use system calls to perform actions on the packet
2. Limited flexibility with respect to setting filters, very little customisation was possible
3. Many CPU instructions were required to filter even a single packet.

Note: Packet filters for UNIX systems that used the STREAMS and NIT frameworks provided by the UNIX kernel worked like this.

---

#### The `userspace` and `kernel`

![The userspace and kernel](https://imgur.com/I8KIyiQ.png)

A computer usually comprises of application software (such as games, browsers) and the hardware on which they run. The hardware and application software do not directly interact with each other. Instead, the software running in the `userspace` utilises system resources by interacting with the kernel, an intermediate layer between applications and hardware, which acts on its behalf. The applications interact with the kernel via the `system call` interface to perform operations such as reading memory, writing to disk or sending data over a network. This makes the kernel a vantage point to monitor or modify application functionality, since any action an application performs must go through the kernel.

---

### In comes BPF!

BPF was a novel approach to filter packets **completely in the kernel**!

Steven McCanne and Van Jacobson at the Lawrence Berkeley Laboratory came up with the BSD Packet filter. It was first introduced to Linux in 1997, in kernel version 2.1.75, as the Berkeley Packet Filter (BPF).
BPF was the first to implement a register-based filter evaluator(VM) in the kernel. The BPF virtual machine emulates a register-based CPU and has 10 registers, each with a specific role!

The BPF virtual machine has a 32-bit instruction set similar to assembly which allows for defining complex filters easily and with immense flexibility. For instance, these are the BPF instructions to filter out any packets not using the Internet Protocol(IP):

```nasm
ldh     [12]
jeq     #ETHERTYPE IP, L1, L2
L1:     ret     #TRUE
L2:     ret     #0
```

These instructions run in the BPF virtual machine and can be efficiently converted to native machine code, sandboxed from the kernel. BPF showed huge improvements in speed over existing solutions and provided greater flexibility to write custom instructions for filtering.

- It filtered packets in the kernel, thereby eliminating the overhead of context switching as well as copying the packet across the userspace and kernel.
- It ran instructions in a register-based virtual machine (which was around 20 times faster than packet filtering solutions like CSPF, which was a stack-based VM packet filter)

This led to the widespread adoption of BPF, in famous tools like `tcpdump`, used by Wireshark). The original BPF paper ([https://www.tcpdump.org/papers/bpf-usenix93.pdf](https://www.tcpdump.org/papers/bpf-usenix93.pdf)) is a great read to learn more about the thought process behind designing BPF. It mentions existing solutions such as STREAMS NIT packet filters and another VM based packet filter called CSPF, and how BPF was far more efficient approach to filtering.

---

## eBPF

eBPF stands for `Extended Berkeley Packet Filter`. While the name might imply that it is just a faster and more efficient extension to BPF, it is slightly misleading, since eBPF can do so much more!
Imagine taking the BPF virtual machine, it’s instruction set and running BPF instructions anywhere in the kernel! The possibilities are truly endless.
eBPF does exactly that. It takes the core features of BPF, but extends BPF to beyond just packet filtering. eBPF programs can be attached to various kernel hooks, probes in kernel functions, and tracepoints in the kernel.

**_eBPF programs can be executed almost anywhere in the kernel!_**

![eBPF programs in the kernel](https://imgur.com/ZOtVQP1.png)

---

### Hooks

As the name suggests, kernel `hooks` are used to hook programs to some part of the kernel. eBPF is event-based and the program is executed whenever an event occurs.

There are various types of eBPF hooks, ranging from networking-specific hooks like `socket_filter` and `xdp`, to more general hooks that can be used to attach to any kernel function, like `kprobes` and even `tracepoints`, which are marked locations in the kernel code. Some of these hooks, like `kprobes` and `tracepoints`, have existed far before BPF (You can learn more about them here: [https://docs.kernel.org/trace/](https://docs.kernel.org/trace/tracepoints.html))

You can find the full list of eBPF program types by running the command `sudo bpftool feature list_builtins prog_types`

---

eBPF can be used for a variety of applications such as:

1. Performance tracing of pretty much any aspect of a system
2. High-performance networking, with built-in visibility
3. Detecting and (optionally) preventing malicious activity

eBPF was first introduced in kernel version 3.18 in 2014, with significant improvements over classical BPF:

1. The BPF instruction set was completely overhauled to be more efficient on 64-bit machines, and the interpreter was entirely rewritten.
2. eBPF `maps` were introduced, which are data structures that can be accessed by BPF programs running in the kernel as well as user space applications, thus allowing information to be shared among them.
3. And the important part: The eBPF verifier was added to ensure that the programs are safe to run in the kernel.

![Image of the loading and verification process](https://imgur.com/CkAdwcm.png)
_Image of the loading and verification process_

As seen above, all eBPF programs go through the process of verification and JIT-compilation after which they can be attached to specific hooks. There are various libraries which provide helper functions, handle kernel interfaces and simplify the process of loading and attaching programs. Some of these include [bcc](https://github.com/iovisor/bcc) for Python, [libbpf](https://github.com/libbpf/libbpf) for C and [cilium/ebpf](https://github.com/cilium/ebpf) for Go. [Bpftrace](https://github.com/bpftrace/bpftrace) is another high-level tracing language that utilises `BCC` and `libbpf`. We will be making use of the `libbpf` library in this workshop.

---

# Programming the kernel

In the previous sections, you might have been left wondering why the eBPF virtual machine and verifier are a big deal. Why not add our own code to the kernel to run any program directly with zero overhead? Or develop Loadable Kernel Modules(LKM)? Turns out, these alternatives have their cons.

## Modifying the Kernel Source

Modifying the kernel source code is a highly challenging task. The Linux kernel has more than 30 million lines of code written over several years by thousands of contributors. Even if someone successfully edited the source to add their own functionality, there are other hurdles. Linux being a community project, all changes have to be approved by the community and specifically, Linux Torvalds. On an average, only about a third of all kernel patches are accepted, after which it is released in the next kernel version(which may take a while).

Even after jumping through all these hoops, there is no guarantee that users will be able to utilise the merged feature. Several distributions use an older version of the kernel and wait for newer versions to be thoroughly tested before releasing it to users.

![Comic on modifying the kernel](https://imgur.com/6qBAKCs.png)

---

## Loadable Kernel Modules

The kernel also provides for a modular approach to extend functionality by writing LKMs that can be loaded and unloaded. While modules do not require modifying the kernel source directly, they have other disadvantages:

1. Writing LKMs still requires significant experience with kernel programming.
2. Since any code running in the kernel is privileged, a module crash would bring the entire kernel to a halt.
3. External LKMs might have security vulnerabilities, with serious consequences due to its privileged nature.

---

## Dynamic Loading of eBPF programs

eBPF provides a better alternative to program the kernel by solving the problems faced by the above approaches:

### Security

- The eBPF verifier ensures that the program is safe to run. It does this by starting from the first instruction and descending down all possible paths, while observing the state change of the registers and the stack. It also checks for unreachable instruction such as code after infinite loops. You can learn more about the verification process here: [https://docs.kernel.org/bpf/verifier.html](https://docs.kernel.org/bpf/verifier.html).
- eBPF code is run in a virtual machine with memory constraints, allowing for sandboxed execution of programs in the kernel.

### Dynamic loading

- eBPF programs can be dynamically loaded and unloaded from the kernel. It can trace current as well as older processes as soon as it attached to the appropriate hook. This is the reason behind eBPF's growing popularity in cloud-native environments, as it provides instant visibility of all process in containers as well as the host once it is loaded and attached.

### Ease of use and Community

- There are various eBPF-based libraries and tools which further simplify the development process and make the kernel more accessible.
- There is a growing community of developers working on the eBPF toolchain as well as using it in various applications, improving documentation and support as well as enabling faster feature development.

_The recent CrowdStrike blunder could have been avoided if they used eBPF ([https://thenewstack.io/crowdstrike-a-wake-up-call-for-ebpf-based-endpoint-security/](https://thenewstack.io/crowdstrike-a-wake-up-call-for-ebpf-based-endpoint-security/))_

![Comic on simplicity of eBPF programs](https://imgur.com/b09pHb3.png)

---

### Stay tuned for further updates!
