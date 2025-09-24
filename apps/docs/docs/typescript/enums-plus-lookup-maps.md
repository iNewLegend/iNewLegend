# TypeScript - Enums Plus Lookup Maps

import Tooltip from '@site/src/components/mdx/tooltip';

Combine enums (or union literals) with lookup maps to separate the choice of variant from the data or behavior, enabling fast, declarative dispatch.

## What is this pattern?

Use an enum/union to represent the kind, then map kinds to handlers or data. Dispatch by indexing the map, avoiding large switch statements.

## Syntax

```typescript
enum Method { Get = "GET", Post = "POST" }

const handlers: Record<Method, (url: string) => Promise<unknown>> = {
  [Method.Get]: async (u) => fetch(u).then(r => r.json()),
  [Method.Post]: async (u) => fetch(u, { method: "POST" }).then(r => r.json()),
};

async function call(m: Method, url: string) { return handlers[m](url) }
```

## Non-Technical Interpretation

Like a directory where a label points to a specific department. You look up the department by label and route accordingly.

## Example (Non-Programming Context)

```typescript
type Channel = "email" | "sms";

const notify: Record<Channel, (to: string, msg: string) => void> = {
  email: (to, msg) => console.log(`Email ${to}: ${msg}`),
  sms: (to, msg) => console.log(`SMS ${to}: ${msg}`),
};

function send(ch: Channel, to: string, msg: string) { notify[ch](to, msg) }
```

## Technical Interpretation

Maps encode behavior/data keyed by a finite set of variants. This supports table-driven design, easier configuration, and dead-code elimination.

## Example (Programming Context)

### With Union Literals

```typescript
type Status = "ok" | "error" | "pending";

const messages: Record<Status, string> = {
  ok: "All good",
  error: "Something failed",
  pending: "Please wait",
};

function message(s: Status) { return messages[s] }
```

### With Data and Functions

```typescript
type Format = "json" | "text";

const readers: Record<Format, (r: Response) => Promise<unknown>> = {
  json: r => r.json(),
  text: r => r.text(),
};
```

### Partial Maps with Defaults

```typescript
const partial: Partial<Record<Status, number>> = { ok: 200 };
const code = partial["error"] ?? 500;
```

## Benefits

### 1. Table-driven dispatch
```typescript
const ops: Record<string, (a: number, b: number) => number> = { add: (a,b)=>a+b }
```

### 2. Extensibility
```typescript
function addHandler<K extends PropertyKey, F extends (...a: never[]) => unknown>(m: Record<K, F>, k: K, f: F) { m[k] = f }
```

### 3. Dead-code friendly
```typescript
// Unused map entries can be tree-shaken if not referenced
```

## When to Use

### ✅ Use when:
- You prefer configuration over branching
- Variants map cleanly to handlers/data

### ❌ Avoid when:
- Handlers require deep coupling between variants
- You need structural narrowing within variant payloads

## Comparison

| Pattern | When to Use | Pros | Cons | Example Use Case |
|---------|-------------|------|------|------------------|
| **Enums + maps** | <Tooltip text="Use when config tables map variants to handlers/data">Table-driven dispatch</Tooltip> | <Tooltip text="Clear configuration over branching logic">Declarative, configurable</Tooltip> | <Tooltip text="Payload types live outside the table">Separate payload typing</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Route handlers, validators</Tooltip> |
| **Discriminated union** | <Tooltip text="Use when variants are data and need exhaustive handling">Data variants</Tooltip> | <Tooltip text="Strong exhaustiveness and clear branching">Exhaustive, lightweight</Tooltip> | <Tooltip text="Can lead to verbose switch statements">Switch-heavy</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">State machines, responses</Tooltip> |
| **Function overloading** | <Tooltip text="Use when one function supports multiple signatures">Multiple signatures</Tooltip> | <Tooltip text="Great developer experience for callers">Ergonomic, precise</Tooltip> | <Tooltip text="Implementation must branch internally">Complex implementation</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Utility functions</Tooltip> |
| **Pattern matching** | <Tooltip text="Use for complex/nested decisions with exhaustiveness">Complex matching</Tooltip> | <Tooltip text="Highly readable and exhaustive by design">Declarative, exhaustive</Tooltip> | <Tooltip text="Adds a dependency and learning curve">Dependency cost</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Nested data processing</Tooltip> |

## Real-World Example

```typescript
type Route = "home" | "about" | "contact";

const routes: Record<Route, () => void> = {
  home: () => console.log("Home"),
  about: () => console.log("About"),
  contact: () => console.log("Contact"),
};

function navigate(r: Route) { routes[r]() }
```

Enums plus lookup maps provide compact, configurable dispatch without verbose branching.

## See Also

- [Type Narrowing & Refinement Strategies](./type-narrowing-strategies.md) - Overview of all narrowing approaches


