# TypeScript - Class Hierarchies with instanceof

import Tooltip from '@site/src/components/mdx/tooltip';

Class hierarchies model variants using inheritance. You narrow types at runtime with `instanceof`, leveraging JavaScript's prototype chain and TypeScript's control-flow analysis.

## What is this pattern?

Define a base class and multiple subclasses. Functions accept the base type and branch using `instanceof` to access subclass-specific members safely.

## Syntax

```typescript
class Shape {}
class Circle extends Shape { constructor(public radius: number) { super(); } }
class Square extends Shape { constructor(public side: number) { super(); } }

function area(s: Shape) {
  if (s instanceof Circle) return Math.PI * s.radius * s.radius;
  if (s instanceof Square) return s.side * s.side;
}
```

## Non-Technical Interpretation

Like roles in an organization: everyone is an Employee, but Managers and Engineers have distinct responsibilities. You identify which role someone has and act accordingly.

## Example (Non-Programming Context)

```typescript
class Employee {}
class Manager extends Employee { constructor(public teamSize: number) { super(); } }
class Engineer extends Employee { constructor(public language: string) { super(); } }

function describe(e: Employee) {
  if (e instanceof Manager) return `Manages ${e.teamSize}`;
  if (e instanceof Engineer) return `Codes in ${e.language}`;
}
```

## Technical Interpretation

`instanceof` narrows to the constructor's type at runtime. It works across module boundaries when the prototype chain is preserved. It does not work for plain object literals.

## Example (Programming Context)

### Basic Usage

```typescript
abstract class Result<T> { }
class Ok<T> extends Result<T> { constructor(public data: T) { super(); } }
class Err<T> extends Result<T> { constructor(public message: string) { super(); } }

function unwrap<T>(r: Result<T>): T {
  if (r instanceof Ok) return r.data;
  throw new Error((r as Err<T>).message);
}
```

### Cross-Module Considerations

```typescript
// Ensure classes come from the same module instance so instanceof works reliably.
```

### Composition with Interfaces

```typescript
interface Drawable { draw(): void }
class CanvasCircle implements Drawable { constructor(public radius: number) {} draw() {} }
```

## Benefits

### 1. Encapsulation and methods
```typescript
class Circle { constructor(public radius: number) {} area() { return Math.PI * this.radius ** 2 } }
```

### 2. Familiar OO semantics
```typescript
class Animal {} class Dog extends Animal {}
function isDog(a: Animal) { return a instanceof Dog }
```

### 3. Works at runtime
```typescript
function isCircle(s: unknown): boolean { return s instanceof (globalThis as any).Circle }
```

## When to Use

### ✅ Use when:
- You already have behaviorful classes
- You control construction and prototypes
- You need runtime checks across boundaries

### ❌ Avoid when:
- Data is plain objects
- Serialization/deserialization is common
- Tree-shaking and POJO ergonomics are preferred

## Comparison

| Pattern | When to Use | Pros | Cons | Example Use Case |
|---------|-------------|------|------|------------------|
| **Class hierarchies** | <Tooltip text="Use when variants have methods/behavior and you control construction">Behavior-rich domains</Tooltip> | <Tooltip text="Variants encapsulate logic and expose methods">Methods, encapsulation</Tooltip> | <Tooltip text="Classes add runtime cost and complicate serialization">Runtime overhead</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Error handling, UI components</Tooltip> |
| **Discriminated union** | <Tooltip text="Use when variants are plain data and need exhaustive checks">Data-centric variants</Tooltip> | <Tooltip text="Strong compile-time checks across all cases">Exhaustive, lightweight</Tooltip> | <Tooltip text="No methods or behavior embedded in the data">No behavior</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">API responses, state</Tooltip> |
| **In-operator** | <Tooltip text="Use when variants can be distinguished by property presence">Structural unions</Tooltip> | <Tooltip text="No explicit tag needed, works with POJOs">Simple, no tags</Tooltip> | <Tooltip text="Optional keys can lead to ambiguous narrowing">Optional key issues</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">Shape variants</Tooltip> |
| **Type guards** | <Tooltip text="Use for external/untrusted data that needs validation">External data</Tooltip> | <Tooltip text="Flexible, reusable runtime checks">Flexible validation</Tooltip> | <Tooltip text="Requires writing and maintaining guard functions">Manual maintenance</Tooltip> | <Tooltip text="Common scenarios where this pattern works well">API parsing</Tooltip> |

## Real-World Example

```typescript
class HttpError extends Error { constructor(public status: number, msg: string){ super(msg) } }
class ValidationError extends Error { constructor(public issues: string[]){ super("Invalid") } }

function handle(e: Error) {
  if (e instanceof HttpError) return e.status;
  if (e instanceof ValidationError) return e.issues.length;
  return 500;
}
```

Class-based narrowing fits behavior-rich domains, while data-centric domains may prefer unions.

## See Also

- [Type Narrowing & Refinement Strategies](./type-narrowing-strategies.md) - Overview of all narrowing approaches


