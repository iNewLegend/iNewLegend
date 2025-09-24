# TypeScript - Discriminated Unions

import Tooltip from '@site/src/components/mdx/tooltip';

Discriminated unions (also called tagged unions) are a TypeScript pattern that lets you model a value that can be one of several variants, with each variant identified by a common discriminant property.

## What are Discriminated Unions?

A discriminated union is a union of object types that all share a single literal property (the discriminant). TypeScript uses this property to safely narrow the union during control flow.

## Syntax

```typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "rectangle"; width: number; height: number };
```

## Non-Technical Interpretation

Think of a box that may contain different items. Each item has a label that clearly states what it is. By reading the label, you instantly know which item you have and how to handle it.

## Example (Non-Programming Context)

```typescript
type Package =
  | { type: "letter"; pages: number }
  | { type: "parcel"; weightKg: number }
  | { type: "tube"; lengthCm: number };

function shippingCost(pkg: Package) {
  switch (pkg.type) {
    case "letter":
      return pkg.pages * 0.1;
    case "parcel":
      return pkg.weightKg * 2;
    case "tube":
      return pkg.lengthCm * 0.05;
  }
}
```

## Technical Interpretation

With a shared literal property, TypeScript performs control-flow analysis to narrow the type to the correct variant. This enables property-safe access and exhaustiveness checking.

## Example (Programming Context)

### Basic Usage

```typescript
type Result<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string };

function handleResult<T>(res: Result<T>) {
  if (res.status === "success") {
    return res.data;
  }

  return res.message;
}
```

### Switch Narrowing

```typescript
type Event =
  | { kind: "click"; x: number; y: number }
  | { kind: "keypress"; key: string }
  | { kind: "focus" };

function handleEvent(evt: Event) {
  switch (evt.kind) {
    case "click":
      return [evt.x, evt.y];
    case "keypress":
      return evt.key.toUpperCase();
    case "focus":
      return true;
  }
}
```

### Exhaustiveness Checking

```typescript
type Payment =
  | { method: "card"; last4: string }
  | { method: "paypal"; email: string };

function formatPayment(p: Payment): string {
  switch (p.method) {
    case "card":
      return `Card •••• ${p.last4}`;
    case "paypal":
      return `PayPal ${p.email}`;
    default: {
      const _exhaustive: never = p;
      return _exhaustive;
    }
  }
}
```

### Nested Discriminated Unions

```typescript
type FetchState<T> =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "loaded"; result: { status: "success"; data: T } | { status: "error"; message: string } };

function getMessage<T>(s: FetchState<T>) {
  if (s.state === "loaded") {
    if (s.result.status === "success") return "OK";
    return s.result.message;
  }

  return s.state;
}
```

## Benefits of Discriminated Unions

### 1. Type-Safe Narrowing
```typescript
type FileOp =
  | { op: "read"; path: string }
  | { op: "write"; path: string; contents: string };

function perform(op: FileOp) {
  if (op.op === "read") {
    return op.path;
  }

  return op.contents.length;
}
```

### 2. Better IntelliSense
```typescript
type Notification =
  | { kind: "email"; to: string; subject: string }
  | { kind: "sms"; to: string; text: string };

function preview(n: Notification) {
  if (n.kind === "email") return n.subject;
  return n.text;
}
```

### 3. Exhaustiveness Guarantees
```typescript
type State = { t: "a" } | { t: "b" } | { t: "c" };

function f(s: State) {
  switch (s.t) {
    case "a":
      return 1;
    case "b":
      return 2;
    case "c":
      return 3;
    default: {
      const _never: never = s;
      return _never;
    }
  }
}
```

## When to Use Discriminated Unions

### ✅ Use when:
- You have variants identified by a stable literal tag
- You need safe property access based on control flow
- You want compile-time checks for completeness

### ❌ Avoid when:
- Variants cannot share a reliable discriminant
- External data lacks trustworthy tags
- All variants have identical shape

## Comparison with Related Patterns

| Pattern | When to Use | Pros | Cons | Example Use Case |
|---------|-------------|------|------|------------------|
| **Discriminated union** | <Tooltip text="Use when you have variants with different data structures that need to be distinguished at compile time">Variants with distinct payloads</Tooltip> | <Tooltip text="TypeScript ensures all cases are handled and provides precise type inference">Exhaustive, type-safe</Tooltip> | <Tooltip text="You must add a literal property (like 'kind' or 'type') to distinguish variants">Requires explicit tag</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">API responses, state machines</Tooltip> |
| **Union of primitives** | <Tooltip text="Use for simple choices between basic types like strings, numbers, or booleans">Simple scalar choices</Tooltip> | <Tooltip text="Minimal code and complexity required">Minimal ceremony</Tooltip> | <Tooltip text="Cannot carry additional data with each variant">No payload data</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Status flags, modes</Tooltip> |
| **Class hierarchies** | <Tooltip text="Use when variants need methods and behavior, not just data">Behavior-rich domains</Tooltip> | <Tooltip text="Each variant can have its own methods and encapsulated behavior">Encapsulation, methods</Tooltip> | <Tooltip text="Classes have runtime overhead and are harder to serialize">Runtime overhead</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Error types, UI components</Tooltip> |
| **Type guards** | <Tooltip text="Use when validating data from external sources or user input">External/untrusted data</Tooltip> | <Tooltip text="Can handle complex validation logic and be reused across your codebase">Flexible validation</Tooltip> | <Tooltip text="You need to write and maintain custom validation functions">Manual maintenance</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">API parsing, form validation</Tooltip> |
| **In-operator** | <Tooltip text="Use when variants can be distinguished by the presence of specific properties">Structural unions</Tooltip> | <Tooltip text="No need to add explicit tags, works with existing object shapes">Simple, no tags</Tooltip> | <Tooltip text="Optional properties can make narrowing confusing or unreliable">Optional key confusion</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Shape variants, configs</Tooltip> |

## Real-World Example

```typescript
type ApiResponse<T> =
  | { type: "ok"; payload: T }
  | { type: "fail"; error: string }
  | { type: "pending" };

function render<T>(r: ApiResponse<T>) {
  switch (r.type) {
    case "ok":
      return r.payload;
    case "fail":
      return r.error;
    case "pending":
      return "Loading";
  }
}
```

Discriminated unions enable precise, maintainable modeling of variant data with strong type safety and clear control-flow driven narrowing.

## See Also

- [Type Narrowing & Refinement Strategies](./type-narrowing-strategies.md) - Overview of all narrowing approaches


