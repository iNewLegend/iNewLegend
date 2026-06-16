# React — useEffect vs useLayoutEffect

Both run after the DOM has been mutated. Both can read the DOM, both can `setState`. The difference — and the entire reason `useLayoutEffect` exists — is **when** they run relative to the browser paint.

- **`useEffect`** runs **after** paint — asynchronous, non-blocking.
- **`useLayoutEffect`** runs **before** paint — synchronous, blocks paint.

The difference is whether the user *sees* the intermediate state.

## Why it matters — the flicker

A classic case: a tooltip that has to measure its own size to position itself correctly, because you only know its width and height after it renders.

```jsx
function Tooltip({ targetRef }) {
  const tooltipRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const target = targetRef.current.getBoundingClientRect();
    const tip = tooltipRef.current.getBoundingClientRect();
    setPos({
      top:  target.top - tip.height - 8,
      left: target.left + (target.width - tip.width) / 2,
    });
  }, []);

  return <div ref={tooltipRef} style={pos}>…</div>;
}
```

With `useEffect`, the timeline is:

```
render → commit DOM → 🖼  BROWSER PAINTS (at 0,0 — wrong)
       → useEffect runs → measures → setState
       → re-render → 🖼  PAINTS AGAIN (correct)
```

The browser paints **once with the wrong position**, then your effect repositions, then it paints again. The user sees that first wrong frame for a moment — that's the flicker.

Swap `useEffect` for `useLayoutEffect` and the timeline collapses:

```
render → commit DOM → useLayoutEffect runs → measures → setState
       → re-render → 🖼  BROWSER PAINTS (once, correct)
```

`useLayoutEffect` runs **synchronously after DOM mutation but before paint**. It blocks the browser from painting until your work finishes. The browser only ever paints the final, correct position. No intermediate frame → no flicker.

## The one-line distinction

| Hook | When it runs | Blocks paint? |
|---|---|---|
| `useEffect(fn, deps)` | **after** paint | no — async |
| `useLayoutEffect(fn, deps)` | **before** paint | yes — synchronous |

Everything else is identical — the deps-array semantics, the cleanup-before-rerun rule, the mount/unmount lifecycle. Only the paint timing differs.

## When to reach for useLayoutEffect

The narrow useful case is **measure then mutate, before the user sees anything**. Concrete examples:

- Measuring a child's rendered size to position it — tooltips, popovers, dropdowns
- Auto-resizing a textarea to fit its content
- Scrolling a list to a specific item on mount without a visible scroll-from-top
- Adjusting one element's layout based on another's computed size

The common shape: **read layout → derive a value → write it back to state or a style → all before the user sees the first frame.**

If your effect doesn't read layout and doesn't need to mutate before paint, `useEffect` is correct. Subscriptions, fetches, event listeners, logging, analytics — all `useEffect`.

## Trade-offs

`useLayoutEffect` **blocks the browser from painting**. Heavy work there directly delays the next frame and hurts perceived performance. If your effect runs in 5 ms, you've added 5 ms to time-to-first-paint.

Rules of thumb:

- **Default to `useEffect`.** Reach for `useLayoutEffect` only when you'd otherwise see a flicker.
- Keep `useLayoutEffect` bodies **fast** — read DOM, do trivial math, set state. No fetches, no expensive computation.
- **SSR**: there's no paint on the server, so `useLayoutEffect` doesn't run during server rendering. React will warn if you use it in a component that gets server-rendered without a hydration boundary; consider `useEffect` or guard with a check.

See [Mount vs Render](./mount-vs-render.md) for the render → commit → paint pipeline that places both effects in context.

## Key Points

- Both run after DOM mutation, both can read the DOM, both can `setState`.
- **`useEffect` runs after paint** (async, non-blocking) — user may see an intermediate frame.
- **`useLayoutEffect` runs before paint** (synchronous, blocks paint) — user only sees the final frame.
- Use `useLayoutEffect` for **measure-then-mutate-before-paint**; default to `useEffect` for everything else.
- Keep `useLayoutEffect` work cheap — it delays the next frame.
