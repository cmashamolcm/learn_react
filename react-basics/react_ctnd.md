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
30.
