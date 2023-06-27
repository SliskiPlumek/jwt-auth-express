# @plumek/jwt-auth-express

## Package Description
The `jwt-auth-express` package provides a middleware function that can be used to authenticate and authorize incoming requests based on a JSON Web Token authentication mechanism. This middleware ensures that only authenticated users with valid tokens are granted access to protected routes.


## Installation

To install the package, you can use npm or yarn:

```bash
  npm install @plumek/jwt-auth-express
```
or
```bash
  yarn add @plumek/jwt-auth-express
```
    
## Usage/Examples

To use the authenticateToken package, follow these steps:

1. Import the authenticateToken middleware function:

```javascript
const auth = require('@plumek/jwt-auth-express')
```
or
```javascript
import auth from '@plumek/jwt-auth-express'
```

2. Apply the middleware function to the routes that require authentication. This can be done using the app.use or router.use method depending on your application's framework. For example, in an Express.js application:

```javascript
const express = require('express');
const app = express();

app.use(authenticateToken(secretName));

app.get('/protected', (req, res, next) => {
  //...
})
```
3. Ensure that the incoming requests include an Authorization header with a valid JWT token. The JWT token should be sent in the following format:

```makefile
Authorization: Bearer <JWT token>
```

4. The middleware function will validate the token and attach the userId property from the decoded token to the req object. You can access this userId value in subsequent middleware functions or route handlers.

```javascript
app.get('/protected-route', (req, res) => {
  const userId = req.userId;
  // Use the userId for further actions
});
```




## Documentation

### authenticateToken(secretName)

The `authenticateToken` function takes a `secretName` parameter and returns a middleware function that can be used to authenticate and authorize requests.

Parameters:

- secretName (string): The name of the secret used to sign and verify the JWT token.

Middleware Function

The middleware function returned by authenticateToken expects three parameters: req, res, and next. It should be used as a middleware in the request processing pipeline.

The middleware function performs the following steps:

    1. Retrieves the Authorization header from the req object.

    2. If the Authorization header is missing, it throws an error with a status code of 401 (Unauthorized).

    3. Extracts the JWT token from the Authorization header.

    4. Verifies the token using the provided secretName and stores the decoded token in the decodedToken variable.

    5. If the token cannot be verified, it throws an error with a status code of 500 (Internal Server Error).

    6. If the decoded token is empty, it throws an error with a status code of 401 (Unauthorized).

    7. Sets the userId property of the req object to the userId value from the decoded token.

    8. Calls the next function to proceed to the next middleware or route handler.
Example
```javascript
const auth = require('@plumek/jwt-auth-express');

app.use(authenticateToken('mySecret'));

// Protected routes can now access the authenticated user's ID through req.userId
app.get('/protected-route', (req, res) => {
  const userId = req.userId;
  //...
});
```
Visit the package page on npm:

[npm link](https://www.npmjs.com/package/@plumek/jwt-auth-express?activeTab=readme)

Visit the package repo on github: 
[git link](https://github.com/SliskiPlumek/jwt-auth-express)