'use strict';

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');





// /api/signup
// POST request
// The client should pass the username, email and password in the body of the request
// The server should respond with a 200 status code for a proper request that successfully creates a new user.
// The server should respond with 400 Bad Request for a failed request








// /api/signin
// GET request
// the client should pass the username and password to the server using a Authorization: Basic Base64(username:password) header
// The string "username:password" should be Base64 encoded
// the server should respond with a 200 status code for requests containing legitimate usernames and correct passwords.
// the server should respond with HTTP status 401 Unauthorized for non-authenticated users.
