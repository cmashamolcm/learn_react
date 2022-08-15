class Animal{// special type of function itself is a class. A class is a template for object with properties and methods to apply on it
    myName = 'Base Animal';

    constructor(noOfLengs, color){// if not specified, default constructor with no params taken
        console.log('Constructor got called.');
        this.noOfLengs = noOfLengs;
        this.color = color;
    }

    printDetails(){
        console.log(this);
        console.log(this.myName, ' with ',  this.noOfLengs, ' legs and ', this.color, ' in color.');

    }

}

let animal = new Animal();// no arg passed to constructor while creating object
animal.printDetails();// this will be animal

let animalWithProperties = new Animal(4, 'purple');
animalWithProperties.printDetails();// this will be animalWithProperties


//console.log(new DefinedLater().className); // class cannot be used before nitializing it

class DefinedLater{
    className = 'old';
}

//-----inheritance
//---dog
class Dog extends Animal{

}
// no issue if no explicit constructor
let dog = new Dog();
dog.printDetails();

let brownDog = new Dog(4, 'Brown');
brownDog.printDetails();

//----cat
class Cat extends Animal{
    /*constructor(){
        //super();// here or anywhere in constructor super() call is required if Child class has a derived constructor.
        console.log('A cat is born');
        //super();
        super();
    }*/

    constructor(legs, color){
        //super();// here or anywhere in constructor super() call is required if Child class has a derived constructor.
        console.log('A cat is born');
        //super();
        super(legs, color);
    }

}
// with explicit constructor
let cat = new Cat();
cat.printDetails();

let whiteCat = new Cat(4, 'White');
whiteCat.printDetails();
// child with more params
class Donkey extends Animal{
    constructor(legs, color, height){
        super(legs);// leg count set in parent through this.
        this.height = height;// exclusively for Donkey.
        this.color = color;// gets applied to parent's this.color
    }

}

let donkey = new Donkey(4, 'Grey', 120);
donkey.printDetails();// what comes for 'this' here? Donkey {myName: 'Base Animal', noOfLengs: 4, color: undefined, height: 120}

//es7 - constructor or super call. Direct use of params
class Human{
    myName = 'Asha';

    printDetails = ()=>{console.log(this.myName);}

}

let human = new Human();
human.printDetails();
