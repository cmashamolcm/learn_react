person = {
    firstName: "Asha",
    lastname: "CM",
    city: "Berlin",
    zip: 1234567
}

personFunctions = {
    getFullName: function(){
        console.log(this.firstName, this.lastname);
    },

    getAddress: function(){
        console.log(this.city, this.zip);
    },

    getPhone(mobileNumber, homeNumber){
        console.log('Phone number of Mr./Ms.', this.firstName, ' ', this.lastname, 'is', mobileNumber, ', ', homeNumber);
    }
}

personFunctions.getFullName();//undefined

personFunctions.getFullName.call(person);// call assigned person object to this for personFunctions. person object is passed to make it "this" inside the function getFullName().

getPersonAddress = personFunctions.getAddress.bind(person);// person borrowed getAddress from another object personFunctions. "this" will be person object
getPersonAddress();

//function with args
console.log('With args')
personFunctions.getPhone.call(person);// mobile number will be undefined as weare not passing it.
personFunctions.getPhone.call(person, 123456789);// Phone number of Mr./Ms. Asha   CM is 123456789 ,  undefined
personFunctions.getPhone.call(person, 123456789, 987654321);
personFunctions.getPhone.call(person, [123456789, 987654321]);//Phone number of Mr./Ms. Asha   CM is [123456789, 987654321] ,  undefined


personFunctions.getPhone.apply(person);
//personFunctions.getPhone.apply(person, 123456789, 987654321);// error comes as apply allows only 2 args
//personFunctions.getPhone.apply(person, 123456789);// error comes a second arg should be an array.
personFunctions.getPhone.apply(person, [123456789, 987654321, 4321]);// only n entries equivalent to param count will be taken from array even if size is more.
personFunctions.getPhone.apply(person, [123456789]);// array size is less than param count means, those excess params become undefined.

//when to use call() or apply():
// use call(), if you know all the params.
// use apply(), if you want to be more flexible while calling the function even if the arg count increased. If we pass an array, at a later point when the function is chnaged to accept more params, just update array.
// If we use call() instead, explicit edit to method call is needed. Else, undefined comes for new params.

//When should we use bind instead of call or apply:
// Use bind if we need to get a function to be used at a later point in time with a given context.
//Eg: In callback functions, bind is best suited because, immediate call is not there. While reaching the callback invocation in async way of execution, but we need the context as it is. So, bind is best suited here.

const getContact = personFunctions.getPhone.bind(person, 1234);//here, second param is not set with default value.
//after long time
getContact();// since second param has no default value, 1234 and undefined comes
getContact('7869');// 1234 and 7869 comes.

const getContactWith2Default = personFunctions.getPhone.bind(person, 9999, 8888);
getContactWith2Default(1111, 2222);// no relevence if already passed values at the time of binding.

//call with comma
// apply with array
// bind with later callback and comman separated
