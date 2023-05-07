1. React is a js library which can be used to create client side web UI reactively and highly responsively with declarative approach using component based UI elements. React is faster due to virtual DOM re-rendering
2. Component:
   - What?
     - By definition, it is part of a large system
     - A (not mandatorily) reusable 'UI building block' consists of html, css, js.
     - Eg: Pagination component
   - Why to use components?
     - avoid duplicating and promote reuseability
     - Separation of concern (grouping css, html and js togther for one component)
   - How to build a component?
     - Club together html, css, js to create a UI part.
3. Babel:
   - Transpiler helps to convert new(es6+) js code(may be written in future js) to browser understandable old js(es5) (which js browser supports).
   - **Compiler vs Transpiler**
     - Compiler converts source from one language to another (Jsvs to binary code in javac). End result may be not readable to human
     - Transpiler
       - subset of compiler
       - converts from one language to another or
       - one version of language to another version of same language.
       - Babel does transpile from ES6+ to ES5.
   - Its not part of browser as of now.
   - Then how is chome works with ES6? Reason is latest Chrome supports ES6
4. NodeJS:
   - Helps to give js development/ runtime environement like JRE
     npm:
   - A lib provided in NodeJS to help module repository management (manage libs to be used in a project). More precisely, it is package manager.
     npx:
   - node package execute
   - To execute any package.
   - eg: `npx create-react-app first-app`
5. Setup First react App:
   1. Got to workspace
   2. npx create-react-app first-app
   3. cd first-app
   4. npm start
6. package.json vs package-lock.json:

   - package.json is similar to pom.xml. It holds the metadata related to the project such as name, version, dependencies etc.
   - Dependency packages can have different versions and to enable our project to use the latest versions, there is certain _semantic versioning rules in NodeJS_
     - Semantic Versioning Rules:
     - major.minor.patch is the format for all package versions
     - ~ relates to patch
       `"react": "~18.2.0"` in package.json willmake sure that in `npm update` latest patch versions we will get.
     - ^ relates to minor version update
       `"react": "^18.2.0"` indicates that when we do a `npm update`, latest minor version we will get.
   - package-lock.json will have the versions to be used by default for a project. This helps to reproduce a project with same dependency versions everywhere (in npm install).
   - package-lock.json gets updated when we do `npm update`. This helps us to keep the details of latest dependency versions in local without altering everytime original `package.json`.
   - So,

   ```
   npm install // using existing package-lock.json
   npm update // updates package-lock.json with latest version details to be used in local system.
   ```

   - Singificance of package-lock.json is **it heps us to make a project always reproducible anywhere with exact dependencies that was decided to be used**

7. Analyze a react project skeleton:

   - starting point is `index.js`
   - This is the first file to get executed. Not as it is, but after transpiled. Because import of css etc are not in pure js but gets transpiled by Babel.

   ```
       - first-app
           - public
               - index.html (starting point for html and this will have a div with name `root` under <body> tag)
               - robots.txt (to support search engine optimization for single page applciations where data is loaded late and whiel search engine calls url, index.html gets rendered. but other contents will not get crawled. To help SEO, engines can scan /robots.txt everytime for all websites and optimize reach)
           - node_modules
           - src
               - index.js (starting of .js is from here. div from index.html with id='root' is referred here and appends all upcoming components on this root div)

           - package.json (semantic versioning and project metadata)
           - package-lock.json (fixed dependency versions)

   ```

   - index.js
     ```
     const  root = ReactDOM.createRoot(document.getElementById('root'));// element an be anything, preferable is <div>.
     root.render(<App/>);// virtualDOM reconciliation algorithm starts
     ```

8. How is it possible to use tags within .js?

   - Answer is with `jsx`
   - JSX:
     - Java Script XML
     - Invented from React makers.
     - `This helps react to be declarative. Just use the tags and under the hood, react takes care of rendering it to DOM.`
   - At the end, all these custom tags will be just <div> with our component class name while checking in browser after transpile. _Ultimately, all become div with class_
   - Why is it mandatory to have only one root element for JSX of a compoment?
     **Reason is**
   - Under the hood, the JSX is getting processed by the method `React.createElement('name of tag', {props of tag}, ...child elements if any)`
   - That means, its like a tree structure formation of documeent elements and accepts one element and it's properties and children. Hence if multiple roots are there, we cannot feed it to the single `createElement()` call. That is why such a restriction is there.
   - In older react versions, there used to be an explicit import of `import React from "react";` used to be there and the purpose was to make the method available in each js file for JSX convertion even though we are not doing it explicitly.
   - But in newer versions, react is more intellijent to process the component JSX even if we are not explicitly importing `React` from react package.

9. When we open browser console for react app, we can see some static/js files. These are the transpiled version which holds react lib and our .js file parts as well. (`bundle.js` will hold all js transpiled if lazy loading is not done. Heavy item is data with html which will be loaded/ rendered on demand by react.)

10. Write React component

    - **Function Component**:

      - .js file holds a function which returns JSX.
      - Export and import component
      - Ensure that custom component we create `should start with Capital letter` and used like that in tag.
      - Only one root element per JSX code snippet only is allowed.
      - We can use arrow functions as well

      ```
      function Test{
          return (<div><h1>h1</h1><h2>h2</h2></div>)
      }

      function Test{
          return (<h1>h1</h1><h2>h2</h2>) //will give error as there are h1 and h2. Not single root element.
      }


      but if we do like keeping every elements within a single root element, no error
      ```

      - In JSX,
        - class => className
        - To use js code inside JSX, put {} and add js code inside that.

11. Pass values across components using props:
    - Components cannot use other component's propeties directly.
    - In function component, all properties added in tag will form a single object of key-value pair which comes as the param of function component.
    - In each component, it will be accessible as
      `props.key` ie; param.propName
      _See ExpenseItems.js for sample_
    - Way of creating smaller components and club together to form complete component with wrapper is **composition of components**. (group of smaller set of components) eg: Card
      - Advantages:
        - Allows to create own wrapper components to reuse
        - props.children is the main feature that we use for such wrappers.
        - Helps to apply similar style for any components. (like we can apply Card style to any custom component we make.)
12. JSX:
      - JavaScript + XML
      - From React owners itself
      - Syntactic sugar.
      - JSX is converted by Babel. React.createElement() is used in each file (previously we needed to add explicitly. But from v17, its automatically done).
      - It safeguards from DOM based cross-site-scriptting attacks. (https://www.stackhawk.com/blog/react-xss-guide-examples-and-prevention/#:~:text=If%20you%20check%20now%2C%20the,a%20DOM%2Dbased%20XSS%20attack.)
   
13. Events and State:
   - State helps to hold values that can change
   - Props holds immutable values
   - On state change, component gets scheduled to be re-evalated and re-rendered.
   - useState() hook gives [snapshot, setter]. Only if we use setter, value chnage based re-render ocucures. Else not.
   - setX() will be async
   - When we need to use old value of state and do a partial update, better to use setX((oldSnapshot)=>{return oldSnapshot.updatedWith(newVal);}).
   - State uplifting: To move state to parent so that other siblings also can get the changes from parent. Eg: When we add new expenses, it is lifted to add to set of expenses in App.js so that it can be fed to Expense items as well.
   ##Controlled vs Uncontrolled components Stateful vs Stateless:
   Stateful: Component with own state management
   Statelsss: Component without own state
   
   controlled: State or view of these type of components are getting managed by parent or from outside. 
   This will be STATELESS. Relies on props.
   
   uncontrolled: Those components whose view or state is not controlled by any other component. 
   So, basically is STATEFUL. 
   Components with ref are uncontrolled since its states are not managed by any other React component. Its solely on Real DOM. (ie; own state or with ***ref*** makes one uncontrolled.)
   
   **Stateful means re-render. So, a bit more overhead. Mostly controlled, statless = presentational components are more in use/ preferred.**
   
14. List of Components and Conditional Rendering:
      - *Why key for a list of items is required?*
         - 2 reasons.
         - React re-renders the list of items if the length of item array is changed. Then it recreates each item components. If there is key, React will identify the components existing and i will get reused and new component for the one with new key from the list will get created.
         - Without key, performance overhead of recreation of components for each item will be there.
         - If any such item component has a state to manage (stateful item), that state will be lost due to re-creation for uncontrolled components.
   If nothing specified, iteration index will be key. But this can lead to issues as mapping of component to state may get messed up for controlled components.
   
15. Styles added with {{}}.
   Eg: `<div style={{height: 90px}}>`
   - 2 ways of Conditional/ Dynamic styling:
      * Inline styling -  problem is as it gets highest priority and difficult to manage.
         Eg: 
      ```
         <label style={{color: isInValid?'red':'blue'}}>
      ```
      
      * Conditonal className based - with the help of className property. Much better as .css file has the styles grouped.
        
         Eg:
       ```
          <label className={`myLabel ${isInValid?'red':'blue'}`}><label>// js inside ${} within ``
        ```
         Prolbem here, same style class name can be used in different components and hence change in one may affect others.
         Then how can we make styles dynamic? 
             
      * One way is creating varient of a component using `styled-component` library 
      * Another is use theming with chakra-UI etc.
             The advantages here is, it will give us a class name which is dynamically generated. In UI inspect element, those class names will be with some random names. So, possible duplicates in different parts of application will be minimal.
             https://styled-components.com/
   
16. Fragments:
             **Why?** - React.createElement() processes each JSX and it cannot accept more than one JSX root element.
             But its unnecessary if we add an extra `<div>` just because of that wrapping the adjacent elements.
             What can be solutions for this?
             
               - Use <div> to wrap - but adds extra div everytime just for wrapping purpose
               - Use [] array to wrap. But the problem is, React asks for key for each item in array and its quite annoying.
               - Custom wrapper
                  `Wrapper = (props)=>{return props.children}` - this will not add any extra to the DOm. So, is better.
               - Fragment is the default wrapper provided by React.
                   `<><div>Div 1</div><h1>H1</h1></>`
                    Here, `<></>` is called Fragment in short-hand.
                     or
                    <React.Fragment></React.Fragment> in broder way.
             
17. Portals:
             
        - When we use dialog, modals, drawer etc. it's not ideally below root element. Instead, it comes on top of everything in body.
        - So, its better to attach such components to another root in same level of root element.
        - Portal helps us for that. ***Portal helps to attach a component to any element in real DOM.***
        - From library `react-dom`
             
        - Eg:
         Create ErrorModal as;
             
                  const ErrorModal = ()=>{
                     const modal = [
                           <div className={styles.backdrop}></div>,
                           <Card className={styles.modal}>
                              <header className={styles.header}>
                                 <h2>{props.title}</h2>
                              </header>
                              <body className={styles.content}>
                                 <p>{props.message}</p>
                              </body>
                              <footer className={styles.actions}>
                                 <button onClick={props.resetError}>Ok</button>
                              </footer>
                           </Card>];
                     return ReactDOM.createPortal(modal, docuemnt.getElementById('modal-root'));
                  }
             
               Now, whenever we use <ErrorModal/>, it will get added to the modal-root.
             // Ensure that public/index.html has <div id='modal-root'></div> in body tag near to root tag.
             
         
     Why is Portal part of ReactDOM?....its the lib that converts component to required browser understanable DOM structure. So, it has more control over the DOM manipulation.
             

             
18. Ref:
       - Reference
       - Refers to an html element in Real/ Direct DOM.
       - useRef() hook from 'react' lib to be used to create a ref.
       - ***Not recommened to use as it can direcly manipulate the DOM. So, avoid `ref.current.value=something`. Even XSS can happen. Be careful.***
       - Elements that uses ref is not controlled by React. But instead, its direcly the DOM element. So, such elements are uncontrolled.
             Their internal states are managed by itself.
             
       eg:
             
      
             const RefComponent = ()=>{
               const iRef = useRef();
             <input ref={iRef} onChange=()=>{console.log(iRef.current.value)}></input>// on change, the value in field will be printed in console.
             }
   
19. useEffect:
            
   - A React hook that helps us to do some actions after a render.
   - Equivalent to componentDidMount, componentWillUnmount, componentDidUpdate etc.
   - It can take an action (effect), array of dependencies based on which this effect is to be triggered
   - The effect function can have a function as return. This will be clean up function.
   - *effect function gets triggered on mount and whenever dependencies changes*
   - *clean up function will get not triggered on mount. But after that, first cleanup happens and then effect executes.*
   - *on destroy or unmount of component, the cleanup function gets triggered. But not the actual effect.*
   - useEffect(effect): gets triggered everytime
   - useEffect(effect, []): get triggered only on mount
   - useEffect(effect, [var1]): get triggered on mount and everytime when the value of var1 changes. (var1 will be state variable)  
   - useEffect(effect, [props.var1]): on mount and whenever props.var1 coming from parent changes
            
Note: **Only when a props or state variable changes, re-render happens. So, if we have dependency to a local variable, on re-render, this var will get re-created. So, useEffect will not get triggered even if we change its value.**       
      ***The variable should be in props or in state to get preserved. If its preserved, we can identify the changes and trigger useEffect***
      ***useEffect invoked after render/ re-render (didMount/ didUpdate). Flow: render/ re-render->useEffect.  Effect Not called on willUnmount, but cleanup gets called.***  
      ***useEffect cleanup not called on didMount. Called before effect on didUpdate. Gets called on willUnmount***
      
            `In effect, ueEffect get triggered on mount, unmount, update/ re-render. But on mount, triggers effect. On unmount triggers cleanup.`
   
```
    syntax:
            useEffect(effect function, [dependencies]);
    syntax of effect function with cleanup:
            useEffect(()=>{
            ...do something;
            return ()=>{
            //cleanup action
            };
            }, [dependencies]);
            
```
            
  - When to use useEffect?
    - Whenever we need to interact with outside of React.
    - Whenever we want to do something beyond just rendering
            
    - Eg:
            
       * HTTP call
       * Local storage or any other browser API calls
       * websocket calls
       * Key stroke based state variable validation (eg: state variable email id validate on every state change)
       * Do some action in child based on props value coming from parent. (parent selects currency. Child has to make API call based on currencies list property on re-render. 
       - *Advantage of using a prop variable (props.var1) as dependency helps us to trigger useEffect only when that particular props is changed. Not if any other props.var2 is changed.*
            
            
```
Note: when we change state of parent, parent and child gets re-redenred. Child is not getting re-created. So, props change can be identified. That is why [] and [props.var1] are different. 
            
Empty aray makes useEffect() trigger on create/ mount. [props.var1] will make child useEffect gets triggered only if props changed. 
            
If the parent has a conditional mount and unmount of child (eg: {someVar.length>3 && <Child var1=something/>}, whenever condition is false, child gets destroyed and on true, new child gets created. So, useEffect triggers on mount irrespective of pro.var1 in such cases.) 
  
What will happens if we add depency without array.
            useEffect(()=>{//do something}, a, b);
            Here, only first time it gets triggered. But after that no. This is same as  useEffect(()=>{//do something}, []); which is once in life time.  useEffect(()=>{//do something}); always gets triggered after each re-render.
```
            
Some samples: https://dev.to/colocodes/6-use-cases-of-the-useeffect-reactjs-hook-282o)
            
20. useReducer:
 
   - Hook to deal with state
   - This one is used by `useState` under the hood. So, in effect, everything with state management is useReducer.
   - Why we need to use useReducer if there is already useState is there?
         - Use it when useState cannot handle things well. Overall, useState is a wrapper on useReducer.
   - When to use useReducer?
            - There are so many states to manage and due to which many number of re-renders happens unncessarily. Reducers helps to group all states together and then re-render count gets reduced.
            - When there are many state, we make into complex object. So, if there is a state holding complex object, its good candidate for useReducer.
            
   - It is an obvious question that why can't we use `useState(call back with prev state)` instead of reducer.
            That is ok.
            But if we want to perform some transformation, with every setter usage, we have to repeat the reducer logic.
            useReducer is giving a ready made solution here.
            We just defines the reducer and simply with despacher, we can just send action object and react wll take care of the rest.
            Refer https://docs.google.com/document/d/1NXd2OWsbvku1-V5hLAWOLRmQducxlctOsOkvmOS1Ebk/edit to find the code...how with setState, we             have to add many boiler plate code everytime and reducer makes it much easier.
            
   - Then, what would be reason that `setState((prevState)=>{return newState})` got introduced?
            Its actually to have something equivalent to update state with respect to previous state in setState() of class based components.
            But when we got functional components, useReducer came in v16.8 to manage complex states with less boiler plate code to have    
            reducer and then despatcher and inside despatcher, call setter etc.            
            There is not `setReduce` in class components but setState with prevState callback is the only rescue. But when comes to functional
            component, useReducer makes our life easy with despatcher already capable of to call reducer.
   
```
               Note: 
                  const [x, setX] = useState('');
                  const [y, despatchY] = useReducer(reducer, '');
            Here, setX and despatchY are created once and in re-redner, they will not get changed ever. So, in a child, if we add them as dependecy for useEffect, its meaningless as until a re-mount happens, this functions will never change. So, if we want to use setter on useEffect of child, better to call it in another function in parent and pass that function to child as a props and add it as dependency in useEffect.
            
            Refer note in ReducerLogin.js useEffect.
            
            Setter function associated/ created with useState, useReducer hooks will not change for the entire life of component. But if we have a local variable or function inside our component, it gets re-created on every re-render. So, using that in useEffect matters.
            
            
            * Note that
            setState in class components has a callback to execute immediately after state change happens asynchrounously. But setter or despatcher does not accept callback function when we use useState or useReducer in functional components. Here, we have to use useEffect depending on state variable as a replacement for callback.
            
```
   https://www.robinwieruch.de/react-usereducer-vs-usestate/
   https://dev.to/m0nm/usestate-vs-usereducer-what-are-they-and-when-to-use-them-2c5c
   https://www.youtube.com/watch?v=DmxzHJ3lq6U - example with animation
      
           
21. useContext:
       - Context:
            - Context is a place to store shared state variables or functions so that without forwarding it way too far via props.
            - This helps to avoid keeping states used by different children in top parent and passing it to deeper children. At times, the intermediate components might not even bother about this props and it feeds the same blindly to its own child. So, for that component, this property is even not relevant. So, if there is a common storage for such shared states, those components whoever need it can subscribe and use it. That is the concept of context.
            - But context is not good solution when frequent updates to state variables are there and Redux is betetr then.
            - How to use context?
            - 2 ways are there.
               - With React.createContext() and then with provider and consumer (mostly best in case of class components)
               - With React.createContext() and then provider to pus data, `useContext()` to consume state values.
            - Sample with Provider and Consumer:
 
 ```
            auth-context.js
            ---------------
            const AuthContext = React.createContext({// json as default value and just for structure.
                           isLoggedIn: false, 
                           onLogIn:()=>{}
                     });
            export default AuthContext;
            
            ProviderComponent.js
            -----------------------
            const ProviderComponent = ()=>{
            const [isLoggedIn, setLoggedIn] = useState();
            return <AuthContext.Provider value={isLoggedIn: isLoggedIn, onLogIn:()=>{console.log('Logging in...!');}}>
                        <ConsumerComponent/>
                   </AuthContext.Provider>
            
            }
            export default ProviderComponent;
            
            
            ConsumerComponent.js
            -----------------------
            const ConsumerComponent = ()=>{
            return <AuthContext.Consumer>
            {(context)=>{return (// Inside Consumer, expects a function with context as param and JSX as return
                  <>
                     {context.isLoggedIn && <h1>Logging In</h1>}
                     {!context.isLoggedIn && <h1>Logging Out</h1>
                  </>
                  })
            }}
            
            </AuthContext.Consumer>
            
            }
            export default ConsumerComponent;
                     
 ```
         Sample with useContext:
 ```
            auth-context.js
            ---------------
            const AuthContext = React.createContext({// json as default value and just for structure.
                           isLoggedIn: false, 
                           onLogIn:()=>{}
                     });
            export default AuthContext;
            
            ProviderComponent.js
            -----------------------
            const ProviderComponent = ()=>{
            const [isLoggedIn, setLoggedIn] = useState();
            return <AuthContext.Provider value={isLoggedIn: isLoggedIn, onLogIn:()=>{console.log('Logging in...!');}}>
                        <ConsumerComponent/>
                   </AuthContext.Provider>
            
            }
            export default ProviderComponent;
            
            
            ConsumerComponent.js
            -----------------------
            const ConsumerComponent = ()=>{
            const context = useContext(AuthContext);
            return (
                  <>
                     {context.isLoggedIn && <h1>Logging In</h1>}
                     {!context.isLoggedIn && <h1>Logging Out</h1>
                  </>
                  );
            
            }
            export default ConsumerComponent;
            
            
    Note: Refer index.js and auth-context.js in use-context project to get an idea on how we can make AuthContext.Provider into a separate component and use it instead of <AuthContext.Provider> every time in provider components.        
 ```
   
  ***When to use context and when not to use?***
   - Better not to use in base components such as cunstom button we make etc so that it is re-usable
   - Btter to use when lengthy forwarding of state as propertieshappens from parent to far away children
   
  Note:
   - Is it important to specify the default values in React.createContext()?
      * No. But if we provide that, IDE can provider proper suggestions on `context.`
   - When we do a useContext() or AppContext.Consumer, React looks for nearest provider of that type. May be from just above paranet or from ancestors in hierarchy.
   - Warning comes when we are not ging values while wrapping provider component with `<AppContext.Provider>`.
   - If value attribute is not provided, error comes in consumer side as `content is udenfined and cannot read props of undefined`
   - If we miss out one prop in value json, its ok to create context, but error comes(undefined comes in case of variables) when we try to use that props from context value json
   - Even if we define some default value for a json props, it will not be taken as new json without the props is used to create context.
   `React.createContext(isLoggedIn: false);`
   Now, in `<AppContext.Provider value={isLoggedOut: true}>` means that isLoggedIn is undefined and the context has json with key isLoggedOut.
         
22. Rules to follow while using a hook:
   `1. Always use hoos inside a functional component`
   `2. Use hook only at the top level of functional component. Not insiude some random function or callback of another hook etc.`
   
23. React.forwardRef() function and useImerativeHandle() hook:
   - This is to expose the child properties and functions to parent component.
   - Wrap child with React.forwardRef() to enable to accept ref similar to props.
   - Use useImperativeHandle() to attach properties or fuctions of child to the ref came from parent.
   - Refer Input.js and Login.js in use-context project for sample.
   - At the max times, without ref and impertaive approach, we can make things work. Making child focus, scroll etc, this helps.
   - Why is exposing a ref good? 
   When we write some component libraries or reusable components, refs exposes teh possibility to access direct DOM element so that in some rare situations, other develpers might need that. Usually, ForwardRef and useImerativeHandle are used together to make clean, testable, high performing(re-renders only child instead of parent etc when needed.)
   
   - If we use refs a lot, it can be a performance problem also. The reason is, whenever a chnage to ref happens in actual DOM, a re-render occurs. This is valid in case of states and props as well.
   - Using refs exposes the child and hence encapuslation is lost for child. It leads to unpredictable nature. We as behavior of child will couple with parent.
   - Also, it can be confusing to other developers in terms of maintainability, debugging, testing(difficult to set test data with ref and assert)
   - That is why, we have to use refs carefully.
   - But if we use wisely, it improves performance.
   ***Most of the time, with props and useEffect itself, we can tackle situations and avoid imeretive handle to be in line with declarative approach of react*
   
24. React Internals:
   - React has two main libraries
        * react -  takes care of react components and its re-evaluation based on state, props or context changes. It updates the virtualDOM whenever a change occurs in re-evaluation
        * reactDOM - interacts with realDOM. It compares the previous and current snapshot of virutalDOM and then updates the reactDOM with only the difference so that the changes are visible in web UI.
   - Whenever a component is re-evaluated, its child components also get evaluated irrespective of the properties, state or context values changes for child.
   
   ***Then this leads to re-evaludation of components which are not even having any change. That too is unnecessary burden. How can we prevent it?***
   Solution is,
   **React.memo(component)**
   - When we wrap a component with React.useMemo(), that component will get re-evaluated due to re-evaluation of parent only if it's props changes (or own state changes)
   ```
   const MemoParagraph = (props) => {
      console.log("Re-evaluated MEMO PARAGRAPH");
      return (
         <div>
            {props.toggleParagraph && <p>Momorized paragraph from child component</p>}
            <button onClick={props.toggle}>Toggle Memo</button>
         </div>
      );
   };

   export default React.memo(MemoParagraph);
   // When in parent of it, toggleParagraph changes or toggle chnages, this re-evaluated.
   ```
   But most of the time, whatever we pass to a child will be a funcion or an object and if it's not a state function, on each re-evaluation of parent, it gets re-created. So, this child also gets re-evaluated and Memo become powerless.
   
   ***Then how can we make a function (state despachers are already singleton) of parent not to be re-created on every re-evaluation of parent?***
 `The soultion is useCallback() hook`.
 - If we wrap a function inside useCAllback() hook, it will not get re-created until it's dependencies changes.
 - Structure is similar to useEffect.
   
 ```
   const myFunction = useCallback(()=>{//do something}, []);
   // If we are not giving depencies array, it has no effect and acts as normal function which gets re-created
   // If [], only once it will get defined and never changes afterwards.
   // This can lead to a problem due to the JS closure. So, if we add a dependency, whenever that chnages, re-creation of function happens with the re-evaluation and hence will be fine.
   
   const Parent = ()=>{
   
   const [toggle, setToggle] = useState(false);
   //const myFunction = useCallback(()=>{if(toggle){//do something}}, []);// here, if we change toggle by clicking button also, toggle will be false inside myFunction. Child will never get re-evaluated and re-rendered in virualDOM.
   const myFunction = useCallback(()=>{if(toggle){//do something}}, [toggle]);// here, whenever a button click happens, myFunction is created new and hence Child also will get re-evaluated and re-rendered in virtualDOM. Then if inside child something chnages, it gest applied to reaclDOM by reactDOM lib.
   
   return (<div>
            <Child onChange = {myFunction}/>
            <button onClick={()=>{setToggle(!toggle)}}>test</button>
          </div>);
   }
   
 ```
   
 - `useCallback` helps a component to memoise functions. What to do to remember variables?
   `useMemo` is the solution. If we wrap our variables with useMemo(), it will be protected from re-creation on re-render.
   Eg:
   ```
      const memoVar = useMemo()=>{return [1, 2, 3, 4], [dependencies...]};
      // Now, memoVar will get re-created only when dependencies changes. It helps in situations like a big array is passed every time to child and child is React.memo. So that the props chnages only when dependencies in useMemo() of parent changes. Refer DemoLIst.js in react-internals project for sample.
   ```
   
   **Notes:**
   
   ```
   - If we are not setting dependency array for useEffect(), useMemo(), useCallback(), whatever inside it just acts like normal functions.
   - If [] makes them activate one time
   - useMemo() is not used so much but useCallback is very much in use.
   - Whenever we use React.memo(), intention is to avoid re-render. But it comes will a cost as it has to verify each of the props to check everytime to decide on re-render or not. So, use it only when necessary. 
   - Avoid React.memo() if the component props chnages very frequently.
   - Better to use it to wrap pure function components. **Pure means always returns same output for same input**
   ```
   
   `State updates in sync will be processed by react in a batch. Those in nearby lines but async will be processed separate. Refer App.js of react-internals project for sample code.`
   
   `State updates for same state variable will be added to a scheduler queue and processed by react. So, if state change depends on previous state, betetr to use setState((prevState)=>{// update state logic})`

25. Class based components:
   - Uses class concept from ES6
   - These were the first famous approach before functional components become powerful with hooks from v16.8 of react
   - Before that, to use state, we must use class components.
   - Class has life cycle methods instead of hooks. 
   - Eg: 
      - componnetDidMount() = useEffect with [] empty array. Only once executed
      - componentWillUnmount() = useEffect with cleanup
      - componentDidUpdate() = useEffect with [depedencies] so that whenever a re-render happens, this gets triggered.
   - But nowadays functional components are preferred unless
         - existing project follows class based approach
         - we need Error boundaries with componetDidCatch() since in functional components, there is nothing equivalent of it till now.
   - Why is functional components are prefeered?
         - Its lean and simple with the help of hooks and no need to keep in mind of life cycle methods
         - Its re-usable since functional components has no states i built until we add one
         - Performance wise also its better as react does not have to bother much on states, lify cycles etc
         - Class components can use only one context at a time as `static contextType` variable accepts only one. But with functional, we can use useContext() and any number of contexts in one component.
