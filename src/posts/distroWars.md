---
title: What Linux Distro To Choose? | A Beginner's Guide
date: "2022-12-10"
tags: [linux, distros, beginners]
description: Confused What Distro To Choose?
permalink: posts/{{ title | slug }}/index.html
author_name: Anurag Rao
author_link: https://github.com/anuragrao04
---

## Introduction

If you are manifesting joining the Linux clan and thinking about it, it’s time. It’s time to ditch Windows for good and save some money by doing so. Also, keep your sanity from monthly Windows updates that are gigabytes in size, save on your internet bill, save precious time watching a dumb blue screen and so on. The blessing of ditching the Windows list is pretty long.

![windows spinner](https://www.debugpoint.com/wp-content/uploads/2022/07/This-is-how-you-waste-your-time-and-watch-this-for-hours-per-month.jpg)

## What Is A Distro?
You'd have read the <a href = "https://homebrew.hsp-ec.xyz/posts/systemctl-start-linux/" target="_blank">systemctl start Linux post</a> and even if you haven't, it's okay! We started directly with an introduction to Linux there and how to find your way around a terminal. However, if you're a beginner and wanted to download Linux, you'd have found a heap of options AKA `Distros!` To be precise, these many: 
![The distro tree](https://upload.wikimedia.org/wikipedia/commons/b/b5/Linux_Distribution_Timeline_21_10_2021.svg)

## YES, That's Complicated.
Nobody in their right mind could keep track of these many *Distributions (Distros)* of Linux. Why is it like this in the first place you ask? Why isn't there one Linux and everybody works on it? Why do you want to make things so complicated by having so many different versions of Linux?

Because linux is not an operating system of its own. There IS one Linux, maintained by the almighty <a href = "https://en.wikipedia.org/wiki/Linus_Torvalds" target = "_blank">Linus Torvalds</a> along with <a href = "https://github.com/torvalds/linux/graphs/contributors" target = "_blank">other godly contributors</a>, but Linux is just a kernel.

>Now what is a **Kernel?** Think of a kernel as the core of an operating system. It acts as the central component of the bridge connecting your software to data processing performed at a hardware level. But, a kernel is not a full operating system. You can think of an operating system similar to your bun samosa. The samosa is the kernel. It gives the flavour to your bun samosa but it isn't bun samosa by itself! You need a bun to surround it. Just like that, you need other components of software to support the Linux kernel to make a full desktop operating system. 

Now, why doesn't everybody agree on one implementation of this and make one desktop Linux OS? This is because of the nature of Linux itself. Everybody has *the freedom* to implement their OS how they want it, and different organisations make their own Distributions of Linux. 

Now here's where the fun begins. This gives raise to a Distro-War. These distros are compared and ranked, and that's precisely what we are going to do today! but in a more beginner-friendly fashion :) 

## What does Google tell you?
Being a programmer, the question 'What does google tell you?' is a very important one. So what does google recommend when you search for `best beginners Linux distro?`
![Google search result](https://i.imgur.com/UwAot1g.png)

---
_Uh, not very descriptive, is it?_ I found myself confused when I started with Linux too, but, you will find your peace in this chaos, eventually, and it will be worthwhile.

## What distros do we have?

### Ubuntu

![ubuntu desktop](https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,e_sharpen,c_fill,w_555,h_311/https://ubuntu.com/wp-content/uploads/42e9/desktop_busy.png)

The moment you talk about Linux, there is always a mention of Ubuntu. It's almost as if Ubuntu IS Linux and based on how it's blindly recommended to beginners, I wouldn't blame you to think Ubuntu is Linux. However, we do not recommend it to beginners. Yes. We do not recommend it. Why? Because Ubuntu has recently made compulsory this thing called `snaps`. `snaps` are a containerized way to install packages. Since there are so many different distributions, it is difficult to package apps differently for all the different distros. `snaps` are a one-size-fits-all solution to this but since snap applications run in a similar way to running a virtual machine on your computer, it is VERY VERY VERY slow 🐌. And trust me when I say slow, a beefy specced-up computer can also take about 5-7 seconds to start up firefox or chrome. When this thing happens across all apps on your system, your system just starts feeling so slow and sluggish that you just want to throw your computer out the window.

However, if you ignore snaps, Ubuntu is a good option for people who are not a lot familiar with Linux and are just starting. I say this because there is really good documentation available online for Ubuntu. What this means is that if you run into any kind of problem, it's easy to just Google it and someone or the other would have had the same problem as you (99% of the time). For the remaining 1%, you can always post on the `forums` or stack overflow.

Link to Ubuntu Forums: <a href = "https://ubuntuforums.org" target="_blank">Ubuntu Forums</a> and <a href = "https://askubuntu.com" target = "_blank">Ask Ubuntu</a>

>`Forums` are like communities of people using the same software. It's a common platform for all of these people to talk and ask questions. Think of it similar to a discord server but it's a website on its own and it's a bit more organised.

### Linux Mint
![linux mint desktop](https://www.linuxmint.com/pictures/screenshots/vanessa/thumb_cinnamon.png)

Up next, there is Linux Mint! The Distro we recommend the most to beginners. It is a `derivative` of Ubuntu but it does not use snaps! What this means for us is that we get all the goodness of Ubuntu, without the bad parts. 

>A `Derivative` of a distro is when you make a distro from the existing code of another distro. You make the changes to it that you want and then make a distro of your own. Now, this might sound like just copying someone else's homework but trust me, this is what makes the open-source community amazing. This activity of basing your work off of someone else's already existing work is called `forking` and it's a very popular thing to do. It benefits everybody as it allows everybody to use everybody else's work. This way, everybody gets a headstart compared to when everybody keeps their code a secret!

Linux Mint also offers a lighter desktop environment, and what this means is that it would run more snappily on older systems as well. It provides a very familiar user interface to a Windows user all while being so lightweight, it could run on your microwave.


>A `Desktop Environment` is a piece of software that defined how your GUI feels. It consists of icons, cursor themes, windows, toolbars, docks, wallpapers, desktop widgets, etc. It consists of a window manager and all the GUI components. Examples include GNOME, KDE, LXDE, etc. Some advanced Linux users might choose to go for only a <a href = "https://en.wikipedia.org/wiki/Tiling_window_manager" target = "_blank">tiling window manager</a> for increased productivity but that is a whole different topic. 

It also uses the same software repository as Ubuntu. So, every app that was packaged for Ubuntu, can be installed on Linux Mint without any problems. This means that you do not have to worry about the availability of software to install. 

### Zorin OS

#### THE #1 DISTRO I RECOMMEND PERSONALLY TO ANY NEW LINUX USER!

![zorin desktop](https://assets.zorincdn.com/images/releases/12/DefaultLite.png)

Zorin OS, like Linux Mint, is also based on Ubuntu, but it has an amazing user interface that is just pure eye candy, and it manages to look so good while still managing to be lightweight. It's one of the most beautiful Linux distros out there out of the box.

It is one of the only few Linux distributions I found that I could maybe ask my grandma to use and she'd still find it intuitive. Zorin OS also maintains a more conservative approach to software. What this means is that you might not get the latest and greatest versions of software, but what we do get is super polished and stable. This does not mean we get outdated software, it just means we get the same level of polish that a windows app comes with.

One thing that makes Zorin OS special is having support for windows apps. Don't get me wrong, you can _still_ run windows apps on other Linux distributions but Zorin makes it much easier. It has dedicated software to manage windows apps that make it much easier for a person coming from Windows. It achieves it through this software called <a href="https://www.winehqorg" target = "_blank">Wine</a>. Wine stands for 'Wine Is Not An Emulator'. It is a compatibility layer that runs Windows applications on Linux, macOS, BSD, and other <a href = "https://en.wikipedia.org/wiki/POSIX" target = "_blank">POSIX-Compliant</a> operating systems. You can learn more about it <a href="//www.winehq.org/about" target = "_black">here</a> but for now, you can just move ahead knowing that `Wine` is a software that allows you to run most windows apps on Linux. Anti Cheat software for popular games like Valorant is not runnable using Wine though.

Overall, Zorin OS is stable as a rock: has very few bugs, has an amazing <a href="https://forum.zorin.com">forum</a>, has amazing software support, and offers a very easy installation procedure for users who are `dual booting`.

>`dual booting` is when you have BOTH Linux and windows on your system. At a given instance, only one of these can be running though. These two operating systems reside on 2 different parts of your drive(hard drive or SSD). It is important to be careful while partitioning your drive for this kind of set-up as it's very easy to mess something up and leave your system in a bricked state. Zorin OS provides an option in its installer to easily partition your drive for windows and Linux and takes care of the rest for you.

You can check out Zorin OS and download the ISO file <a href = "https://zorin.com/os/" target = "_blank">here</a>

### Fedora

![fedora desktop](https://liliputing.com/wp-content/uploads/2021/04/fedora-34_01.jpg)̀

Fedora is another nice option if you want to try out something new that is not based on Ubuntu Or Arch Linux. Fedora is based on the Red Hat line of distros. Red Hat makes enterprise-level Linux for companies and is very stable. Fedora is the branch of Red Hat that is more focused on enthusiasts and home users. 

Fedora uses RPMs and the `DNF Package Manager` to manage packages. You would maybe be used to the `apt` package manager to install things. You might have run something like:

```bash
$ sudo apt install firefox
 # or
 $ sudo apt-get install firefox
```

These commands use the `apt` and `apt-get` package managers to install packages or apps, like firefox. These are used in Debian-based distributions like Pop!_OS, Ubuntu, Zorin OS, Linux Mint, etc. Fedora uses the `dnf` package manager and a typical install command looks something like this:

```bash
 $ sudo dnf install firefox
```

Fedora is a modern Linux distribution, so it mostly works well on modern computers. Fedora comes with the RPM Fusion repository, which is a community-maintained repository of applications for Fedora. It makes a huge amount of apps available to install to you, even if they are not in the official repositories of Fedora. Fedora is recommended as a second distro after you get a taste of what Linux is and how it works through the other distros. There are also different <a href = "https://spins.fedoraproject.org" target = "_blank">spins</a> of Fedora available that give you different Desktop environments. I recommend the KDE Plasma Desktop for high customizability and the default Gnome Desktop if you want something that looks nice out of the box.


### Pop!\_OS
![Pop!\_OS Desktop](https://149366088.v2.pressablecdn.com/wp-content/uploads/2022/04/pop-os-new-bits.jpg)

Pop!\_OS is the second most recommended distro according to me. You might recognise this as the distro that <a href="https://youtu.be/0506yDSgU7M" target = "_blank">broke Linus's computer</a>. But don't worry, this has been fixed :) Anyway, coming back. Although Pop is based on Ubuntu, it does things differently. It uses a heavily modified version of the GNOME desktop environment called the COSMIC Desktop. The fun part about this is that it is GNOME-based now, but system76, the company that developed Pop!\_OS is building the COSMIC desktop from the ground up using Rust - not relying on GNOME. This would put them fully in control of the desktop environment and I'm sure the folks at system76 have ambitious plans to take advantage of this control.

So what makes Pop!\_OS great for beginners? like Zorin OS, it comes with exclusive support for NVIDIA drivers, It has disk encryption out of the box, It has a program installed called the Pop Shop that is fantastic and it has an excellent community. Since this is based on Ubuntu, you'd find support easily if you run into something. 

A great thing about the Pop Desktop is that it brings in `Tiling Features` by default. Tiling is a type of window manager behaviour. What most people are used to would be a Floating Window Manager. Whenever you open a window, it will just float around on the screen and it's your responsibility to move it around where you want, resize it and keep it organised. A tiling window manager takes over this job for you. It arranges all the windows in a beautiful way across your screen such that the most amount of screen real estate is used. It tiles the windows in the best way automatically and it is more keyboard-centric. This helps in productivity, especially for a programmer as you wouldn't have to constantly lift your hands off of the keyboard to the mouse to arrange windows. 

### Elementary OS
![Elementary OS Desktop](https://www.debugpoint.com/wp-content/uploads/2021/08/elementary-OS-6-ODIN-Desktop.jpeg)
The elementary OS is the most famous for its design and looks. It is the best distro for people who are migrating from Mac OS. The UI is heavily inspired by Mac OS. At its core, it is also Ubuntu based but it is powered by the Long Term Support (LTS) Editions - So you are guaranteed security updates and bug fixes for 5 years. It uses the Pantheon desktop environment(which has a very sophisticated, polished appearance). It also has a beautiful App Center for downloading the applications you need. Overall, it's one of the best distros to go to if you don't adapt to UI changes very well and are coming from MacOS. Otherwise, I'd suggest the other distros.

## What Do We Recommend?
Our recommendation goes in this order:
1. `Zorin OS` - A well-rounded distro for beginners and advanced users alike
2. `Linux Mint` - A go-to distro for a beginner
3. `Pop!_OS` - A rock stable distro with a well-designed COSMIC Desktop
4. `Fedora` - For intermediate users looking for a change
5. `Elementary OS` - For Mac users who don't have time for UI tweaks


## The other distros

### Arch Linux
![God Himself](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgPyPaqIjZeqbqqUmZr4L8kzILkKKIgg8jzUTCR6vS_-4f4uJMyDE3Ng4xHJWu3IBRVkA&usqp=CAU)

This is the distro most Linux users eventually end up on. It is a highly advanced rolling release distro that helps you build your dream Linux system. It does NOT come with any desktop environment out of the box. That means that all you get after installation is a terminal. That is it. You will need to install everything you need yourself, including drivers, desktop environments/window managers, browsers, and everything. Speaking of installation, Arch Linux has been historically known to have a very advanced installation process. You used to have to do the installation manually. Do the partitions manually through the terminal, install the Linux kernel manually, and so on. So every time you see someone using Arch, you would consider them highly knowledgeable. And people used to show that off too with the phrase `I use arch btw` . _I use arch btw._
However, installation has become easier now since Arch Linux now comes with an _installer_. It's just a script you can run, like a normal CLI program, that asks you a bunch of questions and does all the hard parts of installation for you. The people who use the installer script are however looked down upon. Only the hardcore bare bones advanced Linux users make it on to the Holy Arch Linux!

Arch also comes with the `Arch Wiki` - The best documentation I know out of all the projects I've come across. The Arch Wiki is just a beautiful piece of literature. It helps you through everything arch. More often than not, you'd find answers for problems with other distros as well on the Arch Wiki.


Some users do not like to use the init system that Arch Linux uses - systemd. systemd is simple to use and easy for beginners but it's incredibly bloated. Don't worry if you're a beginner and do not understand this :) These users, choose to use an OS like <a href="https://artixlinux.org" target="_blank">Artix Linux</a>. It does not use systemd but instead uses an init system called `runit`. runit is simpler, faster and better for daily use. It involves a lot more manual set up but it's much lighter than systemd.

### Gentoo Linux
![Gentoo Linux](https://www.gentoo.org/assets/img/logo/gentoo-horizontal.png)
Gentoo Linux is also similar to Arch - that is, you start with a terminal and install only the stuff you want. But it's harder. _How?_ You need to compile everything you need - and compilation takes time. However, once all the programs you need are compiled locally, it runs in a highly optimised way and is very fast. There are pre-compiled binaries available for some programs too but the gist of Gentoo is to compile everything locally. Like Arch, it's only for highly experienced and advanced Linux users. Beginners, don't mess with it, end up breaking your system and then hate on Linux :\\

### The Joke Distros

#### Hannah Montana Linux
![Hannah Montana Linux](https://linuxreviews.org/images/7/74/XFCE4-Hannah-Montana-FC30.jpg)
Remember when I said distros are a result of the freedom to do _whatever you want_. Yes. This kind of stuff is also included in _'whatever you want'_. Hannah Montana Linux is a distro based on the American TV Show, Hannah Montana. The GUI is based on KDE 4.2. <a href="https://www.youtube.com/watch?v=tnkj4yS8Dcw" target="_blank">Here</a> and <a href="https://hannahmontana.sourceforge.net" target="_blank">Here</a> for more info.

#### AmongOS
![AmongOS](https://preview.redd.it/8pjmx01mmp271.png?auto=webp&s=45ee5c657b3d68965f74347382719d3ad7979451)

AmongOS is a parody OS inspired by, no points for guessing, Among Us ඞ. It is a meme OS developed in the same vein as Hannah Montana Linux, but it's also developed and made to be a lightweight operating system. Among OS is less bloated than other mainstream distros (_cough cough Ubuntu_). The AmongOS project has been shut down though :\\ You can find info about it <a href="https://amog-os.github.io" target="_blank">Here</a>

## FAQs and Wrapping Up

#### 1. What is the easiest Linux distribution?
I'd say Zorin OS and Linux Mint are the easiest to set up and get going as fast as possible. Pop!\_OS is a great option too!

#### 2. What is the fastest/lightest Linux Distribution?
You can check out Linux Mint or Zorin OS Lite. They run great on the oldest and least powerful of machines. However, you can also explore <a href="https://itsfoss.com/lightweight-linux-beginners/" target="_blank">other lightweight distros</a>

#### 3. Can I run Windows apps on Linux?
As I mentioned before, some windows apps _and games_ can be run on Linux through Wine and a software called `Lutris`. However, only some apps written for Windows run flawlessly on Linux. More apps and games are being written and compiled for Linux too. Most programming tools usually run _better_ on a Linux system. The problem only lies with games and niche software. You can get more info <a href="https://itsfoss.com/use-windows-applications-linux/" target="_blank">other lightweight distros</a>

#### 4. Do I need an anti-virus on Linux?
Nope. You have nothing to worry about as long as you download stuff from official sources and do not indulge in anything malicious. You might want to explore a firewall if you are planning to use this PC as a server. Also, keep in mind that since Linux is so open, anybody and everybody can advise you on forums. While these forums are moderated, you might get bad advice from a few bad apples. NEVER run `sudo rm -rf /*`  on any Linux distro. It is a one shot command to completely nuke your entire root directory - aka your entire system. It deletes everything. If you have done this, It is possible to recover everything with recovery software like photorec but it's still big pain. Be careful with the `rm` command in general. It stands for `remove` and it deletes items permanently and leads to situations like <a href="https://unix.stackexchange.com/questions/640343/accidentally-ran-sudo-rm-on-my-arch-linux-installation" target = _blank>these</a>
![someone ran rm- rf /](https://i.imgur.com/knS1sNy.png)



And that is it, folks! Thanks for reading through this long post of mine. Reach out to any of the Homebrew or Hackerspace members for any help with Linux and we will get you the best quality of help there is!



