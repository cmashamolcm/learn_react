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
    - Eg:
            
       * HTTP call
       * Local storage or any other browser API calls
       * websocket calls
       * Key stroke based state variable validation (eg: state variable email id validate on every state change)
       * Do some action in child based on props value coming from parent. (parent selects currency. Child has to make API call based on currencies list property on re-render. 
       - *Advantage of using a prop variable (props.var1) as dependency helps us to trigger useEffect only when that particular props is changed. Not if any other props.var2 is changed.*
            
            
`Note: when we change state of parent, parent and child gets re-redenred. Child is not getting re-created. So, props change can be identified. That is why [] and [props.var1] are different. Empty aray makes useEffect(0 trigger on create/ mount. [props.var1] will make child useEffect gets triggered only if props changed. If the parent has a conditional mount and unmount of child (eg: {someVar.length>3 && <Child var1=something/>}, whenever condition is false, child gets destroyed and on true, new child gets created. So, useEffect triggers on mount irrespective of pro.var1 in such cases.) `
            
Some samples: https://dev.to/colocodes/6-use-cases-of-the-useeffect-reactjs-hook-282o)
            
   
   
   
