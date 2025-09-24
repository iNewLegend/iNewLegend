# TypeScript - Union of Primitives / Structural Unions

import Tooltip from '@site/src/components/mdx/tooltip';

Primitive and structural unions model values as one of several simple alternatives without explicit discriminants. Narrowing is done via equality, `typeof`, or structural checks.

## What is this pattern?

Use unions of primitives (e.g., `"a" | "b" | 0 | 1`) or structurally distinct objects and narrow using standard JavaScript checks.

## Syntax

```typescript
type Status = "ok" | "error" | "pending";

function message(s: Status) {
  if (s === "ok") return "All good";
  if (s === "error") return "Something failed";
  return "Please wait";
}
```

## Non-Technical Interpretation

Like traffic lights: you react based on which color it is, using direct equality.

## Example (Non-Programming Context)

```typescript
type Level = 1 | 2 | 3;

function access(l: Level) { return l >= 2 }
```

## Technical Interpretation

For primitives, TypeScript narrows via equality and `typeof`. For structural unions, it narrows using the `in` operator or property-type checks.

## Example (Programming Context)

### Primitive Unions

```typescript
type Direction = "left" | "right";

function move(d: Direction) { return d === "left" ? -1 : 1 }
```

### Structural Unions

```typescript
type Input = { text: string } | { bytes: Uint8Array };

function size(i: Input) {
  return "text" in i ? i.text.length : i.bytes.byteLength;
}
```

### typeof Narrowing

```typescript
function parse(v: string | number) { return typeof v === "string" ? Number(v) : v }
```

## Benefits

### 1. Minimal ceremony
```typescript
type Flag = true | false
```

### 2. Efficient narrowing
```typescript
function isString(v: unknown): v is string { return typeof v === "string" }
```

### 3. Interop-friendly
```typescript
// Works seamlessly with JS primitives
```

## When to Use

### ✅ Use when:
- Variants are simple literals or distinct shapes
- Tagging would add noise

### ❌ Avoid when:
- Variants need rich payloads and exhaustiveness
- Shapes overlap heavily

## Comparison

| Pattern | When to Use | Pros | Cons | Example Use Case |
|---------|-------------|------|------|------------------|
| **Primitive/structural unions** | <Tooltip text="Use for simple alternatives distinguishable by equality or structure">Simple alternatives</Tooltip> | <Tooltip text="Very low overhead and easy to write">Minimal ceremony</Tooltip> | <Tooltip text="Less explicit than tagged variants">Less explicit</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Status flags, modes</Tooltip> |
| **Discriminated union** | <Tooltip text="Use when a shared tag cleanly separates variants">Tagged variants</Tooltip> | <Tooltip text="Clear and exhaustive compile-time checking">Exhaustive, clear</Tooltip> | <Tooltip text="Requires adding and maintaining a tag field">Requires explicit tag</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">API responses, state</Tooltip> |
| **In-operator** | <Tooltip text="Use when a key’s presence distinguishes variants">Structural unions</Tooltip> | <Tooltip text="Works with existing object shapes and POJOs">Simple, no tags</Tooltip> | <Tooltip text="Optional properties can be ambiguous">Optional key issues</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Shape variants</Tooltip> |
| **Type guards** | <Tooltip text="Use for custom runtime validation to refine inputs">Complex validation</Tooltip> | <Tooltip text="Flexible and reusable across modules">Flexible, reusable</Tooltip> | <Tooltip text="Manual guard code required">Manual maintenance</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Data parsing</Tooltip> |

## Real-World Example

```typescript
type ApiMode = "dev" | "prod";

const base = (m: ApiMode) => (m === "dev" ? "http://localhost" : "https://api.example.com");
```

Primitive and structural unions are a lightweight way to model alternatives without explicit tags.

## See Also

- [Type Narrowing & Refinement Strategies](./type-narrowing-strategies.md) - Overview of all narrowing approaches


