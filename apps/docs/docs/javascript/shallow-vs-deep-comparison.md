# JavaScript — Shallow vs Deep Comparison

In JavaScript, **shallow** comparison and **deep** comparison refer to the way objects or arrays are compared, particularly in terms of how deeply their values are checked for equality.

## Shallow Comparison
Shallow comparison only checks if the values of primitive types(e.g., numbers, strings, booleans) or the references to
(memory addresses) of objects are equal.

Example:

```javascript
let a = 1;
let b = 1;
console.log(a === b); // true

let obj1 = { name: "John" };
let obj2 = { name: "John" };
console.log(obj1 === obj2); // false

```

In this case, even though both objects have the same property values, they are different objects in memory, so the
comparison returns `false`.

## Deep Comparison

Deep comparison, on the other hand, checks if the values of primitive types or the values of objects are equal, by traversing
the nested objects and arrays to check for equality.

Example:
```javascript
function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false;
    }

    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
        if (!deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
}

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
console.log(deepEqual(obj1, obj2)); // true
```

Here, `deepEqual` will recursively check nested properties, making sure both objects have identical structures and values. Thus, `obj1` and `obj2` are considered equal with deep comparison.

## Key Differences

- **Shallow Comparison**: Checks only the top-level values for equality.
- **Deep Comparison**: Checks all levels of nested objects and arrays for equality.