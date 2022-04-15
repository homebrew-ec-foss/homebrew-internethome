---  
title: For Concurrency at its best, It's Go time!  
date: '2022-03-17'  
tags: [golang,concurrency]  
description: Concurrent execution has been a concept which has been going around for years but has it ever been THIS easy in the developer's side!?  
Aname: Mukund Deepak
---  


Well, I came across golang just recently as i needed the socket programming capabilities for my Networks Project. Curious to learn the langauge, I sat and grinded the fundamentals of Golang for two days which was very similar to that of C and Python and Java, until i saw the concurrency capabilities of this amazing langauge.  

Before we move further, lets understand what Concurrency is, both in Layman's terms and in definition form.  

Suppose Alice and Joe have the Sunday to themselves without their chaotic kids ruining the weekend and they want to enjoy their weekend and go out on a date!  
But the house is a mess, so Alice decides to finish her numerous chores and then enjoy the rest of the evening with her husband but unfortunately she cannot single-handedly finish all the chores by the evening, so Joe also starts helping her out and finish all the chores together one-by-one.  

What Joe and Alice decided to do to finish their chores before the evening, is exactly what **Concurrency** is!  

Now in a basic computer, procedural instruction execution occurs i.e one after another. For example, lets say that there are 5 instructions. Instead of executing one-by-one and wasting time, don't you think it would be better to execute all of the instructions at once?  

Well, what we can do is allot each of the five instructions to five processes and execute all processes in your computer at once. However, even process creation and execution is time consuming. And that my friends, is where *threads* come into the picture!  

Threads are smaller units in a process that inherit all the resources and features of a process and can execute said instructions in a more clean, fast and efficient way.  

So to sum it up, let's come up with definitions for threads and concurrency!  
    **Threads**: Subunits of process which can handle individual sequential execution of a set of instructions concurrently with other threads within the same process.   
    **Concurrency**: Out of order or partial inorder execution of multiple instruction sequences at the same time.  

Wokay! Now that we closed the basic, it time to move to concurrency with respect to golang!  

# Goroutines  
Well so goroutines are basically the component of concurrent execution or the subfunctions executing concurrently in golang is called goroutines.  

Well, if you think about it goroutines it is nothing but normal functions, what makes it goroutines are the aspect of concurrent execution which can be achieved by appending the go keyword before the function call to execute it in a seperate thread along with other goroutines if any.  

Here is a code snippet for you to understand go routines better :-  
```go
package main

func fn(a int, b int){
    fmt.Println(a+b)
}
func main(){
    go fn(4,5)
    fmt.Println("Hello")
}
``` 
In the above example, without the concurrency aspect, fn function would be called and executed first and then the "Hello" message would have popped up sequentially.  
  
However due to the go keyword and respective goroutines, fn function and the `fmt.Println("Hello")` command would execute simulatenously.  
  
Now you must be thinking.... Wait wha? I thought only goroutines execute concurrently. Well, the main function of your go program is itself a go routine hence supporting simulatenous execution.  

# Channels  
Channels are a method of communication between two goroutines in a totally dumbed down form. To be specific, it is a pipe between two goroutines which acts like an interface for interprocess or inter-thread communication. It is a datatype as per go which is simplified to an extent that any developer can exploit the beauty of concurrency in golang!  

Here's an code snippet for y'all to relate better :-
```go
package main

import "fmt"

func main() {

    messages := make(chan int) //Creation of pipe or channel which helps in inter-goroutine communication but only data of int type.

    go func(a int, b int) { messages <- (a+b) }(4,5)

    msg := <-messages
    fmt.Println(msg)
    fmt.Println("Hello")
}
```  
  
Well, it might be pretty evident that the above example prints the exact same output as the code snippet i showed for goroutines, the only difference here is that i'm not printing the sum of the two numbers in the function block itself, i am sending the data to the channel specified for inter-goroutine communication between the two goroutines in action here i.e. fn() and main function which we discussed is itself a goroutine.  We send the data `a+b` to the channel `messages` and recieve the message from the fn() subroutine in the main function using the statement `msg:=<-messages`.  

With this I hope you get a gist of what channels are in golang!

Here's a bit more flexibility that channels provide:
Channels can be restricted to two ways of data flow i.e. sending or recieving, and here are some code snippets to depict this feature!
  
`func fn(messages chan<- int) //Recieving Only`  
  
This above snippet implies that messages can only recieve data to it but not send data to any other goroutine.
  
`func fn(messages chan-> int) //Sending Only`  
  
This above snippet implies that messages can only send data but not recieve data from any other goroutine.  

And with that, I hope that i have convinced you on what wonders go can do with concurrency if the above two fundamental concepts are applied appropriately!  
  
*Written by [Mukund Deepak](https://www.github.com/mukunddeepak)*  
