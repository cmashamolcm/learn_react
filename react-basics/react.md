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
    - Dependency packages can have different versions and to enable our project to use the latest versions, there is certain *semantic versioning rules in NodeJS*
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
        const  root = ReactDOM.createRoot(document.getElementById('root'));// elementc an be anything, preferable is <div>.
        root.render(<App/>);// virtualDOM reconciliationalgorithm starts
        ```
8. How is it possible to use tags within .js?
    - Answer is with `jsx`
    - JSX:
        - Java Script XML
        - Invented from React makers.
        - `This helps react to be declarative. Just use the tags and under the hood, react takes care of rendering it to DOM.`
    - At the end, all these custom tags will be just <div> with our component class name while checking in browser after transpile. *Ultimately, all become div with class*
9. When we open browser console for  react app, we can see some static/js files. These are the transpiled version which holds react lib and our .js file parts as well. (`bundle.js` will hold all js transpiled if lazy loading is not done. Heavy item is data with html which will be loaded/ rendered on demand by react.)

10. Write React component 
    - **Function Component**:
        - .js file holds a function which returns JSX.
        - Export and inport component
        - Ensure that custom component we create `should start with Capital letter` and used like that in tag.
        - Only one root element per JSX code snippet only is allowed.
        ```
        function Test{
            return (<div><h1>h1</h1><h2>h2</h2></div>)
        }
        
        function Test{
            return (<h1>h1</h1><h2>h2</h2>) //will give error as there are h1 and h2. Not single root element.
        }
        

        but if we do like 
        ```
        - In JSX,
            - class => className
            - To use js code inside JSX, put {} and add js code inside that.
11. Pass values across components using props:
    - Components cannot use other component's propeties directly.
    - In function component, all properties added in tag will form a single object of key-value pair which comes as the param of function component.
    - In each component, it will be accessible as 
        `props.key` ie; param.propName
        *See ExpenseItems.js for sample*
    - Way of creating smaller components and club together to form complete component with wrapper is **composition of components**. (group of smaller set of components) eg: Card
        - Advantages:
            - Allows to create own wrapper components to reuse
            - props.children is the main feature that we use for such wrappers.
            - Helps to apply similar style for any components. (like we can apply Card style to any custom component we make.)
        



    

