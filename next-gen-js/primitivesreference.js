const obj1 = {
    name: "Obj1"
}

const obj2 = obj1; // both points to same location now.
const obj3 = {...obj1}
obj1.name = "Changed Name";
console.log(obj2.name);// will print Changed Name.
console.log(obj3.name);// old value since obj3 is new object created from properties of obj1

const array = [1, 2, 3, 4];
const reference = array;
const copy = [... array];// deep copy
reference[2] = 300;// 3->300
console.log(array);//1, 2, 300, 4
console.log(copy);



