---
title: "Asahi Linux - Linux On Apple Silicon"
description: "My experience with asahi linux and what makes linux on apple silicon so hard"
date: "2025-02-06"
tags: [linux, appleSilicon]
permalink: posts/{{ title | slug }}/index.html
author_name: Anurag Rao
author_link: https://github.com/anuragrao04
---

> This article is a mirror of my blog at [my personal site](https://www.anuragrao.site/blog/05-asahi-linux)

## What's Apple Silicon

You probably already know this, Apple Silicon is the new family of SoC chips made by Apple to power their laptop, desktop and tablet lineup. It all started with the M1.

There are a couple of things that make these chips different from the intel CPUs that Macs used to use. To begin with, it is based on the ARM64 architecture (also known as AArch64). They are also a `system on chip` design. This means that unlike traditional CPUs, the GPU is also on the same die as the CPU here, along with other needed components. This allows macs to have _unified memory_ which is just a fancy name for RAM being shared between the CPU and GPU. There is no dedicated VRAM unlike traditional GPUs.

So when you buy a Mac with only 8GB of RAM, we need to remember that this 8GB is _shared betwen both your GPU and CPU_. Which means, practically, at least about 2GB of RAM is constantly occupied by the GPU for normal rendering. How MacOS manages to run smoothly with this is beyond me. They use a combination of clever swapping to disk, compressed RAM and black magic to deal with it.

## The Caveats That Come With Running Linux on Apple Silicon

There are a bunch of things that make Linux on Apple Silicon have caveats. I'm just listing the main ones here:

#### 1. Undocumented Hardware

Apple is notorious for being the polar opposite of open source. They are extremely closed. They are not even revealing about product specifications. You'd see Apple advertising 16 hours or more of battery life but they make the real battery capacity statistics extremely hard to find.

When they are so secretive about the hardware, it is extremely hard for the open source community to write drivers for it. This is the main reason why Linux on Apple Silicon is so hard.

Things we usually take for granted on regular PCs running linux, we have to build from scratch on Apple Silicon. For example, the GPU drivers. The GPU on Apple Silicon is a custom design by Apple. It is not a standard AMD or Nvidia GPU. This means that the drivers for it have to be written from scratch. This is a monumental task. The same goes for the WiFi, Bluetooth, Touchpad, and _even Keyboard!_

#### 2. Booting

Apple silicon does not support booting from _any_ other drive other than the internal _soldered_ NVMe drive.

And yes, that includes booting from a USB.

How do you install Linux now? Well, Asahi linux has an install script to do it. It does a whole bunch of checks but the outline is that it

1. Checks for free space in the MacOS partition
2. Shirnks the MacOS partition
3. Creates a new partition for Linux
4. Installs the kernel and initramfs

After these steps, you need to boot into Mac's 'One True RecoveryOS' (yes, that's what it's called) and bless the new partition. This is a one time process. After this, you can boot into Linux. By 'blessing', I mean that you need to tell the Mac firmware that this is a bootable partition and you need to enable 'reduced security mode' to allow Mac to boot into anything other than MacOS.

#### 3. Constant Changes

Every new MacOS update brings a new set of challenges. This is because the OS and the BIOS are tightly coupled in Macs. MacOS updates often update the BIOS too (well MacOS doesn't have a concept of BIOS. The OS itself is responsible for initializing CPU registers and other BIOS things)

Due to this tight coupling, we also need to reverse engineer, code and ship our own bootloader to boot into Linux. This bootloader is called `m1n1` in Asahi Linux

Every new Mac released too brings a new set of challenges. New hardware, new CPU, new GPU, new what not. It's an endless battle of cat and mouse. The Asahi Linux team is doing a great job of keeping up with it. They are a bunch of volunteers who are doing this in their free time. They are doing a great job and I'm grateful for it.

## So With All Of This, Where is Linux on Apple Silicon? Is it Ready?

It depends. For me, not really. I'll go through 3 major categories of applications I need, how they work (or do not work) and workarounds for them.

Before that, let's talk packages. Applications in linux are managed by package managers. Asahi Linux used to run on ALARM (Arch Linux on ARM). They now run on top of fedora. Why? because the packages in the official repositories need to be compiled for aarch64. ALARM unfortunately couldn't do this on time. They used to have outdated packages for a lot of important utilities like cURL. It was so old that even Debian had newer packages. Fedora on the other hand has aarch64 packages for everything and the developers are very responsive. This is why they switched to Fedora. Any package available in the official fedora repositories, is available for Asahi Linux as well. You can also install flatpak and snap applications given that they support the aarch64 architecture. Most apps I use, like Obsidian had a good flatpak package.

### Terminal

This was one area I had no problems at all with. All major terminals were present in the official repositories. I personally run `Kitty` and all features work as expected.

### Browser

Here's where things start slowly falling apart. We have a choice between Firefox and the entire army of Chromium based browsers like Brave, Ungoogled-Chromium, etc.

Firefox is awesome, all works well. Except RAM usage. I used to run 5 pinned tabs - WhatsApp, 3 Gmail Accounts, and the WiFi captive portal. I had no more than 5-6 more tabs open and firefox's RAM utilization shot up to 3GBs. Yeah, I get it, running 3 tabs of Gmail
is probably not a good idea, I have to use a proper email client, but 3GBs is a bit too much considering that I have only 6GB to work with. (2GB is utilized by the GPU, thanks to unified RAM)

Chromium is more forgiving with RAM. But it's not perfect too. There is an upstream chromium bug which has been fixed very recently and is taking months to propagate downstream. This bug makes chromium based browsers unusable on Asahi linux. It makes all tabs crash a couple of seconds into using them.

This also affects electron based apps since electron is just a website + chromium shipped together. This means a few unupdated electron apps are unusable.

The reason this is happening has something to do with `page sizes`. You'd have probably learnt about paging under the Operating Systems course in University. We are talking about those pages here. Apple Silicon Macs have hardware support for 16K page sizes. Most PCs (if not all) have 4K page sizes. So all applications compiled for Apple Silicon not only have to take care of aarch64, but also 16K page sizes.

### Comms

I communicate through WhatsApp & Discord. WhatsApp does not have a native client yet. Which means, unlike MacOS, you can't take WhatsApp calls from your laptop. You have to use the web client on a browser. Discord too doesn't have a native client yet. However, you can use 3rd party clients to get the same job done. There is armcord but a very very very close friend recommended _vesktop_ and this has worked great for me. Screen presentation works well too.

### Hardware

I run a M1 Macbook Air, the very first laptop released with the new Apple Silicon. It has the highest level of support Asahi Linux has because of it being the first. Many hardware features are implemented flawlessly but there are a few things you'd miss from MacOS

#### 1. TouchID

The fingerprint sensor requires a driver. Linux is known to have bad support for fingerprint sensors. It isn't that important but it's just a quality of life improvement. Drivers are usually released by the hardware manufacturer themself. It's no surprise that Apple has exactly 0 drivers for their hardware. Work on the fingerprint sensor is not being actively persued in asahi linux.

#### 2. Display Over USB-C

Display over USB-C is essentially the display port protocol. This is not implemented yet in Asahi Linux as of writing. However, development on this is very close to completion. But, as of now, no external display support for people using Mac devices with only USB-C Ports. If your Mac has a HDMI port, you can connect an external display though. This leads me to the next thing that's not working

#### 3. WiFi P2P

WiFi works as expected in Asahi Linux, however, the WiFi P2P protocol is not implemented at the driver level. One of my ideas to work around the external display problem is to use Miracast. There are a few linux implementations of the Miracast protocol like `gnome-network-displays` and Miraclecast. These unfortunately do not work since the P2P protocol is not implemented. The WiFi Chip (that is BRCM4378) is capable of WiFi P2P but nor Apple or Broadcom have released linux drivers for this chip.

#### 4. Internal Mic

The driver for the internal mic too is very close to release. It has been merged into the asahi kernel and is expected to be released in the next kernel update. This is a minor inconvenience since we have to use an external mic for calls and meetings.

#### 5. Thunderbolt

Most Macbook devices have only 2 thunderbold ports (USB-C). These ports work as USB-C ports but Thunderbolt does not work. This hasn't come in the way of my day-to-day usage. However, if you have a Thunderbolt dock, that wouldn't work.

#### 6. Video Decode

Hardware video decode is not implemented yet. This means that watching videos on YouTube or Netflix would drain more battery when compared to MacOS.

## What Works?

I've talked a lot about the things that don't work. It's time to talk about things that do. The amount of work that has gone into making these things work is insane.

#### 1. GPU

The GPU in Apple Silicon Macs are unlike usual PCs. The GPU is integrated in the M1 SoC. As I talked about before, this allows it to have unified memory. This helps in situations where the CPU and GPU are accessing the same data. There is no data transfer required between RAM and VRAM now because both of them are the same.

The main problem is drivers. The Asahi Linux team have been working on this for a long time. They have reverse engineered the GPU and have written a driver for it. The Asahi Linux GPU driver supports OpenGL 4.6 and OpenGL ES 3.2. This is actually a major improvement over macOS, which only supports OpenGL 4.1. This allows you to run games and GPU accelerated applications. This driver also supports Vulkan. This is a major achievement.

So does this mean we can play all games that run on Linux on a Macbook?
Not so fast-

#### 2. Games

Running games on linux has been a pain for a long time. This is because most games are written for Windows. Windows has a lot of proprietary APIs that games use, one of them being DirectX. DirectX is a set of APIs that are used to interact with the GPU. This is not available on Linux. We need to translate DirectX calls to Vulkan calls in order to run games made for windows on linux and this is what `DXVK` does. DXVK is a compatibility layer that translates DirectX calls to Vulkan calls. This allows us to run DirectX games on Linux.

There are more layers of translation. These Apple Silicon macs use 16K page sizes. Most games are compiled with 4K page sizes in mind. To overcome this, we essentially run a microVM that runs a separate Linux Kernel with 4K page sizes.

Then there is the X86_64 to ARM64/aarch64 translation layer. This is done through `rosetta` on MacOS. On Linux, we gotta build our own rosetta - `Box64`. `Box64` dynamically recompiles (or translates) x86 instructions to ARM64.

So, as a summary of the layers of translations involved, games run

1. Inside a VM
2. Translated from DirectX to Vulkan
3. Translated from X86_64 to ARM64

I have tested gaming with Euro Truck Sim 2 and American Truck Sim. Both of them miraculously run at the same, if not better frame rate when compared to MacOS. It consumes a massive amount of RAM though. I can't have any other application running beside the game or the game would randomly be killed by OOM Killer (Out of Memory Killer). This happens due to my RAM size of only 8GB. You might observe better behaviour if your Mac has more memory.

#### 3. Speakers

Writing a speaker driver is more scary than we think. One wrong move in the driver and the speaker might get overpowerred and damage itself, permanently. With Macs, we also have to write drivers for the DSP. speaker support was merged a couple of months ago by the Asahi Linux team. More info [here](https://github.com/AsahiLinux/docs/wiki/SW:Speakers)

#### The Other Things

There are many things that are implemented that we don't notice, but have to be implemented from scratch in the linux kernel. These include: NVMe, PCIe, CPUFreq, Suspend/Sleep, UART, I2C, USB-PD (this is how your mac charges!), SPI and a bunch more. A few notable mentiones that do work are:

1. Webcam
2. Keyboard and Display Brightness Control
3. Touchpad (yes, we have to write a driver for this too from scratch)
4. WiFi & Bluetooth (WiFi only works in station mode, no monitor mode or P2P)

### How's The Battery Life?

It is about 75%-90% as good as MacOS depending on what I'm doing. Still plenty to get me through the day and make me confident enough to not carry a charger to university.

## Conclusion

I'm of the opinion that Linux on mac is not yet mature for daily use. It works great but there are many deal breakers for me personally:

1. No External Display. I am willing to work on just my laptop display and using a tiling window manager. But, I need external display for giving presentations.

2. No Mic. I have to carry an external mic for calls and meetings. Not practical when I'm on the go.

3. No TouchID. I am okay for logging in to my laptop with password, but typing in my password manager's long complicated master password everytime I want an autofill is not practical

4. Poor RAM Management. Having just 8GB of _unified RAM_ causes OOM killer to trigger sometimes. Moreover, my preferred browser Firefox eats up a load of memory and I can't use it. As a developer, I'd have multiple things running - A terminal, An API test suite like Postman, Docker (that works btw), A browser, and a few more things. This is not possible with just 8GB of RAM and Linux. It is possible however in MacOS.

> Note: Linux does cache files on RAM and although it appears as though there is very little RAM left, there is probably a lot more available. Check out [linuxatemyram](https://www.linuxatemyram.com/). You can check the true memory available to be used by applications by using the `free -m` command.

5. No games. After a day of work, I like to relax and drive my trusty Volvo on Euro Truck Sim 2. Not possible on my system though, again due to the RAM Limitations. This wouldn't be a deal breaker if I just paid $200 extra for 8 more GBs of RAM. It's daylight robbery to charge that much for RAM.

There are a few things I'd be missing going back to MacOS too. The freedom of customization is priceless. I run a clean SwayWM setup. This level of tiling window manager smoothness is not achievable on Mac (See [yabai](https://github.com/koekeishiya/yabai) and [Aerospace](https://github.com/nikitabobko/AeroSpace)) The joy of running Open Source Software is not present on MacOS. It's a walled garden. I can't mess with system files and figure out how operating systems work. Linux has taught me practically everything I know about operating systems and so much about the kernel, drivers, and how they work.

I came to Asahi Linux a couple of years ago when there was barely any support. Display was stuck at a 100% brightness, keyboard backlight didn't work, Speakers didn't work, Webcam didn't work. I obviously had to go back.

I was back again a couple of months later. This time, speakers didn't work, webcan did work, GPU didn't work and the laptop used to heat up a lot due to this.

I'm back again today and most of these things work! It's like seeing a child grow up and the amount of progress being made so fast is extremely inspiring. It reinforces trust in the open source community and proves that humans can achieve great things when we put our minds together.
