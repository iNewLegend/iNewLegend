# TypeScript - User-Defined Type Guards

import Tooltip from '@site/src/components/mdx/tooltip';

User-defined type guards are functions that refine the type of a value when they return `true`, enabling safe property access inside guarded branches.

## What are Type Guards?

They are predicates of the form `function isX(v: T): v is X`, which let TypeScript narrow `v` to `X` on the `true` path.

## Syntax

```typescript
function isCircle(s: unknown): s is { kind: "circle"; radius: number } {
  return typeof s === "object" && s !== null && (s as { kind?: unknown }).kind === "circle";
}
```

## Non-Technical Interpretation

Like a bouncer checking IDs: when the check passes, you can treat the person as allowed; otherwise, you cannot.

## Example (Non-Programming Context)

```typescript
type Guest = { type: "vip"; seat: number } | { type: "regular" };

function isVip(g: Guest): g is Extract<Guest, { type: "vip" }> {
  return g.type === "vip";
}

function assign(g: Guest) {
  if (isVip(g)) return g.seat;
  return null;
}
```

## Technical Interpretation

A predicate signature `arg is Subtype` informs the compiler of the refined type under truthiness. Implementations can combine structural checks, literals, and schema validation.

## Example (Programming Context)

### Basic Usage

```typescript
type Result<T> = { status: "ok"; data: T } | { status: "error"; message: string };

function isOk<T>(r: Result<T>): r is { status: "ok"; data: T } {
  return r.status === "ok";
}

function unwrap<T>(r: Result<T>): T {
  if (isOk(r)) return r.data;
  throw new Error(r.message);
}
```

### Multi-Field Guards

```typescript
function isPoint(v: unknown): v is { x: number; y: number } {
  return typeof v === "object" && v !== null &&
    typeof (v as { x?: unknown }).x === "number" &&
    typeof (v as { y?: unknown }).y === "number";
}
```

### Composing with Schemas

```typescript
// Use schema libraries to implement robust runtime checks, then expose a guard.
```

## Benefits

### 1. Precise control
```typescript
function isNonEmpty(s: string | null): s is string { return !!s && s.length > 0 }
```

### 2. Reusable checks
```typescript
const isArrayOf = <T>(pred: (v: unknown) => v is T) => (v: unknown): v is T[] => Array.isArray(v) && v.every(pred)
```

### 3. Works with unknown input
```typescript
function isNumber(v: unknown): v is number { return typeof v === "number" }
```

## When to Use

### ✅ Use when:
- You ingest untyped/external data
- You want reusable narrowing utilities
- You need robust runtime validation

### ❌ Avoid when:
- Variants are already tagged and simple
- Overhead of checks outweighs benefits

## Comparison

| Pattern | When to Use | Pros | Cons | Example Use Case |
|---------|-------------|------|------|------------------|
| **Type guards** | <Tooltip text="Use for untrusted/external data where you need runtime checks">External/untrusted data</Tooltip> | Reusable, flexible | Manual maintenance | API validation, form inputs |
| **Discriminated union** | <Tooltip text="Use for internal data with a shared literal tag">Internal tagged data</Tooltip> | Exhaustive, lightweight | Requires tags | State machines, responses |
| **instanceof** | <Tooltip text="Use in class-based designs where behavior matters">Class hierarchies</Tooltip> | Built-in, familiar | Runtime overhead | Error handling, components |
| **Schema validation** | <Tooltip text="Use when you need strong runtime validation and errors">Complex validation</Tooltip> | Runtime safety, errors | Dependency cost | API contracts, configs |

## Real-World Example

```typescript
type User = { id: number; email: string };

function isUser(v: unknown): v is User {
  return typeof v === "object" && v !== null &&
    typeof (v as { id?: unknown }).id === "number" &&
    typeof (v as { email?: unknown }).email === "string";
}

function greet(v: unknown) {
  if (isUser(v)) return `Hello ${v.email}`;
  return "Guest";
}
```

User-defined guards provide fine-grained, reusable narrowing for untrusted inputs and complex shapes.

## See Also

- [Type Narrowing & Refinement Strategies](./type-narrowing-strategies.md) - Overview of all narrowing approaches


