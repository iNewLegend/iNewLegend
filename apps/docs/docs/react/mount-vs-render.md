# React — Mount vs Render

A common confusion: "every render is a mount, right?" No. They are different things.

- **Mount** — the component instance is created and inserted into the DOM for the first time. **Once** per instance lifetime.
- **Render** — React calls your function to get the latest JSX. Happens **many** times — once at mount, then again on every state, prop, parent, or context change.
- **Re-render** — every render after the first.
- **Unmount** — the instance is destroyed and removed from the DOM. **Once**, at the end.

![React mount vs render lifecycle flow](/images/react-mount-vs-render.svg)

The orange hexagons (`MOUNT`, `UNMOUNT`) fire **once per instance lifetime**. Everything between them — Render, Reconcile, Commit, Effects — is the **loop** that runs every time something triggers a re-render.

## The lifecycle of one instance

```
mount  →  render #1  (the mount render)
          render #2  (re-render — state changed)
          render #3  (re-render — prop changed)
          ...
unmount
```

**A re-render is NOT a remount.** The instance stays alive — same `useState` memory, same refs, same identity. React just re-runs the function body and diffs the result against the previous tree. Nothing is created or destroyed; state persists.

## When does mount happen vs re-render?

| Trigger | What happens |
|---|---|
| Component first appears in tree | **mount** (+ first render) |
| Local state / prop / context changes | **re-render only** — same instance |
| Parent re-renders | **re-render only** |
| `key` prop changes | **unmount old + mount new** (state wiped) |
| Different element type at the same position | **unmount old + mount new** |
| Component removed from tree | **unmount** |

See the [Reconciliation](./reconciliation.md) page for why `type + position + key` is the identity rule that decides "same instance" vs "new instance".

## React render is not a DOM render

Two different things get called "render" in the path from state change to pixels on screen:

1. **React render** — React calls your function and builds a tree of elements. Pure JavaScript, no DOM access.
2. **DOM update** — React applies the minimum diff to the actual DOM nodes. Touches the browser's DOM API.
3. **Browser render** (paint) — the browser's style → layout → paint → composite pipeline that ends with pixels on screen.

Every state change causes (1) and *possibly* (2) and (3). A re-render that diffs to no changes triggers no DOM mutation and no paint.

### The pipeline, step by step

When you call `setState`, the sequence is roughly:

```
state changes
   ↓
React render         call component fn, build new tree         ~0.1–5 ms
   ↓
React reconcile      diff new tree vs previous                 ~0.1–5 ms
   ↓
React commit         apply mutations to DOM nodes              microseconds per node
   ↓
Browser style        recalc CSS for changed elements           ~1–10 ms
   ↓
Browser layout       compute geometry (sizes, positions)       ~5–50 ms (highly variable)
   ↓
Browser paint        rasterize layers (GPU)                    ~1–10 ms
   ↓
Browser composite    combine layers onto screen                <1 ms
```

(Numbers are typical ranges on modern hardware, not guarantees — they swing a lot with tree size, CSS complexity, and what property changed.)

The first three are React's job. The last four are the browser's, and they have nothing to do with React — they'd run the same way if you mutated the DOM with vanilla JS.

### Where the cost actually lives

- **React render** is a JS function call producing a JS object tree. No DOM access. Cheap.
- **DOM commit** pokes the browser's internal DOM tree node-by-node. Still cheap per mutation, but compounds with large diffs.
- **Layout is the killer.** The browser recomputes geometry for affected subtrees, and the work cascades. Changing `width` on one deeply-nested element can re-layout the entire subtree.
- **Paint and composite** are usually GPU-accelerated and cheap, unless you're animating heavy filters or large shadows.

## Effect timing

`useEffect(fn, deps)` is how you hook into the lifecycle. The dependency array decides which renders count:

- `[]` — runs **once on mount**; cleanup runs **once on unmount**
- `[dep]` — runs on **mount AND** every re-render where `dep` changed; cleanup runs **before each re-run** and on unmount
- *(no array)* — runs **after every render**; cleanup runs before every re-run

So "useEffect runs on mount" is only true with `[]`. Without the array it fires on every render.

## Key Points

- **Render** = React calls the component function. Happens many times.
- **Mount** = the instance is created and inserted into the DOM. **Once** per instance lifetime.
- **Unmount** = the instance is destroyed. **Once**, at the end.
- **Re-render is NOT a remount.** Same instance, same `useState` memory, same refs.
- `useEffect(fn, [])` → runs at mount, cleanup at unmount. With `[dep]` → also runs whenever `dep` changes, cleanup runs before each re-run.
- State survives across re-renders but **not** across unmount/remount. Identity (`type + position + key`) decides whether a re-render is "the same instance" — see [Reconciliation](./reconciliation.md).
