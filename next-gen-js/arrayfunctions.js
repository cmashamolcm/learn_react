const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const doubledArray = array.map(num=>num*2);
console.log(array);
console.log(doubledArray);

console.log(array.reduce((a, b)=>a+b));// adds all

//splice vs slice:
//existing array will be intact. But a new array with subset gets created.
console.log('-----slice----');//items from start index to end index-1
console.log(array.slice());// entire array comes.
console.log(array.slice(2));// 2nd index till end
console.log(array.slice(3, 7));//4, 5, 6, 7 (item in 7th index is 8 which is excluded.)
console.log(array.slice(2, -2));// from 2nd index till (length-2 th index => 10-2=8. So, till 8th index, ie; just before value 9) 3, 4, 5, 6, 7, 8
console.log(array.slice(-4, -6));// 10-4, 10-6 => (6, 4) => empty. start should be < end.
console.log(array.slice(-6, -4));//4->6. So, 5, 6
console.log(array.slice(-100, 2));//starts from 0. So, comes 1, 2. -infinity maps to 0. infinity maps to length.

console.log('-----splice----');
let array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let array2 = array1.splice();
console.log('array 2: ', array2, ' array 1:', array1);// array1 become empty.

array2 = array1.splice(2);
console.log('array 2: ', array2, ' array 1:', array1);// remove all elements from array 1 from index 2. So, array one will have 1, 2. From 3 till 10 will be in array2

array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
array2 = array1.splice(2, 3);// deletes from 2nd index till 2+3 = 5th index.
console.log('array 2: ', array2, ' array 1:', array1);// array2 = 3, 4, 5. array1 = 1, 2, 6, 7, 8, 9, 10

array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
array2 = array1.splice(2, 3, 100, 200);// deletes from 2nd index till 2+3 = 5th index. Add 100 and 200 instead to array.
console.log('array 2: ', array2, ' array 1:', array1);// array2 = 3, 4, 5. array1 = 1, 2, 100, 200, 6, 7, 8, 9, 10

array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
array2 = array1.splice(-3, 2, 100);//length-3 = 10-3 = 7. So, 8, 9 removed
console.log('array 2: ', array2, ' array 1:', array1);// 1, 2, 3, 4, 5, 6, 7, 100, 10

array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
array2 = array1.splice(-3, -2, 100, 400, 900, 999);//10-3=7th index. value 8 is in 7th index. But no delete happens if deletionCount <= 0.
console.log('array 2: ', array2, ' array 1:', array1);// no deleteion. But 100, 400, 900, 999 gets added. [1, 2, 3, 4, 5, 6, 7, 100, 400, 900, 999, 8, 9, 10]

array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
array2 = array1.splice(-3, 2, 100, 400, 900, 999);
console.log('array 2: ', array2, ' array 1:', array1);

array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
array2 = array1.splice(-5, -4, 100, 400, 900, 999);
console.log('array 2: ', array2, ' array 1:', array1);

array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
array2 = array1.splice(-5, 0, 100, 400, 900, 999);// when countOfItemsToDelete <=0, no deleteion happens. Item from startIndex is pushed to right. And new items will be added befoe that. Ie; from startIndex will be filled new items.
console.log('array 2: ', array2, ' array 1:', array1);