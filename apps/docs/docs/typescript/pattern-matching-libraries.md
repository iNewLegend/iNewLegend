# TypeScript - Pattern Matching Libraries

import Tooltip from '@site/src/components/mdx/tooltip';

Pattern matching libraries bring declarative, exhaustive matching to TypeScript, reducing boilerplate compared to manual `if`/`switch` chains.

## What is this pattern?

Use libraries like `ts-pattern` to match on union variants, literals, and shapes, with compile-time exhaustiveness and smart inference.

## Syntax

```typescript
import { match } from "ts-pattern";

type Result<T> = { status: "ok"; data: T } | { status: "error"; message: string } | { status: "pending" };

function render<T>(r: Result<T>) {
  return match(r)
    .with({ status: "ok" }, ({ data }) => JSON.stringify(data))
    .with({ status: "error" }, ({ message }) => `Error: ${message}`)
    .with({ status: "pending" }, () => "Loading")
    .exhaustive();
}
```

## Non-Technical Interpretation

Like a decision table where each row describes a case and its action, ensuring all cases are covered.

## Example (Non-Programming Context)

```typescript
type Package = { type: "letter"; pages: number } | { type: "parcel"; weightKg: number };

const cost = (p: Package) =>
  match(p)
    .with({ type: "letter" }, ({ pages }) => pages * 0.1)
    .with({ type: "parcel" }, ({ weightKg }) => weightKg * 2)
    .exhaustive();
```

## Technical Interpretation

Libraries provide a fluent API for matching on union discriminants and structure, leveraging TypeScript's types for inference and completeness checks.

## Example (Programming Context)

### Nested Matching

```typescript
type Response<T> = { ok: true; value: T } | { ok: false; error: { code: number; msg: string } };

const message = <T>(r: Response<T>) =>
  match(r)
    .with({ ok: true }, ({ value }) => String(value))
    .with({ ok: false, error: { code: 404 } }, () => "Not found")
    .with({ ok: false }, ({ error }) => error.msg)
    .exhaustive();
```

### Guards and Predicates

```typescript
const isEmail = (s: string) => /@/.test(s);

match("test@example.com")
  .when(isEmail, () => "valid")
  .otherwise(() => "invalid");
```

## Benefits

### 1. Exhaustiveness
```typescript
// .exhaustive() forces all cases to be handled
```

### 2. Readability
```typescript
// Declarative, chainable matchers reduce branching noise
```

### 3. Powerful shape matching
```typescript
// Match nested properties with ease
```

## When to Use

### ✅ Use when:
- You have many variants or nested patterns
- You want declarative, exhaustive matching

### ❌ Avoid when:
- You cannot add a dependency
- Simple `switch` is sufficient

## Comparison

| Pattern | When to Use | Pros | Cons | Example Use Case |
|---------|-------------|------|------|------------------|
| **Pattern matching** | <Tooltip text="Use for complex/nested cases requiring clear, exhaustive matching">Complex nested matching</Tooltip> | <Tooltip text="Fluent API with compile-time exhaustiveness">Readable, exhaustive</Tooltip> | <Tooltip text="Adds a dependency and bundle footprint">Extra dependency</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Nested data processing</Tooltip> |
| **Discriminated union** | <Tooltip text="Use when tagged variants suffice and nesting is shallow">Simple tagged variants</Tooltip> | <Tooltip text="Built-in TypeScript behavior, lightweight">Built-in, lightweight</Tooltip> | <Tooltip text="Nested branching can become verbose">Verbose for nesting</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">State machines, responses</Tooltip> |
| **Type guards** | <Tooltip text="Use for custom runtime checks and flexible refinement">Custom validation</Tooltip> | <Tooltip text="Very flexible and reusable">Flexible, reusable</Tooltip> | <Tooltip text="Must manually ensure all cases handled">Manual exhaustiveness</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Data parsing, validation</Tooltip> |
| **Switch statements** | <Tooltip text="Use for simple branching when a dependency is unnecessary">Simple cases</Tooltip> | <Tooltip text="No dependencies, familiar control flow">Built-in, familiar</Tooltip> | <Tooltip text="Must manually enforce completeness">Manual exhaustiveness</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Basic variant handling</Tooltip> |

## Real-World Example

```typescript
type Action =
  | { type: "inc" }
  | { type: "dec" }
  | { type: "set"; value: number };

const reducer = (state: number, action: Action) =>
  match(action)
    .with({ type: "inc" }, () => state + 1)
    .with({ type: "dec" }, () => state - 1)
    .with({ type: "set" }, ({ value }) => value)
    .exhaustive();
```

Pattern matching libraries deliver ergonomic, exhaustive control flow over complex unions and shapes.

## See Also

- [Type Narrowing & Refinement Strategies](./type-narrowing-strategies.md) - Overview of all narrowing approaches


