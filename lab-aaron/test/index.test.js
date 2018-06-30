'use strict';

const superagent = require('superagent');
const SERVER_URL = 'http://localhost:3000';

describe('tests', () => {
  it('should return with 404 if route is not found', (done) => {
    superagent.get(`${SERVER_URL}/api/wrongurl`)
      .end((error, response) => {
        expect(response.status).toBe(404);
        done();
      });
  });

  it('should return with 200 when body is valid', (done) => {
    let newUser = {
      username: 'Aaron Bruce',
      email: 'email@gmail.com',
      password: 'password',
    };
    superagent.post(`${SERVER_URL}/api/signup`)
      .set('Content-Type', 'application/json')
      .auth(newUser.username, newUser.password)
      .send(JSON.stringify(newUser))
      .end((error, response) => {
        if (error) {
          console.log('TEST ERROR: ', error);
        }
        expect(response.status).toBe(200);
        done();
      });
  });
});