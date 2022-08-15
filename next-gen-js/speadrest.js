
//spread
let stars = ["blue star", "morning star"];
let planets = ["earth", "saturn", "mars"];
let galaxy = ["sun", ...stars, ...planets, "moon"];
console.log(galaxy);

let galaxyOverridden = ["sun", ...stars, ...planets, "sun"];// 2 times sun comes
console.log(galaxyOverridden);

let catName = {
    "name": "Tom"
}

let catColor = {
    "color": "Black"
}

let cat = {
    ...catName,
    ...catColor
}
console.log(cat);

let catOverridden = {
    ...catName,
    ...catColor,
    "color": "Blue"// overrides catColor's property here.
}
console.log(catOverridden);

//rest
function test(...numbersToAdd){
    let sum = 0;
    numbersToAdd.forEach(num => {
        sum += num;
    });
    return sum;
}

console.log(test(1));//1
console.log(test(1, 2, 3));//6
console.log(test(...[1, 20, 3]));// 24
console.log(test([1, 20, 3]));// no error. Just prints all 3 items 01, 20, 3


