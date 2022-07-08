# JS Notes:
1. In <html lang="en"></html> tag, use lang attribute to make search easier for engines. Otherwise the search engines have to check region etc to identify which group of audience to be targeted for a website.

2. In <script src="app.js" defer></script> use defer to indicate that the js should be loaded after the html part is finished loading. Else, if we try to find an element by eg: document.querySelector("button"); will return null as js loaded already even before the button got rendered to dom and hence couldn't find it.


### ES-6:
1. var, const and let (Introduced BLOCK SCOPE(let, const) to add to existing FUNCTION SCOPE and GLOBAL SCOPE).
2. var:
    - variable declaration and scope with be to the nearest/ immediate function. Ie; if we declare it in a block inside a function also, nearest function is that holding the block. So, scope will be that function.
    ```
    function f(){
        {
            var var1 = 'var1';
        }
        console.log(var1); //- prints var1

    }

    ```
3. let:
    - let provides a block scope. The main idea behind the introduction of let is, to limit the scope of variables to where exactly it is needed.
    - let restricts the scope of a variable to the immediate or nearest block {}
    ```
    function f(){
        {
            let let1 = 'let1';
        }
        console.log(let1); //- gives reference error as let1 has scope inside that block only

    }

    ```
    - let cannot be redeclared in same scope.But var can.
        `let x = 10; let x = 20;` inside same block is error.
    - let has immediate block scope  `let x = 10; {let x = 20;}` is ok since its different scope.
    - let must declare before use. Else ReferenceError comes.
4. const:
    - to define a constant value.
    - Error comes if we try to reassign value to the same const variable.

    ```
    function f(){
        const var1 = 'var1';
        console.log(var1); //- prints var1
        var1 = 'var2'; //- gives error
    }

    ```
    - const is constant value having the scope of immediate block similar to let. Only difference is, we cannot reassign or redeclare the value of it.
    ```
    function f(){
        {
            const const1 = 'let1';
        }
        console.log(const1); //- gives reference error as const1 has scope inside that block only

    }

    ```
5. Hoisting:
    - Js converts code by interpreter. So, it's done line by line. Then how can we invoke function before defining it? How it gets to know a function is there,even before the definition of it reaches while interpreting?
    - Somehow an entire scan must have been done before interpreting. That process or
    - The answer is *Hoisting*
    - It is the process done by interpreter to move the variables, functions and classes to the top of their scope even before the actual execution happens.
    - Ie; hoisting identifies all variables , functions etc prior and allocates memory.
    - Js hoists just the declarations. But not the initialization part. That's why even if we does;
    ```
    console.log(x); -- this prints only undefined. Not 10. Because js allocated memory or we can say, did declaration. But not initialization.
    var x = 10;
    console.log(x): -- here, it gets initalized and prints 10
    ```     
    - *let* and *const* also gets hoised. But only when delcaration/initailization of it reaches, then only it gets allocated. That is why, before that ReferenceError comes.
    - Why does hoisting of let or const happens only when the delcration or initialization line reaches whereas it happens for var from very beginning of interpreting?
        - Since let or const are expected to have limited scope, there is no point in allocating it beforehand. This helps to narrow down the scope and memory use.
        - There is a *Temporal Dead Zone* for a let or const. This is the area in the block scope of let or const till the declaration of let/const happens.
        ```
        {
            console.log('Temporal dead zone for x till here and y');
            //console.log(x);//TDZ gives ref error.
            let x;
            console.log(x);//ok -- prints undefined
            console.log('Temporal dead zone for y is till here');
            //console.log(y);//TDZ gives ref error.
            let y = 100;
            console.log(x, y);//ok -- prints undefined 100
        }
        ```
        - If no initailization is there, by default, var and let get assigned with *undefined*
        - Const gives error as initialization is expected.
        - Why is it called *Temporal Dead Zone*?
            - Order of execution matters here. Not the order in which the line comes. Refer testTDZ in varletconst.js
            Interpreter takes the annonymous function for evaluation/ execution when gets called. By that time, if declaration gets completed for let variable, no error comes.
           - 
           ```
           function test(){
                console.log(x);
                let x;
            }
           ```
           The above code gives error only when a call to it happens. Until then everything is fine.
           test(); happens, ref err comes. So, it is Temporal. 
6. Why did ES6 came up with let?
    - To avoid confusions due to variables with function scope.
    - Eg: when we pass var into annonymous functions and if the value of that var gets changed, it get reflected inside that annonymous functions too. (see varletconst.js whyLetIsBetterThanVar())
    - But when we use let instead, the scope is within the block where it is delared. So, values comes as expected.

7. ### "use strict"; (ES 5)
    - Introduced from ES5
    - This helps to introduce strict checks to reduce the errors even at comiple time.
    - This is a string literal. If we add to top of script or inside a function or block, restricts
    - using variables without declaration 
    - restricts the use of certain current or future keywords as variable names
    - a function with parameters having same name is error in strict mode
    - *changes the way **this** keyword works.*
        - this points to window if we are not defining it explicitly.
        - this points to undefined if we are not defining and is in strict mode within a function. But this is global scope in strict mode still points to global object.
        - Usually, this points to the caller function.
8. ### Arrow Function:
    - Introduced in ES6
    - Why?
        - To write functions with minimum code/ syntax
    - eg:
    `
    let arrow = (first, second)=>{console.log(first + second);}
    `

    ```
    let arrow = (first, second)=>first + second; // returns sum directly.
    console.log(arrow());//prints sum
    ```
    - *this* and arrow function:
        - Arrow function does not have its own *this* value.
        - this of arrow function is bound to closest non-arrow function in which arrow is defined. That will remain for the entire life of that arrow function.
        - ### this is a keyword refering to an object. Which object it points to depends on context or how it is used.
        - Usually *this* of a function represents the object who called that function. It can be another function, window, document, button etc. 
        - *this* in global scope refers to *window* or global object.
        - *this* in function scope refers to global object.  
        - *this* in a function within an object gives that object scope
        - *this* in a function in strict mode is *undefined*
        - *this* in global scope in strict mode points to global object itslef.
        - *this* in an arrow function will be having same value as immediate encosing function in which arrow function is defined.
        - So, in case of arrow function, value of this will same as the value if we add
        `console.log(this);` just one line above the definition of the arrow function.
        ```
        wrapper = {
            function fun(){
                console.log(this);//this is same as below print.
                object = {
                    arrow:()=>console.log(this);// points to same *this* of fun. Since fun() is a function, this of it points to wrapper object. 
                }
            }
        }
        ```