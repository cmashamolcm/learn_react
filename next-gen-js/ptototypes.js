class Animals{
    color = 'green';
}

class Cats extends Animals{
    legs = 4;
}

let cats = new Cats();
console.log(Object.getPrototypeOf(cats));// Animals object
console.log(Object.getPrototypeOf(Object.getPrototypeOf(cats)));//Object
console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(cats))));//ptototype
console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(cats)))));// null.
