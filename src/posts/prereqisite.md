---  
title: Prerequisite for the 11ty Workshop
date: '2022-09-14'  
tags: [11ty ,WebDev]  
description: Prerequisite and dependencies for the 11ty Workshop  
permalink: posts/{{ title | slug }}/index.html
author_name: Saksham Alok
---  
# Prerequisites

The Dependencies of these courses are mentioned below 



## GIT
 - [GitHub Account](https://github.com/)
 - Git CLI installation see [here](https://www.atlassian.com/git/tutorials/install-git)
 - Setting your Git username for every repository on your computer

Open Terminal.

Set a Git username:

```
$ git config --global user.name "Mona Lisa"
```
Confirm that you have set the Git username correctly:
```
$ git config --global user.name
> Mona Lisa
```

- Setting your email address for every repository on your computer
Open Terminal.
Set an email address in Git. You can use your GitHub-provided noreply email address or any email address.
```
$ git config --global user.email "email@example.com"
```
Confirm that you have set the email address correctly in Git:
```
$ git config --global user.email

email@example.com
```

Add the email address to your account on GitHub, so that your commits are attributed to you and appear in your contributions graph. For more information, see [Adding an email address to your GitHub account](https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/adding-an-email-address-to-your-github-account)."

 - Authenticating with GitHub from Git:
 see [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

 ## Volta
 This repo uses [Volta](https://volta.sh/). Get it, and it'll make your node life so much easier.
Run this command (for linux and mac user)
```
curl https://get.volta.sh | bash

```
For windows user follow instructions [here](https://docs.volta.sh/guide/getting-started)

- To install yarn 


```
volta install yarn
```

## Netlify
 Create an account on [Netlify](https://www.netlify.com/)


