function testStrict(){
    "use strict";
    x = 20;
    console.log(x);
}

function testWithoutStrict(){
    x = 20;
    console.log(x);
}

//testStrict();//gives error as we did x=20
testWithoutStrict();


function useThis(){
    console.log(this);//gives window if this not specified/ redefined
}

function useThisWithStrict(){
    "use strict";
    console.log(this);//undefined
}

useThis();
useThisWithStrict();
"use strict";
console.log("Global this", this);