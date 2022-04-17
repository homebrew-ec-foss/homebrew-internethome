---
title: systemctl start linux
date: '2022-04-15'
tags: [linux,workshop]
decription: Your cheat sheet for linux commands!
permalink: posts/{{ title | slug }}/index.html
author_name: The Mentors of Hackerspace PESUECC
author_link: /members
---

## README!

Welcome to `systemctl start linux`! This is our very first workshop on the wonderful, enchanting world of Linux, and we're here to hold your hand through the process of exploring this world yourself.

This post serves as a standing reference for the workshop (and later)! Feel free to come back here and refer to the content as you please.

If you've got more doubts, or if you'd like to just nerd out about how cool this stuff is, Make sure you join the [Homebrew By Hackerspace PESUECC Discord]()!

Ready? Here we go!

I'd like to welcome you to the Linux Operating System! Every single line of code you use here has been contributed as an effort by people around the globe, working for the public good. Then again, Linux isn't the power user's choice for no reason - we're here to show you why it's a favorite.

So, you wake up, and you're in a strange place. All you have with you is a computer, with a single character on it -

```bash
$ 
```

Say Hi to Shelly, your friendly neighborhood UNIX Shell! 

> What the hell is a shell?

A shell is nothing but a text-based interface for you to use your beloved computer. Think of the shell as your really smart friend who prefers texting over anything else, and thus, wants only to speak via text. This seems silly at the moment, but trust me, you'll see why this is an advantage at times!

The Shell works as a REPL - a Read, Edit, Print Loop - where you 
- Read what the shell says
- Edit or write a command or collection of commands to the shell
- read the output Printed by the shell
- Loop until you're done

The shell works on a collection (and combination) of commands, some of which you will explore today.

> Remember! If you're ever confused about a command, simply type into your shell -

> `$ man <command>`

> This opens up the in-built help system, known as Manual Pages!

## 0 - What is this place?
- Covered - `clear`, `pwd`, `whoami`, Directories, and Expansion

### whoami

What is this place? *Who am I*, you wonder? Out of **instinct**, you type that into your computer..

```bash
$ whoami
someone_really_cool
```

The `whoami` command tells you, simply put, who you are on the computer! Think of this is the way you ask if Shelly knows you. For more information, refer to `man whoami`!

### pwd

Good! Now that we know where we are, it's time to find out where in the computer we are! 

> But Why?

That's an excellent question! In Linux, [everything is a file](https://en.wikipedia.org/wiki/Everything_is_a_file#:~:text=Everything%20is%20a%20file%20describes,bytes%20exposed%20through%20the%20filesystem). Given this, it's essential to know where you are so you don't modify the wrong file by mistake, and say, accidentally get rid of the computer's ability to adjust brightness (not kidding, see `/sys/class/backlight/`).

How this actually works isn't something we'll cover in this workshop, but in essence, everything - network interfaces, displays, mice, keyboards, WiFi Adapters, Gaming Controllers, Processes, Hard Drives - to Linux, they're all files! You can read more about this [here](https://www.linux.com/training-tutorials/linux-filesystem-explained/).

A *collection of files* is known, as you know, as a *folder*. The formal term for the same is *directory*.

The place you're currently located in Linux is always known as the *working directory*. To find out where we are, we can use the `pwd` (`p`rint `w`orking `d`irectory) command.

```bash
$ pwd
/home/anirudh
```

### clear

Lastly, before you start the next module, we'll show you how to make sure you don't get lost in the text on the terminal! Key in -
```
$ clear
```

And the screen should be empty, save for out friendly neighbourhood prompt `$`!


## 1 - `ls`, `cd`, `mkdir`

### pwd 

Basic PWD : prints current working directory 

```bash
$ pwd # shows you the current working directory
```

### ls

Basic usage of ls : 

```bash
$ ls 
```

Lists all files, hidden files and folder too 
```bash 
$ ls -a 
```

Lists contents of directory given an "absolute" path 

```bash 
$ ls /path/to/some/folder/from/root
```

Lists contents of directory given an "relative" path originating from PWD 
```bash 
$ ls ./path/to/some/folder/from/pwd
```

Gives permissions and last modified of all normal contents of the directory 
```bash 
$ ls -l 
```

Any of these can be combined with each other with some obviously logic, like : 
List permissions and last modified for all contents including hidden 

```bash 
$ ls -a -l OR la -l
```

### cd

Basic use : 
```bash 
$ cd
```
cd to current users home directory 
```bash 
$ cd ~/
```
cd to move one directory up 
```bash 
$ cd ..
```
Change directory to root directory : 
```bash 
$ cd /
```
Change directory using absolute paths 

```bash 
$ cd /path/to/some/folder/from/root
```
Change directory using relative paths
```bash 
$ cd ./path/to/some/folder/from/pwd 
```
Installing FZF 
```bash 
$ git clone https:github.com/junegunn/fzf.git ~/.fzf
$ cd ~/.fzf 
$ ./isntall 
```

### mkdir
basic use : 
```bash 
$ mkdir <folder name> 
```
Creating multiple folder
```bash 
$ mkdir dir_1 dir_2 
```
Creating directories withing directories 
```bash
$ mkdir -p dir_1/sub_dir_1
```

## 2 - touch and permissions 

#### Touch 

So what exactly is the touch command? If we ask the man pages, we get "changes file stamps". This is something where even seasoned linux user go wrong.Touch DOES not create files for you, it modifies the time stamp on those files.

These time stamps should have been observed in the previous module in the command `ls -a -l`. Even though touch is to modify time stamps it is rarely used so. 

Basic use : 
changes time stamp is file exists, else creates new file 
```bash 
$ touch <file_name>
```
what if you don't want it creating new files? 
```bash 
$ touch -c <file_name>
```
what if you want to only change the access time stamp? 
```bash 
$ touch -a <file_name> 
```
and if you want to modify only modification time stamp 
```bash 
$ touch -m <file_name>
```
Soooo, how do u see those time stamps?
```bash 
$ stat <file_name> 
```

#### Permissions 

The permission system in linux is quite a beautiful thing. But before we can learn that, we need to learn a bit about the user system in linux. 

There can be many users accessing a single computer and its files. These users can be part of `groups`. `superuser` is another user in every system that has no restriction to any file.

Whenever one uses `sudo`, they are doing the commands as if they are the `superuser` and begin able to do commands as super users naturally needs a password. `sudo` is analogous to administrator in windows but much more secure and useful.

To ones using our repl session, all commands are executed  superuser without any password.

Now we are prime to learn permissions, get those binary thinking hats on! 

For any given folder or file we have three types of access: 
```
read write execute  (rwx, remember the order its important)
```
for any given access types, 1 is used if allowed, 0 if not 

So if user has read and execute permissions : 
```

 rwx 
 111 => 7
```
Now, of course we gotta give permissions for owner, groups and other.Groups being the group that current owner is part of and others well being everyone except the owner and his group.

Once again the order matter so remember it : 
```
   owner group others (ugo)
```
and now finally, say the current owner get all permission, other in his group also get all and others get none. 
```

   user group other 
   rwx   rwx   ---
   7     7     0   => 770
```

You now know how to calculate linux permissions! Congratulations.
So how do we set these permissions? 

we use : `chmod`
#### chmod 
Basic usage : 
```bash 
$ sudo chmod 770 /absolute/path/to/some/folder/or/file 
```
We can also use relative path, no restrictions.

It is always advised to execute chmod as `superuser`

We can also change the owner of the file using `chown`, which I wont be covering in this module!
There is quite a bit more to the linux permissions system, but that all for now. Onto the next module.


## 3 - pipes and Redirection  
  
* A normal logic of any computer program is a set of instructions which manipulates given **inputs** to give a specific **output** and give any **errors** if any  
  
* So every computer science student should know that three data streams come into play and **STDIN** a.k.a Standard Input (data fed into your program), **STDOUT** a.k.a Standard Output (data printed by the program, defaults to terminal) and **STDERR** a.k.a Standard Error (for error messages, defaults to terminal)  

* Now we are going to delve into two topics in detail which is **Pipes** and **Redirection** where we manipulate the flow of said above data streams  
  
* And buckle up! Cause this is an important topic!  
  
### Redirection  

* the action of assigning or directing something to a new or different place or purpose.  
  
* and well, that is exactly what we are doing! We are going to redirect the data coming from our data streams i.e STDIN, STDOUT and STDERR using certain operators in the command line and use it somewhere else for some other purpose  

* Demonstrate usage of <, >>, >, 2>  
  
**Usage of < :**  
```bash 
$ cowsay < message.txt  //Input Redirection
```  
   
**Usage of > :**  
```bash
$ ls > output.dat //Output redirection
```  
  
**Usage of >> :**  
```bash  
$ cowsay moo >> output.dat  //Output redirection (append)
```  
  
**Usage of 2> :**  
```bash  
$ g++ 1.cpp >> output.dat 2> error.dat  //Error Redirection
```  

* Demonstrate the usage of cat as a barebones text editor    
  
### Redirection Exercises  
  
1. Using cat as an editor, write the following message  
  
```
hello im under the water here too much raining
uwuwuwuwuwuwuw
```  

2. Now using the operators you learnt, redirect the message to cowsay and get the whole output in a file output.dat  
  
### Piping  
  
* So far we have seen redirection to and from files, now we are going to learn a new mechanism for sending the data recieved by execution of one program or command or script to another program or command or script and this mechanism is called <b>Pipes.</b>  
  
* Two important features is data forwarding and pipelined simultaneous execution!  

```bash
   $ ls -la | head -3  //Executes the command ls and forwards the data to the head command which prints the first three lines of recieved data
```
    
### Piping Exercises  

* Let's play with the lolcat utility a bit shall we? (first install it with apt)  

```bash
   $ ls -la | lolcat //try it out!
```    


## 4 - Jobs 

### What is Job control?

Job control is nothing but the ability to stop/suspend the execution of
processes (command) and continue/resume their execution as per your
requirements.

### What is the purpose of Job command in UNIX?


### Jobs Commands:
Basic usage : 
```bash 
$ jobs
```
To display the process ID or jobs for the job whose name begins with “p,”Alternatively, we can use **jobs %p** !!
```bash 
$ jobs -p %p 
```
 Information about each job 
```bash 
$ jobs -l
```
Display jobs with PID's only 
```bash 
$ jobs -p
```
Currently running jobs
```bash 
$ jobs -r
```
Jobs that have stopped 
```bash 
$ jobs -s
type -a jobs OR command -V jobs
```

**How do I list only processes that have changed status since the
last notification?**

```bash 
# Start new job
$ sleep 100 &
# Show jobs that have stopped or exited since last notified.
$ jobs -n**
```
## 5 - fg, bg, ps & kill 

##### *Why do we need fg and bg processes ?*

### bg
- `help bg`  - Introduction to bg
- `bg [ job_spec ]` - Create a Simple Job and run command
- **[ job_spec ]** - Explain different types of job_spec with examples

Current Job
```bash
$ bg %+
```
Previous Job
```bash
$ bg %-
```
Job Number
```bash
$ bg %1
```
Job Initiation Command (Starts with)
```bash 
$ bg %s
```
Job Initiation Command (Contains)
```bash
$ bg %?s 
```

### fg
- `help fg` - Introduction to fg
- `fg [ job_spec]` - Create a Simple Job and run command
- **[ job_spec ]** - Explain different types of job_spec with examples

Current Job
```bash
$ fg %+
```
Previous Job
```bash 
$ fg %-
```
Job Number
```bash 
$ fg %1
```
Job Initiation Command (Starts with)
```bash 
$ fg %s
```
Job Initiation Command (Contains)
```bash 
$ fg %?s 
```

##### *Jobs? Processes? - Differentiate*

### ps
- Introduction
- `ps [ options ]` - Run command & Explain various fields
	- **PID** - Process ID
	- **TTY** - Terminal Type 
	- **TIME** - Process run time on CPU
	- **CMD** - Command name which initiated the process
- `ps --help a` - Summarize all options.

### kill
- `help kill` - Introduction
- `kill pid` - Run command after creating a process/job
- Explain various options observed in help kill.

List of Kill Signals
```bash
$ kill -l
```
Specify a signal name to be sent to kill a process
```bash
$ kill -s <pid>
```
specify a signal number to be sent to kill a process 
```bash
$ kill -n <pid>
```



## 6 - grep,wget,zip,unzip,tar 

### grep
basic
```bash 
$ cat <file> | grep <something>
```
number of instances
```bash 
$ cat <file> | grep -c <something>
```
case intensive
```bash 
$ cat <file> | grep -i <something>
```
### wget/curl
wget basic
```bash 
$ wget <website-name>
```
recursive download
```bash 
$ wget --recursive <website-name>
```
Store a file
```bash 
$ wget <image-url> >> <image-name>
```
### tar, zip , unzip
#### tar

Create tar Archive File in Linux
```bash 
$ tar -cvf <tar-file>.tar <tar-dir>
```
Create gzip Archive File in Linux
```bash 
$ tar cvzf <gzip-file>.tar.gz <gzip-dir>
```
Untar tar files in Current Directory
```bash 
$ tar -xvf <tar-file>.tar
```
Unzip gzip files in Current Directory
```bash 
$ tar -xvf <gzip-file>.tar.gz
```
#### zip
Basic
```bash 
$ zip <myfile>.zip <filename>.txt
```
Remove the file from archive
```bash 
$ zip –d <filename>.zip <file>.txt
```
Update the file from archive
```bash 
$ zip –u <filename>.zip <new-file>.txt
```
Delete orginal files after zipping
```bash 
$ zip –m <filename>.zip <file>.txt
```

#### unzip

Basic
```bash 
$ unzip <file>.zip
```
Unzip to a different directory
```bash 
$ unzip <filename>.zip -d </path/to/directory>
```
Use password to unzip
```bash 
$ unzip -P <password> <filename>.zip
```
Exclude some files
```bash 
$ unzip <filename>.zip -x <file1-to-exclude> <file2-to-exclude>
```
