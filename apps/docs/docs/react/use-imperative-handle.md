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

## actions = ref, data = lift state up

That's the whole rule for this hook. Before reaching for `useImperativeHandle`, ask one question:

> **Are you moving data, or triggering an action?**

Examples:

- `play()` / `pause()` — imperative *actions* with no declarative equivalent → **ref is fine**
- `show("Saved!")` — firing a notification is a one-shot *action* → **ref is fine**
- `getFormData()` — reading the child's form values → **wrong tool. Lift state up.**

The third one is the trap. Reading the child's form values is **pulling data up**, not triggering an action. The child owns state the parent needs — that's a *data-flow* problem, and the React answer is to **lift state up** (parent owns the form state, passes it down) or use a controlled-component pattern. Reaching in with a ref to *read state* is fighting React's one-way data flow.

**The giveaway:** a method that **returns the child's data** (`get…`, `read…`, `currentValueOf…`) is almost always data-flow in disguise → don't use a ref. A method that **does something** (`play`, `focus`, `scroll`, `show`, `reset`) is an action → ref is appropriate.

The valid cases for the imperative handle generally fall into:

- **Imperative actions the parent legitimately needs** — focus, scroll, animation triggers, video play/pause, opening or closing a popover from outside.
- **You want to enforce a stable boundary** — the imperative handle is an API contract; the raw DOM node isn't.
- **The child is a composite** of multiple elements and "the ref" doesn't map naturally to a single DOM node.

And if you're just forwarding one ref to one DOM element, `forwardRef` alone is enough — no `useImperativeHandle` needed:

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
- **The rule: actions = ref, data = lift state up.** A method that *does something* (`play`, `focus`, `scroll`, `show`, `reset`) is an action → ref is appropriate. A method that *returns data* (`get…`, `read…`, `currentValueOf…`) is data-flow in disguise → lift state up instead.
- Don't reach for it if props/state can solve the same problem. Refs are an escape hatch.
