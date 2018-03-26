 'use strict';


 const superagent = require('superagent');
 require('dotenv').config();

 const PORT = process.env.PORT;
 const SERVER_URL = 'http://localhost:' + PORT;
 console.log(PORT);
 const SIGNUP_URL = SERVER_URL + '/api/signup';
 const SIGNIN_URL = SERVER_URL + '/api/signin';
 
 function getUserParams() {
   // using + Math.rabdom() to avoid duplicate user errors
   return {
     username: 'bill' + Math.random(),
     email: 'bill@microsoft.com' + Math.random(),
     password: 'windows95'
   };
 };
 
 describe('/api/signup', () => {
   it('should return status 400 if missing username', (done) => {
     let params = getUserParams();
     delete params['username'];
 
     superagent.post(SIGNUP_URL)
     .set('Content-Type', 'application/json')
     .send(params)
     .catch(err => {
       expect(err.status).toEqual(400);
       done();
     });
   });
 
   it('should return status 400 if missing email', (done) => {
     let params = getUserParams();
     delete params['email'];
 
     superagent.post(SIGNUP_URL)
     .set('Content-Type', 'application/json')
     .send(params)
     .catch(err => {
       expect(err.status).toEqual(400);
       done();
     });
   });
 
   it('should return status 400 if missing password', (done) => {
     let params = getUserParams();
     delete params['password'];
 
     superagent.post(SIGNUP_URL)
     .set('Content-Type', 'application/json')
     .send(params)
     .catch(err => {
       expect(err.status).toEqual(400);
       done();
     });
   });
 
   it('should return status 200 with successful request', (done) => {
     let params = getUserParams();
 
     superagent.post(SIGNUP_URL)
     .set('Content-Type', 'application/json')
     .send(params)
     .then(res => {
       expect(res.status).toEqual(200);
       done();
     });
   });
 });
 
 describe('/api/signin', () => {
   it('should return 401 unauthorized if password is incorrect', (done) => {
     let params = getUserParams();
 
     superagent.post(SIGNUP_URL)
     .set('Content-Type', 'application/json')
     .send(params)
     .then(res => {
       expect(res.status).toEqual(200);
 
       // intentionally set the password as a wrong password
       let payload = params['username'] + ':' + 'wrongpassword';
       let encoded = btoa(payload);
 
       return superagent.get(SIGNIN_URL)
       .set('Authorization', 'Basic ' + encoded);
     })
     .catch(err => {
       expect(err.status).toEqual(401);
       done();
     });
   });
 
 
   it('should return 200 if username and password are', (done) => {
     let params = getUserParams();
 
     superagent.post(SIGNUP_URL)
     .set('Content-Type', 'application/json')
     .send(params)
     .then(res => {
       expect(res.status).toEqual(200);
 
       let payload = params['username'] + ':' + params['password'];
       let encoded = btoa(payload);
 
       return superagent.get(SIGNIN_URL)
       .set('Authorization', 'Basic ' + encoded);
     })
     .then(res => {
       expect(res.status).toEqual(200);
       done();
     });
   });
 });
 


// const superagent = require('superagent');
// const btoa = require('btoa');
// const uuid = require('uuid/v4');
// require('dotenv').config();
// const PORT = process.env.PORT;
// console.log(PORT);

// const SERVER_URL = 'http://localhost:' + PORT;
// const SIGNUP_URL = SERVER_URL + '/api/signup';
// const SIGNIN_URL = SERVER_URL + 'api/signin';

// function createUser() {
//   return {
//     username: 'trust-me2',
//     email: 'trust-me2@trust.com',
//     password: 'P@$$word'
//   };
// }

// describe('Testing for sign-up failures', () => {
//   test('If 400 is returned when username is missing from sign-in', done => {
//     let userParams = createUser();
//     //console.log('UserParams before deleting username', userParams);
//     delete userParams['username'];
//     //console.log('Username deleted', userParams);

//     return superagent
//       .post(SIGNUP_URL)
//       .set('Content-Type', 'application/json')
//       //.auth(userParams.username, UserParams.password)
//       .send(JSON.stringify(userParams))
//       .end((err, res) => {
//         //console.log('400 test', err);
//         expect(err.status).toEqual(400);
//         done();
//       });
//   });
//   test('If 400 is returned when the email address is missing from sign-in', done => {
//     let userParams = createUser();
//     delete userParams['email'];
//     //console.log('email deleted' + userParams);

//     superagent
//       .post(SIGNUP_URL)
//       .set('Content-Type', 'application/json')
//       .send(userParams)
//       .catch(err => {
//         expect(err.status).toEqual(400);
//         done();
//       });
//   });
//   test('If 400 is returned when the password is missing from sign-in', done => {
//     let userParams = createUser();
//     delete userParams['email'];
//     console.log('Password deleted', userParams);

//     superagent
//       .post(SIGNUP_URL)
//       .set('Content-Type', 'application/json')
//       .send(userParams)
//       .catch(err => {
//         expect(err.status).toEqual(400);
//         done();
//       });
//   });
//   test('Should return a status of 200 with a successful request', done => {
//     let userParams = createUser();
//     console.log('inside test', userParams);

//     return superagent
//       .post(SIGNUP_URL)
//       .set('Content-Type', 'application/json')
//       .send(userParams)
//       .then((res) => {
//         expect(res.status).toEqual(200);  
//         done();    
//       })
//     });
// });

// describe('/api/signin', () => {
//   test('Should return a status of 401 if the password is incorrect', done => {
//     let userParams = createUser();

//     superagent
//       .post(SIGNIN_URL)
//       .set('Content-Type', 'application/json')
//       .send(userParams)
//       .then(res => {
//         expect(res.status).toEqual(200);

//         let payload = userParams['username'] + ':' + 'incorrectpassword';
//         let encoded = btoa(payload);

//         return superagent
//           .get(SIGNIN_URL)
//           .set('Authorization', 'Basic ' + encoded)
//       })
//       .catch(err => {
//         expect(err.status).toEqual(401);
//         done();
//       })
//   });
//   test('Should return a status of 200 if the username and password are correct', done => {
//     let userParams = createUser();

//     superagent
//       .post(SIGNIN_URL)
//       .set('Content-Type', 'application/json')
//       .send(userParams)
//       .then(res => {
//         expect(res.status).toEqual(200);

//         let payload = userParams['username'] + ':' + userParams['password'];
//         let encoded = btoa(payload);

//         return superagent
//           .get(SIGNIN_URL)
//           .set('Authorization', 'Basic ' + encoded)
//         done();
//       })
//   });
// });