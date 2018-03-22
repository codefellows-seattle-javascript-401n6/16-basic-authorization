'use strict';

const request = require('superagent');
const mongoose = require('mongoose');
const Promise = requrire('bluebird');
const User = require('../model/user.js');
const serverToggle = require('../lib/server-toggle.js');
const server = require('../server.js');

require('jest');

const url = 'http://localhost:3000';

const exampleUser = {
  username: 'exampluser',
  password: '1234',
  email: 'exampleuser@test.com'
};

describe('Auth Routes', function() {
  beforeAll( done => {
    serverToggle.serverOn(server, done);
  });
  afterAll( done => {
    serverToggle.serverOff(server, done);
  });
  describe('POST: /api/signup', function() {
    describe('with a valid body', function() {
      afterEach( done => {
        User.remove({})
          .then( () => done())
          .catch(done);
      }); 
      it('should return a token', done => {
        request.post(`${url}/api/signup`)
          .send(exampleUser)
          .end((err, res) => {
            if (err) return done(err);
            console.log('my token', res.text);
            expect(res.status).toEqual(200);
            expect(typeof res.text).toEqual('string');
          });
      });  
    });
  });
describe ('GET: ')
});