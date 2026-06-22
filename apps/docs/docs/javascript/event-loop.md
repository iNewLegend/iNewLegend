# JavaScript — Event Loop

The event loop has one rule that explains almost every "trick question" about execution order:

> **After synchronous code finishes, the event loop drains all microtasks (Promise callbacks) before taking the next macrotask (timer). So a Promise wins over setTimeout, even at 0ms.**

## The classic drill

```js
console.log('A');                          // sync
setTimeout(() => console.log('B'), 0);     // macrotask queue
Promise.resolve().then(() => console.log('C')); // microtask queue
console.log('D');                          // sync
```

Output: **A, D, C, B**

- **A, D** — synchronous, runs first on the stack, top to bottom.
- **C before B** — `Promise.resolve().then(...)` puts C in the **microtask queue**. `setTimeout` puts B in the **macrotask queue**. Microtasks have **priority** — the loop empties them completely before touching a single macrotask. So C runs, *then* B.

## The priority ladder

This is the entire topic in one picture:

```
1. Synchronous code           (runs now, on the stack)
2. ALL microtasks              (Promises, await, queueMicrotask)
3. ONE macrotask               (setTimeout, setInterval, I/O, events)
4. back to step 2 — drain microtasks again, then next macrotask
```

The loop doesn't just grab the next timer when the call stack is empty. It first **drains the entire microtask queue**. Only then does it pick up one macrotask — and after that macrotask completes, it drains microtasks again before touching the next one.

## Microtasks vs macrotasks

| | Microtasks | Macrotasks |
|---|---|---|
| **Queued by** | `Promise.then/catch/finally`, `await`, `queueMicrotask()`, `MutationObserver` | `setTimeout`, `setInterval`, I/O callbacks, DOM events |
| **When they run** | Immediately after current task, before any macrotask | One per loop iteration, after all microtasks drain |
| **Draining** | **All** pending microtasks run before the loop moves on | **One** macrotask runs, then microtasks drain again |

## Nested microtasks

A microtask can schedule more microtasks — and they all run before the next macrotask:

```js
setTimeout(() => console.log('timer'), 0);

Promise.resolve()
  .then(() => {
    console.log('micro 1');
    return Promise.resolve();
  })
  .then(() => console.log('micro 2'));
```

Output: **micro 1, micro 2, timer** — the chained promise callbacks are microtasks themselves, so they drain completely before the timer fires.

## Why this matters

- **Promise chains never get interrupted by timers.** A long `.then()` chain runs to completion before any `setTimeout` callback, even one scheduled earlier.
- **`async/await` is microtask-based.** Code after `await` resumes as a microtask, so it has the same priority as `.then()`.
- **Starvation is possible.** A microtask that endlessly schedules more microtasks will block macrotasks (timers, I/O) indefinitely — the loop never reaches step 3.

## Key Points

- The event loop priority: **sync → all microtasks → one macrotask → repeat**.
- `Promise.then` and `await` are microtasks. `setTimeout` and `setInterval` are macrotasks.
- The microtask queue drains **completely** before any macrotask runs.
- A microtask can schedule more microtasks — they all run before the next timer.
