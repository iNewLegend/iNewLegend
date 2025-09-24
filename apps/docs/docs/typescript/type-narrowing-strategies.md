# TypeScript - Type Narrowing & Refinement Strategies

import Tooltip from '@site/src/components/mdx/tooltip';

TypeScript provides multiple approaches to narrow types from broader to more specific types. This guide categorizes the main strategies available.

## Categories

### Primitive-Based Checks
- <Tooltip text="Narrow based on runtime primitive type (string, number, boolean, etc.)"><strong>typeof checks</strong></Tooltip>: `if (typeof x === "string") { x.toUpperCase() }`
- <Tooltip text="Use equality to narrow to a specific literal value within a union"><strong>Equality/literal checks</strong></Tooltip>: `if (status === "ok") { /* narrow to "ok" */ }`
- <Tooltip text="Filter out null/undefined/falsey to use a non-nullable type"><strong>Truthiness checks</strong></Tooltip>: `if (val) { /* val not null/undefined/falsey */ }`
- <Tooltip text="Detect arrays at runtime to safely access array properties"><strong>Array checks</strong></Tooltip>: `if (Array.isArray(v)) { v.length }`

### Structure/Property-Based Checks
- <Tooltip text="Narrow by checking if a key exists on an object at runtime"><strong>in-operator</strong></Tooltip>: `if ("radius" in shape) { shape.radius }`
- <Tooltip text="Use optional property presence to differentiate object variants"><strong>Property existence</strong></Tooltip>: Check for optional properties to narrow unions
- <Tooltip text="Validate expected keys and value types to narrow structurally"><strong>Shape checks</strong></Tooltip>: Structural validation of object properties

### Constructor/Class-Based Checks
- <Tooltip text="Narrow by testing the prototype chain against a constructor"><strong>instanceof checks</strong></Tooltip>: `if (err instanceof Error) { err.message }`
- <Tooltip text="Model variants as subclasses and narrow via instanceof"><strong>Class hierarchies</strong></Tooltip>: Use inheritance with runtime type checking

### Control-Flow Narrowing
- <Tooltip text="Switch on a discriminant (like kind/type) to reach specific cases"><strong>Switch statements</strong></Tooltip>: `switch (event.kind) { case "click": ... }`
- <Tooltip text="Force the compiler to warn when a union case is unhandled"><strong>Exhaustiveness with never</strong></Tooltip>: Default branch assigns to `never` to catch missing cases
- <Tooltip text="Preserve narrowed types by destructuring or keeping usage within guarded scope"><strong>Scoped narrowing</strong></Tooltip>: Destructure after guards to keep refined types

### User-Authored Refinements
- <Tooltip text="Custom predicates that refine types on the true branch"><strong>User-defined type guards</strong></Tooltip>: `function isX(v: T): v is X`
- <Tooltip text="Functions that throw on invalid input and refine upon return"><strong>Assertion functions</strong></Tooltip>: `function assertUser(u: unknown): asserts u is User`

### Data-Model-Driven Narrowing
- <Tooltip text="Union members share a literal tag (e.g., kind/type) enabling precise narrowing"><strong>Discriminated unions</strong></Tooltip>: Tagged unions enabling automatic control-flow narrowing
- <Tooltip text="Use literal equality to distinguish among scalar alternatives"><strong>Union of primitives</strong></Tooltip>: Simple unions narrowed via equality checks

### Library/Runtime-Aided Refinement
- <Tooltip text="Validate at runtime; successful parses return strongly typed values"><strong>Schema validation</strong></Tooltip>: `zod`, `io-ts` for runtime validation with type inference
- <Tooltip text="Declarative matching with compile-time exhaustiveness"><strong>Pattern matching libraries</strong></Tooltip>: `ts-pattern` for declarative, exhaustive matching

## Related Documentation

- [Discriminated Unions](./discriminated-unions.md) - Tagged unions with automatic narrowing
- [Class Hierarchies with instanceof](./class-hierarchies-instanceof.md) - Inheritance-based type checking
- [User-Defined Type Guards](./user-defined-type-guards.md) - Custom predicate functions
- [In-Operator Narrowing](./in-operator-narrowing.md) - Property existence checks
- [Function Overloading](./function-overloading.md) - Multiple signatures for variant handling
- [Generics with Constrained Shapes](./generics-with-constrained-shapes.md) - Parameterized types with constraints
- [Enums Plus Lookup Maps](./enums-plus-lookup-maps.md) - Enum-based dispatch patterns
- [Sum Types via Classes with visit](./sum-types-via-classes-visit.md) - Visitor pattern for exhaustive handling
- [Pattern Matching Libraries](./pattern-matching-libraries.md) - Declarative matching with libraries
- [Schema-Driven Refinement](./schema-driven-refinement.md) - Runtime validation with type inference
- [Union of Primitives/Structural Unions](./union-of-primitives-structural-unions.md) - Simple unions without explicit tags

## Choosing the Right Strategy

- **Use discriminated unions** when you have variants with distinct payloads and need exhaustiveness
- **Use instanceof** when working with class hierarchies and behavior-rich domains
- **Use type guards** when dealing with external/untrusted data
- **Use in-operator** for simple structural unions without explicit tags
- **Use function overloading** when you need precise call signatures
- **Use generics** for reusable, shape-agnostic utilities
- **Use schema validation** when you need runtime guarantees with type safety
- **Use pattern matching libraries** for complex, nested matching scenarios
