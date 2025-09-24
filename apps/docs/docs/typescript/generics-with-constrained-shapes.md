# TypeScript - Generics with Constrained Shapes

import Tooltip from '@site/src/components/mdx/tooltip';

Generics parameterize types over one or more type variables. Constraints (`extends`) restrict those variables to shapes you require, enabling reusable yet safe APIs.

## What is this pattern?

Use type parameters with constraints to express relationships between inputs and outputs without enumerating variants explicitly.

## Syntax

```typescript
function pluck<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> {
  return Object.fromEntries(keys.map(k => [k, obj[k]])) as Pick<T, K>;
}
```

## Non-Technical Interpretation

Like a template with rules: you can fill in the blanks, but only with materials that meet the specified standards.

## Example (Non-Programming Context)

```typescript
type HasName = { name: string };

function label<T extends HasName>(x: T) { return `Name: ${x.name}` }
```

## Technical Interpretation

Constraints limit admissible types and allow property-safe access. Mapped and conditional types compose with generics to derive precise results.

## Example (Programming Context)

### Basic Usage

```typescript
function mapValues<T extends Record<string, unknown>, R>(obj: T, f: (v: T[keyof T]) => R): Record<keyof T, R> {
  const out: Partial<Record<keyof T, R>> = {};
  for (const k in obj) out[k] = f(obj[k]);
  return out as Record<keyof T, R>;
}
```

### Relation Between Params

```typescript
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key] }
```

### Conditional + Infer

```typescript
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
```

## Benefits

### 1. Reuse without unions
```typescript
function first<T>(arr: readonly T[]): T | undefined { return arr[0] }
```

### 2. Enforce contracts
```typescript
function withId<T extends { id: number }>(t: T) { return t.id }
```

### 3. Strong relationships
```typescript
function zip<A, B>(a: A[], b: B[]): Array<[A, B]> { return a.map((v, i) => [v, b[i]]) }
```

## When to Use

### ✅ Use when:
- APIs are shape-agnostic but property-safe
- You need relationships between inputs/outputs

### ❌ Avoid when:
- A small finite set of variants is clearer
- Simpler concrete types suffice

## Comparison

| Pattern | When to Use | Pros | Cons | Example Use Case |
|---------|-------------|------|------|------------------|
| **Constrained generics** | <Tooltip text="Use to relate input and output shapes without enumerating variants">Reusable utilities</Tooltip> | <Tooltip text="Flexible reuse with strong type relationships">Flexible, type-safe</Tooltip> | <Tooltip text="Abstractions can be harder to grok">Can be abstract</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Collection operations, utilities</Tooltip> |
| **Discriminated union** | <Tooltip text="Use for concrete variants with exhaustive handling">Specific variants</Tooltip> | <Tooltip text="Clear cases and compile-time exhaustiveness">Clear cases, exhaustive</Tooltip> | <Tooltip text="Not ideal for generic operations over many shapes">Verbose for generic ops</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">State machines, responses</Tooltip> |
| **Function overloading** | <Tooltip text="Use when multiple call signatures are required">Multiple signatures</Tooltip> | <Tooltip text="Precise and ergonomic for callers">Precise, ergonomic</Tooltip> | <Tooltip text="Implementation can become complex">Complex implementation</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">API functions</Tooltip> |
| **Type guards** | <Tooltip text="Use for runtime validation to refine unknown data">Runtime validation</Tooltip> | <Tooltip text="Flexible and reusable across modules">Flexible, reusable</Tooltip> | <Tooltip text="Requires manual guard code and maintenance">Manual maintenance</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Data parsing</Tooltip> |

## Real-World Example

```typescript
function groupBy<T, K extends PropertyKey>(items: readonly T[], keyOf: (t: T) => K): Record<K, T[]> {
  return items.reduce((acc, item) => {
    const k = keyOf(item);
    (acc[k] ||= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}
```

Constrained generics enable reusable, type-safe utilities without enumerating every variant.

## See Also

- [Type Narrowing & Refinement Strategies](./type-narrowing-strategies.md) - Overview of all narrowing approaches


