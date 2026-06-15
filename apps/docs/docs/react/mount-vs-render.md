# React — Mount vs Render

**Mount** is a one-time lifecycle event — the moment a component instance is created and added to the React tree. **Render** is the function call React makes to ask the component what UI to produce, and it happens many times across that instance's lifetime.

Mixing them up leads to bugs around effects, state initialization, and performance.

![React mount vs render lifecycle flow](/images/react-mount-vs-render.svg)

The orange hexagons (`MOUNT`, `UNMOUNT`) fire **once per instance lifetime**. Everything between them — Render, Reconcile, Commit, Effects — is the **loop** that runs every time something triggers a re-render. The dashed arrow shows the re-render path; the solid arrow into `UNMOUNT` is the one-way exit.

## Render: just a function call

When React renders a component, it calls the function with current props and reads its return value (a tree of elements). That's it — render is a pure function call.

```jsx
function Counter({ initial }) {
  const [count, setCount] = useState(initial);
  console.log('rendering with', count);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

Every time `Counter` renders, the function body re-runs from the top. `useState(initial)` is called again, but React knows to return the existing state, not reset it.

A component re-renders when:

- Its own state changes (e.g., `setCount`)
- Its props change
- Its parent re-renders
- A subscribed context value changes

A re-render does **not** touch the DOM by itself. React compares the new output to the previous one ([reconciliation](./reconciliation.md)), then commits only what changed.

## Mount: the instance is born

Mount happens once — when React decides "this component should exist in the tree" and creates an instance:

1. Hook slots are allocated for this instance
2. `useState` / `useRef` initializers run
3. The component's first render is produced
4. The first commit attaches DOM nodes
5. Effects (`useEffect`, `useLayoutEffect`) run for the first time

After mount, the same instance can re-render many times. The component is **mounted** the whole time — it is not "remounted" on each render.

## Unmount

Unmount also happens once — when React removes the instance from the tree:

- `useEffect` cleanup functions run with the values they captured on their last run
- DOM nodes are removed
- The hook slots are freed
- Subsequent renders cannot reach this instance

If the same component appears again at the same spot later, a **fresh instance** is mounted — `useState` re-runs its initializer, refs reset, effects re-subscribe.

## A typical lifecycle

For one mount → re-render × N → unmount cycle:

```
mount     → render (1st)  → commit → useEffect[] runs once
update    → render (Nth)  → commit → useEffect[dep] cleans up prev run, then runs again if deps changed
unmount   → cleanup remaining effects → DOM nodes removed
```

A common gotcha: in React 18+ Strict Mode (development only), components mount → unmount → remount immediately on first creation. That's a dev-time signal to surface bugs that survive unmount; it doesn't happen in production.

## "Effects run on mount" — only with `[]`

A common myth: `useEffect(fn, deps)` runs on mount.

What it actually does:

- `[]` → runs once after the first commit, never again
- `[dep]` → runs on mount **and** after every commit where `dep` changed
- *(no array)* → runs after every render
- All variants run cleanup before re-running, and final cleanup at unmount

If you put work in `useEffect` because you "want it on mount", and forget the `[]`, it runs after every render.

## State initialization runs on every render

```jsx
function Slow() {
  const [data, setData] = useState(expensiveInit());  // ⚠️ runs every render
}
```

`useState(expensiveInit())` evaluates `expensiveInit()` on every render — React just discards the result on re-renders. Pass a function to defer it to mount only:

```jsx
function Slow() {
  const [data, setData] = useState(() => expensiveInit());  // ✓ runs once at mount
}
```

`useRef` and `useMemo` follow the same pattern. Their stored value is stable across renders, but the *expression* you write in their argument still evaluates every render.

## Render survives; mount does not

State survives across re-renders of the same instance. State is **lost** when:

- The component **unmounts** (covered above)
- The component's identity changes — different element type at the same position, or different `key`. React tears down the instance even though the position looks "the same".

What counts as the "same instance" across renders is decided by `type + position + key`. That's the [Reconciliation](./reconciliation.md) page.

## Render is a description; commit does the work

React's two-phase model:

1. **Render phase** — pure function calls produce a description of the UI (a Fiber tree). Cheap, repeatable, interruptible.
2. **Commit phase** — React applies the diff to the DOM, fires refs, runs effects. Not interruptible.

Render can run many times per commit when concurrent rendering is in play — React discards in-progress renders if higher-priority work arrives. Mount is a **commit** event: it happens once per instance lifetime, regardless of how many render attempts preceded it.

## Putting it together

A single component that exercises everything above. Comments mark when each line runs.

```jsx
import { useState, useRef, useEffect } from 'react';

function Profile({ userId }) {
  // ⓪ The function body runs on EVERY render.
  //    Mount = the first render. Re-render = call this again.
  console.log('render');

  // ① useState initializer:
  //    useState(loadFromCache(userId))      → evaluated EVERY render (wasted work)
  //    useState(() => loadFromCache(userId)) → evaluated only on MOUNT ✓
  const [user, setUser] = useState(() => loadFromCache(userId));

  // ② useRef: same rule. Pass a function to defer the initializer to mount.
  const wsRef = useRef(null);

  // ③ Effect with []: runs ONCE after the first commit (mount).
  //    Its cleanup runs ONCE at unmount.
  useEffect(() => {
    console.log('mount: opening websocket');
    wsRef.current = new WebSocket('wss://api.example.com');
    return () => {
      console.log('unmount: closing websocket');
      wsRef.current?.close();
    };
  }, []);

  // ④ Effect with [userId]: runs on MOUNT and whenever userId changes.
  //    Cleanup runs BEFORE each re-run, AND at unmount.
  useEffect(() => {
    console.log(`fetch user ${userId}`);
    let cancelled = false;
    fetchUser(userId).then(u => { if (!cancelled) setUser(u); });
    return () => { cancelled = true; };
  }, [userId]);

  // ⑤ Effect with no deps array: runs after EVERY render.
  //    Rarely what you want — usually a bug.
  useEffect(() => {
    console.log('after every render');
  });

  // ⑥ JSX is built on every render. No DOM work yet — React diffs against
  //    the previous tree and commits whatever changed in the next phase.
  return <div>{user?.name}</div>;
}
```

### Execution order

**On mount** (first time the component appears in the tree):

1. `⓪` function body runs → `console.log('render')`
2. `①` `useState(() => loadFromCache(userId))` initializer runs once → state stored
3. `②` `useRef(null)` → ref slot created
4. `⑥` JSX tree returned to React
5. React commits the DOM
6. `③` mount effect runs → `console.log('mount: opening websocket')`
7. `④` userId effect runs → `console.log('fetch user X')`
8. `⑤` every-render effect runs → `console.log('after every render')`

**On re-render with the same `userId`** (parent re-rendered, or local state changed):

1. `⓪` body runs again
2. `①` `useState` is called again, but the **function argument is not invoked** — React returns the existing state. `loadFromCache` does *not* re-run.
3. `②` same — existing ref returned
4. `⑥` JSX tree returned
5. React diffs against the previous render and commits only what changed
6. `③` `[]` deps haven't changed → **skipped**
7. `④` `userId` hasn't changed → **skipped**
8. `⑤` no deps → cleanup of previous run (none here), then re-runs

**On re-render with a new `userId`**:

Same as above, except `④` runs its cleanup (`cancelled = true` for the in-flight `fetchUser`), then re-runs with the new `userId`. `③` still skips — its `[]` deps haven't changed; the websocket stays open.

**On unmount** (removed from the tree, or `key` / type changed):

1. `③` cleanup → `console.log('unmount: closing websocket')`
2. `④` cleanup → `cancelled = true`
3. `⑤` cleanup (none here)
4. DOM nodes removed, hook slots freed

If the component re-appears later, the entire mount sequence runs from scratch — state is gone, refs reset, effects re-subscribe.

## Key Points

- **Render** = React calling the component function to produce a UI description. Happens many times.
- **Mount** = React creating an instance and adding it to the tree for the first time. Happens once per instance lifetime.
- **Unmount** = React removing the instance. Happens once. Effects clean up; state is lost.
- A component **re-renders without remounting** — same instance, same state, same refs.
- `useEffect(fn, [])` runs at mount; without a deps array it runs after every render.
- `useState(expensiveInit())` runs the initializer on every render — wrap in a function (`useState(() => expensiveInit())`) to defer to mount.
- State survives across re-renders but **not** across unmount/remount. Identity (`type + position + key`) decides whether a re-render is "the same instance" — see [Reconciliation](./reconciliation.md).
