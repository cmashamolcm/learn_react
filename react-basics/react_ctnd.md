28. Custom Hooks:
   - React hooks are special type of functions. We cannot use it in class components and we cannot use it anywhere outside functional components.
   - Simiarly, states also (that also isa hook).
   - This leads to a problem that we cannot reuse such functions in multiple components. The solution is custom hooks.
   - A custom hook is a function strating with `use` and that can call another hooks in it.
   - One best usecase is writing a hook to handle http fetch.
   - Refer 'custom-hook-http' for sample code.

29. Forms:
   - We can use custom hooks to club validations for a form
   - Value and validation of each input can be treated as a single reducer.
30. **Redux:**
   - `Redux is a state management system to manage the cross-component or app-wide states`
   - States:
      - It holds values that can undergo some change and gets reflected in components
      - 3 types:
         * Local State (local to the component - useState(), useReducer())
         * Cross-Component State (shared between components via props drilling or context. Eg: state to close a modal passed to children).
         * App-wide states (state that is shared with almost all components of an app via context or props drilling. Eg: auth token)
   - Context helps to manage cross-component or app-wide states.
   - ***Then why we need redux if context also does the same job?***
      ```
      The reason is;
         1. Context is not optimum in performance when frequesnt updates happens
         2. Context makes a lot of unnecessary nesting. Eg: If we have 3 contexts to be sued, our components will have 3 Provider wrapping on it.
      ```
   - Redux is based on producer-subscriber concept
   - Steps to use Redux:
   - store:
   `const store = redux.createStore(reducer);`
   - reducer function:
   `const reducer = (prevState = default value if any, action)=>{return newState} //action will have action.type`
   - subscriber function:
   `const subscriberAction = ()=>{consle.log(store.getState())}`
   - How to attach subscriber to store with subscription:
   `store.subscribe(subscriberAction);` //This will trigger execution of reducer the very first time
   - How to update the store:
   `store.dispatch(action object with type prop specified)`// this will trigger execution of reducer and hence store gest updated. Then all subscribers will get notified.
   - *The only way to update store is strictly through dispatcher and no component can directly update store.*
   - `Redux can be used with any JS. It's not specific to React`

  - *How to use Redux with react?*
      - Two libraries to install:
         * redux - has createStore(reducer), store.dispatch(action), store.subscribe(consumer function) etc. 
         * react-redux - has `<Provider store={our store function}>`, useSelector(state=>{items from state}), dispatch = useDispatch()
      - Steps:
         * define reducer, store in store/index.js and export.
         * Add `<Provider store={store}>our components</Provider>` to a component which will be top component after which we need store.
         * In our component, useSelector(), useDispatch() to get store states and dispatch actions respectively.
         * In class class components, Till wrapping with of provider, its the same.
         * But after that, in subscriber component, wrap that with response from connect() function from `react-redux`. connect(propsFromState, propsFromDispatch)(our component);
         * In dispatcher, we can send action type and any payload data as well.

  - *Better way to integrate Redux in React*
      - Why need a better way?
         * We have to add many conditions in reducer to accomodate different data in store
         * Based on different scenarios, we have to manage many action type also. In a team environment, if so many action types comes, it can be duplicates, confusions etc. To an extend, with constants/ enum as action type, we can manage. But its not a good solution. (Something with ctrl+space makes our life easier and less to keep reminded.)
      - The solution is, a library called **@reduxjs/toolkit**
      - This contains 'redux' as dependency in it. We don't have to explictly install 'redux(v4.x)'. But **Don't forget to add 'react-redux(v8.x)'**
      - `@reduxjs/toolkit is using a librray called "immer" that can mutate state safely even if we do state.counter++ instead of setState(prevState.counter+1)`
      - How to use it?
         * Create reducer slice: 
            Instead of single reducer for store, we will be make a slice of reducer.
           `const slice1 = createSlice({
            name: 'reducer name',
            initialState: {state values as json},
            reducers: {action1: (state)=>{state mutation}, action2: (state, action)=>{state mutation with the help of action.payload}}// map that is equivalent to each if else if in old reducer. (action type based). Here, state mutation is handled well by immer. So, direct update on state object is ok.
           })`
         * Now,
           Create store using these slices
           `const store = configureStore({reducer: slice1.reducer})` if we have only one reducer. What if we have multiple such slices
           `const store = configureStore({
                           reducer:{
                              key1: slice1.reducer,
                              key2: slice2.reducer,//...and so on
                           }})`
         * Now, we need to gets the actions so that components can submit data to store.
           `export const actionsOfSlice1 = slice1.actions;`
           Now this actions can be imported to any component and we will be asble to use it just by .ctr+ space.
           The names of actions will be same as the names we gave as keys in reducers map inside slice.
           These are not actually direcly the function we gave as reducer. But its another function which will call our reducers we specified in slice
           with type = 'name of slice/key of reducer'.
           Eg: `actionsOfSlice1.action1() will invoke the real reducer with payload we give and type=slice1/action1`
         * In consumer side, `const dispatch = useDispatch()` and `const storeData = useSelector((state)=>return {values from state})` will be the same.
         * Only difference is, if we have multiple reducer slices,
           `to get state data of one slice, we have to call state.reducerKey.var`. reducerKey here is the key in map of reducer in configureStore. Ie; 
           something like `state.key1.variable`
         * How to trigger deispatch actions?
           `dispatch(slice1.action1())` if there is no data to update from outside
            When we have to pass some value to the dispatcher as part of action, we can pass that as param.
            `dispatch(slice1.action1(payload data));// In reducers, it will be available from 'action' parameter if any of each reducer function and use it as action.payload there.` 
       - An application may have multiple stores even though it is not recommended.
       - `If 2 stores are there and are attached to Providers and one is wrapped with other one, inner most store will be dominating. `
       - `If 2 stores are provided to two different sibling components, each of the sibming will get it's own store and other will not get the non-provided one`
       - *But how can we perform or use effects/ async operations when some change happens to the state in a store?*
       - `We cannot use effects/ async inside reducer functions.`
       - `Store reducer functions are expected to be *Pure*, *Side effect free*, *Synchronous*`
       - Then how can we use effects and async?
            * There are 2 options
               * Define effects and async function logic in individual components keep reducer lean just to update the state. (`Here code duplication is more an component will be fat`) [fat components]
               * Define custom actions for reducer. (Here, reducer will be lean with only necessary logic. And componets also will be lean as custom actions takes away all complexity.) [fat actions]
               * If we have `complex logic and there is no async or effects` on state change, keep things with reducers. (fat reducer)
       - Custom Actions
            * Normal functions that returns `a function accepting `dispatch``. 
            * It can hold async functions but cannot hold hooks as hooks can be used inside another hook or functional component only.
            * Export these custom actions
            * Import it in component and use it as `dispatch(customAction(if any params we need to pass to update store state));`
            * This will get executed after a state change happens for store if we call it insdei a useEffect of component.
       - **Redux hooks**
```
        ----------------------------------------------------------
        - `useDispatch()` - trigger actions
        - `useSelector((state)=>{return data from state})` - to access state data
        ----------------------------------------------------------
```
31. **Routing:**
   - Routing is process of binding a URL to a component
   - `react-router-dom` is the library to use
   - Multi-Page Routing vs Single Page Routing: MPA renders htmls in browser by making http call to the server. SPA does not go every time to backend. Instead, it creates pages in client side with JS.
   - React router enables client-side routing.
   - Step by step:
```
1. npm install react-router-dom
2. Create router.
         const router = createBrowserRouter([{path: '/', element: <Home/>}, {path: '/products', element: <Products/>}]);
         Then add <RouterProvider router={router}/>
         
         // Instead of this way, more dclarative approach will be;
         //const routerDefinition = createRoutesFromElement(
         // <Route><Route path='/' element={<Home/>}></Route><Route path='products' element={<Products/>}/></Route>);
         // const router = createBrowserRouter(routeDefinition);
         // <RouteProvider router ={router}/>
         
3. Now, how to use this;
      <Link to="/products">PRODUCTS</Link>// Replaces with <a href> but no reload happens and just in client side, page changes
      <NavLink to="/" className={({isActive})=>{isActive?{color: 'red'}: styles.linkStyle}}>Home</NavaLink>// This helps us to appl some styles depending on if link is active or not. Here, makes the link red if current path is /.
      Path is something coming after the somain name in URl. 'protocol://domain/path'
      
4. But how can we navigate programatically. Eg: on click of a button?
      const navigate = useNavigate();// hook
      navigate('/products');// path to navigate is specified.

5. What if we want to pass some path parameters?
      Define routes as {path: '/product/:productId', element: <ProductDetails/>}
      Now, in ProductDetails component, 
      const params = useParams();//hook
      params.productId; will give the value. The key should be matching with path parameter name in route definition.
6. How to add a component with Links available everywhere like Menu in header?
      We can add children in route definition.
      const router = createBrowserRouter([{path: '/', element: <MenuHeader/>, 
                     children: [{path: '/home', element: <Home/>}, {path: '/products', element: <Products/>}]}]);
      Now, to attach the children to common component, ManHeader here,
      Inside MainHeader component add <Outlet/>.
      This is the location where the children are going to get added and redered.
      
```

   - Absolute vs Relative routes:
      
      * Starting with '/' is absolute path. this means, it begins after domain. protocol://domain/path. Here /path is absolute path.
      * Without '/' means relative path. It adds "/" and then path to the just previous url. If we have '/domain/parentPath'  as parent route, 
        then path="path" creates a route "/domain/paranetPath/path". If it was absolute, it would ahve been "/domain.path".
      * If we are trying to add parent path as `/parant` and in sub-routes, just adds `/child1`, `/child2` instead of `child1` and `child2`, error comes
        stating that child routes should have path including parent path or otherwise give it as relative path without `/`. This is because, under a 
        parant path, if the child has absolute path, it might be in wrong location as both child and parent are not related. When we give 
        absolute pah (with `/`), it just gets appended to domain. Not to the previous path. Then giving it outside the parent is also same.
      * When we do `<Link to={..}>Home</Link>` indicates that just go back to previous/ parent route. Eg: `localhost:3000/root/product/list` can go to 
        `localhost:3000/root` if `/product/list` was an absolute path under parent `/root`.
      * To make it go back just one segment back. Eg: to `localhost:3000/root/product`, we have to set a property for link as 
        `<Link to={..} relative='path'>Home</Link>`// By default it is `relative='route'`. `relative='path'` will just remove the last segment (till last 
        `/`) to get the new path. ***relative property as route means, go to parent route. path means, go to one segment up.***
  
  - To set a route as home page or default index link, set index=true for that route. {index: true, elemnt: <MyHomePage/>, children: [...]}
  - ***Is there any way by which we can load/ fetch some data before the page gestting loaded by router?*
      - Yes. That can be done by adding `loader` property for route definition. Keep the loader function in Page and export and map it to router as loader.
      - Then in page, use hook `useLoaderData()` to get the data.
      - Eg:
      ```
      EventPage.js:
      -------------
      const EventsPage = ()=>{
      const eventData = useLoaderData();// This hook from 'react-router-dom'
      return <EventsList event={eventData}/>;
      };
      export default EventsPage;
      
      export const loader = async()=>{
               const response = aswitfetch(...);
               const eventsList = await response.json();
               return eventsList;// whatever returns will be a promise and useLoader evaluates and resolves it to get actual data in Page.
      }
      
      App.js:
      Router Definition:
      ------------------
      import EventPage, {loader as loaderFromEventsPage} from '../EventsPage';
      const router = createBrowserRouter([{path: '/events', element: <EventsPage/>, loader: loaderFromEventsPage, children: [...]}]);
      
      Note: In child components of EventPage element also, we can use useLoader() to get eventsList. But no where else. Not in other routes or child 
      routes, 
      we will not get the data. But a route points to a page component. Inside that, we might be using other components to create a UI. In such child 
      components, we can directly use useLoader(). But not in other page or sub-routes. After all, this route and sub-routes are two independent 
      components. 
      ```
      -*But is there any way so that we can use the loader of a parent route/ already redendered route in child?*
      - This will avoid repeated calling of same APIs to load data in child routes.
      ```
      Yes. The hook to use is `useRouteLoaderData('is of route to which this loader belongs to.')` 
      ```
      - *This loader can respond late too. Till loader finishes the async data fetch, the page will be waiting to render. Then how can we show the user 
      that page is just loading?*
      `The solution is useNavigation() hook. From any visible page while loading the route, const navigation = useNavigation() and then navigation.state if 
      is 'loading', show <p>Loading...!</p>`. There is no point in using this hook inside the route which is taking time to load as it will be visible 
      after loading completes. useNavigation() is actually keeping track of current navigation stack. Whenever we do a click on any link, it actually puts 
      an entry to navigation stack. It tracks the navigation state as well. We can extract loading state from that to show message to user.
      - **Using of browser in-built Response object as return of loader function:**
      `This helps us to build/ or directly return response object from fetch API or create a new Response(body, {status: 200}) etc. 
      so that it will get automatically parsed by react-router-dom.`
      - *What if loader is giving some error like API call failed?*
      `Loader can check response.ok and throw Error/ Response object/ anything.`
      - Whatever loader is throwing, will traverse to nearest error page in route hierrachy as bubble up and 
      - `const error = useRouteError()` can give us the error object thrown from loader. This can be parsed and used to show appropritae error message.
      - Refer *routing-excercise* project ErrorPage.js and EventsPage.js for sample.
      - When we throw Response object, error.status can show us the error code.
      - `json()` utility function in `react-router-dom` helps us to construct Response object easily without using new keyword and throw it.
      - Eg:
      ```
      const loader = async()=>{
               const resposne = await fetch(...);
               if(!response.ok){
                  *throw* new Response({message: 'Error occured'}, {status: 404});// here, useRouteError() will give us this object as Response. 
                  //error.status, error.data.message
                  //or
                  throw json({message: 'Error occured'}, {status: 404});// here, useRouteError() will give us this object as Response. error.status, 
                  //error.data.message
                  //or
                  throw {message: 'anything'}// useRouteError() will give us this object and error.message will give message.
               }
      }
      ```
      - **4 hooks for react-router-dom**
      ```
      ----------------------------------------------------------
      `useNavigate()` - to move to ther pages
      `useParams()` - get path param value
      `useLoaderData()`- get data from loader
      `useRouteLoaderData(id of route)` - to use loader of any parent route(precisely, already rendered route) with given id and get results
      `useNavigation()` - to know the navigation stack info
      'useRouteError()' - to get error object(can be any object. Preferably Response) thrown from loader.
      
      `useSubmit()` - to trigger an action programatically for a route.
      `useActionData()` - to get the response from action if any. 
       ----------------------------------------------------------
      ```
      - Now, what to do if we want to have a loader to fetch some data based on path variable or query param?(*Data loading in Dynamic route*)
      - The answer is still loader. loader can accept request and params as attributes and use them.
      - Eg: loader to get event details when we pass event id as params
      ```
         export const loader = async({request, params})=>{const resp = fetch('url/params.eventId'); return resp;}
         In router defintion, add this loader to EventDetails route ':id'
         Then in EventDetailsPage, use useLoaderData() to get the event info and use it appropriately.
      ```
   - **Actions**: loader does some operation before the page is rendered. Actions are to do something from the page such as a form submission, validation 
      etc.
      - How to define actions?
      `createBrowserRouter({path: '/event/:id', element: <EventDetails/>, action: deleteAction })`
      - where delete action will look like;
      ```
         export const deleteAction = async({request, params})=>{
              const id = params.id;// from current url
              const dataToPass = await request.formData(); 
              const body = {title: dataToPass.get('title'), description: dataToPass.get('description')};
              const response = await fetch("url", {method: request.method, body: JSON.stringify(body), headres:{'Content-Type': 'application/json'}});
              if(!response.ok){
               throw json({message: 'Error'}, {sttaus: 500});
              }
              return redirect('/path to land after success of api call');
             }
             
             Note:
             1. redirect() is a utility function that returns a Response object similar to json(). This will be automatically parsed and navigate to the 
                path specified inside redirect.
             2. We get data from route component with `async request.formData()` and then from the object we got, to get the individaul items from form,
                .get('name of input field') is used if the component has a form and action is called from that. get('key') is name in `<input name="key"/>`
             3. Here, params holds the parameters if any in current url. Suppose, this form is inside child component of the page which is actual route, 
                still, the current route will be the path for the page and if some id is there in it, it will be taken.
      ```
      - How to invoke action from a route component which has a child component with form?
      ```
      1. Use `<Form>` from `react-router-dom` 
      2. Specify the method if any. Specify the route path as action if we need to trigger an action from some other route.
      3. <Form method="delete"><input name="title"/><button type="submit">Delete</button></Form> 
      4. <Form method="post" action="/events/new"><input name="title"/><button type="submit">Delete</button></Form> indicates that in this form, use the 
         action from route for path '/events/new' and it will be post method.
      ```
      - This is in forms. How to trigger an action programatically like on click of a button?
      - `useSubmit()` hook is the solution.
      ```
      const submit = useSubmit();
      const onClickHandler = ()=>{submit({request body if any. Else can pass null also. await request.formData() in action will return this value.},  
      {method: "delete"});}
      ```
      - Similar to loader, here also *delay can happen. How to handle such things?*
      - Answer is `useNavigation`.
      - From an action, if any delay happens, the state will be 'submitting'.
      - So,
      ```
      const navigation = useNagigation();
      const isSubmiting = navigation.state == 'submitting';
      Now, we can use {isSubmiting} to disable button etc in UI to inform the user about the delay.
      ```
      - We can throw Response or redirect to another route from acction. But what if we want to return some data from it and use it in route page?
      - `useActionData()` is in rescue.
      - Eg:
      ```
         const action = async(){
            const resp = await fetch(...);
            return resp;
         }
         
         Now, in page, 
         const action = useActionData();
      ```
