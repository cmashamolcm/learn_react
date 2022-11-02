const functionWithArgs = function (name, age) {
  console.log(name, age);
  console.log("arguments =", arguments);
  console.log("type of arguments =", typeof arguments);
  let array = [...arguments];
  console.log(array);
  console.log([].slice.call(arguments));

  /*let obj = {
    myName: "Asha",
  };
  //console.log(obj[name]);//undefined. We cannot use like array to get object properties
  console.log(obj.myName);
  let { myName } = obj;
  console.log(myName1);*/
};

functionWithArgs("Asha", 10);

function functionWithRestParameters(...person) {
  console.log(arguments, "in rest param");
}
functionWithRestParameters("Asha", 10);

function functionWithRestParametersInStrictMode(...person) {
  //'use strict'; // cannot use inside functions with rest params or params with default values
  console.log(arguments, "in rest param");
}
functionWithRestParametersInStrictMode("Asha", 10);

function functionWithDefaultParametersInStrictMode(person = "CM") {
  //'use strict'; // cannot use inside functions with rest params or params with default values
  console.log(arguments, "in rest param");
}
functionWithDefaultParametersInStrictMode("Asha", 10);

//------moving on to arrow vs normal:

const arrowWithArguments = () => {
  console.log(
    //"Inside arrowWithArguments",//-- ref error since arguments keyword is part of non-arrow function. Here it is undefined since its an arrow function.
    //arguments,
    "this (since arrow is in global scope)",
    this // Will be lexical this. (value of this will be based on where the arrow function is defined. Not who calls it.)
  );
};
arrowWithArguments();
