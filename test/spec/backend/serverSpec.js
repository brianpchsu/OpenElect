// var chai = require('chai');
// var expect = chai.expect;
// var request = require('request');
// var env = process.env.NODE_ENV || 'development';
// var host = process.env.HOSTNAME || '127.0.0.1';
// var port = process.env.PORT || 9010;
// var localServerUri = host + ":" + port;
// var invalidUri = host + ":" + port + '/invalid';

var express = require("express");
var request = require("supertest-as-promised");
var app = require('../../../server.js');
var expect = require('chai').expect;
var db = require('../../../server/config/database.js');
var User = require('../../../server/database/models/user');

describe('Test Back End server and database setup', function(){

  describe('Basic http routing', function(){
    it('should receive 200 status code on GET request of root', function(done){
      request(app)
      .get('/')
      .expect(200)
      .then(done());
    });

    it('should receive 404 status code on Get request to an invalid endpoint', function(done){
      request(app)
      .get('/invalid')
      .expect(404)
      .then(done());
    });
  });

  describe('Database table checking', function(){
    it('should create a new user', function(done){
      new User({
        email: "abc@gmail.com",
        password:"1234",
        first_name:"Brian",
        last_name:"Hsu",
        admin_level: 1
      }).save();

      request(app)
      .post('/api/v1/users/login',
        {email: "abc@gmail.com", password: "1234", failedLogins: 0, spinner: false})
      .expect(200)
      .then(done());
    });

    it('should fail if password not correct', function(done){
      request(app)
      .post('/api/v1/users/login',
        {email: "abc@gmail.com", password: "0000", failedLogins: 0, spinner: false})
      .expect(404)
      .then(done());
    });

  });
});
