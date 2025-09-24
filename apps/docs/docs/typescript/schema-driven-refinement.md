# TypeScript - Schema-Driven Refinement

import Tooltip from '@site/src/components/mdx/tooltip';

Schema libraries validate data at runtime and provide inferred TypeScript types, enabling safe narrowing after successful validation.

## What is this pattern?

Use libraries like `zod` or `io-ts` to define schemas. Parse untrusted data; on success you get typed values, on failure you get structured errors.

## Syntax

```typescript
import { z } from "zod";

const User = z.object({ id: z.number(), email: z.string().email() });
type User = z.infer<typeof User>;

const result = User.safeParse(JSON.parse(input));
if (result.success) {
  const user: User = result.data;
}
```

## Non-Technical Interpretation

Like using a stencil: if the object fits the stencil, it passes and you can treat it as valid.

## Example (Non-Programming Context)

```typescript
const Package = z.discriminatedUnion("type", [
  z.object({ type: z.literal("letter"), pages: z.number().int().min(1) }),
  z.object({ type: z.literal("parcel"), weightKg: z.number().positive() }),
]);

type Package = z.infer<typeof Package>;
```

## Technical Interpretation

Schemas provide runtime validation and type inference. Discriminated unions in schema libraries mirror TypeScript unions for aligned runtime and compile-time guarantees.

## Example (Programming Context)

### Safe Parsing

```typescript
const Config = z.object({ api: z.object({ baseUrl: z.string().url(), timeout: z.number().int() }) });
type Config = z.infer<typeof Config>;

function load(env: unknown): Config {
  return Config.parse(env);
}
```

### Refinement and Transform

```typescript
const Port = z.number().int().min(1).max(65535);
const HostPort = z.object({ host: z.string(), port: Port }).transform(v => `${v.host}:${v.port}`);
```

### Async Validation

```typescript
const UniqueEmail = z.string().email().refine(async e => !(await exists(e)), { message: "taken" });
```

## Benefits

### 1. Runtime safety
```typescript
const parsed = User.safeParse(data)
```

### 2. Single source of truth
```typescript
type User = z.infer<typeof User>
```

### 3. Better errors
```typescript
// Structured diagnostics for invalid data
```

## When to Use

### ✅ Use when:
- Data comes from external/untrusted sources
- You need runtime guarantees and typed results

### ❌ Avoid when:
- Data is fully trusted and internal
- Overhead of validation is undesirable

## Comparison

| Pattern | When to Use | Pros | Cons | Example Use Case |
|---------|-------------|------|------|------------------|
| **Schema validation** | <Tooltip text="Use to validate untrusted data at runtime and get typed results">External/untrusted data</Tooltip> | <Tooltip text="Safety with structured error messages">Runtime safety, errors</Tooltip> | <Tooltip text="Adds dependency and validation cost">Dependency, cost</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">API contracts, configs</Tooltip> |
| **Discriminated union** | <Tooltip text="Use when internal data is tagged and runtime checks are unnecessary">Internal tagged data</Tooltip> | <Tooltip text="Zero runtime overhead with strong exhaustiveness">Zero runtime, exhaustive</Tooltip> | <Tooltip text="No runtime guarantees on external inputs">No runtime guarantees</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">State machines, responses</Tooltip> |
| **Type guards** | <Tooltip text="Use for bespoke runtime checks without a schema lib">Custom validation</Tooltip> | <Tooltip text="Flexible control with small footprint">Flexible, reusable</Tooltip> | <Tooltip text="Manual guard code and maintenance required">Manual maintenance</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Data parsing, validation</Tooltip> |
| **instanceof** | <Tooltip text="Use for class hierarchies where behavior matters">Class hierarchies</Tooltip> | <Tooltip text="Built-in, intuitive instanceof narrowing">Built-in, familiar</Tooltip> | <Tooltip text="Runtime cost and constructor coupling">Runtime overhead</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Error handling</Tooltip> |

## Real-World Example

```typescript
const ApiResponse = z.discriminatedUnion("ok", [
  z.object({ ok: z.literal(true), value: z.string() }),
  z.object({ ok: z.literal(false), error: z.object({ code: z.number(), msg: z.string() }) }),
]);

type ApiResponse = z.infer<typeof ApiResponse>;

function handle(r: unknown) {
  const res = ApiResponse.parse(r);
  return res.ok ? res.value : res.error.msg;
}
```

Schema-driven refinement aligns runtime validation with TypeScript's type system for robust, trustworthy data handling.

## See Also

- [Type Narrowing & Refinement Strategies](./type-narrowing-strategies.md) - Overview of all narrowing approaches


