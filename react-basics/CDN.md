### CDN:
1. Content Delivery Network
2. Actual server can be anyware and the users of website can be in other parts of the world.
3. How can make our content from server available faster to the user?
   - Here comes CDN for help
   - CDN helps us by caching copies of our webpages and serve to the user instead of request coming to original server.
4. Advantages of using CDN?
   - Faster relivery of pages to user
   - Lesser traffic to original server
5. CDN providers:
   - Akamai
   - AWS could front
6. Working:
   ```
   User request a url  -----> DNS resolution ------> returns the IP of nearby CDN ----> CDN node need to process the request.
     ------> It checks in CDN nodes to identify a CDN EDGE SERVER that has the page cached. -----> return this page instead of real server hit.
     -------> If edge server does not has page -------> mkae a request to the actual server ------> cache that resulting page -----> respond to the user with page.
   ```
7. CDN Types:
     - push based
        - whenever a new page is generated in original server, send it to CDN as well.
        - Best for static content that is not so frequently chnaging. Eg: blogs
     - pull based
        - when a user request comes and if page not found, make a request to original server
        - Cache the response
        - This is best for dynamic pages like new feeds
8. https://www.youtube.com/watch?v=bJ9NnLLMQ78
9. Ho we integrate CDN for our websites?
    - Choose a CDN
    - Create configurations including the website original name etc.
    - Copy the URL to this CDN for our website and add it to our real domain provider config.
