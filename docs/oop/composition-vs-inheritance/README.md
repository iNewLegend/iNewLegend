![img_1.png](img_1.png)

**Composition** and **inheritance** are two fundamental concepts in object-oriented programming (**OOP**) that define how classes can relate to each other. Each has its strengths and is used in different scenarios based on the design needs.

### **Inheritance**
* **What It Is:** Inheritance allows a class (the _child_ or _subclass_) to inherit attributes and methods from another class (the _parent_ or _superclass_).
* **How It Works:** The subclass automatically acquires the properties and behaviors (methods) of the superclass. It can also override or extend these behaviors.
* **When to Use:**
  * When there is a clear `is-a` relationship. For example, if you have a `Bird` class and create a `Sparrow` class, `Sparrow` _is a_ `Bird`.
  * When you want to leverage polymorphism, allowing different types of objects to be treated uniformly through a common superclass interface.
* **Advantages:**
  * Promotes code reuse by inheriting common functionality.
  * Establishes a clear hierarchy and logical structure.
  * Polymorphism through method overriding allows for flexible and dynamic code behavior.
* **Disadvantages:**
  * Can lead to tightly coupled code, making changes in the superclass affect all subclasses.
  * Difficult to adapt or modify without affecting the entire hierarchy.
  * Often results in deep and complex inheritance chains that are hard to manage and understand.

### **Composition**
* **What It Is:** Composition involves building complex types by combining objects of other types. Rather than inheriting behavior, one class contains instances of other classes and delegates work to them.
* **How It Works:** A class is composed of one or more objects from other classes, establishing a `has-a` relationship. For example, a `Car` class might be composed of `Engine`, `Wheel`, and `Seat` objects.
* **When to Use:**
  * When there is a `has-a` relationship. For example, a `Car` _has a_ `Engine`.
  * When you want to build more flexible systems that are easier to modify and extend without altering existing code.
  * When favoring delegation over inheritance, allowing more modular and decoupled designs.
* **Advantages:**
  * Promotes loose coupling, making the system easier to maintain and extend.
  * Enhances flexibility by allowing dynamic composition of objects at runtime.
  * Easier to change behaviors by swapping out components without affecting the entire system.
* **Disadvantages:**
  * Can lead to more complex object management, with potentially many layers of delegation.
  * Sometimes more verbose and less straightforward than inheritance, especially for simple use cases.
  * Requires careful design to ensure that composed objects interact correctly and consistently.

### **Scenario: Animal Communication and Movement**
Animals that can have different communication methods and modes of movement. Inheritance might lead to complexity and rigidity, whereas composition offers a more adaptable solution.

### **Inheritance Example:**

```mermaid
classDiagram
    class Animal {
      +eat()
      +sleep()
    }
    class Communication {
      +makeSound()
    }
    class Movement {
      +move()
    }
    Animal <|-- Communication
    Animal <|-- Movement
    class Mammal {
      +roar()
    }
    class Bird {
      +chirp()
    }
    class Land {
      +walk()
    }
    class Water {
      +swim()
    }
    Communication <|-- Mammal
    Communication <|-- Bird
    Movement <|-- Land
    Movement <|-- Water
    class Lion {
      +roar()
    }
    class Cat {
      +meow()
    }
    class Sparrow {
      +chirp()
    }
    class Elephant {
      +walk()
    }
    class Shark {
      +swim()
    }
    Mammal <|-- Lion
    Mammal <|-- Cat
    Bird <|-- Sparrow
    Land <|-- Elephant
    Water <|-- Shark
```

```typescript
// Base class
class Animal {
    eat() {
        console.log("Eating...");
    }
    
    sleep() {
        console.log("Sleeping...");
    }
}

// Derived classes
class Bird extends Animal {
    fly() {
        console.log("Flying...");
    }
}
class Fish extends Animal {
    swim() {
        console.log("Swimming...");
    }
}
class Monkey extends Animal {
    climb() {
        console.log("Climbing...");
    }
}

// Specific animals
class Sparrow extends Bird {
    chirp() {
        console.log("Chirping...");
    }
}
class Shark extends Fish {
    hunt() {
        console.log("Hunting...");
    }
}
class Lion extends Animal {
    roar() {
        console.log("Roaring...");
    }
}

const sparrow = new Sparrow();
sparrow.eat(); // Eating...
sparrow.sleep(); // Sleeping...
sparrow.fly(); // Flying...
sparrow.chirp(); // Chirping...

const shark = new Shark();
shark.eat(); // Eating...
shark.sleep(); // Sleeping...
shark.swim(); // Swimming...
shark.hunt(); // Hunting...

const lion = new Lion();
lion.eat(); // Eating...
lion.sleep(); // Sleeping...
lion.roar(); // Roaring...
```

### Problem with Inheritance
As you can see, we've modeled different animals with specific abilities using inheritance. However, this approach has several limitations:
- **Limited to One Ability**: Each animal class can only inherit from one parent class. This means if you want to model an animal that can both fly and swim (e.g., a flying fish), you can't do this directly with inheritance.
- **Duplicate Code**: If multiple animals share the same abilities but don't fit into the same inheritance hierarchy, you'll need to duplicate code.
- **Rigid Structure**: The inheritance model is rigid. If you later need to add new abilities or modify existing ones, you might need to refactor the entire hierarchy.

### Conclusion
This inheritance approach works well for simple cases but becomes problematic as soon as you need to model animals with multiple abilities or when you need to add new abilities. The rigid structure of inheritance can lead to a less flexible and harder-to-maintain codebase. Next, we'll explore a composition-based approach that provides a more flexible and scalable solution.
## **Composition Example:**
```mermaid
classDiagram
    class Animal {
      +eat()
      +sleep()
    }
    class Communication {
      +makeSound()
    }
    class Movement {
      +move()
    }
    class Behavior {
      +display()
    }
    class Vocalize {
      +chirp()
    }
    class Echolocate {
      +click()
    }
    class Walk {
      +walk()
    }
    class Swim {
      +swim()
    }
    class Camouflage {
      +hide()
    }

    Animal o-- Behavior
    Animal o-- Movement
    Animal o-- Communication
    
    Communication <|-- Vocalize
    Communication <|-- Echolocate
    
    Movement <|-- Walk
    Movement <|-- Swim
    
    Behavior <|-- Camouflage

    class Sparrow {
      +chirp()
    }
    class Bat {
      +click()
    }
    class Lion {
      +roar()
    }
    class Shark {
      +swim()
    }
    class Chameleon {
      +hide()
    }

    Vocalize <|-- Sparrow
    Echolocate <|-- Bat
    Vocalize <|-- Lion
    Swim <|-- Shark
    Camouflage <|-- Chameleon
    Walk <|-- Lion
    Walk <|-- Chameleon
```

```typescript
// Ability interface
interface Ability {
  name: string;
  execute(): void;
}

// Ability classes
class FlyingAbility implements Ability {
  name = 'fly';
  execute() {
    console.log("Flying...");
  }
}

class SwimmingAbility implements Ability {
  name = 'swim';
  execute() {
    console.log("Swimming...");
  }
}

class ClimbingAbility implements Ability {
  name = 'climb';
  execute() {
    console.log("Climbing...");
  }
}

class RoaringAbility implements Ability {
  name = 'roar';
  execute() {
    console.log("Roaring...");
  }
}

class ChirpingAbility implements Ability {
  name = 'chirp';
  execute() {
    console.log("Chirping...");
  }
}

class HuntingAbility implements Ability {
  name = 'hunt';
  execute() {
    console.log("Hunting...");
  }
}

class CamouflageAbility implements Ability {
  name = 'hide';
  execute() {
    console.log("Hiding...");
  }
}

// Animal class with composition of abilities
class Animal {
  private abilities: { [key: string]: Ability };

  constructor(abilities: Ability[]) {
    this.abilities = {};
    for (const ability of abilities) {
      this.abilities[ability.name] = ability;
    }
  }

  eat() {
    console.log("Eating...");
  }

  sleep() {
    console.log("Sleeping...");
  }

  useAbility(abilityName: string) {
    const ability = this.abilities[abilityName];
    if (ability) {
      ability.execute();
    } else {
      console.log(`Ability ${abilityName} not found.`);
    }
  }
}

// Compose abilities with animals
class Sparrow extends Animal {
  constructor() {
    super([new FlyingAbility(), new ChirpingAbility()]);
  }
}

class Shark extends Animal {
  constructor() {
    super([new SwimmingAbility(), new HuntingAbility()]);
  }
}

class Lion extends Animal {
  constructor() {
    super([new RoaringAbility()]);
  }
}

// Example usage:
const sparrow = new Sparrow();
sparrow.eat(); // Eating...
sparrow.sleep(); // Sleeping...
sparrow.useAbility('fly'); // Flying...
sparrow.useAbility('chirp'); // Chirping...

const shark = new Shark();
shark.eat(); // Eating...
shark.sleep(); // Sleeping...
shark.useAbility('swim'); // Swimming...
shark.useAbility('hunt'); // Hunting...

const lion = new Lion();
lion.eat(); // Eating...
lion.sleep(); // Sleeping...
lion.useAbility('roar'); // Roaring...
```

### Explanation
- **Ability Classes**: Define reusable abilities (`FlyingAbility`, `SwimmingAbility`, `ClimbingAbility`, `RoaringAbility`, `ChirpingAbility`, `HuntingAbility`, `CamouflageAbility`) that can be mixed and matched.
- **Animal Class**: Uses composition to include multiple abilities by aggregating ability instances and delegating method calls to these abilities.
- **Specific Animals**: Combine different abilities as needed for each specific animal.

### Advantages of Composition
- **Flexible Ability Assignment**: Animals can have multiple abilities, and abilities can be easily combined or changed without altering the class hierarchy.
- **Code Reusability**: Ability classes
- **Easy Extension**: New abilities can be added or modified without affecting existing code.

This composition-based approach provides a more flexible and maintainable solution compared to a rigid inheritance hierarchy.

### **Summary:**
* **Inheritance:** Results in a rigid and complex hierarchy that is challenging to extend and manage, particularly when animals have multiple overlapping traits.
* **Composition:** Provides a flexible, maintainable solution for sharing abilities among various animals. modular approach allowing for the easy combination of different abilities and behaviors, accommodating new traits and reducing complexity.