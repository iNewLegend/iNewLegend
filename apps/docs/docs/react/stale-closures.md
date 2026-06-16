# React — Stale Closures in Effects

A common bug: you write an effect that does something repeatedly — a `setInterval`, an event listener, a long-lived subscription — and after the first tick it stops reflecting state changes. The counter freezes. The handler reads the wrong value. You add a second `setState` to "fix" it, and nothing changes.

The culprit is a **stale closure**: the callback inside the effect captured the values that existed when the effect ran, and it keeps using them forever.

## The bug

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(seconds + 1);   // ⚠ reads `seconds` from the closure
    }, 1000);
    return () => clearInterval(id);
  }, []);   // empty deps — effect runs once

  return <div>{seconds}</div>;
}
```

Expected: `0 → 1 → 2 → 3 → …`
Actual:   `0 → 1 → 1 → 1 → …` **stuck at 1 forever.**

# The Problem
**`s => s + 1` has the most recent value without waiting for a re-render. `seconds + 1` only updates when the component re-renders — that's the actual problem.**

## Why it happens

`useEffect` with `[]` runs once, on mount. The callback you hand to `setInterval` is created at *that moment*, and it **closes over** the `seconds` variable from that render — its value was `0`.

The interval fires every second. Every tick runs the **same** closure. Inside, `seconds` is permanently `0`. So every tick computes:

```
setSeconds(0 + 1)  →  setSeconds(1)
```

State goes `0 → 1` on the first tick and **stays at 1**, because every subsequent tick computes the same `setSeconds(1)`.

## Why doubling doesn't save you

The instinct: "let me increment twice per tick — that'll at least get me 2 per second":

```jsx
setInterval(() => {
  setSeconds(seconds + 1);
  setSeconds(seconds + 1);
}, 1000);
```

It doesn't help. **Both reads see the same frozen `0`.** Both calls compute `setSeconds(1)`. React batches them — same value, last-wins → `1`. The counter still climbs by 1, exactly once, then sticks.

Reading a stale variable twice is still stale. The staleness poisons both calls equally.

## The fix — functional updater

Don't read state through the closure. Use the **functional form** of `setState`:

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setSeconds(s => s + 1);   // ✓ `s` is the latest queued value
  }, 1000);
  return () => clearInterval(id);
}, []);
```

And now the doubling pattern actually works:

```jsx
setSeconds(s => s + 1);
setSeconds(s => s + 1);
```

Each updater receives the **result of the previous queued update**. First returns `s + 1`, second receives that and returns `s + 2`. The counter climbs by 2 per tick.

## When it bites

The pattern shows up wherever a callback created in one render outlives that render:

- `setInterval` / `setTimeout` callbacks set up in an effect
- Event listeners attached to `window` / `document` from an effect (`addEventListener`)
- Subscriptions to a store, socket, or event emitter
- Promise `.then` handlers that resolve later
- Any callback handed to an imperative API (`requestAnimationFrame`, `IntersectionObserver`, custom one-shot APIs)

If the effect has `[]` deps, the callback is **set up once and runs forever** — and every run sees the same stale values from the first render.

## Two ways out

You have two options depending on what you actually want:

1. **Stop reading state through the closure.** Use functional updaters (`setState(s => …)`) or stash the latest value in a `useRef` and read `ref.current` inside the callback. The subscription stays stable; the value stays fresh.
2. **Re-create the effect when the state changes.** Add the variable to the deps array — the effect tears down and re-runs with a fresh closure. Trade-off: the subscription (interval, listener, etc.) is destroyed and recreated on every change, which is wasteful for tickers and can disrupt timing.

For counters and accumulators, option 1 is almost always right. For effects that need to react to a value changing structurally (e.g., re-subscribing to a different channel when its id changes), option 2 is the natural choice — that's exactly what the deps array is for.

See [Mount vs Render](./mount-vs-render.md) for why `[]` deps mean "run once on mount", and [Render and Effect Order](./render-and-effect-order.md) for how effects interleave across a tree.

## Key Points

- An effect's callback **closes over** the state and props from the render that created it. With `[]` deps, that closure is set up once and used forever.
- Reading state directly inside such a callback gives you the **stale value from the first render**, not the current one.
- Calling `setState(stale + 1)` twice doesn't help — both calls compute against the same stale read.
- The fix: use the **functional updater**, `setState(prev => prev + 1)`. React passes the latest queued value, no closure read needed.
- Alternative: add the variable to the deps array, accepting that the effect re-runs on every change.
