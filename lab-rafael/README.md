# MongoDB RESTful API

**Author** : Rafael Malave

## Overview

This is a simple example of basic authorization using nodejs and express.
## Getting started

Clone this repository to your local computer. Run `npm install` to install the necessary packages. Start the server with npm start and start mongodb on your local machine with `mongod`. run the tests by running `npm test`.

To manually send requests, use [HTTPie](https://httpie.org/) or [Postman](https://www.getpostman.com/).

## HTTP Methods


- POST endpoint `/api/signup` Suppoerted fields: `username` (string, required, unique) `email` (string, required, unique); 

- GET endpoints `/api/signin` Pass the username and password to the server using a `Authorization: Basic Base64(username:password)` header  
The server responds with status **200** for legitimate usernames and correct password.
The server should respond with status **401 Unauthorized** for non-authenticated user. 

## Technologies

- Nodejs
- Express
- npm
- MongoDB




