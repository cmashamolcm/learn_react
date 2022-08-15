function caller(){
    let arrow = (first, last) => first+last;
    console.log(arrow(1, 2));
}

//caller();

const object = {
    firstName: "Test",
    lastName: "Name",
    objFun: function(globalArrowCallee, globalCallee, objectWithArrow){
        console.log("-------------------call reached objFun------------------");
        console.log('this inside object: ',this);//since this is normal fun, this = object
        console.log("calling global arrow callee");
        globalArrowCallee();//this is defined in the invisible global function. So, this = window or global obj
        console.log("calling normal callee");
        globalCallee();//the function is passed from another function which is in global scope. So, this here is global obj
        //this.globalCallee();//will give error as globalCallee is not defined in object but is in global obj. Here, this means object

        console.log("calling arrow of objectWithArrow");
        objectWithArrow.arrowCallee();//global. objectWithArrow is defined in invisible global function scope

        console.log("calling callee of objectWithArrow");
        objectWithArrow.callee();//this equivalent to objectWithArrow since this callee is a normal function. For that, object in which it is defined is the this
    },

    objFuncArrow: (globalArrowCallee, globalCallee, objectWithArrow)=>{
        console.log("-------------------------------------");
        console.log("objFuncArrow: ", this);//objFuncArrow is inside object. But nearest function in which objFuncArrow is defined is global invisible function. So, this equals global object.
        console.log("objFuncArrow: ", this.key1);

        console.log("calling global arrow callee");
        globalArrowCallee();// window. Since globalArrowCallee is defined in global scope
        console.log("calling normal callee");
        globalCallee();//window similar to line 17

        console.log("calling arrow of objectWithArrow");
        objectWithArrow.arrowCallee();//similar to line 21

        console.log("calling callee of objectWithArrow");
        objectWithArrow.callee();//similar to line 24
    },

    objFunWithStrict: function(globalArrowCallee, globalCallee, objectWithArrow){
        "use strict";
        console.log("-------------------call reached strict objFun------------------");
        console.log('this inside object: ',this);//since this is normal fun, this = object in strict mode too
    
        globalArrowCallee();
        globalCallee();
        //this.globalCallee();//not avilable within this object.
        objectWithArrow.arrowCallee();
        objectWithArrow.callee();
    },

    objFuncArrowWithStrict: ()=>{// If all 3 args passed, evrything is fine. Else only items in this scope (here, global object) will be available.
        console.log("-------------------------------------");
        console.log("objFuncArrow: ", this);//objFuncArrow is inside object. But nearest function in which objFuncArrow is defined is global invisible function. So, this equals global object.
        console.log("objFuncArrow: ", this.key1);
        //those commented within this arrow function are not working because, they are not part of this in strict mode.
        //globalArrowCallee(); // is let. With var, it will work. Let are not getting added to scope before execution reaches here.
        console.log("calling normal callee");
        this.globalCallee();//this is function. So, automatically got allocated as part of hoisting and this has it.
        //objectWithArrow.arrowCallee();// objectWithArrow is also a let. var can help
        //objectWithArrow.callee();
    }

}

function testCallerWithOwnThis(){
    console.log("Got call from global object: So expect this a window: ", this);
    this.key1 = "value1";
    globalCallee();

    object.objFun(globalArrowCallee, globalCallee, objectWithArrow);
    object.objFuncArrow(globalArrowCallee, globalCallee, objectWithArrow);

    console.log("-------------------------------------");
    wrapper.objectHoldingFunctions();//start 2

    console.log("------------------strict mode-------------------");
    object.objFunWithStrict(globalArrowCallee, globalCallee, objectWithArrow);
    object.objFuncArrowWithStrict();// no args passed.
}

function globalCallee(){
    console.log("globalCallee", this);
    console.log("globalCallee", this.key1);
}

let globalArrowCallee = ()=>{
    console.log("globalArrowCallee: ", this);
    console.log("globalArrowCallee: ", this.key1);
}


let objectWithArrow = {
    arrowCallee: ()=>{
        console.log("objectWithArrow.arrowCallee: ", this);
        console.log("objectWithArrow.arrowCallee: ", this.key1);
    },

    callee: function(){
        console.log("objectWithArrow.callee: ", this);
        console.log("objectWithArrow.callee: ", this.key1);
    }
}

wrapper = {
    objectHoldingFunctions: function(){
        console.log("This in objectHoldingFunctions", this);// Gives scope of wrapper obect. This holds objectHoldingFunctions as value in it.
        let objectWithArrow = {
            arrowCallee: ()=>{//this in arrow function has same scope as the function in which it is defined. So scope is that of objectHoldingFunctions. Ie; wrapper itself is scope here. 
                console.log("objectHoldingFunctions.objectWithArrow.arrowCallee: ", this);
                console.log("objectHoldingFunctions.objectWithArrow.arrowCallee: ", this.key1);
            },
        
            callee(){//this points to objectWithArrow. Since this is a function type within an object, it has scope of objectWithArrow object.
                console.log("objectHoldingFunctions.objectWithArrow.callee: ", this);
                console.log("objectHoldingFunctions.objectWithArrow.callee: ", this.key1);
            }
        }
    
        objectWithArrow.arrowCallee();
        objectWithArrow.callee();
    }
    
}

testCallerWithOwnThis();//start 1