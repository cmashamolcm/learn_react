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
  - Usgae:
    - `npm install typescript`
    - `npx tsc <file name>` to convert/ compile `.ts` to `.js`.
  - Types:
    * Primitives (number, boolean, string, null, undefined)
    * Complex type (array, object)
    * Function and parameters (function fun(a: number, b: string){return false;})// infers return type as boolean here.
    * Generics (let function add<T>(a:T, b:T[]){}; // T is generic type which can be anything at the time of using it. 
      add<number>(1, [2, 3])// explicitly specified here or add(1, [2, 3])//infers here
  
