const galaxy = ['sun', 'moon', 'star1'];
let [center] = galaxy;
console.log(center);// will print sun
let [, partial, lighter] = galaxy;
console.log(partial);// will print moon
console.log(lighter);// will print star1

const cat = {
    name: 'Tom',
    color: 'black' 
}

const {name} =  cat;
console.log(name);// will print Tom