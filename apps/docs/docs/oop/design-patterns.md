# OOP - Design Patterns 

## Introduction

Design patterns are proven solutions to common problems in software design. They represent best practices developed over
time by experienced software developers.

## Creation Patterns

Creation patterns are focused on the process of object creation.

### Singleton

Ensures a class has only one instance and provides a global point of access to it.

**Example:**

```php
class Singleton {
    private static $instance = null;

    private function __construct() { }

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Singleton();
        }
        return self::$instance;
    }
}
```

<!--- -------------------------------------------------------------- -->

### Factory Method

Defines an interface for creating an object but allows subclasses to alter the type of objects that will be created.

**Example:**

```php
interface Product {
    public function getType();
}

class ConcreteProduct implements Product {
    public function getType() {
        return "ConcreteProduct";
    }
}

class Creator {
    public function factoryMethod() {
        return new ConcreteProduct();
    }
}
```

<!--- -------------------------------------------------------------- -->

### Abstract Factory

Provides an interface for creating families of related or dependent objects without specifying their concrete classes.

**Example:**

```php
interface Button {
    public function render();
}

interface Checkbox {
    public function toggle();
}

class MacOSButton implements Button {
    public function render() {
        echo "Rendering a button in MacOS style.";
    }
}

class WindowsButton implements Button {
    public function render() {
        echo "Rendering a button in Windows style.";
    }
}

class MacOSCheckbox implements Checkbox {
    public function toggle() {
        echo "Toggling a checkbox in MacOS style.";
    }
}

class WindowsCheckbox implements Checkbox {
    public function toggle() {
        echo "Toggling a checkbox in Windows style.";
    }
}

interface GUIFactory {
    public function createButton(): Button;
    public function createCheckbox(): Checkbox;
}

class MacOSFactory implements GUIFactory {
    public function createButton(): Button {
        return new MacOSButton();
    }

    public function createCheckbox(): Checkbox {
        return new MacOSCheckbox();
    }
}

class WindowsFactory implements GUIFactory {
    public function createButton(): Button {
        return new WindowsButton();
    }

    public function createCheckbox(): Checkbox {
        return new WindowsCheckbox();
    }
}

// Usage
function renderUI(GUIFactory $factory) {
    $button = $factory->createButton();
    $checkbox = $factory->createCheckbox();

    $button->render();
    $checkbox->toggle();
}

// Example usage:
$factory = new MacOSFactory();
renderUI($factory);

$factory = new WindowsFactory();
renderUI($factory);
```

<!--- -------------------------------------------------------------- -->

### Builder

Separates the construction of a complex object from its representation, allowing the same construction process to create
different representations.

**Example:**

```typescript
class Burger {
    private size: number;
    private cheese: boolean;
    private pepperoni: boolean;
    private lettuce: boolean;
    private tomato: boolean;

    constructor(builder: BurgerBuilder) {
        this.size = builder.getSize();
        this.cheese = builder.hasCheese();
        this.pepperoni = builder.hasPepperoni();
        this.lettuce = builder.hasLettuce();
        this.tomato = builder.hasTomato();
    }

    public describe(): string {
        return `This is a ${this.size} inch burger with ` +
            (this.cheese ? 'cheese, ' : '') +
            (this.pepperoni ? 'pepperoni, ' : '') +
            (this.lettuce ? 'lettuce, ' : '') +
            (this.tomato ? 'tomato' : '') + ".";
    }
}

class BurgerBuilder {
    private size: number;
    private cheese: boolean = false;
    private pepperoni: boolean = false;
    private lettuce: boolean = false;
    private tomato: boolean = false;

    constructor(size: number) {
        this.size = size;
    }

    public addCheese(): BurgerBuilder {
        this.cheese = true;
        return this;
    }

    public addPepperoni(): BurgerBuilder {
        this.pepperoni = true;
        return this;
    }

    public addLettuce(): BurgerBuilder {
        this.lettuce = true;
        return this;
    }

    public addTomato(): BurgerBuilder {
        this.tomato = true;
        return this;
    }

    public build(): Burger {
        return new Burger(this);
    }

    // Getter methods for Burger class to access private properties
    public getSize(): number {
        return this.size;
    }

    public hasCheese(): boolean {
        return this.cheese;
    }

    public hasPepperoni(): boolean {
        return this.pepperoni;
    }

    public hasLettuce(): boolean {
        return this.lettuce;
    }

    public hasTomato(): boolean {
        return this.tomato;
    }
}

// Usage
const burger = new BurgerBuilder(14)
    .addCheese()
    .addPepperoni()
    .addLettuce()
    .build();

console.log(burger.describe());
```

<!--- -------------------------------------------------------------- -->

### Prototype

Prototype is a creation design pattern that allows cloning objects, even complex ones, without coupling to their specific classes. 
All prototype classes should have a common interface that makes it possible to copy objects even if their concrete classes are unknown. 
Prototype design pattern uses JavaScript's built-in `Object.create`.

**Example:**

```typescript
class Prototype {
    public primitive: any;
    public component: object;
    public circularReference: ComponentWithBackReference;

    public clone(): this {
        const clone = Object.create( this );
        clone.component = Object.create( this.component );

        // Cloning an object that has a back reference requires special
        // treatment. After the shallow copy is made, go back and 
        // correct the reference.
        clone.circularReference = {
            ... this.circularReference,
            prototype: { ... this },
        };

        return clone;
    }
}

class ComponentWithBackReference {
    public prototype;

    constructor( prototype: Prototype ) {
        this.prototype = prototype;
    }
}

// Usage
const p1 = new Prototype();
p1.primitive = 245;
p1.component = new Date();
p1.circularReference = new ComponentWithBackReference( p1 );

const p2 = p1.clone();

if ( p1.primitive === p2.primitive ) {
    console.log( 'Primitive field values carried over to a clone.' );
} else {
    console.log( 'Primitive field values have not been copied.' );
}

if ( p1.component === p2.component ) {
    console.log( 'Simple component has not been cloned.' );
} else {
    console.log( 'Simple component has been cloned.' );
}

const p1CircularRef = p1.circularReference;
const p2CircularRef = p2.circularReference;

if ( p2CircularRef === p2.circularReference ) {
    console.log( 'Component back reference has not been cloned.' );
} else {
    console.log( 'Component back reference has been cloned.' );
}

if ( p1CircularRef.prototype === p2CircularRef.prototype ) {
    console.log( 'Component back ref linked to original object.' );
} else {
    console.log( 'Component back ref linked to the clone.' );
}
```

<!--- -------------------------------------------------------------- -->

## Structural Patterns

Structural patterns deal with object composition or the way to realize relationships between entities.

### Adapter

Adapter is a structural design pattern that allows objects with incompatible interfaces to collaborate.

**Example:**

```typescript
/**
 * The Target defines the domain-specific interface used by the 
 * client code.
 */
class Target {
    public request(): string {
        return 'Target: The default target\'s behavior.';
    }
}

/**
 * The Adaptee contains some useful behavior, but its interface is 
 * incompatible with the existing client code. The Adaptee needs some 
 * adaptation before the client code can use it.
 */
class Adaptee {
    public specificRequest(): string {
        return '.eetpadA eht fo roivaheb laicepS';
    }
}

/**
 * The Adapter makes the Adaptee's interface compatible with 
 * the Target's interface.
 */
class Adapter extends Target {
    private adaptee: Adaptee;

    constructor( adaptee: Adaptee ) {
        super();
        this.adaptee = adaptee;
    }

    public request(): string {
        const result = this.adaptee.specificRequest()
            .split( '' ).reverse().join( '' );
        
        return `Adapter: (TRANSLATED) ${ result }`;
    }
}

/**
 * The client code supports all classes that follow 
 * the Target interface.
 */
function clientCode( target: Target ) {
    console.log( target.request() );
}

console.log( 'Client: I can work just fine with the Target objects:' );
const target = new Target();
clientCode( target );

console.log( '' );

const adaptee = new Adaptee();
console.log( 'Client: The Adaptee class has a weird interface.' +
    'See, I don\'t understand it:' );

console.log( `Adaptee: ${ adaptee.specificRequest() }` );

console.log( '' );

console.log( 'Client: But I can work with it via the Adapter:' );
const adapter = new Adapter( adaptee );
clientCode( adapter );
```

<!--- -------------------------------------------------------------- -->

### Bridge

**Problem**: [Decouple](../dictionary/overview#decouple--dee-kuh-puhl) an abstraction from its implementation so that the two can vary
independently.

**Real-Life Example**: Device and remote control; the remote works with different devices.

```typescript
// Abstraction
interface RemoteControl {
    togglePower(): void;

    setVolume( volume: number ): void;
}

// Implementation
interface Device {
    togglePower(): void;

    setVolume( volume: number ): void;
}

class TV implements Device {
    private isOn: boolean = false;
    private volume: number = 0;

    public togglePower(): void {
        this.isOn = ! this.isOn;
        console.log( `TV is now ${ this.isOn ? 'ON' : 'OFF' }` );
    }

    public setVolume( volume: number ): void {
        this.volume = volume;
        console.log( `TV volume set to ${ this.volume }` );
    }
}

class Radio implements Device {
    private isOn: boolean = false;
    private volume: number = 0;

    public togglePower(): void {
        this.isOn = ! this.isOn;
        console.log( `Radio is now ${ this.isOn ? 'ON' : 'OFF' }` );
    }

    public setVolume( volume: number ): void {
        this.volume = volume;
        console.log( `Radio volume set to ${ this.volume }` );
    }
}

class BasicRemote implements RemoteControl {
    protected device: Device;

    constructor( device: Device ) {
        this.device = device;
    }

    public togglePower(): void {
        this.device.togglePower();
    }

    public setVolume( volume: number ): void {
        this.device.setVolume( volume );
    }
}

// Usage
const tv = new TV();
const remote = new BasicRemote( tv );

remote.togglePower(); // TV is now ON
remote.setVolume( 10 ); // TV volume set to 10

const radio = new Radio();
const radioRemote = new BasicRemote( radio );

radioRemote.togglePower(); // Radio is now ON
radioRemote.setVolume( 5 ); // Radio volume set to 5
```

<!--- -------------------------------------------------------------- -->

### Composite

**Problem**: Compose objects into tree structures to represent part-whole hierarchies.

**Real-Life Example**: An organization structure with employees, departments, and divisions.

```typescript
// Component
interface Employee {
    showDetails(): void;
}

// Leaf
class Developer implements Employee {
    private name: string;
    private position: string;

    constructor( name: string, position: string ) {
        this.name = name;
        this.position = position;
    }

    public showDetails(): void {
        console.log( `Developer: ${ this.name }, Position: ${ this.position }` );
    }
}

// Leaf
class Manager implements Employee {
    private name: string;
    private position: string;

    constructor( name: string, position: string ) {
        this.name = name;
        this.position = position;
    }

    public showDetails(): void {
        console.log( `Manager: ${ this.name }, Position: ${ this.position }` );
    }
}

// Composite
class Organization implements Employee {
    private employees: Employee[] = [];

    public addEmployee( employee: Employee ): void {
        this.employees.push( employee );
    }

    public removeEmployee( employee: Employee ): void {
        const index = this.employees.indexOf( employee );
        if ( index > -1 ) {
            this.employees.splice( index, 1 );
        }
    }

    public showDetails(): void {
        for ( const employee of this.employees ) {
            employee.showDetails();
        }
    }
}

// Usage
const dev1 = new Developer( 'Alice', 'Frontend Developer' );
const dev2 = new Developer( 'Bob', 'Backend Developer' );
const mgr = new Manager( 'Charlie', 'Team Manager' );

const organization = new Organization();
organization.addEmployee( dev1 );
organization.addEmployee( dev2 );
organization.addEmployee( mgr );

organization.showDetails();
// Developer: Alice, Position: Frontend Developer
// Developer: Bob, Position: Backend Developer
// Manager: Charlie, Position: Team Manager
```

<!--- -------------------------------------------------------------- -->

### Decorator

Allows behavior to be added to an individual object, dynamically, without affecting the behavior of other objects from
the same class.

**Example:**

```php
interface Component {
    public function operation();
}

class ConcreteComponent implements Component {
    public function operation() {
        return "ConcreteComponent";
    }
}

class Decorator implements Component {
    protected $component;

    public function __construct(Component $component) {
        $this->component = $component;
    }

    public function operation() {
        return $this->component->operation();
    }
}

class ConcreteDecorator extends Decorator {
    public function operation() {
        return "ConcreteDecorator(" . parent::operation() . ")";
    }
}
```

Insert this snippet into the Structural Patterns section of your design-patterns.md file. This will provide a
comprehensive example of the Facade Pattern in a real-life scenario using TypeScript.

<!--- -------------------------------------------------------------- -->

### Facade

**Problem**: Provide a unified interface to a set of interfaces in a subsystem, making the subsystem easier to use.

**Real-Life Example**: A universal remote control that simplifies the operation of different devices.

```typescript
// TV subsystem
class TV {
    public on(): void {
        console.log( 'Turning TV on' );
    }

    public off(): void {
        console.log( 'Turning TV off' );
    }

    public setChannel( channel: number ): void {
        console.log( `Setting TV channel to ${ channel }` );
    }
}

// Sound System subsystem
class SoundSystem {
    public on(): void {
        console.log( 'Turning Sound System on' );
    }

    public off(): void {
        console.log( 'Turning Sound System off' );
    }

    public setVolume( volume: number ): void {
        console.log( `Setting Sound System volume to ${ volume }` );
    }
}

// Facade
class UniversalRemote {
    private tv: TV;
    private soundSystem: SoundSystem;

    constructor( tv: TV, soundSystem: SoundSystem ) {
        this.tv = tv;
        this.soundSystem = soundSystem;
    }

    public watchMovie(): void {
        console.log( 'Setting up movie...' );
        this.tv.on();
        this.tv.setChannel( 101 );
        this.soundSystem.on();
        this.soundSystem.setVolume( 15 );
        console.log( 'Movie is ready to watch!' );
    }

    public endMovie(): void {
        console.log( 'Shutting down movie setup...' );
        this.tv.off();
        this.soundSystem.off();
        console.log( 'Movie setup shutdown complete.' );
    }
}

// Usage
const tv = new TV();
const soundSystem = new SoundSystem();
const remote = new UniversalRemote( tv, soundSystem );

remote.watchMovie();
// Setting up movie...
// Turning TV on
// Setting TV channel to 101
// Turning Sound System on
// Setting Sound System volume to 15
// Movie is ready to watch!

remote.endMovie();
// Shutting down movie setup...
// Turning TV off
// Turning Sound System off
// Movie setup shutdown complete.
```
<!--- -------------------------------------------------------------- -->

### Proxy

The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This can be useful for
implementing lazy initialization, access control, logging, etc.

**Example:**

```typescript
interface Subject {
    request(): void;
}

class RealSubject implements Subject {
    request(): void {
        console.log( "RealSubject: Handling request." );
    }
}

class Proxy implements Subject {
    private realSubject: RealSubject;

    constructor( realSubject: RealSubject ) {
        this.realSubject = realSubject;
    }

    request(): void {
        if ( this.checkAccess() ) {
            this.realSubject.request();
            this.logAccess();
        }
    }

    private checkAccess(): boolean {
        console.log( "Proxy: Checking access prior to firing a real request." );
        // Some real access check should go here.
        return true;
    }

    private logAccess(): void {
        console.log( "Proxy: Logging the time of request." );
    }
}

// Usage
const realSubject = new RealSubject();
const proxy = new Proxy( realSubject );

proxy.request();
// Proxy: Checking access prior to firing a real request.
// RealSubject: Handling request.
// Proxy: Logging the time of request.
```

<!--- -------------------------------------------------------------- -->

## Behavioral Patterns

Behavioral patterns are focused on communication between objects.

### Chain Of Responsibility

The Chain of Responsibility pattern allows an object to pass the request along a chain of potential handlers until an
object handles the request.

**Example:**

```typescript
abstract class Handler {
    protected nextHandler: Handler | null = null;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: string): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return null;
    }
}

class ConcreteHandler1 extends Handler {
    public handle(request: string): string | null {
        if (request === "Request1") {
            return `ConcreteHandler1: Handled ${request}`;
        }
        return super.handle(request);
    }
}

class ConcreteHandler2 extends Handler {
    public handle(request: string): string | null {
        if (request === "Request2") {
            return `ConcreteHandler2: Handled ${request}`;
        }
        return super.handle(request);
    }
}

class ConcreteHandler3 extends Handler {
    public handle(request: string): string | null {
        if (request === "Request3") {
            return `ConcreteHandler3: Handled ${request}`;
        }
        return super.handle(request);
    }
}

// Usage
const handler1 = new ConcreteHandler1();
const handler2 = new ConcreteHandler2();
const handler3 = new ConcreteHandler3();

handler1.setNext(handler2).setNext(handler3);

const requests = ["Request1", "Request2", "Request3", "Request4"];

requests.forEach(request => {
   const result = handler1.handle(request);
   console.log(result ? result : `${request} was not handled`);
});
// Output:
// ConcreteHandler1: Handled Request1
// ConcreteHandler2: Handled Request2
// ConcreteHandler3: Handled Request3
// Request4 was not handled
```
<!--- -------------------------------------------------------------- -->

    ### Command

The Command pattern encapsulates a request as an object, thereby allowing for parameterization of clients with queues,
requests, and operations.

**Example:**

```typescript
// Command Interface
interface Command {
    execute(): void;
}

// Receiver
class Light {
    public turnOn(): void {
        console.log("The light is on");
    }

    public turnOff(): void {
        console.log("The light is off");
    }
}

// Concrete Command for turning on the light
class TurnOnLightCommand implements Command {
    private light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    public execute(): void {
        this.light.turnOn();
    }
}

// Concrete Command for turning off the light
class TurnOffLightCommand implements Command {
    private light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    public execute(): void {
        this.light.turnOff();
    }
}

// Invoker
class RemoteControl {
    private command: Command;

    public setCommand(command: Command): void {
        this.command = command;
    }

    public pressButton(): void {
        this.command.execute();
    }
}

// Usage
const light = new Light();
const turnOnLight = new TurnOnLightCommand(light);
const turnOffLight = new TurnOffLightCommand(light);

const remote = new RemoteControl();

remote.setCommand(turnOnLight);
remote.pressButton(); // The light is on

remote.setCommand(turnOffLight);
remote.pressButton(); // The light is off
```

<!--- -------------------------------------------------------------- -->

### Observer

Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified
and updated automatically.

**Example:**

```php
interface Observer {
    public function update($subject);
}

class ConcreteObserver implements Observer {
    public function update($subject) {
        echo "Observer has been notified with: " . $subject->getState();
    }
}

interface Subject {
    public function attach(Observer $observer);
    public function detach(Observer $observer);
    public function notify();
}

class ConcreteSubject implements Subject {
    private $observers = [];
    private $state;

    public function attach(Observer $observer) {
        $this->observers[] = $observer;
    }

    public function detach(Observer $observer) {
        $this->observers = array_filter($this->observers, function($o) use ($observer) { return $o !== $observer; });
    }

    public function notify() {
        foreach ($this->observers as $observer) {
            $observer->update($this);
        }
    }

    public function setState($state) {
        $this->state = $state;
        $this->notify();
    }

    public function getState() {
        return $this->state;
    }
}
```

<!--- -------------------------------------------------------------- -->


### Strategy

Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy allows the algorithm to
vary independently from clients that use it.

**Example:**

```php
interface Strategy {
    public function execute($data);
}

class ConcreteStrategyA implements Strategy {
    public function execute($data) {
        return "StrategyA: " . $data;
    }
}

class ConcreteStrategyB implements Strategy {
    public function execute($data) {
        return "StrategyB: " . $data;
    }
}

class Context {
    private $strategy;

    public function setStrategy(Strategy $strategy) {
        $this->strategy = $strategy;
    }

    public function executeStrategy($data) {
        return $this->strategy->execute($data);
    }
}
```

<!--- -------------------------------------------------------------- -->

## Conclusion

Design patterns are essential in building robust, maintainable, and scalable software. Understanding and implementing
these patterns can greatly improve your development practices and code quality.