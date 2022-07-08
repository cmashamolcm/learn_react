function caller(){
    let arrow = (first, last) => first+last;
    console.log(arrow(1, 2));
}

//caller();

const object = {
    firstName: "Test",
    lastName: "Name",
    objFun: function(globalArrowCallee, globalCallee, objectWithArrow){
        console.log('this inside object: ',this);
        console.log("calling global arrow callee");
        globalArrowCallee();
        console.log("calling normal callee");
        globalCallee();

        console.log("calling arrow of objectWithArrow");
        objectWithArrow.arrowCallee();

        console.log("calling callee of objectWithArrow");
        objectWithArrow.callee();
    },

    objFuncArrow: (globalArrowCallee, globalCallee, objectWithArrow)=>{
        console.log("-------------------------------------");
        console.log("objFuncArrow: ", this);
        console.log("objFuncArrow: ", this.key1);

        console.log("calling global arrow callee");
        globalArrowCallee();
        console.log("calling normal callee");
        globalCallee();

        console.log("calling arrow of objectWithArrow");
        objectWithArrow.arrowCallee();

        console.log("calling callee of objectWithArrow");
        objectWithArrow.callee();
    }

}

function testCallerWithOwnThis(){
    console.log(this);
    this.key1 = "value1";
    globalCallee();

    object.objFun(globalArrowCallee, globalCallee, objectWithArrow);
    object.objFuncArrow(globalArrowCallee, globalCallee, objectWithArrow);

    console.log("-------------------------------------");
    wrapper.objectHoldingFunctions();
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

testCallerWithOwnThis();