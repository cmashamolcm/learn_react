const constantValue = "fixed";
//constantValue = "updated"; -- will give error as we are trying to update constant value again

function declaration(){
    var varInsideFunction = "function var"; // in functions scope
    let letInsideFunction = "function let"; // in functions scope
    const constInsideFunction = "function const"; // in block scope
    {//block1
        var varInsideBlock1 = "block 1 var"; // in functions scope
        let letInsideBlock1 = "block 1 let"; // in block scope
        const constInsideBlock1 = "block 1 const"; // in block scope

        console.log("block 1:", varInsideFunction);
        console.log("block 1:", letInsideFunction);
        console.log("block 1:", varInsideBlock1);
        console.log("block 1:", letInsideBlock1);

        console.log("block 2:", constInsideBlock1);
    }

    {//block2
        console.log("block 2:", varInsideFunction);
        console.log("block 2:", letInsideFunction);
        console.log("block 2:", varInsideBlock1);
        //console.log("block 2:", letInsideBlock1); -- error since letInsideBlock1 scoped in block 1

        //console.log("block 2:", constInsideBlock1); -- error since constInsideBlock1 also has scope within block 1
    }
}

declaration();
//console.log(varInsideFunction); -- not available in this scope.
//console.log(letInsideFunction); -- not available in this scope.

//var can be used before declaring itself. But value will be undefined.
console.log(x);
var x;

//let cannot be used before declaring itself. Error comes as y cannot be used before initialization.
//console.log(y);
//let y;

//const cannot be used before declaring itself. Error comes as z cannot be used before initialization.
//console.log(z);
//const z = 10;

// This indicates that const and let are almost similar. Cannot use before init. But var can be used.
//But y?
//hoisting - the way js interpreter moves the *declaration*(not initialization part) of the variables, functions, classes to the top before the code gets converted to binary. Ultimately, it helps setting up memory for variables and functions.
//


function whyLetIsBetter(){
    var functions = [];
    for(var i = 0; i<5; i++){
        functions[i] = function(){
            console.log('calling from function: ', i); // here it prints 5 everytime. Reason is, i is in function scope and for annonymous functions created also, 
        }
    }

    for(var j = 0; j<5; j++){
        functions[j]();
    }

    return functions;
}

function testWhyLetIsBetter(){
    fun = whyLetIsBetter();
    for(var j = 0; j<5; j++){
        fun[j]();// here also 5 gets printed for all functions.
    }
}
testWhyLetIsBetter();

//-------------------------
function whyLetIsBetterThanVar(){
    var functions = [];
    let x = 0;
    for(let i = 0; i<5; i++, x++){
        functions[i] = function(){
            console.log('calling let from function: ', i); // here it prints 0, 1, 2, 3, 4 . Reason is, i is in block scope and for annonymous functions created also, i will be unique.
            console.log('calling let from outside of block from function: ', x);//this will be 5 ever. This let scoped in function's block{}
        }
    }

    for(var j = 0; j<5; j++){
        functions[j]();
    }

    return functions;
}

whyLetIsBetterThanVar();

function testTDZ(){// no Referal error here because, when the call f() happens, x is already declared.
    const f = ()=> console.log('testing tdz', x);
    //console.log(x);// could lead to error as this is TDZ for x now.
    let x = 20;
    f();
}
testTDZ();

function test(){
    console.log(x);
    let x;
}
