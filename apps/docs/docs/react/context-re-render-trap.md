# React — Context Re-render Trap

A `useContext` consumer re-renders whenever the Provider's `value` becomes a **new reference** — even if the *contents* are identical to last render, and even if the consumer is wrapped in `React.memo`.

That one sentence is the entire topic. The trap is forgetting it and writing an inline object as the Provider value.

## Two reasons a consumer re-renders

```jsx
function App() {
  const [theme, setTheme] = useState('dark');
  const [count, setCount] = useState(0);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>  {/* ⚠ new object every render */}
      <Header />   {/* uses useContext(ThemeContext) */}
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
    </ThemeContext.Provider>
  );
}
```

Click the count button. `App` re-renders. Two distinct things make `<Header />` re-render:

**Reason 1.** `setCount` re-renders `App`. `Header` is a child, and **children re-render when their parent re-renders** (unless memoized).

**Reason 2.** Look at `value={{ theme, setTheme }}`. That object is **created fresh on every render of `App`** — a new reference each time, even though `theme` didn't change. *Even if you wrapped `Header` in `React.memo` to stop reason 1, it would still re-render, because `useContext` re-renders any consumer whenever the Provider's `value` is a new reference.*

## Why React.memo doesn't save you

The instinct: "let me wrap `Header` in `React.memo` to stop the re-render."

```jsx
const Header = React.memo(function Header() {
  const { theme } = useContext(ThemeContext);
  // ...
});
```

It doesn't help. A developer notices the extra re-renders, slaps `React.memo` on `Header` expecting it to stop… and it doesn't. **Because `memo` blocks prop changes, but `useContext` bypasses `memo`** — a consumer re-renders on context value change regardless of memoization. The new `{ theme, setTheme }` object defeats it.

## The fix — stabilize the value reference

```jsx
function App() {
  const [theme, setTheme] = useState('dark');
  const [count, setCount] = useState(0);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <Header />
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
    </ThemeContext.Provider>
  );
}
```

Now `value` keeps the **same reference** when `theme` is unchanged. (`setTheme` from `useState` is already stable across renders.)

With that **plus** `React.memo` on `Header`, clicking the count button no longer re-renders `Header`:

- `App` re-renders (count changed).
- `value` is the same reference → no context update → consumers don't react.
- `Header`'s props haven't changed → `React.memo` blocks the parent-driven cascade.

Both pieces are required:

- Without `useMemo` on the value → the context-driven re-render fires regardless of `React.memo`.
- Without `React.memo` on the consumer → the parent-driven re-render fires regardless of the stable context value.

So the full answer: **yes, `Header` re-renders — and it re-renders even if memoized, because the inline `value` object is a new reference every render.**

## Alternative — split the context

The other common fix: instead of bundling `{ theme, setTheme }` in one context, split them.

```jsx
const ThemeValueContext  = createContext();   // changes when theme changes
const ThemeSetterContext = createContext();   // never changes (setter is stable)

<ThemeValueContext.Provider value={theme}>
  <ThemeSetterContext.Provider value={setTheme}>
    {children}
  </ThemeSetterContext.Provider>
</ThemeValueContext.Provider>
```

Now consumers that only call `setTheme` (e.g., a settings button) never re-render on theme changes. Consumers that read `theme` re-render only when it actually changes — the inline-object-fresh-reference problem can't exist because each Provider's value is a primitive or a stable callback.

This scales better for large contexts: split by **what changes when**, not by **what's logically grouped**.

## When this bites

The pattern shows up almost everywhere a bundled `{ value, setter }` context appears:

- `{ user, setUser }` auth context
- `{ open, setOpen, toggle }` dialog state
- `{ values, errors, setField }` form context
- Any "one context with multiple related fields" shape

If the consumer count is small and re-renders are cheap, you can ignore it. For contexts used by many consumers (auth, theme, i18n), the cascade adds up fast.

## Key Points

- A `useContext` consumer **re-renders whenever the Provider's `value` becomes a new reference**, regardless of whether the consumer is wrapped in `React.memo`.
- An inline `value={{ a, b }}` creates a fresh object every render of the parent — the consumer cascade fires every time the parent re-renders.
- `React.memo` blocks **prop**-driven re-renders but does **not** block **context**-driven re-renders. `useContext` bypasses `memo`.
- The fix has two halves: **`useMemo`** the value object so its reference stays stable, **and** **`React.memo`** the consumer so parent updates don't cascade. Both are required.
- Alternative: **split the context** so each Provider's value is a primitive or a stable callback. Consumers subscribe to the minimum they need.
