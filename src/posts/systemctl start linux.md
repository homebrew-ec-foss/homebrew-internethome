# systemctl start linux 

By hackerspace mentor team. This blog comprises of the content taught and learnt during our offline event `systemctl start linux`.


# ls,cd,mkdir : Module 1
## ls

```sh 
# Basic PWD : prints current working directory 
pwd 
# Basic usage of ls : 
ls 
# Lists all files, hidden files and folder too 
ls -a 
# Lists contents of directory given an "absolute" path 
ls /absolute
# Lists contents of directory given an "relative" path originating from PWD 
ls ./relative
# Gives permissions and last modified of all normal contents of the directory 
ls -l 
# Any of these can be combined with each other with some obv logic, like : 
# List permissions and last modified for all contents inclusding hidden 
ls -a -l OR la -l
```
## cd

```sh
# Basic use : 
cd
# cd to current users home directory 
cd ~/ cd → home directory
# cd to move one directiry up 
cd ..
# Change directory using absolute paths 
cd /
# Change directory using relative paths
cd 
# Installiog FZF 
git clone https:github.com/junegunn/fzf.git ~/.fzf
cd ~/.fzf 
./isntall 
```
## mkdir

```sh
# basic use : 
mkdir <folder name> 
# Creating multiple folder
mkdir dir_1 dir_2 
# Creating directories withing directories 
mkdir -p dir_1/sub_dir_1
```

# Jobs : Module 4

## What is Job control?

Job control is nothing but the ability to stop/suspend the execution of
processes (command) and continue/resume their execution as per your
requirements.

## What is the purpose of Job command in UNIX?

Displays status of jobs in the current shell session.

## Jobs Commands:

```sh
# To display the status of jobs in the current shell
jobs
#  To display the process ID or jobs for the job whose name begins with “p,”Alternatively, we can use **jobs %p** !!
jobs -p %p 
# Information about each job 
jobs -l
# Display jobs with PID's only 
jobs -p
# Currently running jobs
jobs -r
# Jobs that have stopped 
jobs -s
# to find if job is part of shell or an external command or both
type -a jobs OR command -V jobs
```

**How do I list only processes that have changed status since the
last notification?**

```sh
# Start new job
sleep 100 &
# Show jobs that have stopped or exited since last notified.
jobs -n**
```

# grep,wget,zip,unzip,tar : Module 6

## grep

- Why is grep very important? How is it used?
- Explain grep with a live example.
- Show a demo , and explain how grep works.
- Various ways grep is used with cat.
- Examples

```sh
# basic
cat <file> | grep <something>
# number of instances
cat <file> | grep -c <something>
# case intensive
cat <file> | grep -i <something>
```
## wget/curl

```sh
# wget basic
wget <website-name>
# recursive download
wget --recursive <website-name>
# Store a file
wget <image-url> >> <image-name>
```
## tar, zip , unzip

1. tar

```sh 
# Create tar Archive File in Linux
tar -cvf <tar-file>.tar <tar-dir>
# Create gzip Archive File in Linux
tar cvzf <gzip-file>.tar.gz <gzip-dir>
# Untar tar files in Current Directory
tar -xvf <tar-file>.tar
# Unzip gzip files in Current Directory
tar -xvf <gzip-file>.tar.gz
```
2. zip

```sh
# Basic
zip <myfile>.zip <filename>.txt
# Remove the file from archive
zip –d <filename>.zip <file>.txt
# Update the file from archive
zip –u <filename>.zip <new-file>.txt
# Delete orginal files after zipping
zip –m <filename>.zip <file>.txt
```
3. unzip

```sh 
# Basic
unzip <file>.zip
# Unzip to a different directory
unzip <filename>.zip -d </path/to/directory>
# Use password to unzip
unzip -P <password> <filename>.zip
# Exclude some files
unzip <filename>.zip -x <file1-to-exclude> <file2-to-exclude>
```
