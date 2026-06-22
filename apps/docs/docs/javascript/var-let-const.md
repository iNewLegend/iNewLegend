# JavaScript — var, let, const

The practical rule: **default to `const`, reach for `let` only when reassignment is required, and don't use `var` in new code**. The "why" comes down to how each is scoped, hoisted, and shared.

## The rule in one breath

- **`const`** — block-scoped, can't be reassigned. Use by default.
- **`let`** — block-scoped, can be reassigned. Use when you need to reassign.
- **`var`** — function-scoped, can be reassigned, leaks out of blocks. Avoid in modern code.

## The core difference — scoping

`var` is **function-scoped** — it ignores block boundaries. A `var` declared inside an `if` or `for` block leaks out to the whole enclosing function.

`let` and `const` are **block-scoped** — they live only inside the `{ }` they're declared in.

The classic example that trips people up:

```js
for (var i = 0; i < 3; i++) { /* ... */ }
console.log(i);   // 3 — i still exists out here!

for (let j = 0; j < 3; j++) { /* ... */ }
console.log(j);   // ReferenceError — j is gone
```

`var i` survives past the `for` block and pollutes the surrounding function scope. Any later code in the same function can accidentally collide with it.

## Hoisting and the temporal dead zone

All three declarations are *hoisted* — the engine moves the declaration to the top of its scope before executing — but they behave differently before the line where they're written:

```js
console.log(a);   // undefined           — var is hoisted AND initialized to undefined
var a = 1;

console.log(b);   // ReferenceError      — let exists but is in the "temporal dead zone"
let b = 1;
```

The **temporal dead zone (TDZ)** is the region from the start of the scope to the declaration line. Accessing a `let` or `const` binding inside the TDZ throws `ReferenceError` — the binding exists, but the engine refuses to let you read it. This is a feature: it catches use-before-declare mistakes that `var` silently swallowed.

## Reassignment

```js
const a = 1;
a = 2;           // TypeError: Assignment to constant variable

let b = 1;
b = 2;           // ✓

var c = 1;
c = 2;           // ✓
```

`const` blocks **reassignment of the binding** — not mutation of the value it holds. This is the most common `const` misconception:

```js
const obj = { value: 1 };
obj.value = 2;   // ✓ — mutating the object, not reassigning the binding
obj = { other: 1 };  // TypeError — can't reassign

const arr = [];
arr.push(1);     // ✓ — mutating the array
arr = [2];       // TypeError
```

If you need a truly immutable object, reach for `Object.freeze(obj)` or a deep-freeze utility. `const` alone won't do it.

## The closure-in-a-loop bug

The classic illustration of why block scope matters:

```js
// ⚠ var — all callbacks log "3"
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3

// ✓ let — each callback logs its own iteration's value
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}
// Output: 0, 1, 2
```

`var i` is a **single variable shared across all iterations**. By the time the timeouts fire, the loop has finished and `i` is `3`. All callbacks read the same `i`.

`let j` creates a **fresh binding per iteration**. Each callback closes over its own `j` — the value at the iteration it was scheduled in. This is one of the most useful properties of block scope.

## Global scope leakage

At the top level of a script:

```js
var foo   = 1;    // → globalThis.foo === 1   (in a browser: window.foo)
let bar   = 1;    // → globalThis.bar === undefined
const baz = 1;    // → globalThis.baz === undefined
```

A top-level `var` becomes a property of the global object — `window` in browsers, `globalThis` everywhere. `let` and `const` don't leak. This is why two scripts both declaring `var user` can clobber each other, while two scripts using `let user` can't.

## When you might still see `var`

- Legacy code written before ES6 (2015)
- Snippets and tutorials targeting older runtimes
- The very rare case of intentional scope hoisting (almost never the right tool)

In modern code, there's no reason to introduce a new `var`.

## Key Points

- **Default to `const`. Reach for `let` only when reassignment is needed. Don't use `var` in new code.**
- `var` is **function-scoped**; `let` and `const` are **block-scoped**.
- `var` is hoisted and initialized to `undefined`; `let`/`const` are hoisted into the **temporal dead zone** that throws on access until the declaration line.
- `const` blocks **reassigning the binding** — it does not freeze the value. `const obj = {}; obj.x = 1` is legal.
- In a loop with closures, `let` gives each iteration its own binding; `var` shares one across all iterations.
- Top-level `var` leaks to `globalThis`/`window`; `let` and `const` don't.
