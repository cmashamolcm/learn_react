### Micro-frontend:
1. Refer `origin/React-Refresher/react-basics/refresher/sample-projects/micro-front-end` fo sample
2. Sample step by step MFE creation:
3. https://levelup.gitconnected.com/micro-frontends-step-by-step-using-react-webpack-5-and-module-federation-e4b9d840ec71
4. Module Federation: https://indepth.dev/posts/1173/webpack-5-module-federation-a-game-changer-in-javascript-architecture
5. How micro-frontend interact: https://sharvishi9118.medium.com/cross-micro-frontend-communication-techniques-a10fedc11c59
6. What?
     - It is an architecture that splits a frontend monolith to multiple, small, manageable, indepdent services
     - It is a recent frontend development pattern
     - Backbone is module federation integrated with webpack 5.
7. Advantages:
     - Maintainable and manageable
     - Smaller size
     - Scalable
     - Each component can be in different languages
     - Easy to fix
     - Easy to isolate errors
8. How to create MFE?
     - With the help of webpack module federation plugin
         - Easy dependency resolution
         - Code sharing
         - Using module federation plugin
         - `webpack.config.js` is the important file here
         - Make sure to have  a bootstrap.js and add `index.js` as `entry`point and just give only import('./bootstrap') inside that.
         - Inside module federation plugin configuration, we can specify `exposes`.
         - This marks the components which are going to be made available to other services.
         - In consumer app side, we can add `remotes` to mention which project and URL of the project to use to consume the components.
         - Name of service that exposed the components is important along with URL where it's build is available.
         - Make sure that component producer is up and running in given URL.
         - We can specify shared libarries among them as well such as react, react-dom etc.
         - Otherwise, both in producer and consumer of component, thse libaries comes
         - and it gives error and webpack gets confused on which one to choose.
         - How is local and remote components interact?
             - via props
             - via local storage or any other browser APIs
             - via CustomEvent listeners
             - via event bus and libraries to manage those can be integrated with our app
             - In IFrames, POST messages can be used to interact
     - With IFrames
         - old technology
         - Isolates each service
         - Good choice to integrate with obselete technologies
         - Not flexible
         - But sharing of data can be easy as iframe is just like another component of an app.
         - But recommended is to use event bus for communication between base service and service renered inside iframe.
         - https://codeburst.io/4-practical-ways-to-build-micro-frontends-4dc4f0b8a921
     - With Web components
         - concepts includes
         - custom elements
         - shadow dom (private to component)
         - HTML templates
9. Disadvatages:
        - Many services, many configurations and then devOps is not easy
        - Download size is more as each component loads its own libraries
   
   
