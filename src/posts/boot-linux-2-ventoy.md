---
title: /boot/linux - Making Your Installation Media
date: '2025-02-16'
tags: [beginners, linux, ventoy, windows]
description: A guide on how to install Ventoy and get started on trying out Linux!
author_name: Andey Hemanth, Vinaayak G Dasika
---

## Downloading your preferred distro
Once you have decided on your distro, it is time to download it and create your installation media. All Operating Systems are usually packaged in an ISO file.

**ISO File** - An ISO file is a disk image file that contains the entire contents of a disk. This includes the file system, files, and metadata. It is a single file that can be used to create a bootable USB drive or a CD/DVD.

Head out to the website of the distro you want to download, and look for the download section. Most distros have a download page on their official website.

For example, if you want to download Ubuntu, you can head out to the [Ubuntu website](https://ubuntu.com/download/desktop) and download the ISO file for the desktop version.

Similarly, you could download Zorin's ISO file from the [Zorin website](https://zorinos.com/download/), or Pop!_OS from the [Pop!_OS website](https://pop.system76.com/).

Wait for the download to finish, and now you are now ready to create your installation media!


## Setting up Ventoy

Now that you have backed up your system, the next step is to make your installation media. This is the USB drive that you will use to install your new operating system. We recommend that you use a USB drive that is at least 8GB in size.

There are many ways to create your installation media, but we prefer and recommend Ventoy primarily for its ability to have multiple ISOs, and relative ease of installation. To begin with, head out to the [Ventoy website](https://www.ventoy.net/en/download.html) and download the latest version of Ventoy.

![Ventoy website image with Windows download highlighted](https://i.imgur.com/1o9dNcM.png)

Then extract the zip file, and run the Ventoy2Disk.exe file.

![File Explorer with Ventoy2Disk highlighted](https://i.imgur.com/KFFSIwM.png)

Note that your USB drive will be formatted, so back up all the data you might require onto your computer. Connect the USB drive to your computer, and select it from the drop-down menu in the Ventoy2Disk application. Click on the Install button, and wait for the process to complete.

![Ventoy2Disk screen with Install button highlighted](https://i.imgur.com/L9OP0bE.png)

You might get a message that looks like this for double checking:-
![Screen with Warning that Data will be lost, and confirm that you want to install Ventoy](https://i.imgur.com/kK62hoj.png)

Once the installation is complete, we can copy our ISO over to Ventoy. Open the drive you just formatted, it will be named "Ventoy" as in the photo below.
![File Explorer with Ventoy drive highlighted](https://i.imgur.com/s30kssz.jpeg)

Copy your ISO that you downloaded into this drive, without creating any folder and voilà! Now you're ready for the next step.
![File Explorer with root of Ventoy drive](https://i.imgur.com/7vQhShN.jpeg)

## **Note**
Do not delete or attempt to fix the drive whenever you connect it while on Windows, and therefore avoid the following message whenever it shows up:-

![message to avoid (There is a problem with this drive.)](https://i.imgur.com/oZk6qWJ.png)
