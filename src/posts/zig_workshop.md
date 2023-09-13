---
title: Zig Workshop
date: "2023-09-13"
tags: [zig]
description: Follow along article to the Zig workshop
permalink: posts/{{ title | slug }}/index.html
author_name: Sriprad
author_link: "https://github.com/procub3r"
---
# Zig Workshop

## What is Zig?
Zig is a simple systems programming launguage. It allows you to directly access the memory and the hardware (much like C does).

In fact, Zig aims to be a "better C" by fixing many of the problems it has. We will be exploring these problems and how Zig fixes them.

Zig is still in its early stages despite being in development since 2016. It is yet to have its 1.0 release, which is expected to come out some time around 2025-2026.  
This just goes to show the amount of effort it takes to create something beautiful, like Zig.

## Who uses it?
- Uber's Go services have a little bit of Zig in them. And they heavily use toolchain written in Zig to compile the Go services.
- Bun is a javascript runtime that is blazingly fast. It is written entirely in Zig!
- Tigerbeetle is a database written in Zig. It is ridiculously fast and has an incredible storage fault model.
- Mach is a game engine and graphics toolkit written in Zig.

## What we'll do in this workshop
- Learn how to read / write basic Zig programs
- Learn about some pitfalls of C, and how Zig fixes them
- Develop an appreciation for modern programming (as opposed to C)

## Resources
- [Official documentation](https://ziglang.org/documentation/master/): Great and concise documentation. You might want to ctrl+f through it for quick reference.
- [ziglearn](https://ziglearn.org/): Unofficial, but great introduction to the language for people who already know the basics of programming.
- [ziglings](https://github.com/ratfactor/ziglings/): Super fun exercises to learn zig practically, one smol step at a time.

## Installation
The Zig toolchain allows you to compile / test / run Zig programs.

If you're on Linux (or \*nix), you could install `zig` via your package manager. This will not give you the latest version of Zig, but is perfect for our purposes.

If you're on Windows or if you want the latest version of Zig (regardless of your platform), you can download it from [here](https://ziglang.org/download/). Simply click on the link appropriate for your platform. Extract the downloaded archive, and add the extracted folder to PATH.  

If you're unsure about how to add a folder to PATH, you can look up how to do so for your platform (ie Windows, Linux etc)  

Once this is done, run `zig version` in a terminal. If you're greeted with a version number, Zig has successfully been installed on your system. If not, feel free to reach out to us, and we'll help fix your issues.

## Hello World!
Hello World in Zig:
```zig
// This is a comment!

// import the standard library, which contains functions
// that will let us print to the screen, among many other things.
const std = @import("std");

// main function of our program. Every program needs one.
pub fn main() void {
    // print Hello World!
    std.debug.print("Hello world!\n", .{});
}
```
Explanation:
- `std` is a variable that refers to the standard library. All the functions present in the standard library can be accessed via `std`.
- `pub` stands for "public." This makes the function visible outside of the current file. It is necessary for the main function because your system needs to call it.
- `fn` is the keyword used to create functions. `pub fn` is used to create a public function.
- The name of our function is `main`, and it takes no arguments (as indicated by the empty `()`). This is very similar to most programming languages.
- In Zig, the return type of the function is written *after* the name of the function. In this case, our `main` function doesn't return anything, so we use `void`.
- `std.debug.print()` is just one of the many ways in which you can print text to the screen. We use it here because it is the simplest.

## Features of Zig
In Zig, many of the basic programming constructs like if statements, loops, function calls etc are written almost exactly in the same way as in languages like C.

This is where the resources we mentioned earlier help out. Need to write a for loop? Open up the official documentation and ctrl+f for "for loop." It's that easy :D

You will be made familiar with many such constructs today, but the main aim is to introduce concepts that are not typically seen in other languages.

### Dividing two numbers
```zig
const std = @import("std");

// div takes two arguments.
// x, which is an unsigned 8 bit integer.
// y, which is an unsigned 8 bit integer.
// it returns a single unsigned 8 bit integer value.
fn div(x: u8, y: u8) u8 {
    return x / y;
}

pub fn main() void {
    // the var keyword is used to declare variables.
    // const can also be used (like with const std) but
    // variables created with const cannot be modified once created.
    var q = div(15, 5);
    std.debug.print("{d}\n", .{q});
}
```
This seems pretty straightforward, right? Trust me, you'll get used to the syntax soon enough :D

#### Errors
What happens when you try to divide by 0? Let's find out!  
Replace the call to div with the divisor set to 0, and run the program. Your program will crash! To prevent this, let's generate a custom error in the div function that is returned when the divisor is 0.
```zig
// !u8 is an "error union" type. It indicates that the
// return value could either be an error, or a u8 value.
fn div(x: u8, y: u8) !u8 {
    if (y == 0) {
        return error.MyError; // you can create your own errors by using error.YourErrorName
    } else {
        return x / y;
    }
}
```
This error must be caught in the main function! In order to do so, we use the `catch` keyword.
```zig
// q will be equal to the result of the div function if there are no errors.
// If the div function returns an error, then the value of q will be the value
// succeeding the catch keyword. 0 in this case.
var q = div(15, 0) catch 0;
```
Let's take this one step further!
```zig
const std = @import("std");

// div function definition here

// a + (b / c)
fn func(a: u8, b: u8, c: u8) !u8 {
    // The "try" keyword propagates the error so that
    // you won't have to deal with it everywhere.
    return a + try div(b, c);
}

pub fn main() void {
    var q = func(5, 15, 3) catch 0;
    std.debug.print("{d}\n", .{q});
}
```

#### Defer
The defer keyword allows you to execute code at the *end* of the current scope.
```zig
const std = @import("std");

pub fn main() void {
    std.debug.print("Start of main function!\n", .{});
    defer std.debug.print("End of main function!\n", .{});

    // lots of code here
    var x: u8 = 5;
    std.debug.print("The value of x is {d}\n", .{x});
    // lots of code here
}
```
This is particularly useful for keeping the allocation and deallocation of memory in two consecutive lines, which leads to a lesser chance of forgetting to deallocate.

## Generics in Zig
Generics in programming is when you reuse the same code for values of different types. Let's explore generics in Zig with the example of vectors.

For the sake of this example, let's use 2D vectors with an `x` and a `y` component. We first create a Vector struct with two `f32` members (`x` and `y`). `f32` is the 32 bit (4 byte) floating point type in Zig. Note that unlike the integer types, floating point types can't have arbitrary bit width in Zig. They must either be `f32` or `f64`.

```zig
const std = @import("std");

// Vector is a struct with 2 members.
// "x", which is a 32 bit float and "y", which is also a 32 bit float.
const Vector = struct {
    x: f32,
    y: f32,
};

pub fn main() void {
    // Initializing the Vector struct.
    var v = Vector{ .x = 5.5, .y = 6.6 };

    // Print the vector
    std.debug.print("{}, {}\n", .{ v.x, v.y });
}
```
This code works great! We can create multiple vectors easily by using the Vector struct. But... what if you want a vector with `f64`'s instead of `f32`'s? What if you want a vector of integers? Will you rewrite your Vector class for every such scenario?

### Functions accepting and returning types
In Zig, types are first class values during compile time! What this means is that while your code is being compiled, you can execute certain functions that accept types as a parameter, and return types as the return value. Just as if they were regular values. This is what that looks like:

```zig
// A function that returns an integer type of
// twice the bit width of the given integer type.
fn DoubleBitInt(comptime T: type) type {
    if (T == u8) return u16;
    if (T == u16) return u32;
    if (T == u32) return u64;
    if (T == u64) return u128;
}

pub fn main() void {
    // x is a u16 variable with the value 5.
    var x: DoubleBitInt(u8) = 5;

    // In Zig, all variables must be used. If
    // a variable is not used, it must be assigned
    // to "_", which gets rid of the compiler error.
    _ = x;
}
```

If we can return primitive types such as integers, then what stops us from returning entire structs? Nothing!

The way in which generics work in Zig is, we create a function that accepts some information about the required type. The function then creates a struct according to the requirement and returns it. Of course, all of this happens during the compilation of your program itself

```zig
const std = @import("std");

// "Vector" is now a function that returns the required vector type.
// The return type is "type", which indicates that the value returned
// by this function is a type (such as u8, f32, a struct etc)
fn Vector() type {
    const V = struct {
        x: f32,
        y: f32,
    };
    return V;
}

pub fn main() void {
    // Call the Vector function this time
    var v = Vector(){ .x = 5.5, .y = 6.6 };
    std.debug.print("{}, {}\n", .{ v.x, v.y });
}
```

Cool! But where are my generics? Our `Vector()` function still returns a vector type that can only hold `f32`'s. This is where the beauty of Zig kicks in :D

Now that Vector is a function, we can simply pass the type of the elements that we want into it, and have it construct the required vector struct like so:

```zig
const std = @import("std");

// The comptime keyword is used to indicate that this argument is passed to
// this function durint compile time, and not during run time as is usually the case.
// This is necessary because types are not recognized as values which you can pass to functions during run time.
fn Vector(comptime T: type) type {
    // Directly return a struct instead of creating
    // a variable and returning the variable.
    return struct {
        x: T, // This is the type passed in to the function by the user
        y: T, // Same here
    };
}

pub fn main() void {
    // A vector of f32s
    var v = Vector(f32){ .x = 5.5, .y = 6.6 };
    std.debug.print("{}, {}\n", .{ v.x, v.y });

    // A vector of u8s
    var w = Vector(u8){ .x = 5, .y = 6 };
    std.debug.print("{}, {}\n", .{ w.x, w.y });
}
```

This is a very, *very* powerful feature that enables you to write very reusable code.

## Zig as a C/C++ compiler
Have some C/C++ code lying around? Try compiling it with `zig cc file_name.c` or `zig c++ file_name.cpp`. `zig cc` and `zig c++` are drop in replacements for `gcc` and `g++` respectively, and take almost identical arguments.

They produce much smaller binaries in most cases, and are compiled with lots of safety checking enabled by default. What's more, they are also cross compilers by default!  
This means that you can run the compiler on Linux, but build a binary for Windows (for example), by using the `-target` command line argument: `zig cc file_name.c -target x86_64-windows-gnu`. It's just that simple!

## Conclusion
Zig brings some very profound ideas together into one language. Ideas like comptime, treating errors and types as first class values etc are precisely the features of modern programming that help write safer, and easy to understand code with little to no runtime overhead.

There are SO many more awesome Zig features that we couldn't cover today because of time constraints. Look Zig up! (Re)write some programs in Zig! It's a very fun language to code in and is becoming my favorite very fast.

Hope you learnt something new today!
