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
    }
}

personFunctions.getFullName();//undefined

personFunctions.getFullName.call(person);// call assigned person object to this for personFunctions. person object is passed to make it "this" inside the function getFullName().

getPersonAddress = personFunctions.getAddress.bind(person);// person borrowed getAddress from another object personFunctions. "this" will be person object
getPersonAddress();

