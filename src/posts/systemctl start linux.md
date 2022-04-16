---
title: Systemctl start linux
date: '2022-04-15'
tags: [linux,workshop]
decription: Your cheat sheet for linux commands!
permalink: posts/{{ title | slug }}/index.html
author_name: Mentor team
author_link: /members
---
# systemctl start linux 

By hackerspace mentor team. This blog comprises of the content taught and learnt during our offline event `systemctl start linux`.


## ls,cd,mkdir : Module 1 

### ls 
Basic PWD : prints current working directory 
```
pwd
```
Basic usage of ls : 
```
ls 
```
Lists all files, hidden files and folder too 
```
ls -a 
```
Lists contents of directory given an "absolute" path 
```
ls /path/to/some/folder/from/root
```
Lists contents of directory given an "relative" path originating from PWD 
```
ls ./path/to/some/folder/from/pwd
```
Gives permissions and last modified of all normal contents of the directory 
```
ls -l 
```
Any of these can be combined with each other with some obviously logic, like : 
List permissions and last modified for all contents including hidden 
```
ls -a -l OR la -l
```
### cd

Basic use : 
```
cd
```
cd to current users home directory 
```
cd ~/
```
cd to move one directory up 
```
cd ..
```
Change directory to root directory : 
```
cd /
```
Change directory using absolute paths 

```
cd /path/to/some/folder/from/root
```
Change directory using relative paths
```
cd ./path/to/some/folder/from/pwd 
```
Installing FZF 
```
git clone https:github.com/junegunn/fzf.git ~/.fzf
cd ~/.fzf 
./isntall 
```

### mkdir
basic use : 
```
mkdir <folder name> 
```
Creating multiple folder
```
mkdir dir_1 dir_2 
```
Creating directories withing directories 
```
mkdir -p dir_1/sub_dir_1
```

## touch and permissions : Module 2 

#### Touch 

So what exactly is the touch command? If we ask the man pages, we get "changes file stamps". This is something where even seasoned linux user go wrong.Touch DOES not create files for you, it modifies the time stamp on those files.

These time stamps should have been observed in the previous module in the command `ls -a -l`. Even though touch is to modify time stamps it is rarely used so. 

basic use : 
changes time stamp is file exists, else creates new file 
```
touch <file_name>
```
what if you don't want it creating new files? 
```
touch -c <file_name>
```
what if you want to only change the access time stamp? 
```
touch -a <file_name> 
```
and if you want to modify only modification time stamp 
```
touch -m <file_name>
```
Soooo, how do u see those time stamps?
```
stat <file_name> 
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
```
sudo chmod 770 /absolute/path/to/some/folder/or/file 
```
We can also use relative path, no restrictions.

It is always advised to execute chmod as `superuser`

We can also change the owner of the file using `chown`, which I wont be covering in this module!
There is quite a bit more to the linux permissions system, but that all for now. Onto the next module.

## Jobs : Module 4

### What is Job control?

Job control is nothing but the ability to stop/suspend the execution of
processes (command) and continue/resume their execution as per your
requirements.

### What is the purpose of Job command in UNIX?


### Jobs Commands:
Basic usage : 
```
jobs
```
To display the process ID or jobs for the job whose name begins with “p,”Alternatively, we can use **jobs %p** !!
```
jobs -p %p 
```
 Information about each job 
```
jobs -l
```
Display jobs with PID's only 
```
jobs -p
```
Currently running jobs
```
jobs -r
```
Jobs that have stopped 
```
jobs -s
type -a jobs OR command -V jobs
```

**How do I list only processes that have changed status since the
last notification?**

```
# Start new job
sleep 100 &
# Show jobs that have stopped or exited since last notified.
jobs -n**
```

## grep,wget,zip,unzip,tar : Module 6

### grep
basic
```
cat <file> | grep <something>
```
number of instances
```
cat <file> | grep -c <something>
```
case intensive
```
cat <file> | grep -i <something>
```
### wget/curl
wget basic
```
wget <website-name>
```
recursive download
```
wget --recursive <website-name>
```
Store a file
```
wget <image-url> >> <image-name>
```
### tar, zip , unzip
#### tar

Create tar Archive File in Linux
```
tar -cvf <tar-file>.tar <tar-dir>
```
Create gzip Archive File in Linux
```
tar cvzf <gzip-file>.tar.gz <gzip-dir>
```
Untar tar files in Current Directory
```
tar -xvf <tar-file>.tar
```
Unzip gzip files in Current Directory
```
tar -xvf <gzip-file>.tar.gz
```
#### zip
Basic
```
zip <myfile>.zip <filename>.txt
```
Remove the file from archive
```
zip –d <filename>.zip <file>.txt
```
Update the file from archive
```
zip –u <filename>.zip <new-file>.txt
```
Delete orginal files after zipping
```
zip –m <filename>.zip <file>.txt
```

#### unzip

Basic
```
unzip <file>.zip
```
Unzip to a different directory
```
unzip <filename>.zip -d </path/to/directory>
```
Use password to unzip
```
unzip -P <password> <filename>.zip
```
Exclude some files
```
unzip <filename>.zip -x <file1-to-exclude> <file2-to-exclude>
```
