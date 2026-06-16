# React — useImperativeHandle

`useImperativeHandle` exists so a child component can decide **what** its parent sees through a `ref` — a small, controlled API instead of the raw DOM node.

Without it, attaching a `ref` to a child gives the parent the underlying DOM element (via `forwardRef`) — `focus()`, `style`, `innerHTML`, the whole thing. That's powerful but leaky: parents can mutate internals in ways that break when you refactor the child. `useImperativeHandle` lets the child say: *"here are the specific methods you can call on me, and nothing else."*

## The shape

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; },
  }));

  return <input ref={inputRef} {...props} />;
});
```

What the parent gets:

```jsx
function Parent() {
  const ref = useRef(null);

  return (
    <>
      <MyInput ref={ref} />
      <button onClick={() => ref.current.focus()}>Focus</button>
      <button onClick={() => ref.current.clear()}>Clear</button>
      {/* ref.current.value  → undefined — never exposed */}
    </>
  );
}
```

The actual `<input>` DOM node stays behind the controlled API.

## When you'd reach for it

- **Imperative actions the parent legitimately needs** — focus management, scroll position, animation triggers, video play/pause, opening or closing a popover from outside.
- **You want to enforce a boundary** — if the parent could grab the raw DOM node, it might do something fragile that breaks when you refactor the child's internals. The imperative handle is a stable API contract.
- **The child is a composite of multiple elements** and "the ref" doesn't naturally map to a single DOM node. With `useImperativeHandle`, the child decides what the ref means.

## When NOT to use it

- **If declarative state works, use that.** Refs are an escape hatch. Most parent-child communication should go through props, not method calls on a child's handle.
- **If you just want to forward one ref to one DOM element**, `forwardRef` alone is enough — no `useImperativeHandle` needed:

```jsx
const Input = forwardRef((props, ref) => <input ref={ref} {...props} />);
```

## The signature

```jsx
useImperativeHandle(ref, createHandle, deps?)
```

- `ref` — the forwarded ref from the parent
- `createHandle` — function returning the object the parent sees as `ref.current`
- `deps` — optional dependency array. When deps change, the handle is recreated. Same rules as `useEffect`.

## Subtleties

- `ref.current` becomes whatever `createHandle()` returns, **replacing** any previous value. If you also need the underlying DOM node internally, keep it in a local `useRef` (as in the example).
- The handle is computed during the **commit phase**, after the child renders but before effects fire. Parents reading `ref.current` from their own effects see the latest handle — because effects run bottom-up, the child's handle is set up by the time the parent's effect runs (see [Render and Effect Order](./render-and-effect-order.md)).
- **React 19 makes `forwardRef` optional** — `ref` is now a regular prop. The `useImperativeHandle` pattern stays the same: receive the ref, pass it as the first argument.

## Key Points

- `useImperativeHandle` lets a child expose a **controlled API** through a ref instead of the raw DOM node.
- Default `forwardRef` is "all-or-nothing" (the DOM node); `useImperativeHandle` is "some specific methods".
- Use it for imperative actions (focus, scroll, play) where declarative props would be awkward.
- Don't reach for it if props/state can solve the same problem. Refs are an escape hatch.
