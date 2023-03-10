---
title: Compile-3 
date: "2023-03-10"
tags: [python, complier]
description: Follow along article to Complie-3
permalink: posts/{{ title | slug }}/index.html
author_name: Sripad 

author_link: https://github.com/
---
# Intro
- Everyone knows what the CPU is. It does all the computational work in your computer by executing "instructions".
- As programmers, it is our job to provide the CPU with these instructions. How can we do this?
    - Hardcode these instructions in binary. (Almost) no one is crazy enough to do this!
    - Write these instructions in assembly, and then "assemble" it into binary. What is assembly? Stay tuned to find out!
    - Write programs in high level languages like C, Python etc and then translate these langauges into binary somehow.
- Today, we will be creating a compiler that compiles a very simple language into assembly code. We then use the [JDoodle](https://www.jdoodle.com/compile-assembler-gcc-online/) website to "assemble" this assembly into binary code.
- Why not directly compile into binary? Well there is a lot of additional fluff that goes into creating the binary itself.
  All of this additional fluff is needed by the OS in order to correctly run your program.
- We are not going to study this additional fluff today, but it isn't that important!
  Rest assured that we will be writing and compiling all the core logic of our programs by using our compiler today.

## A little bit about the CPU
- The CPU is what is known as a "state machine". It holds some state, and it changes that state over time.
- In fact, this is how it performs calculations and produces results!
- What is this "state"? It mainly corresponds to it's internal storage.
- All the registers in a CPU together make up its internal storage. You can think of these registers as variables!
- Operations are performed by changing these registers - the "state" - over time. This will become clear soon enough.

## Assembly
- Assembly is a human readable representation of binary code.
- It uses mnemonics for instructions and is much easier to read. Like:
    - `add %rdi, %rsi` Is how you write the "add" instruction in assembly.
    - `sub %rdi, %rsi` Is how you write the "subtract" instruction in assembly, and so on.
- But wait. What are `%rdi`, and `%rsi`? These are registers! In assembly, the names of registers are prefixed with `%`.
- So what does `add %rdi, %rsi` *do*, exactly? Well, it takes the value of `rdi` and adds it to `rsi`. This much is pretty self explanatory.
- It then takes the result of the addition, and stores it in the register on the right hand side, which in this case is `rsi`.
- This is equivalent to doing `rsi = rdi + rsi` or `rsi += rdi` in python.
- The left operand is known as the "source" and the right operand is known as the "destination".
- There are many registers in x86 processors. These include:
    - General purpose registers: rax, rbx, rcx, rdx, rsp, rbp, rsi, rdi. These registers have certain meanings conventionally, as we will see later.
    - Instruction pointer: rip. This register holds the address of the next instruction that must be executed.

# Let's write some assembly code!
- Let's start off with a simple hello world program!
```gas
.global main

.text
main:
push %rbp

lea hello(%rip), %rdi
call printf

pop %rbp
ret

.data
hello: .string "Hello, World!\n"
```
- `.global main` is sort of like a decleration that tells the assembler that a function called "main" exists. If not for this, the assembler would throw an error saying "main not found".
- `.text` marks the beginning of the text segment. Segments are a way of organizing memory. Conventionally, the text segment contains *all* the code in our assembly program. There are other segments as well like the data segment, where all the data of the program goes.
- `main:` marks the beginning of the main function. It is a label (as indicated by the ":" at the end). Labels are "named locations in memory". They are used to refer to some memory regions with a name. In this case, the name "main" now corresponds to the memory where the contents of the main function reside.
- `push %rbp` (and later, `pop %rbp`) are out of scope for this workshop. Feel free to explore why these lines are necessary!
- `lea hello(%rip), %rdi`: This is a big one. Let's unpack it:
    - `lea` stands for Load Effective Address. It is used to "load" (or "move") the address to some memory area (example: a label) into some register.
    - We are moving the address of the `hello` variable into the `rdi` register. Why? By convention, the `rdi` register is used to pass the first argument to a function.
    - *Ignore* the `(%rip)` part for the duration of the workshop! It is way out of scope for tonight (This is the last time. We will explain everything else from this point on. Promise). Definitely check these links out later to learn more about [why it's there](https://en.wikipedia.org/wiki/Position-independent_code) though.
- Finally, `call printf`. This is a very simple instruction and reads like plain english. Nice!
- `ret` is used to tell the cpu that this function has finished executing and that it may now **ret**urn from it.

- `.data` marks the beginning of the data segment. This is where all of our variables go! We define our hello world string here.
- `hello: .string "Hello, World!\n"`: We use a label (`hello:`) again. This time, to name our variable (We used the `main:` label to name our main function eariler).
- `.string` tells the assembler that the *type* of our variable is going to be string, and finally we type the string itself out within double quotes.

Congratulations! You have successfully written hello world in assembly.

# Writing our compiler
Let's begin writing our compiler now. What better way to start than by printing hello world (*again*)?
```python
out_file = open('output.s', 'w')

def output(*args):
    print(*args, file=out_file)

output('''.global main

.text
main:
push %rbp

lea hello(%rip), %rdi
call printf

pop %rbp
ret

.data
hello: .string "Hello, World!\\n"''')  # Don't forget to escape the \
```
- First, we open `output.s` file in order to write our assembly.
- We define a function `output()` that takes in an argument (as a string) and prints it out into our `output.s` file.
- Then we slap the entire hello world assembly program that we've written so far into an `output()` call and voila! Hello world in compiler: *done.*

## Umm... Source file?
Sure! Let's create an input source file that our compiler is supposed to compile. `input.bob` has a nice ring to it, doesn't it?
Just to verify that our compiler can properly read from the source file, let's first add the following into `input.bob`:
```
lea hello(%rip), %rdi
call printf
```
And then modify the `output()` call by splitting it up into two halves:
```python
in_file = open('input.bob')  # Open in_file in order to read from it

output('''.global main

.text
main:
push %rbp''')

for line in in_file:
    output(line)

output('''pop %rbp
ret

.data
hello: .string "Hello, World!\\n"''')
```
Attentive readers would've noticed two things by now:
1. The source file contains assembly code and not bob code. We're gonna change this soon enough.
2. The gap between the two halves of our boilerplate assembly code is filled by reading from the source file and literally pasting its contents in.

We haven't changed anything here, functionally speaking. But our compiler now has the ability to read from a source file!

# Adding Syntax Elements

We are capable of reading an input file and using it we can produce an output file. We can start defining our language and add some syntax elements.

## Creating Variables

The first thing we'll add is the syntax for variables.
We've chosen a really simple syntax for this.
```
var x = 42
```

This line will tell our compiler to create a variable called "x" and initialise it with the value 42.

How is the compiler going to understand this? How will it generate the output assembly?
We'll do that by checking if the first word in the line is `var`.

Our loop will then look like this:
```py
for line in in_file:
    words = line.split()
    if words[0] == 'var':
        ... # create a var and initialise it to 42
```

To create the variable we'll add it to a dictionary. The key will be the name of the variable and the value will be its initial value. In our case we will have `{'x': 42}`.

We'll create the dictionary at the beginning of our program.
```py
variables = {}
```
And then populate it in our main loop.
```py
for line in in_file:
    words = line.split()
    if words[0] == 'var':
        name = words[1]
        value = words[-1]
        variables[name] = value
```
`words[1]` is the second word in the line. It's the name of the variable.\
`words[-1]` is the last word in the line. It's the value of the variable.

We have a dictionary now, but we haven't produced any assembly.

We're going to use this dictionary to add our variables to the data segment. If you recall, the hello world string was created like so:
```gas
hello: .string "Hello, World!\n"
```

We use a label to give our variable a name. Then we say that we want to create a string. And finally we give the string data that the variable will hold.

We'll be using a very similar syntax to create the variables declared in our programming language:
```gas
x: .quad 42
```

Here, we use a label to give the variable a name, Then we say that we wnat to create a quad. And finally, we give the value to the quad.\
`quad` is short for "quad word". A word represents a 16-bit number. So, a quad word has four times 16 bits. Every variable in our language will be a quad ie a 64-bit number.

We'll populate the data segment using the values in our dictionary.
Remember, we have to do this after we've started the data segment. All the variables go in the data segment, and all the code goes in the text segment. That's why we do this only at the end.

We'll loop through all the variables and add them to the data segment using the quad syntax.
```py
for var in variables:
    output(f'{name}: .quad {variables[name]}')
```

Now, we can have multiple variables as well.
```
var x = 42
var y = 1337
var z = 100
var w = 500
```

## Printing the Variables

Now that we have variables, we want to put them to good use. We want to see them. We want to print them.

First, let's see how it's done in C.
```c
#include <stdio.h>

int main() {
    int x = 42;
    printf("%d\n", x);
}
```

Remember the three things to be able to print stuff?
- Creating the `main` function
- Calling `printf`
- Passing arguments to `printf`

In this example, creating the main function is the same. Calling printf will also be the same. The only thing that's different, is passing arguments to printf.

This time, we have two arguments. The first argument is percent-d and the second argument is the number we want to print.

To do this in assembly we have to do almost the same thing as the hello world example.
```gas
lea percent_d(%rip), %rdi
mov x(%rip), %rsi
call printf
```

`lea` sets our first argument to be the percent_d string.

We use `mov` for x instead of `lea` because we want to move the contents at that address rather than the address itself. Basically, we'll use `lea` for strings, and `mov` for integers.

We move percent_d into rdi as the first argument.\
Likewise, we are moving x to rsi because according to the convention the second argument does into the rsi register.

Like our hello string, we'll create the `percent_d` string.
```gas
percent_d: .string "%d\n"
```

We can add this feature to our language now. To print a variable we'll just do
```
print x
```

To be able to parse this we'll add a branch to our if statement.
```py

for line in in_file:
    words = line.split()
    if words[0] == 'var':
        name = words[1]
        value = words[-1]
        variables[name] = value
    elif words[0] == 'print':  # new branch!
        name = words[1]
        output('lea percent_d(%rip), %rdi')
        output(f'mov {name}(%rip), %rsi')
        output('call printf')
```

Finally, we'll add the `percent_d` string to our data segment:
```py
output('''pop %rbp
ret

.data
hello: .string "Hello, World!\\n"
percent_d: .string "%d\\n"
''')
```
_Don't forget the double back slashes!_

Let's write a program in our language!

```
var x = 42
var y = 1337
var z = 100
var w = 500
print x
```

We get the expected output when we compile and run this. The output is `42`.

We can print more variables too.
```
var x = 42
var y = 1337
var z = 100
var w = 500

print x
print y
print z
print w
```

But we get an error!

```
Traceback (most recent call last):
  File "thihihi.py", line, in <module>
    if words[0] == 'var':
IndexError: list index out of range
```

This is caused by the blank line in our file. We go through every line and split it. We then check what the first word in the file is. If the line is empty, there is no first word and our compiler crashes.

To get around this, we'll ignore all empty lines.

```py
for line in in_file:
    words = line.split()
    if len(words) == 0:
        continue
    # continue parsing
```

We use the continue keyword in python to skip everything else in this iteration, essentially skipping all processing that would have been done on this line.

Here's the full code after this step:
```py
out_file = open('output.s', 'w')
in_file = open('input.bob')

variables = {}

def output(*args):
    print(*args, file=out_file)

output('''.global main

.text
main:
push %rbp
''')

for line in in_file:
    words = line.split()
    if len(words) == 0:
        continue

    if words[0] == 'var':
        name = words[1]
        value = words[-1]
        variables[name] = value
    elif words[0] == 'print':  # new branch!
        name = words[1]
        output('lea percent_d(%rip), %rdi')
        output(f'mov {name}(%rip), %rsi')
        output('call printf')

output('''pop %rbp
ret

.data
hello: .string "Hello, World!\\n"
percent_d: .string "%d\\n"
''')

for var in variables:
    output(f'{name}: .quad {variables[name]}')
```

Running this code on our input will give us the correct assembly.

```gas
.global main

.text
main:
push %rbp
lea percent_d(%rip), %rdi
mov x(%rip), %rsi
call printf
lea percent_d(%rip), %rdi
mov y(%rip), %rsi
call printf
lea percent_d(%rip), %rdi
mov z(%rip), %rsi
call printf
lea percent_d(%rip), %rdi
mov w(%rip), %rsi
call printf
pop %rbp
ret

.data
hello: .string "Hello, World!\n"
percent_d: .string "%d\n"
percent_c: .string "%c"
x: .quad 42
y: .quad 1337
z: .quad 100
w: .quad 500
```

# More Language Features!

We'll be adding two more syntax elements to our language. After that, you should be able to extend it to your heart's content!

## Printing Characters

So far, we can print numbers. But we can't print "hello world". How do we print it?

Well, in order to print strings, we'll be printing induvidual characters.

This will take the value of x and print the corresponding ASCII character.

What is ASCII? It's a way of converting between characters and numbers.\
There are 127 characters that have a corresponding number according to ASCII.

We can use python's builtin function `ord` to find the ASCII code of a character we want.

```
C:\> python
Python 3.8
Type "help", "copyright", "credits" or "license" for more information.
>>> ord('h')
104

>>>
```

Before we can add this feature to our language, let's see how we'd do this in C.
```C
#include <stdio.h>

int main() {
    int x = 104;
    printf("%c", x);
}
```

Just like printing integers, we'll use printf. But, instead of the `%d` format specifier, we'll be using `%c`. This will tell printf to interpret the number as an ASCII code, and print the corresponding ASCII character onto the screen.\
In this case, we print the character `h` onto the screen, because the ASCII code corresponding to the letter `h` is 104.

Now in our langauge, we'll print characters using some new syntax.
```
printchar x
```

This will take the value of x and print the corresponding ASCII character onto the screen.

In order to parse this line we'll create a new branch in the mainloop of our compiler
```py
for line in in_file:
    words = line.split()
    if len(words) == 0:
        continue

    if words[0] == 'var':
        name = words[1]
        value = words[-1]
        variables[name] = value
    elif words[0] == 'print':
        name = words[1]
        output('lea percent_d(%rip), %rdi')
        output(f'mov {name}(%rip), %rsi')
        output('call printf')
    elif words[0] == 'printchar':  # new branch!
        char = words[1]
        output('lea percent_c(%rip), %rdi')
        output(f'mov {char}(%rip), %rsi')
        output('call printf')
```

This works just the same way as the `print` except that, instead of using `percent_d`, we'll be using `percent_c`. So, we'll add `percent_c` also to our data segment.

```py
output('''pop %rbp
ret

.data
hello: .string "Hello, World!\\n"
percent_d: .string "%d\\n"
percent_c: .string "%c"
''')
```

Now we can print characters in our language!
```
var x = 104
printchar x
```

To recap, we're storing the ASCII code of the character `h` 104 in the variable `x`. When we do `printchar x`, the corresponding ASCII character `h` gets printed onto the screen.

This means that we can write a hello world program.
```
var H = 72
var W = 87
var e = 101
var l = 108
var o = 111
var r = 114
var d = 100

var new_line = 10
var space = 32
var exclamation = 33
var comma = 44

printchar H
printchar e
printchar l
printchar l
printchar o
printchar comma
printchar space

printchar W
printchar o
printchar r
printchar l
printchar d
printchar exclamation
printchar new_line
```

Here, we declare a variable for every unique character that we'll print. And then, we'll use the variables to print the values onto the screen.

And when we run it, we get the output of hello world from our very own language!
```
Hello, World!
```

## Modifying Variables

This is a fairly important feature.

We have variables, we can print the variables and we can print them as characters.

But we still can't change the values in the variables. After all, the word "variable" means something that can be changed.

To do that we'll introduce new syntax in our language.
```
a += b
```

Just like languages like C and python, this code adds the contents of a and b. Then, it puts the result back in a.

Now, how do we parse this in our compiler?

Well, you guessed it. We'll add another branch!
```py
    elif words[1] == '+=':
        # the code to add two variables will come here
```

Notice that this branch is different. We are checking `words[1]` instead of `words[0]`. That's because the `+=` goes in between the two variables we pass.\
`words` will be `['a', '+=', 'b']`.

We can complete the code in the branch now.
```py
    elif words[1] == '+=':
        lhs = words[0]
        rhs = words[2]
        output(f'mov {rhs}(%rip), %rdi')
        output(f'add %rdi, {lhs}(%rip)')
```

`lhs` and `rhs` contain the names of the variables.

Recall that the left operand of an assembly instruction is the source, and the right operand is the destination.\
Here, we move the rhs into the `rdi` register. It's not `lea` because it's an integer and not a string.\
Then, we perform our operation, which `add` with our destination as the lhs. After this, `a` will hold the sum of `a` and `b`.

Notice that we use the `rdi` register temporarily to add the numbers, instead of just performing the `add` instruction directly on the lhs and rhs. Most architectures, including x86, don't support this.\
We can only move between registers, or to and from registers to variables. Never between only variables. We get around this by using an intermediate register `rdi`.

Here's the code of the entire compiler so far:
```py
out_file = open('output.s', 'w')
in_file = open('input.bob')

variables = {}

def output(*args):
    print(*args, file=out_file)

output('''.global main

.text
main:
push %rbp
''')

for line in in_file:
    words = line.split()
    if len(words) == 0:
        continue

    if words[0] == 'var':
        name = words[1]
        value = words[-1]
        variables[name] = value
    elif words[0] == 'print':
        name = words[1]
        output('lea percent_d(%rip), %rdi')
        output(f'mov {name}(%rip), %rsi')
        output('call printf')
    elif words[0] == 'printchar':
        char = words[1]
        output('lea percent_c(%rip), %rdi')
        output(f'mov {char}(%rip), %rsi')
        output('call printf')
    elif words[1] == '+=':
        lhs = words[0]
        rhs = words[2]
        output(f'mov {rhs}(%rip), %rdi')
        output(f'add %rdi, {lhs}(%rip)')

output('''pop %rbp
ret

.data
hello: .string "Hello, World!\\n"
percent_d: .string "%d\\n"
percent_c: .string "%c"
''')

for var in variables:
    output(f'{name}: .quad {variables[name]}')
```

Let's write one final program in our language
```
var a = 10
var b = 4

print a
a += b
print a
```

We'll use our operator, and compare before and after its use. The first `print` will print the initial value `10` and the next `print` will print the modified value 10+4 = `14`.

And when we run it, we'll get the following output.
```
10
14
```

Congratulations! In our language, we can declare variables, print variables, print variables as characters and perform operrations on the variables.

## Moving Forward

Do not stop here! Languages like python and C aren't built in overnight.

We have only scratched the surface of compiler design today. There are so many other things that involve making a real languages, but we hope that, today, we have inspired you to venture into the world of compilers and making a programming language of your own.

Finally, here are some ideas to expand your new language:
- Create a `-=` operator. Create other operations as well.
- Learn about branching and jumps in assembly. This will help you make `if`, `while` and all that to make your language Turing Complete!
- Learn about parsing source code. Try and figure out how we can have expressions like `a + b * 35` as the lhs.
- And much much more!

Thanks for attending and don't forget to _like, share and compile!_
