---
title: "Modal Editors"
date: "2025-09-10"
tags: [nvim, introduction, modal, workshop]
description: Let's Learn about Modal Editors!
permalink: posts/{{ title | slug }}/index.html
author_name: Kiran J Rajpurohit
author_link: https://github.com/ad-chaos
---
# Modal Editing

When thinking about the various different ways in which I could conduct this workshop, I believe its most helpful to approach this from first principles that way you don't need any kind of pre-requisite knowledge inorder to follow this workshop.

> I am going to give what I will call an elementary demonstration. But elementary doesn't mean easy to understand,
> elementary means very little is required to know ahead of time in order to understand it, except to have an infinite
> amount of intelligence
>     -- [Richard Feynmen](https://www.youtube.com/watch?v=xdIjYBtnvZU&t=205s)


I've been told that the audience majorly consists of 1st years, ones who are just starting their programming journey and as a fresher a very natural question to ask is why even bother with such text editors in the first place? Everyone says that you gotta use notepad or vscode or something to the effect of a "Plain Text Editor".

## Why doesn't MS-Word suffice?

This is an excellent question. There are people who will laugh at it; dismiss it as dumb, but its _incredibly_ important to ask such fundamental questions, blindly accepting them as some kind of dogma only leads to inferior understanding. It is only asking questions about that which we don't understand is how we become good engineers and programmers.

Let’s first set the ground by distinguishing the two general types of editors:
1) Rich Text Editors
2) Plain Text Editors

Rich text editors are what we interact with on a day to day basis, ms word, mac pages, google docs, etc. When you save a file to the disk, these editors don’t just literally save those words, they also add additional metadata and use a different file format

Plain text editors are simple, they just write what you type into them to disk, so anything that reads it, will just see the exactly the bytes you typed, there is no additional magic. Editors of this type would be notepad, notepad++, vscode, nano etc

Now within the category of plain text editors the usual way of editing text is using the arrow keys (+ some modifiers like ctrl, alt and shift) and the mouse to move around text, select words, modify lines, etc, etc, etc. This can at times feel very clunky, but people do get used to it and develop good proficiency using them.

Modal editors throw away that idea and introduce a new concept of editing text. We'll explore this idea later in the blog.

Some examples of modal editors would be vim, neovim, kakoune, helix. Vim is by far the most popular, but other the editors have also become popular in the last decade.

In this workshop we will focus on neovim.

# Neovim

I hope you have neovim installed in your system, if not go ahead and follow [this guide](https://hsp-ec.xyz/announcements/modal-editors#prerequisites)

## Configuration Files

The way most of us are familiar with configuring software is via some graphical menus, setting whatsapp backup intervals, changing the appearance of chrome; You'd click some buttons, tick some checkboxes and you've achieved what you wanted.
However, there is no graphical menu for configuring neovim, the way you do it is by writing your settings to a file and neovim will read all your settings from that file.
As you learn more about computers, you'll notice that all TUI programs are configured similarly, by writing the settings to some file that the program will read the settings from.

## Starting
Now that you've got neovim on your system, let's start my opening neovim's configuration file inside neovim itself!
```bash
nvim --cmd "call mkdir(stdpath('config'), 'p')" --cmd "exe 'edit '.stdpath('config').'/init.vim'"
```

After all that we've finally arrived at the topic of today's workshop, modal editing.
Now that you've opened neovim, you'll notice that typing `w` or `e` on your keyboard doesn't enter `w` or `e` into the buffer and that's because you aren't in a 'mode' that allows for inserting text. This is our first introduction to the modes in Modal Editing.

## Modes

### Normal and Insert Modes

When you first open neovim, you're put into `NORMAL` mode, to insert text you must be in `INSERT` mode.
To go from `NORMAL` mode to `INSERT` mode press `i`. After pressing `i` you should see the cursor go from being a block to a beam and the words `-- INSERT --` appear at the bottom of your screen.
To go back to `NORMAL` mode, press `ESC`. You'll now see the text at the bottom disappear and the cursor goes back to being a block.

Alright, play around a little bit:
```
This is a sentne with some letters, words and "strings"
This is a sentnce with numbers like 123
```

Press `i` to go into `INSERT` mode, type the above text _as it is_ (the typos are intentional). Once you're finished press `ESC` to back into `NORMAL` mode.
If at anypoint you think you typed it out incorrectly and would like to start over, press `u` to undo, conversely you can press `ctrl+r` to redo.

One very common operation while editing text is moving the cursor to some desired location, to say change a word or fix a typo, you can obviously use the arrow keys but in neovim with its whole mode business let's you use the _entire_ keyboard for various kinds of interesting movements.

To move the cursor left, press `h` and to move it right, press `l`
I've misspelt sentence as sentnce in the above text, to fix it we'll move the cursor to the `n` in sentnce using `h` and `l` and once you're on the letter `n`, press `i` to go into `INSERT` mode, enter the letter `e` and press `ESC` to go back into `NORMAL` mode.

To move the cursor up, press `k` and to move it down, press `j`
The sentence above also has a similar typo, press `k` to go up, `i` to go into `INSERT` mode and enter the letter `e`. Press `ESC` to go back to `NORMAL` mode.

There's also a `c` missing in the first sentence, try adding it using what we've learnt so far.

There are more ways to go into `INSERT` mode:
- `a` moves the cursor one place to the right of the character you're currently on and enters `INSERT` mode
- `o` inserts an empty line below the current line, places the cursor at the start enters `INSERT` mode
- `O` inserts an empty line above the current line, places the cursor at the start enters `INSERT` mode

`h`, `j`, `k` and `l` are motions, motions allow you to move the cursor and infact there are other motions as well:
- `w` allows you to skip words and position the cursor at the start of the word, `e` does the same thing but positions
  the cursor at the end of the word. To move backwards use `b`
- `0` moves to the start of the line, `$` moves to the end of the line
- `{` and `}` moves the cursor through paragraphs

These motions make up a _majority_ of what you'd typically use on a day to day basis.

Next let's move onto verbs. Verbs enable actions on text, there are 4 main verbs in neovim:
1) `d` that corresponds to the delete action
2) `c` that corresponds to the change action
3) `y` that corresponds to the copy ('yank') action
3) `p` that corresponds to the paste action

You can combine these verbs with the motions listed above and start editing our text, let's experiment!

Press `j` to come to the last line in our buffer, then `o` to insert a new line at the bottom and enter `INSERT` mode,
enter the following text:
```

Just another normal line with lots of text and 112*876 numbers and punctuation!
```
then press `ESC` to go back to normal mode.

The anatomy of any kind of edit in neovim is {count}{verb}{motion}
Some examples:
- Copying a word: `yw`
- Copying two words: `2yw`
- Deleting till the end of line: `d$`
- Copying an entire line: first `0` to go to the start of the line and then `y$`
- Deleting an entire line: first `0` to go to the start of the line and then `d$`

Now, take the text you just entered, copy it and paste it 10 times
With the above buffer try out some edit actions of your own!

Typing out `0d$` and `0y$` everytime you make to whole line deletes and copies is quite tiring, turns out linewise
actions are common enough that neovim provides special cases for them:
- `yy` to copy entire lines
- `dd` to delete lines
- `cc` to change lines

There are some more special cases for common movements:
- `d$` => `D`
- `y$` => `Y`
- `$a` => `A`
- `0i` => `I`

### Visual Mode

Neovim has 3 kinds of visual modes which you can enter by pressing the following keys:
- `v` to enter visual character mode
- `V` to enter visual line mode
- `<C-v>` to enter visual block mode

Visual block mode is the most interesting of them all, it allows for doing rectangular selections.
You can use the verbs `d` (delete), `y` (yank), `c` (change) to do their respective action on visual selections

### Command Mode

This mode can be entered by pressing `:`. Press `ESC` to go back to `NORMAL` mode.
We use this mode for search and replace, "global" operations (we'll see what this means exactly in a moment).
Command mode commands are what we will use to configure neovim as well and what you will enter in this file.

Let's start by enabling line numbers:
```vim
:set number
```

Press `:` to enter `COMMAND` mode, type `set number` and press enter to execute the command and come back to `NORMAL` mode.

Neovim is extensively documentated, one can access it is via the `:help` command.
To find the documentation for the above number option using `:help 'number'`

To search for occurrences or a word type `/word` and that will highlight all occurrences of "word"
Press `n` to jump to the next match and `N` to jump to the previous match.

You can use `:s` for substitute, let's replace all instances of ` and` with `,`
```vim
:s/ and/,
```

you'll notice that it only changes the first occurence of ` and` to `,` in the line, add a `/g` to "globally" change all occurrences.

Changing all occurrences of a pattern is what you want most of the times and there's an option to make `/g` the default
```vim
:set gdefault
```

Press `&` to rerun the last executed `:s` command

You can also quit neovim from command mode
```vim
:q!
```

Quitting is a very common action, but sadly there isn't any special case for it. Thankfully for us we can define our own!
```vim
:nnoremap X :q!<CR>
```

Take a look at `:h :nnoremap` for what it does, but in a nutshell it creates a mapping that maps `X` to the literal key sequence of `:q!<CR>`. `<CR>` represents the enter key.

When learning neovim one bad habit you can develop is using the arrow keys instead of `hjkl` to move around, let's map the arrow keys to raise a scary warning instead.
```vim
nnoremap <Up> :echoe 'Use k instead!'<CR>
nnoremap <Down> :echoe 'Use j instead!'<CR>
nnoremap <Left> :echoe 'Use l instead!'<CR>
nnoremap <Right> :echoe 'Use h instead!'<CR>
```

<!-- Move to demonstrate substitute -->
<!-- Move to demonstrate :g using the whatsapp chat -->
<!-- Then demonstrate how one would use macros: vortex, script.out -->

# Conclusion

With all this knowledge you've now got a solid foundation to start using neovim productively to learn programming.
I encourage you to expand upon this config that you've just built! Experimenting with mappings and new options as you learn about them.

I'd also discourage against using plugins at this point, when you're just starting out with neovim, its important to realise what's possible with just the vanilla editor and there's a _lot_ of things you can do indeed. When you install a plugin make sure there's not a combination of a couple keymaps and mappings that could achieve your goal.

As you'll move through college and start taking on bigger projects the default neovim setup will start to feel clunky, at some point you'll have to setup LSPs to get completions and diagnostics, but you can get quite far without any of those fancy features.

The main benefits of using a TUI editor is that you're in your terminal the entire time and can leverage a lot of the Terminal's and the Shell's capabilities. I highly recommend going through [missing semester](https://missing.csail.mit.edu/) its an excellent series of lectures introducing the terminal, the shell and even vim!

Also checkout [VimCasts](vimcasts.org) a series of videos by Drew Neil on various vim tricks and vim plugins

Join the [Discord]() where our community members will share more resources and also feel free to ask questions!
