# Schoology API Wrapper by tree tree t0rr m0uth!
 ## Prerequisites:
 - ### Node.js (Install from https://nodejs.org]
    #### (Created in Node.js v16.14.2, but other versions may work too)
 - ### Schoology API credentials from https://yourdistrict.schoology.com/api
    #### Replace "yourdistrict" with the district you sign in with. 
    #### (i.e. if i sign in with https://amogus.schoology.com, i would go to https://amogus.schoology.com/api)
 
 ## How to use:
 ### Install the wrapper from NPM
 ```
 npm install schoologyapi
 ```
 
 ### Import the client
 ```javascript
 const SchoologyAPI = require("schoologyapi")
 ```
 
 ### Instantiate the client
 ##### Replace "key" and "secret" with your Schoology API credentials
 ```javascript
 const client = new SchoologyAPI("key", "secret")
 ```
 
 ### Make requests!
 ##### Replace "your request" with your Schoology request. Find request URIs from https://developers.schoology.com/api-documentation/rest-api-v1
 ```javascript
 client.request("your request")
 ```
 
 ## Other Options
 
 ### Create a request token
 ```javascript
 client.createRequestToken()
 ```
 
 ### Get an access token from a request token
 ##### replace "requestToken" with a valid request token. 
 ```javascript
 client.getAccessToken("requestToken")
 ```
 
 ### Extract the key and secret from a request token
 ##### replace "requestToken" with a valid request token.
 ```javascript
 client.parseRequestToken(requestToken)
 ```
 
 # Enjoy!
