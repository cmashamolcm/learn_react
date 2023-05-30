35. TypeScript:
  - Its a language which is `Superset of JS`.
  - `JS + static type`
  - JS is `dynamic typed`. Meaning; it decides the type of a variable at run time.
  - Why we need ts?
    - Since js is dynamically typed, there is high chance of misusing the varibles or can be used wrongly and hence can be unpredicatble.
    - Eg:
    `add = (a, b)=>{return a+b};`
    We can pass 1, 2 and result will be 3. 
    We can pass string `a` and `z` and result will be `az`.
    Its better to be more predicatble and fix the usage at compile time itself. Typescript does that.
    - ts is not understandable by browser. We have to `compile` `ts` to `js`.
    - At compile time, it removes all types and makes it plain js. But detects and gives error if wrong types are used somewhere in code.
  - Usage:
    - `npm install typescript`
    - `npx tsc <file name>` to convert/ compile `.ts` to `.js`.
  - Types:
    * Primitives (number, boolean, string, null, undefined)
    * Complex type (array, object)
    * Function and parameters (function fun(a: number, b: string){return false;})// infers return type as boolean here.
    * Generics (let function add<T>(a:T, b:T[]){}; // T is generic type which can be anything at the time of using it. 
      add<number>(1, [2, 3])// explicitly specified here or add(1, [2, 3])//infers here
  - React with typescript:
    * For simple components, we can even use without type. But when we start using `props`, situation changes. 
    * We have to specify type instead of `fallback` typoe `any`.
    * Eg:
  ```
    const Todo = ()=>{
        return <h1>First Todo</h1>;
    }
  works fine.
  
  But;
    const Todo = (props)=>{// it starts asking for explicitly specify type. any can be given to fix error. But that is not the specific type.
        return <h1>{props.data}</h1>;
    }
  So,
    import React from 'react';
    const Todo: React.FC<{data: string}> = (props)=>{
        return <h1>{props.data}</h1>;
    }
  React.FC is a special type for `Functional Components`. It has attributes like `children` etc.
  But if we need our addtional attributes also inside props, we have to specify those attrivutes and it's types in `<>` similar to generics.
 
  We can explicty define type and use also as below.
 
    import React from 'react';
    type TodoType = {data: string}
    const Todo: React.FC<TodoType> = (props)=>{
        return <h1>{props.data}</h1>;
    }
  ```
  * What if we want to use normal function instead of arrown function to define component?
  ```
    function Todo(props: React.PropsWithChildren<TodoType>){
        return <h1>{props.data}</h1>;// here, props.children also will be available. We can just use TodoType for props. 
                                     //But then children etc will be missing to access.
    }
  
  ```
  * We can use class, interface or type to define a type.
  ```
  // with type
    type Todo = {
        id: number;
        title: string;
    }
  // with class
  class Todo{
    id: number;
    title: string;
  
    constructor(id: number, title: string){
      this.id = id;
      this.title = title;
    };
  }
  
  // with interface
  interface Todo{
    id: number;
    title: string;
  }
  
  When to use type vs interface?
  - Use type 
    * to combine other types (type SomeType = null | undefined| string)
    * Capture type of an object use that as type;// type x = typeof y;
  - Use interface
    * When we need flexibilty of polymorphic types
    * When we need to support declaration merging.
      ***(With same name, if we define type with different properties, it will be treated as a merged type.)***
  - use class
    * When we want to use new keyword to create an object of the type.
  https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript#:~:text=Declaration-,Merging,-You%20can%20use
  ```
