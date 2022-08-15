# React

Basic way of working of a web application(very first form with only static html in Netscape era):
``` 
       |                      |
client |-----http request---->|web server(hosting html pages)
       |                      |
       |<-----html page-------|
```
When JSP(Java Server Pages) where introduced, more dynamic pages could be developed. But overhead of converting .jsp(Java scriptlet and tags and html) to html by webservers were too much in server side.

Next level, browsers got the capability to support js(js + html form + js can create DOM elements):
``` 
       |                   
client |-----event---------|
       |                   |             
       |<-----manipulate html DOM and show the user in client side itself.
       |      (on click, show a dialog by adding it into the existing browser  
       |      DOM by defining each element step by step and add(eg: just-js))
```

Next level, React library comes:
``` 
       |                   
client |-----event---------|
       |                   |             
       |<-----manipulate html DOM and show the user in client side itself.
       |      (on click, show a dialog by adding it into the existing browser  |      DOM. But this is more of declarative way(eg: define component. 
       |      easily like an html tag))
```

### What is React?
- React is a client side js library
- Declarative and component based approach

### If its just a js library, why do we need it..why can't we go with just js?
1. When we want to build a dynamic part of html, eg: open a dialog on button click, we have to build entire html equivalent element using js. But that is very tedious and errornious. This is imperative way.
2. It will be easier if with limited code, we can generate these components. That is where React library helps. React helps to create a dynamic component with proper skeleton(html), css(skin) and js(actions).
3. Ultimately, React library helps us with a declarative way of developing components. 
At the end, it gets renders to plain js with the help of *reconsiliation algorithm*.

<u>Simply speaking, why to use react is because of its ease of use with delcarative approach and reactivity(faster rendering)</u>

### SPA - Single Page Applications
1. Server sends only single html page and rest is ontrolled by React.
2. In multipage apps also, it can be used.

### Angular vs React vs Vue
1. Angular is a framework uses ts(type script)
2. All are componenet based UI
3. Angular is bulky with features and overkill small projects.
4. Vie.js is almost like mix of goodness of both React and Angular
