# TypeScript - Sum Types via Classes with visit

import Tooltip from '@site/src/components/mdx/tooltip';

Emulate sum types by modeling each variant as a class and exposing a `visit` (or `match`) method to perform exhaustive, type-safe dispatch without external switches.

## What is this pattern?

Each variant is a class implementing a shared interface with a `visit` method that accepts a visitor object. The visitor has a method per variant. The class invokes the correct method.

## Syntax

```typescript
interface ResultVisitor<T, R> {
  ok(data: T): R
  error(message: string): R
}

interface Result<T> { visit<R>(v: ResultVisitor<T, R>): R }

class Ok<T> implements Result<T> {
  constructor(public data: T) {}
  visit<R>(v: ResultVisitor<T, R>): R { return v.ok(this.data) }
}

class ErrorResult<T> implements Result<T> {
  constructor(public message: string) {}
  visit<R>(v: ResultVisitor<T, R>): R { return v.error(this.message) }
}
```

## Non-Technical Interpretation

Like ringing the right department: you call the general number, and the system routes you to the appropriate specialist automatically.

## Example (Non-Programming Context)

```typescript
interface PackageVisitor<R> {
  letter(pages: number): R
  parcel(weightKg: number): R
}

interface Package { visit<R>(v: PackageVisitor<R>): R }

class Letter implements Package { constructor(public pages: number) {} visit<R>(v: PackageVisitor<R>) { return v.letter(this.pages) } }
class Parcel implements Package { constructor(public weightKg: number) {} visit<R>(v: PackageVisitor<R>) { return v.parcel(this.weightKg) } }
```

## Technical Interpretation

Visitor-based dispatch keeps variant logic encapsulated. It reduces external branching and can improve discoverability of missing cases via interface changes.

## Example (Programming Context)

### Basic Usage

```typescript
function render<T>(r: Result<T>) {
  return r.visit<string>({
    ok: (d) => JSON.stringify(d),
    error: (m) => `Error: ${m}`,
  })
}
```

### Extensibility

```typescript
class Pending<T> implements Result<T> {
  visit<R>(v: ResultVisitor<T, R>): R { return (v as any).pending?.() ?? ("pending" as unknown as R) }
}
```

### Interop with Classes

```typescript
abstract class Expr { abstract visit<R>(v: { lit(n: number): R; add(l: Expr, r: Expr): R }): R }
class Lit extends Expr { constructor(public n: number){ super() } visit<R>(v: { lit(n: number): R; add(l: Expr, r: Expr): R }){ return v.lit(this.n) } }
class Add extends Expr { constructor(public l: Expr, public r: Expr){ super() } visit<R>(v: { lit(n: number): R; add(l: Expr, r: Expr): R }){ return v.add(this.l, this.r) } }
```

## Benefits

### 1. Encapsulation
```typescript
// Logic lives with the variant
```

### 2. Exhaustive by interface
```typescript
// Adding a new variant requires updating the visitor
```

### 3. Object-oriented friendly
```typescript
// Plays well with behavior-rich domains
```

## When to Use

### ✅ Use when:
- Variants are behaviorful objects
- You prefer method dispatch over switches

### ❌ Avoid when:
- Data is plain, serialized objects
- You want minimal runtime constructs

## Comparison

| Pattern | When to Use | Pros | Cons | Example Use Case |
|---------|-------------|------|------|------------------|
| **Classes + visit** | <Tooltip text="Use when variants are objects with behavior and you prefer method dispatch">OO-style variants</Tooltip> | Encapsulation, methods | Boilerplate, overhead | AST nodes, UI components |
| **Discriminated union** | <Tooltip text="Use when variants are data and external branching is fine">Data variants</Tooltip> | Simple, lightweight | External branching | State machines, responses |
| **Pattern matching** | <Tooltip text="Use for expressive, exhaustive matching of complex shapes">Complex matching</Tooltip> | Declarative, exhaustive | Dependency cost | Nested data processing |
| **Type guards** | <Tooltip text="Use for custom runtime validation to refine unknowns">Runtime validation</Tooltip> | Flexible, reusable | Manual maintenance | Data parsing |

## Real-World Example

```typescript
interface FileVisitor<R> { file(path: string): R; dir(children: string[]): R }
interface Node { visit<R>(v: FileVisitor<R>): R }
class File implements Node { constructor(public path: string) {} visit<R>(v: FileVisitor<R>) { return v.file(this.path) } }
class Dir implements Node { constructor(public children: string[]) {} visit<R>(v: FileVisitor<R>) { return v.dir(this.children) } }
```

Class-based sum types with `visit` provide OO-style, exhaustive variant handling without external switches.

## See Also

- [Type Narrowing & Refinement Strategies](./type-narrowing-strategies.md) - Overview of all narrowing approaches


