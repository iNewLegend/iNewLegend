# TypeScript - In-Operator / Property Existence Narrowing

import Tooltip from '@site/src/components/mdx/tooltip';

The `in` operator narrows types by checking whether a property exists on a value. It is a structural check that works well with plain object unions.

## What is this pattern?

Use `"prop" in value` to guard access to properties present on only some union members. TypeScript narrows to members that contain that property.

## Syntax

```typescript
type Shape =
  | { radius: number }
  | { side: number };

function area(s: Shape) {
  if ("radius" in s) return Math.PI * s.radius ** 2;
  return s.side * s.side;
}
```

## Non-Technical Interpretation

Like checking if a form has a specific field: if the field exists, you know which form type it is.

## Example (Non-Programming Context)

```typescript
type Ticket = { seat: string } | { standingZone: string };

function place(t: Ticket) {
  if ("seat" in t) return `Seat ${t.seat}`;
  return `Zone ${t.standingZone}`;
}
```

## Technical Interpretation

The `in` operator performs a runtime key existence check. TypeScript leverages this to narrow unions by structural presence of that key.

## Example (Programming Context)

### Basic Usage

```typescript
type Response = { data: string } | { error: string };

function read(r: Response) {
  if ("data" in r) return r.data;
  return r.error;
}
```

### Optional Properties

```typescript
type MaybeUser = { id: number; email?: string } | { id: number; phone?: string };

function contact(u: MaybeUser) {
  if ("email" in u) return u.email ?? "no-email";
  if ("phone" in u) return u.phone ?? "no-phone";
  return "unknown";
}
```

### Nested Checks

```typescript
type Config = { db?: { host: string } } | { cache?: { host: string } };

function host(c: Config) {
  if ("db" in c) return c.db?.host;
  if ("cache" in c) return c.cache?.host;
}
```

## Benefits

### 1. Works with POJOs
```typescript
const hasX = (v: object): v is { x: unknown } => "x" in v
```

### 2. No explicit tag required
```typescript
type Job = { title: string } | { salary: number }
```

### 3. Simple and fast
```typescript
function has<K extends PropertyKey>(k: K, o: object): boolean { return k in o }
```

## When to Use

### ✅ Use when:
- Variants are plain objects with distinct keys
- You want minimal ceremony

### ❌ Avoid when:
- Keys overlap or are optional in confusing ways
- You need stronger invariants or exhaustiveness

## Comparison

| Pattern | When to Use | Pros | Cons | Example Use Case |
|---------|-------------|------|------|------------------|
| **In-operator** | <Tooltip text="Use when a property’s presence distinguishes variants">Structural unions</Tooltip> | <Tooltip text="No explicit tag needed, works with existing shapes">Simple, no tags</Tooltip> | <Tooltip text="Optional keys can cause ambiguous control flow">Optional key confusion</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Shape variants, configs</Tooltip> |
| **Discriminated union** | <Tooltip text="Use when a shared literal tag cleanly separates variants">Tagged variants</Tooltip> | <Tooltip text="Strong exhaustiveness and type clarity">Exhaustive, clear</Tooltip> | <Tooltip text="Requires adding and maintaining a tag field">Requires explicit tag</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">API responses, state</Tooltip> |
| **Type guards** | <Tooltip text="Use for complex or custom runtime validation">Complex validation</Tooltip> | <Tooltip text="Very flexible and reusable across code">Flexible, reusable</Tooltip> | <Tooltip text="Requires manual guard authoring and upkeep">Manual maintenance</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">External data parsing</Tooltip> |
| **instanceof** | <Tooltip text="Use for class-based designs with behavior">Class hierarchies</Tooltip> | <Tooltip text="Built-in runtime check via prototype chain">Built-in, familiar</Tooltip> | <Tooltip text="Runtime cost and class coupling">Runtime overhead</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Error handling</Tooltip> |

## Real-World Example

```typescript
type Api = { ok: true; value: string } | { ok: false; reason: string };

function get(a: Api) {
  if ("value" in a) return a.value;
  return a.reason;
}
```

The `in` operator offers ergonomic, structural narrowing for simple unions without explicit tags.

## See Also

- [Type Narrowing & Refinement Strategies](./type-narrowing-strategies.md) - Overview of all narrowing approaches


