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
