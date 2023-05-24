33. NextJS:
  - NextJS is a react *framework* to create production ready fullstack react applications
  - It is built on top of react. (react is client side js lib. NextJS is react framework)
  - Why we need NextJS?
    * To enable server-side rendering
    * Helps to pre-load pages so that waiting time in lazy loaded client side routing can be avoided. 
      (Instead of just load index.html and do rest of the activities in client side browser, NextJS returns actual pages from server.
      This can be done without even reload and problems of loss of state chnage due to reload.)
    * Helps crawlers as pages comes with real html content from server side and hence is search engine optmized.
    * NextJS can easily integrate backend as well. So, it is capable of providing backend and frontend together 
      with nodeJS in backend and reactJS in frontend.
    * *react is not so bothered about how we bundle our modules etc. But nextJS takes care of that as well. That helps it in file based routing also*
    * nextJS makes writing code easier without burden of giving route definitions etc.
 - How is NextJS working?
    * Based on `file based routing`
    * Pages are loaded with respect to file name based routes
 - To create NestJS project:
    * `npm create-next-app` and provide app name and details promted. (without router or app template and without src folder.)
    * The structure will be 
     ```
      nextjs-basics
        - pages
        - public - does not have index.html. This is because, we do server-side rendering and creates html. Not only index.html we give to user.
        - styles
        - package.json - dependencies
        - next.config.js - sets strict mode
        - jsconfig.json - compiler options
     ```
     * To run project `npm run dev`
     * To create pages, 
      ```
        inside pages folder,
        index.js - this will act as home page.
        If we create news.js = root with localhost:3000/news
        (File name matters for route. Component name is not important here.)
        
        If we create a folder
        /news
          - index.js
          - news-details.js
        This will create routes `/news` and `/news/news-details`
        
        **To create dnamic pages such as having patah param**
        /news
          - index.js - /news root
          - [newsId].js - means /news:newsId
        
        Now, to access the param value inside NewsDetails component in [newsId].js,
        
        import {useRouter} from 'next/router'
        const router = useRouter();
        {router.query.newsId}. will give us the value of param newsId from URL.
        
      ```
    * To add links to pages,
      `use Link from next/link package`
    ```
      import Link from 'next/link';
      <a href="/news">News</a> // will go to localhost:3000/news. but page reloads
      <Link href="/news">News</Link>// will load news page without reload and acts like click similar to react-router-dom Link.
    ```
    * To navigate programatically:
    ```
      const router = useRouter();
      router.push("/new");// will navigate to localhost:3000/new
    ```
- **_app.js**
  * This file is special one in pages folder.
  * index.js makes a file root route of the folder.
  * `_app.js` is somewhat similar to the react first entry point index.js.
  * Whatever we need to apply common to all the pages, we can give there. Such as a common layout for all pages. Not components.
- **Pre-loading/ Pre-rendering**: 
  * In normal react app, everything is client side routing. But in nextJS, it relies on server-side file-based routing  
  * `rendering`: generate and paint the html in browser based on the JS and JSON objects
  * `pre-rendering`: process of building html in advance in server side even before it is required by browser.
  * So, pre-render makes the html for routes ready in server side so that it is ready to serve
  * Pre-rendering can be done in 4 ways:
      - Static pages - already generated and no input values required to create/ load it. Eg: /contact route
      - SSG - `Static Site Generation` is the process of preparing the html for a route with some input value at the time of build itself.
              (npm start build)
            - `export function getStaticProps(){return {props:{props json}}}` if we given in page file, SSG is kicked in.
            - Sample use cases: Portfolio websites, blogs etc where frequent changes are not there. If any change, will need rebuild
           ```
           Eg: 
             const MeetupsList = (props)=>{
              return  (<>{props.meetups.map(meetup=><h1>meetup.title</h1>);}</>);
             }
             
             export const getStaticProps = ()=>{
              return {props: {meetups:[{title: 'meet1'}, {title: 'meet2'}]}};// this loads props for MeetupList page. Can be output from an api call also.
             } 
           ```
      - ISR - `Incremental Static Regeneration` is advanced version of SSG. In  given interval of time, the static pages will be rebuild so that 
              if any changes happened, that can be accomodated. Eg: /newsList. If we have a new news in database, page for that also can be 
              made available
            - Sample use cases: An event listing page which gets new items added in database only at mid nights every day. 
           ```
           Eg:
             const MeetupsList = (props)=>{
              return  (<>{props.meetups.map(meetup=><h1>meetup.title</h1>);}</>);
             }
             
             export const getStaticProps = ()=>{
              return {
                props: {meetups:[{title: 'meet1'}, {title: 'meet2'}]},
                revalidate: 60 // means, rebuilds the html in every 60 seconds. If browser/ CDN is not caching pages, in every 60minutes, on reload, we get
              page with changes included if any.
              };// this loads props for MeetupList page. Can be output from an api call also.
             } 
           
           ```
      - SSR - `Server Side Rendering` is creating the html for a page whenever a request for that route comes. This is costly as every time it is done.
              So, prefer it if nothing works with static or incremenatl approaches.
            - If `export const getServerSideProps` is found in a page file, that page will be enabled with server side rendering.
            - Sample usecase: An seat booking page. That can vary every time depending on booking from other users also.
           ```
           Eg:
            const MeetupsList = (props)=>{
              return  (<>{props.meetups.map(meetup=><h1>meetup.title</h1>);}</>);
             }
             
             export const getServerSideProps = (context)=>{// context can hold req and res so that each time, when url hits, html can be build accordingly.
              return {
                props: {meetups:[{title: 'meet1'}, {title: 'meet2'}]}
              }
              };// this loads props for MeetupList page. Can be output from an api call also.
             }
           ```
   * But what about dynamic routes? How can we integrate it with these preloadings?
      - When we use dynamic routes, by default the page will be static html.
      -  If we need to make it have input/ loaded with some data in it based on dynamic param from URL, we have to have useEffect() in it.
      -  Inside useEffect, use `useRouter().query.<paramName>` to find the dynamic part and load data accordingly to the html.
         But the problem is, it all happens in client side and the preloaded page will not be filled with all data.
      - What else can be done?
      - If we need to make static site generation,we have to prepare all possible pages with dynamic value from route
      - How to achive this?
      - `export function getStaticPaths()`
      - This can return all possible path jsons and then use `getStaticProps()` along with it to load any value from database based on each path 
        to prepare sttaic pages for all possible paths.
      - Eg:
      ```
      [meetupId].js:
      --------------
        const MeetupDetail = (props)=>{
              return  (<h1>{props.meetup.title}</h1>));
             }
             
             export const getStaticPaths = ()=>{
                return {paths: [
                          {params: {meetupId: 'm1'}}, 
                          {params: {meetupId: 'm2'}},
                        ],
                        fallback: true/ false// this helps to decide if we need to create pages for unknown paths on the fly or not.
                        // if fallback: false => any other params except that we mentioned in paths list, 404 error comes.
                        // If fallback: true => for unknown params, server will generate html and serve on the go like server side rendering.
                       };
             }
             
             export const getStaticProps = (context)=>{// here, context is required to provide the params from URL. Cannot use useRouter() here.
              const id = context.params.meetupId;
             
              return {
                props: {meetup:{inputMeetupId: id, title: "some title"}}
                };
             }
      
      ```
      - 
