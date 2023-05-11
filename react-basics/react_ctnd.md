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
