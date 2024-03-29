
34. React Testing:
  - libraries: `@testing-library` backed by `jest`. 
  - `@testing-library` simulates browser. `jest` helps to run test and assert result.
  - `@testing-library` is on top of 'DOM tetsing library'
  - `@testing-library` can work with not only `jest` but with other frameworks also.
  - We can see `@testing-library/react`, `@testing-library/user-event`, `@testing-libarry/jest-dom` etc.
    when we create app with `npx create-react-app <app-name>`
  - **Unit test**: each individual block of code is tested for various scenarios
  - **Integration test**: tests mutiple blocks together. Eg: one component and it's child tested together
  - **End to End test**: e2e tests the full flows of an application. Eg: login and show home page tested as single flow.
  - Unit Testing: (3As - `Arrange` (set up everything to start tesing), `Act`(trigger some event etc), `Assert`(validate and verify))
    * Eg:
    ```
    App.js:
    -------
      const App = ()=>{
        return <h1>Welcome to testing</h1>
      }
      export default App;
      
    App.test.js:
    ------------
      import {render, screen} from '@testing-library/react'
      test("Description of test", ()=>{
        //arrange
        render(<App/>);
        //act if any
        //assert
       const element = screen.getByText("Welcome to testing");// this fails and throws exception if no/more than one element with exact same string found.
       //const element = screen.getByText("Welcome to TEST", {exact: false});// search irrespective of capital or small, also for substring. 
       //If not found, exception
       //const element = screen.queryByText("Welcome to TEST", {exact: false});// returns null if not found. No exception.
       //If more than one found in query, exception.
       //const element = screen.findByText("Welcome to TEST", {exact: false});// returns a promise if found. Else, exception.
       
       expect(element).toBeInTheDocument();
       //expect(element).not.toBeInTheDocument();// if need to check if not present
      });
    
    ```
      * Eg: with events
    ```
     App.js:
    -------
      const App = ()=>{
        const [change, setChange] = useState(false);
        return (<>
            <h1>Welcome to testing</h1>
            {changed && <p>I am present</p>}
            <button onClick=()=>{setChange(true);}>Click</button>
            </>);
      }
      export default App;
      
    App.test.js:
    ------------
      import {render, screen} from '@testing-library/react';
      import userEvent from '@testing-library/user-event';
      
      test("Description of test", ()=>{
        //arrange
        render(<App/>);
        //act
        const button = screen.getByRole("button");// Refer https://www.w3.org/TR/html-aria/#docconformance to know ARIA roles
        userEvent.click(button);
        //assert
        const element = screen.queryByText("I am present");
        expect(element).not.toBeNull();
      });
    
    ```
    * Eg: with Async:
     ```
     App.js:
    -------
      const App = ()=>{
        const [post, setPost] = useState(null);
        useEffect(async()=>{
          const resp = await fetch('url');
          const post = await resp.json();
          setPost(post);
        }, []);
        return (<>
            <h1>Welcome to testing</h1>
            {post && <p data-testid="post-test-id">{post.title}</p>}
            </>);
      }
      export default App;
      
    App.test.js:
    ------------
      import {render, screen} from '@testing-library/react';
      import userEvent from '@testing-library/user-event';
      
      test("Description of test", async()=>{
        //arrange
        render(<App/>);   
        //act if any
        //assert
        const element = await screen.findByTestId("post-test-id");// findBy returns a promise and hence after fetch completes, we get data.
        //But queryBy or getBy are immediate and hence will not wait for async action to complete and will fail the test. So, `findBy` is used.
        expect(element).not.toBeNull();
      });
    
    ```
    * Eg: with Async mocked:
     ```
     App.js:
    -------
      const App = ()=>{
        const [post, setPost] = useState(null);
        useEffect(async()=>{
          const resp = await fetch('url');
          const post = await resp.json();
          setPost(post);
        }, []);
        return (<>
            <h1>Welcome to testing</h1>
            {post && <p data-testid="post-test-id">{post.title}</p>}
            </>);
      }
      export default App;
      
    App.test.js:
    ------------
      import {render, screen} from '@testing-library/react';
      import userEvent from '@testing-library/user-event';
      
      test("Description of test", ()=>{
        //arrange
        render(<App/>);
        window.fetch = jest.fn();// this makes fetch mocked for this test
        window.fetch.mockResolvedValueOnce({//json
          json: async()=>{return {title: 'post title'}}//async json() of fetch.
        });
        
        //act if any
        //assert
        const element = screen.queryByTestId("post-test-id");
        expect(element).not.toBeNull();
      });
    
    ```
    * get vs query vs find: https://testing-library.com/docs/queries/about/#:~:text=queryOptions%2C%20waitForOptions))-,Summary,-Table
    * Also refer: https://levelup.gitconnected.com/the-difference-between-get-find-query-react-testing-library-bcd996ba3baa
    * Use `msw`(mock server worker) to mock end points with mock server.
    * When we use `axios` etc, if it will be non-transpiled EcmaScript module inside node_modules folder.
      `jest` will not be able to understand it as it is not common JS format. 
      We have to explicitly specify in `package.json` as
    ```
    'jest': {
      "moduleNameMapper": {
        "axios": "axios/dist/node/axios.cjs"
      }
    }
    ```
    so that `jest` can use to `axios/dist/node/axios.cjs` instead of the one from node_modules. 
    Else error comes as `jest` cannot understand EcmaScript version. We can use `transformIgnorePatterns` also to ignore ES6 version.
   * We can add it in `jest.config.js` or `jest.config.json` also.
   * **Test life cycle methods**
    `beforeAll()`
    `afterAll()`
    `afterEach()`
    `beforeEach()` etc.
    **Note that the scope of these life cycles are within file or if they are inside a describe(), test suit, within that describe. Not scoped outside.**
    https://jestjs.io/docs/setup-teardown#scoping
   * Test suit: To have logical/ functional grouping for tests. 
   `describe("test suit 1", ()=>{
          test("test description", ()=>{test body});//add any number of test() to test suit.
      });
   * **All describes and its beforeAll* and body except test() gets executed first. 
     Then only the execution of test()s inside them starts. For each test, before* and after* works. 
     So, we can give beforeAll() and afterAll() outside of all describe() as they are almost like execucting together.**
   * Configure a property called `bail` to true in package.json or jest.config.json to terminate test on first failure. 
     Else it shows errors after finishing all.
   * To test hooks, use `import { act, renderHook } from "@testing-library/react-hooks";`
   * Refer `useCounter.test.js` in testing project.
   * *setupTest.js*:
      `To add jest matchers like toBeInTheDocument() etc.`. This file is used as setupFile for npm run test.
      
