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
