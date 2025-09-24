# TypeScript - Function Overloading

import Tooltip from '@site/src/components/mdx/tooltip';

Function overloading models variant call signatures and results for a single implementation, giving precise types per input pattern.

## What is Function Overloading?

Declare multiple signatures for a function, followed by one implementation. Callers get the appropriate signature based on arguments.

## Syntax

```typescript
function parse(input: string): number
function parse(input: number): string
function parse(input: string | number): string | number {
  return typeof input === "string" ? Number(input) : String(input);
}
```

## Non-Technical Interpretation

Like a universal remote: the same button can perform different actions depending on the device you're controlling.

## Example (Non-Programming Context)

```typescript
function area(side: number): number
function area(width: number, height: number): number
function area(a: number, b?: number) {
  return b === undefined ? a * a : a * b;
}
```

## Technical Interpretation

Overloads provide distinct type-level behaviors for one implementation. The body must handle all cases safely via runtime checks.

## Example (Programming Context)

### Basic Usage

```typescript
function get<T>(arr: T[], index: number): T | undefined
function get<T>(arr: readonly T[], index: number): T | undefined
function get<T>(arr: readonly T[] | T[], index: number) {
  return arr[index];
}
```

### Narrowed Returns

```typescript
function findUser(id: number): { id: number; name: string } | null
function findUser(email: string): { id: number; name: string } | null
function findUser(key: number | string) {
  return typeof key === "number" ? { id: key, name: "U" } : { id: 1, name: key };
}
``;

### Interop with Unions

```typescript
function format(v: string): string
function format(v: number): string
function format(v: Date): string
function format(v: string | number | Date) {
  if (v instanceof Date) return v.toISOString();
  return String(v);
}
```

## Benefits

### 1. Precise call signatures
```typescript
declare function fetchJson(url: string): Promise<unknown>
```

### 2. Single implementation
```typescript
// Centralize runtime checks in one place
```

### 3. IDE guidance
```typescript
// Overload list provides helpful hints for callers
```

## When to Use

### ✅ Use when:
- A function has distinct input/return shapes
- You want strong caller ergonomics

### ❌ Avoid when:
- Behavior is better modeled as separate functions
- Complexity in the body grows too large

## Comparison

| Pattern | When to Use | Pros | Cons | Example Use Case |
|---------|-------------|------|------|------------------|
| **Function overloading** | <Tooltip text="Use when one function supports distinct call signatures">Multiple input shapes</Tooltip> | <Tooltip text="Precise types for callers based on signature">Precise signatures, great DX</Tooltip> | <Tooltip text="Single implementation must handle all cases">Complex implementation</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Utility functions, APIs</Tooltip> |
| **Discriminated union** | <Tooltip text="Use when data variants need exhaustive handling">Data variants</Tooltip> | <Tooltip text="Strong exhaustiveness and clarity">Exhaustive, lightweight</Tooltip> | <Tooltip text="Requires maintaining tags on data">Requires tags</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">State handling, responses</Tooltip> |
| **Generics** | <Tooltip text="Use for reusable, shape-agnostic utilities">Reusable utilities</Tooltip> | <Tooltip text="Flexible, powerful relationships between types">Flexible, type-safe</Tooltip> | <Tooltip text="Results can be abstract or less specific">Less specific</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Collection operations</Tooltip> |
| **Type guards** | <Tooltip text="Use for runtime validation prior to safe use">Runtime validation</Tooltip> | <Tooltip text="Very flexible and reusable in many places">Flexible, reusable</Tooltip> | <Tooltip text="Requires writing and maintaining guard code">Manual maintenance</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Data parsing</Tooltip> |

## Real-World Example

```typescript
type Selector = string | HTMLElement;

function $(sel: string): HTMLElement | null
function $(el: HTMLElement): HTMLElement
function $(arg: Selector) {
  return typeof arg === "string" ? document.querySelector(arg) : arg;
}
```

Overloading offers precise, ergonomic APIs when one function must support multiple shapes.

## See Also

- [Type Narrowing & Refinement Strategies](./type-narrowing-strategies.md) - Overview of all narrowing approaches


