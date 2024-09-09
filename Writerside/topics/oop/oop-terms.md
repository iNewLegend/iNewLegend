# OOP - Terms


## Interface — `in-ter-feys` {id="interface"}

**Interface** is a [noun](dictionary.md#noun) in the board field of computer science, an interface often refers to the
medium through which two systems communicate or interact.

### Non-Technical Interpretation {id="non-technical-interpretation_12"}
In everyday life, an interface can refer to the point of interaction between two entities, such as a person and a machine.

### Example (Non-Programming Context) {id="example-non-programming-context_9"}
Consider a user interface on a smartphone:
**User Interaction**:
1. **Touchscreen**: The user interacts with the phone through the touchscreen interface.
2. **Buttons**: Physical buttons on the phone provide additional interfaces for user input.
3. **Voice Commands**: Voice recognition software offers an alternative interface for user interaction.

### Technical Interpretation {id="technical-interpretation_13"}
In programming, an interface defines a set of methods that a class must implement. It serves as a contract for how different parts of a program can interact.

### Example (Programming Context) {id="example-programming-context_9"}
Consider an interface for a shape in a drawing application:
**Shape Interface**:
1. **Methods**: The interface defines methods like `draw` and `move` that must be implemented by classes representing different shapes.
2. **Implementation**: Classes like `Circle` and `Rectangle` implement the shape interface by providing their own versions of the required methods.

```typescript
interface Shape {
    draw(): void;
    move(x: number, y: number): void;
}

class Circle implements Shape {
    draw() {
        // Draw a circle
    }

    move(x: number, y: number) {
        // Move the circle to a new position
    }
}

class Rectangle implements Shape {
    draw() {
        // Draw a rectangle
    }

    move(x: number, y: number) {
        // Move the rectangle to a new position
    }
}
```

## Abstraction — `ab-strak-shun` {id="abstraction"}

**Abstraction** is a [noun](dictionary.md#noun) that refers to the process of hiding complex implementation details while exposing only the necessary functionality.

### Non-Technical Interpretation {id="non-technical-interpretation_13"}
In everyday life, abstraction can refer to simplifying complex concepts or ideas to make them easier to understand.

### Technical Interpretation {id="technical-interpretation_14"}
In programming, abstraction allows developers to work with high-level concepts without worrying about low-level implementation details.

### Example (Programming Context) {id="example-programming-context_10"}
Consider a car as an abstraction:
**Car Abstraction**:
1. **Functionality**: A driver interacts with the car through interfaces like the steering wheel, pedals, and dashboard.
2. **Implementation**: The internal components like the engine, transmission, and suspension are hidden from the driver.

```typescript
interface Car {
    start(): void;
    stop(): void;
    accelerate(speed: number): void;
    brake(): void;
}

class Sedan implements Car {
    start() {
        // Start the sedan
    }

    stop() {
        // Stop the sedan
    }

    accelerate(speed: number) {
        // Accelerate the sedan to the given speed
    }

    brake() {
        // Apply the brakes to stop the sedan
    }
}
```

3. **Explanation**: The driver interacts with the car through the defined methods like `start`, `stop`, `accelerate`, and `brake`. The internal workings of the car, such as the engine and transmission, are abstracted away, allowing the driver to focus on using the car's features without worrying about the underlying complexity.

## Encapsulation — `en-kap-suh-ley-shun` {id="encapsulation"}

**Encapsulation** is a [noun](dictionary.md#noun)
that refers to the bundling of data and methods that operate on that data into a single unit.

It promotes the separation of [concerns](dictionary.md#concerns) and data hiding, making it easier to reason about and maintain
, and reuse code.

### Non-Technical Interpretation {id="non-technical-interpretation_14"}
In everyday life, encapsulation can be compared to a capsule or container that holds related items together.

### Technical Interpretation {id="technical-interpretation_15"}
In programming, encapsulation helps in organizing code by grouping related data and functions together.

### Example (Programming Context) {id="example-programming-context_11"}
Consider a class representing a bank account:
**Bank Account Encapsulation**:
1. **Data**: The account balance and account number are private data members of the class.
2. **Methods**: Functions like `deposit`, `withdraw`, and `getBalance` operate on the account data.
3. **Access Control**: The data is encapsulated within the class, and external code interacts with the account through defined methods.

```typescript
class BankAccount {
    private accountNumber: string;
    private balance: number;

    constructor(accountNumber: string, initialBalance: number) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    deposit(amount: number) {
        this.balance += amount;
    }

    withdraw(amount: number) {
        if (amount <= this.balance) {
            this.balance -= amount;
        } else {
            console.log('Insufficient funds');
        }
    }

    getBalance() {
        return this.balance;
    }
}
```

4. **Explanation**: The `BankAccount` class encapsulates the account number and balance as private data members. The `deposit` and `withdraw` methods allow external code to interact with the account by depositing or withdrawing funds. The `getBalance` method provides read-only access to the account balance, ensuring that the data is accessed and modified through defined interfaces.

## Polymorphism — `pol-ee-mawr-fiz-uhm` {id="polymorphism"}

**Polymorphism** is a [noun](dictionary.md#noun) that refers to the ability of objects to take on multiple forms or types.
It is a fundamental concept in object-oriented programming that allows objects of different classes to be treated as objects of a common superclass.

### Technical Interpretation {id="technical-interpretation_16"}
In typescript, it enables a single interface or a method to to work with different types of objects, providing 
flexibility and reusability in code. The tree main types of polymorphism are:

1. **Subtype Polymorphism**: Objects of different classes can be treated as objects of a common superclass.
   * **Example**: A `Dog` and a `Cat` class can both be treated as `Animal` objects.
2. **Parametric Polymorphism**: Functions or classes can operate on generic types, allowing for flexibility in data types.
   * **Example**: A generic `List<T>` class can store elements of any type `T`.
3. **Ad-hoc Polymorphism**: Functions can behave differently based on the types of arguments passed to them.
    * **Example**: An `add` function can add numbers, concatenate strings, or merge arrays based on the argument types.


<chapter title="Polymorphism Vs Inheritance" id="polymorphism-vs-inheritance">

**Inheritance**:
Inheritance is one in which a new class is created that inherits the properties of the already exist class. It supports the concept of code reusability and reduces the length of the code in object-oriented programming.

Types of Inheritance are:

* Single inheritance
* Multi-level inheritance
* Multiple inheritance
* Hybrid inheritance
* Hierarchical inheritance

**Polymorphism**:
Polymorphism is that in which we can perform a task in multiple forms or ways. It is applied to the functions or methods. Polymorphism allows the object to decide which form of the function to implement at compile-time as well as run-time.

**Types of Polymorphism are:**
* Compile-time polymorphism (Method overloading)
* Run-time polymorphism (Method Overriding)
* Hopefully that makes it clear as to what the differences are. Here is a comparison table.


| Inheritance                                                                                                                                | Polymorphism                                                                                                                                     |
|--------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| Inheritance is one in which a new class is created (derived class) that inherits the features from the already existing class(Base class). | Whereas polymorphism is that which can be defined in multiple forms.                                                                             |
| It is basically applied to classes.	                                                                                                       | Polymorphism allows the object to decide which form of the function to implement at compile-time (overloading) as well as run-time (overriding). |
| Inheritance can be single, hybrid, multiple, hierarchical and multilevel inheritance.	                                                     | Whereas it can be compiled-time polymorphism (overload) as well as run-time polymorphism (overriding).                                           |
| It is used in pattern designing.	                                                                                                          | While it is also used in pattern designing.                                                                                                      |

</chapter>

