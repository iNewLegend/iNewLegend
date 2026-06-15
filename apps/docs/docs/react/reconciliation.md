# React — Reconciliation

**Reconciliation** is the algorithm React uses to figure out what's changed between two renders so it can update the DOM with the minimum work. The core question it answers is: *for each element in the new tree, do we have an instance from the previous render that we can keep, or do we need a new one?*

React's answer comes from three signals — **type**, **position**, and **key** — and they decide whether a component's state survives an update or gets thrown away.

![How React identifies a component instance](/images/react-reconciliation.png)

## How React identifies a component instance

A React component instance is uniquely identified by:

1. **Type** — what the element is (`Button`, `<div>`, `MyComponent`)
2. **Position** — where it sits in the parent's children list
3. **Key** — an explicit `key` prop, when provided

If both type and position (or type and key, in keyed lists) match the previous render, React reuses the existing instance. **State, refs, and effects survive.** If anything in that identity changes, React unmounts the old instance and mounts a new one. **State is lost.**

## Same type at the same position → state preserved

```jsx
function App({ initial }) {
  return <Counter initial={initial} />;
}
```

Each rerender, React sees `<Counter />` at the same position with the same type. The component instance is reused — its `useState`, refs, and timers persist across renders. Only the `initial` prop changes; the instance itself is the same.

## Different type at the same position → state reset

```jsx
function App({ isAdmin }) {
  return isAdmin ? <AdminPanel /> : <UserPanel />;
}
```

When `isAdmin` flips, React sees a different component type at that position. It unmounts `UserPanel` (running effect cleanup), then mounts a fresh `AdminPanel`. Any state inside the unmounted component is gone.

This is also why wrapping a child in a different host element resets state:

```jsx
{showBorder ? <div><Form /></div> : <Form />}
```

When `showBorder` flips, the `<Form>` swaps parents — its position in the tree changes, so React unmounts and remounts it. The user's half-typed input is lost.

## Lists need a `key` to track items across positions

When rendering a list, position alone is a bad identifier — items can be reordered, inserted, or removed in the middle. React asks for an explicit `key`:

```jsx
{items.map(item => (
  <TodoItem key={item.id} todo={item} />
))}
```

With a `key`, React identifies each `TodoItem` by **type + key**, ignoring its position. Reorder the list — the `<TodoItem>` instances move with their items, keeping their state.

Without a stable `key` (or using array index), React falls back to position. Delete the first item and the second now sits at index `0` — React thinks the first item's state belongs to it.

```jsx
{items.map((item, index) => (
  <TodoItem key={index} todo={item} />
))}
```

This is the canonical index-key footgun: works fine until the list mutates in the middle, then state attaches to the wrong row.

## The classic state-loss bug

Defining a component inside another component creates a new component type every render:

```jsx
function Parent() {
  function ChildComponent() {  // new function identity each render
    const [value, setValue] = useState('');
    return <input value={value} onChange={e => setValue(e.target.value)} />;
  }

  return <ChildComponent />;
}
```

Every render, `ChildComponent` is a different function reference. React sees a different type at the same position and unmounts/remounts. The `<input>` loses its state — and worse, any focus, scroll position, or selection is reset on every parent render.

Fix: hoist the component out of the parent.

```jsx
function ChildComponent() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}

function Parent() {
  return <ChildComponent />;
}
```

Same applies to inline-defined components passed via props or rendered conditionally — keep component definitions at module scope.

## Forcing a reset with `key`

The same mechanism that preserves state can be used to *reset* it on demand. Change the `key` of a component, and React treats it as a different instance — unmount the old, mount a new.

```jsx
function ProfileForm({ userId }) {
  return <Form key={userId} userId={userId} />;
}
```

When `userId` changes, the `<Form>` unmounts and a fresh instance mounts. All internal state — half-typed values, validation, scroll position — is wiped, exactly as if a new user navigated to the page. This is the idiomatic alternative to clearing state inside an effect.

## Key Points

- React identifies a component instance by **type + position** — plus **key** when one is provided
- **Same type at same position** → instance reused; state, refs, and effects survive
- **Different type** at the same position → unmount + remount; state lost
- **Lists need `key`** to track items across reorders, insertions, and deletions — using array index is a footgun once the list mutates in the middle
- **Defining components inside other components** breaks reconciliation: every render produces a new type, remounting the child and losing its state
- **Changing a component's `key` intentionally** is the canonical way to reset its state without an effect
