# React — Render and Effect Order

When a tree of components renders, React walks it in **two opposite directions** at two different times:

- **Render: top-down** — Parent runs, produces `<Child />`, then Child runs.
- **Effects: bottom-up** — Child's effect runs before Parent's.

The render direction is intuitive — you can't render `<Child />` until the parent decides to include it. The effect direction is the surprising one, and the reason behind it is the interesting bit.

## Render is top-down

```jsx
function Parent() {
  console.log('Parent render');
  return <Child />;
}

function Child() {
  console.log('Child render');
  return <div />;
}
```

Log order on first render:

```
Parent render
Child render
```

Parent has to run first — its function body decides whether `<Child />` exists at all, and with what props. The child can't be called until the parent has produced the JSX containing it.

## Effects are bottom-up

```jsx
function Parent() {
  useEffect(() => console.log('Parent effect'), []);
  console.log('Parent render');
  return <Child />;
}

function Child() {
  useEffect(() => console.log('Child effect'), []);
  console.log('Child render');
  return <div />;
}
```

Log order on mount:

```
Parent render
Child render
Child effect
Parent effect
```

Child's effect runs **before** Parent's. React walks the tree bottom-up for effects: deepest descendants first, root last.

## Why child-first

React's guarantee: **when a parent's effect runs, every descendant is already mounted and every descendant effect has already run.**

This contract enables useful patterns:

- A parent can **measure a child's DOM node** (`ref.current.getBoundingClientRect()`) and trust the child has actually committed to the DOM.
- A parent can assume a child's effect has **already registered** something — a subscription, a store entry, an event listener — and act on it.
- A parent can safely call into APIs the child set up in its own effect.

If parent effects ran first, none of that would hold. The parent would be acting on children that hadn't fully wired themselves up yet.

## The two directions

```
RENDER:   top-down   (Parent → Child)
EFFECTS:  bottom-up  (Child → Parent)
```

**Mnemonic:** you **build** the structure top-down (parent decides what children exist), but you **wire it up** bottom-up (children get ready before the parent that depends on them).

## When this matters in practice

- **Measuring a child after mount.** A parent holds a `ref` to a child's DOM node and reads its size in `useLayoutEffect`. Works because the child has already rendered and committed by the time the parent's effect runs.
- **Consuming a child's subscription.** A child registers itself in a parent-owned store from its own effect. By the time the parent's effect runs, the registration is in place — the parent can iterate over its registered children.
- **Don't make the inverse assumption.** Never have a parent effect *create* a resource that children need to access during their **render**. The render of all children happens before any effect runs — putting the resource creation in a parent effect means children's renders see nothing on the first pass.

See [Mount vs Render](./mount-vs-render.md) for the lifecycle of a single instance; this page is about how that lifecycle interleaves across a tree.

## Key Points

- **Render is top-down** — parent runs, decides which children to render, then children run.
- **Effects are bottom-up** — children's effects run before the parent's. Deepest descendant first; root last.
- The bottom-up order **guarantees that descendants are fully mounted** by the time a parent's effect runs, so a parent can measure or act on its children safely.
- **Mnemonic:** build top-down, wire-up bottom-up.
