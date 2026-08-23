---
title: "Lost in Tokio"
date: "2026-08-21"
tags: [Rust, Tokio, async, concurrency, threads]
description: "Exploring the architecture of Rust's most popular Async Runtime"
permalink: posts/{{ title | slug }}/index.html
author_name: Pranav V Bhat
author_link: "https://prana-vvb.github.io"
---

Here, I try to get an abstracted overview of Tokio's architecture to build the foundation needed to understand its internals in depth later. To understand Tokio and why it exists, we must first look at the problems it was built to solve. We'll start with the simplest model of execution and gradually introduce the abstractions that lead us to an async runtime.

## Level 0: Synchronous programming

Most code that you write is executed sequentially
<br/>
```rust caption="Completely innocent synchronous function"
fn synchronous() {
    println!("1");
    println!("2");
    println!("3");
}
```

This *synchronous* way is perfectly fine for most tasks, but some operations (like network requests or I/O waits) in the chain can be painfully slow.
They 'block' the program from progressing until they are done, resulting in your application just sitting there doing nothing.
<br/>
```rust caption="Evil and intimidating blocking code"
fn evil_synchronous() {
    println!("Requesting user data...");
    
    // Execution cannot continue until the database responds.
    let response = get_from_db("Geronimo").unwrap(); 
    
    println!("Got data: {response}");
}
```

Blocking delays like this are common when applications wait for I/O operations to finish. But what if your program could do other work while it waits?

## Level 1: Concurrency and Parallelism through OS Threads

A very naive way to do this would be to [create a new process for each task](https://www.microsoft.com/en-us/research/wp-content/uploads/2019/04/fork-hotos19.pdf#page=2). But this would be very expensive as a new process would require its own isolated memory context and common data would have to be passed between these processes.

Instead, we use multiple [*threads*](https://en.wikipedia.org/wiki/Thread_(computing)) inside a single process.
> *Thread*: The smallest sequence of programmed instructions that can be managed independently by a scheduler.

In Rust, we can use the native `std::thread` interface
<br/>
```rust caption="Concurrent execution with OS threads (From doc.rust-lang.org/book/ch16-01-threads.html)"
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("Spawned thread {i}");
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("{i} from the main thread");
        thread::sleep(Duration::from_millis(1));
    }

    handle.join().unwrap(); // main thread should not exit until all spawned threads are done
}
```

> [!NOTE]
> [**The basic difference between Concurrency and Parallelism**](https://rust-lang.github.io/book/ch17-00-async-await.html#parallelism-and-concurrency)
>
> ***Concurrency*** is about structuring multiple independent tasks to execute and progress in overlapping time periods. On a single core, the OS achieves this by rapidly switching between tasks.
>
> ***Parallelism*** is when tasks are literally run at the same time across multiple CPU cores.

Although OS threads provide concurrency (and parallelism on multi-core hardware) and are cheaper than creating an entirely new process, they still are relatively expensive.

Historically, the simplest way to handle network traffic was to spawn one OS thread per connection. However, OS threads are heavy.
On Linux, each thread reserves a default 8MB of virtual memory for its stack. If an application tried to [serve 10,000 concurrent connections](https://en.wikipedia.org/wiki/C10k_problem) this way, it would demand 80GB of virtual address space.

But virtual address space is cheap and abundant on modern systems. The real problem is that the OS kernel has to constantly pause and resume these threads (context switching). This is significantly more expensive while also potentially invalidating cache locality. The CPU would spend all its time just juggling threads rather than doing actual work.

## Level 2: Cooperative Multitasking with [async/.await](https://os.phil-opp.com/async-await/)

> [!NOTE]
> [Preemptive VS Cooperative multitasking](https://www.geeksforgeeks.org/operating-systems/difference-between-preemptive-and-cooperative-multitasking/)
>
> ***Preemptive multitasking***: The OS allocates each thread a time slice to execute in and forcibly pauses the thread when its time is up no matter what it is doing and runs the next scheduled thread.
>
> ***Cooperative multitasking***: Each task voluntarily yields control back when it is idle or has hit a blocking point, giving us a lower context switching overhead.

Luckily for us, Rust provides a the [`Future`](https://rust-lang.github.io/async-book/02_execution/02_future.html) trait as an abstraction for asynchronous work. Futures are analogous to a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) from JavaScript, with the main difference being that a `Promise` is eagerly executed by the JavaScript runtime while a `Future` is lazy until it is polled.

Polling is basically giving the future the opportunity to progress by asking, "Hey, make some progress on your work now" The `Future` can then respond with either "No, I can't progress now" (`Poll::Pending`) or "Yes, I'm done. Here is the result" (`Poll::Ready(val)`).

Rust gives us the `async/.await` syntax, allowing us to write asynchronous code in a way that looks similar to synchronous code. This syntax will be [familiar if you're coming from JavaScript or Python](https://en.wikipedia.org/wiki/Async/await#Implementations).

For example:
<br/>
```rust caption="Standard, blocking I/O"
fn synchronous_io() {
    let resp = fetch_data();
    println!("{resp}");
}
```

Can be written as:
<br/>
```rust caption="Asynchronous I/O using async/.await"
async fn asynchronous_io() {
    let resp = fetch_data_async().await;
    println!("{resp}");
}
```

As you can see, the main differences are the `async` keyword in the function definition and the `.await` postfix operator after an async function call.<br/>
But what exactly are they doing?

**`async`** transforms your function into a [state machine](https://en.wikipedia.org/wiki/Finite-state_machine) that implements the `Future` trait. Each `.await` marks a suspension point and the boundary between different states, allowing the state machine to pause and resume at these points. This state machine also stores context such as local variables, and child Futures that are being awaited.

When execution reaches an `.await`, the future being awaited is polled. If it is ready, execution continues normally.
Otherwise, the state machine saves its current state, returns `Poll::Pending` to the caller and yields control so that other work can be done while waiting.
Before doing so, the awaited future typically stores a [`Waker`](https://doc.rust-lang.org/beta/std/task/struct.Waker.html) that can later be used to arrange for the task to be polled again when progress becomes possible.

Later, when the async function is polled again, the state machine resumes execution from the previously saved state.

![Simplified state machine generated from async fn asynchronous_io()](https://gist.githubusercontent.com/Prana-vvb/7a1472b97344d5bbc596021ed9d0c9c0/raw/335be9edc308a7c5a9a7b2403f5a3f2801cdaa64/tokio_1_norm.svg)

Very neat! Now let us run this function.
<br/>
```rust
fn main() {
    // Remember we need to await a Future to progress it since they are lazy
    asynchronous_io().await;
}
```

Oh no! The Rust compiler requires any function that calls an async function to also be declared with `async`
<br/>
```sh
error[E0728]: `await` is only allowed inside `async` functions and blocks
 --> src/main.rs:6:23
  |
5 | fn main() {
  | --------- this is not `async`
6 |     asynchronous_io().await;
  |                       ^^^^^ only allowed inside `async` functions and blocks

For more information about this error, try `rustc --explain E0728`.
```

This is because `.await` is a potential suspension point. If the awaited `Future` isn't ready yet, the caller must save its current state, yield control, and later resume execution from where it left off. Ordinary functions are not capable of doing this, only functions marked with `async` are.

So no worries, we will just declare `main` also with the `async` keyword.
Unfortunately, this too does not work.
<br/>
```sh
error[E0752]: `main` function is not allowed to be `async`
 --> src/main.rs:5:1
  |
5 | async fn main() {
  | ^^^^^^^^^^^^^^^ `main` function is not allowed to be `async`

For more information about this error, try `rustc --explain E0752`.
```

The reason `main` cannot be `async` is that someone has to drive the `Future` returned by `main` also to completion.

An async fn doesn't execute by itself. Calling it just constructs a value containing all the state required to perform the work, but not when. Futures are lazy, so unless something repeatedly polls them, they never make progress. So who does the polling?

## Level 3: Async runtimes

This is where an async runtime comes into play. Most languages that support async have an async runtime built into the core language runtime and thus support async functions out of the box. Rust on the other hand provides only the foundation such as the `Future` and the `async/.await` syntax but no async runtime.

This is mainly due to Rust being used in many different areas from web development to systems and bare metal/embedded. There no consensus on a "One True Async Runtime" capable of supporting all of them perfectly. Instead, it is up to the developer to choose from many different community provided crates tailored to their use case.

> "Rust caters to a vast array of use cases. We simply cannot bundle everything into the core standard library, but the ecosystem provides a crate for almost every need. Just use one of those"
>
> — Paraphrased quote from [Niko Matsakis](https://smallcultfollowing.com/babysteps/), Core developer on the Rust programming language

Tokio is the mostly widely used async runtime at the time of writing and thus will be our focus.

> [!WARNING]
> Disclaimer: Tokio is actively being developed, so some information here may quickly become out-of-date.
> We will be focusing on parts of [tokio-rs/tokio](https://github.com/tokio-rs/tokio) v1.53.1 for the rest of this blog

The role of any async runtime is to schedule futures for polling, react to them waking up and coordinate the resources required by the futures to make progress.

The `executor` is the component of an async runtime responsible for repeatedly polling futures.
<br/>
```rust caption="A very simple executor"
loop {
    match future.poll(&mut context) {
        Poll::Ready(_) => break,
        Poll::Pending => {
            // wait for a wakeup
        }
    }
}
```

This works well for one task but how does it scale?

Similar to what we have seen with threads above, real applications almost never have only 1 future. We may have thousands of `tasks`, many of which are waiting on I/O while only a small number are actually ready to run.
But like with threads, how does this solve the problem of either consuming too much memory or slowing down from a lot of context switches?

Tokio `tasks`, unlike threads are very lightweight and are managed by the Tokio runtime, not the OS scheduler. Because tasks are scheduled in userspace by Tokio, switching between tasks does not require OS thread context switches and has a low overhead. They are also cooperatively scheduled rather than preemptively scheduled.

> A *task* is a light weight, non-blocking unit of execution.

Generally, this pattern is known as [green threads](https://en.wikipedia.org/wiki/Green_thread) and is similar to Golang's [goroutines](https://tour.golang.org/concurrency/1). This way, a lot of tasks can be run on a handful of OS threads. A new problem arises now, how to keep track of which tasks are ready to run and which thread it can run on? This leads us to the obvious solution: A scheduler.

### The Tokio Scheduler

This scheduler is responsible for deciding which runnable task should be executed next. In a simple runtime, this could be as easy as maintaining a queue of ready tasks and repeatedly choosing one to poll. In Tokio, which is a multi-threaded runtime, the scheduler has to coordinate M tasks across N threads. Having only a global queue means every worker threads has to contend for access, increasing synchronization overhead.

> [!NOTE]
> Tokio, by default, is multi-threaded but can be configured to be a single-threaded event loop AKA `current_thread` which can actually be easier to work with in most cases as argued [here](https://emschwartz.me/async-rust-can-be-a-pleasure-to-work-with-without-send-sync-static/)

![The Tokio M:N scheduler](https://gist.githubusercontent.com/Prana-vvb/7a1472b97344d5bbc596021ed9d0c9c0/raw/335be9edc308a7c5a9a7b2403f5a3f2801cdaa64/scheduler_norm.svg)

As you can see, Tokio solves this by having a global queue of tasks (implemented as a FIFO linked list) shared between all threads along with local queues for each thread/worker.
<br/>
```rust caption="Global 'Injection' queue definition"
/// Growable, MPMC queue used to inject new tasks into the scheduler and as an
/// overflow queue when the local, fixed-size, array queue overflows.
pub(crate) struct Inject<T: 'static> {
    shared: Shared<T>,
    synced: Mutex<Synced>,
}
```

The local queue is a [ring buffer](https://en.wikipedia.org/wiki/Circular_buffer) which can hold upto 256 tasks at a time. When this local queue overflows, roughly half of the tasks from the local queue are moved to the global queue and held. This serves as spillway to catch overflowing tasks. Any task that wakes up from a thread which is not a worker thread is also placed into the global queue thus acting as a shared entry point too.
<br/>
```rust caption="Local queue definition"
/// Producer handle. May only be used from a single thread.
pub(crate) struct Local<T: 'static> {
    inner: Arc<Inner<T>>,
}

/// Consumer handle. May be used from many threads.
pub(crate) struct Steal<T: 'static>(Arc<Inner<T>>);

pub(crate) struct Inner<T: 'static> {
    /// Concurrently updated by many threads.
    ///
    /// The `UnsignedShort` indices are intentionally wider than strictly
    /// required for buffer indexing in order to provide ABA mitigation and make
    /// it possible to distinguish between full and empty buffers.
    ///
    /// When both `UnsignedShort` values are the same, there is no active
    /// stealer.
    head: AtomicUnsignedLong,

    /// Only updated by producer thread but read by many threads.
    tail: AtomicUnsignedShort,

    /// Elements
    buffer: Box<[UnsafeCell<MaybeUninit<task::Notified<T>>>; LOCAL_QUEUE_CAPACITY]>,
}
```

A worker first checks its local queue for any runnable tasks and only checks the global queue if it runs out of tasks or after a configurable number of local tasks have been scheduled.

![Hirerarchy of choosing tasks](https://gist.githubusercontent.com/Prana-vvb/7a1472b97344d5bbc596021ed9d0c9c0/raw/335be9edc308a7c5a9a7b2403f5a3f2801cdaa64/task_hirearchy_norm.svg)

This can be compared to how cache locality works. First try to retrieve from the closest source and if not found, move to more distant sources. And similar to how you reach for data from memory when it is not in cache, worker threads reach to steal tasks from other workers.

A worker may run out of tasks in both its local and the global queue even while another worker still has a large number of runnable tasks. To keep the workload balanced, an idle worker can steal tasks from another worker's local queue. Tokio moves roughly half of the tasks during stealing rather than just taking a single task.

The stealing operation immediately returns the last task in the stolen batch to the thief for execution and then continues normally.

A neat optimization is that each worker has a single element task slot. Any task placed in this slot can bypass both the local and global queue and gets executed first in the next iteration. This effectively results in the last scheduled task to be run next (LIFO). This optimization improves cache locality which benefits message passing patterns and helps to reduce latency.

![Work stealing](https://gist.githubusercontent.com/Prana-vvb/7a1472b97344d5bbc596021ed9d0c9c0/raw/335be9edc308a7c5a9a7b2403f5a3f2801cdaa64/work_stealing_norm.svg)

So in the above diagram, Worker 2 would execute Task 3 first and then Task 1 and Task 2 (`[3]->[1]->[2]`). This lets the thief begin executing immediately rather than enqueueing the entire stolen batch and then performing another queue operation to obtain its first task.

Work-stealing involves concurrent, unsynchronized access to head and tail across threads. Because stolen tasks cross thread boundaries, any task spawned on a multi-threaded runtime is forced to satisfy [`Send`](https://doc.rust-lang.org/std/marker/trait.Send.html) + [`'static`](https://doc.rust-lang.org/std/keyword.static.html) bounds. Single-threaded Tokio on the other hand requires only `'static` to be satisfied since there is no work stealing.

### Actually running Tasks

We've established before that Tokio tasks are lightweight units of work. These tasks are distributed among workers when they are runnable. But tasks do not remain runnable forever. Tokio is a runtime designed to handle asynchronous I/O bound tasks which spend most of their lifetime waiting for something to happen.

When a task reaches a state where it cannot make any progress without waiting, it returns `Poll::Pending`. The I/O operation registers interest in the resource, while the task provides a `Waker` that can be used to schedule it again when that resource becomes ready.

A task is a single heap allocation storing a `Header`, `Trailer`, user `Future`, and scheduler pointers. A Waker wraps a raw pointer (`NonNull<Header>`) with a custom `RawWakerVTable` (Tells what operation to perform on the pointer). Calling `.wake()` executes an atomic state transition directly on the task’s `Header` flags. If the transition succeeds and the task is woken, the task memory pointer is re-enqueued into a scheduler queue.

![A task's lifecycle](https://gist.githubusercontent.com/Prana-vvb/7a1472b97344d5bbc596021ed9d0c9c0/raw/d1d254974e4398392364f51391a31f519a549268/tokio_whole_norm.svg)

The I/O driver waits for events from the OS for the registered resources and wake the tasks when they become available. Tokio does not actually handle each specific I/O driver by itself but instead relies on the [`mio`](https://github.com/tokio-rs/mio) crate to abstract system specific drivers and provide a common API for all of them.

Note that the I/O driver mechanism is not controlled by a dedicated thread but is integrated into each and every worker.

I/O is only one source of task wakeups. Timers and asynchronous synchronization primitives(`tokio::sync::*`) can also cause a pending task to become runnable again. A timer can wake a task when its deadline expires, while primitives such as channels, notifications, and semaphores can wake tasks when the state they are waiting for changes.

### When we are truly jobless
<hr/>

A worker which has finished all its tasks, has no tasks left in its local queue, no tasks to get from the global queue and nothing to steal from other workers is freeloading on precious CPU power. We need to be able to hibernate the worker until it is needed to handle more tasks. Constantly checking for new tasks is just wasteful so Tokio has a park/unpark mechanism for workers to transition into a sleeping state and block instead.

This is handled by a dedicated `runtime::park` module using a shared runtime driver and a conditional variable (`Condvar`) as a fallback since the driver is a shared resource and can be used by only one worker at a time either for I/O related or timing related wakeups.
`park()`/`unpark()` calls are coordinated by an [atomic](https://en.wikipedia.org/wiki/Linearizability) state machine
<br/>
```rust caption="Atomic state machine states"
const EMPTY: usize = 0;
const PARKED_CONDVAR: usize = 1;
const PARKED_DRIVER: usize = 2;
const NOTIFIED: usize = 3;
```

- `EMPTY`: Nothing is parked and no pending notification
- `PARKED_CONDVAR`: Worker is about to/has parked on the condition variable
- `PARKED_DRIVER`: Worker is parked through the runtime driver
- `NOTIFIED`: A wake-up has been issued

They are connected as below

![State machine for the parking mechanism](https://gist.githubusercontent.com/Prana-vvb/7a1472b97344d5bbc596021ed9d0c9c0/raw/9c292cca24c867a810cc04b6926bde8033a1212a/parking_state_machine_norm.svg)

This state machine is required to prevent a race condition where a wake up notification is issued just before the worker actually sleeps, causing it to sleep forever.

### Fin.

Putting it all together, let us follow a single asynchronous operation through Tokio's event loop

![Tokio basic event loop](https://gist.githubusercontent.com/Prana-vvb/7a1472b97344d5bbc596021ed9d0c9c0/raw/c516c33dd2bc9b6d9cdbee3d726aaa496caf78d5/basic_eloop_norm.svg)

---
> Originally posted on [https://prana-vvb.github.io/posts/lost_in_tokio](https://prana-vvb.github.io/posts/lost_in_tokio.html) and mirrored here.
