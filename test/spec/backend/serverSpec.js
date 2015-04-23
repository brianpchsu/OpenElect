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
var Ballot = require('../../../server/database/models/ballot');
var Election = require('../../../server/database/models/election');
var Group = require('../../../server/database/models/group');
var Poll = require('../../../server/database/models/poll');
var Question = require('../../../server/database/models/question');
var User = require('../../../server/database/models/user');
var passport = require('../../../server/config/passport');

var uuid = require('uuid');

describe('Test server, database, and route setup', function(){
  this.timeout(10000);
  var ballotId, electionId, groupId, pollId, questionId, userId;


  describe('Basic server http routing', function(){
    it('should receive 200 status code when connecting to root', function(done){
      request(app)
      .get('/')
      .expect(200)
      .end(done);
    });

    it('should receive 404 status code when connecting to an invalid endpoint', function(done){
      request(app)
      .get('/invalid')
      .expect(404)
      .end(done);
    });
  });

  describe('Test all the routes', function(){
    // Disable now because the signup process take too long
    xit('should sign up a user', function(done){
      request(app)
      .post('/api/v1//users/signup')
      .send(
        {
          'email': '001@test.com',
          'password':'1234',
          'first_name':'Skillful',
          'last_name':'Cactus',
          'admin_level': 0
        })
      .expect(function(res){
          expect(res.body.first_name).to.equal('Skillful');
          expect(res.body.last_name).to.equal("Cactus");
          expect(res.body.email).to.equal("001@test.com");
        })
      .end(done);
    });

    it('should log in an user', function(done){
      request(app)
      .post('/api/v1/users/login')
      .send(
        {
          email: "001@test.com",
          password:"1234"
        }
      )
      .expect(200)
      .end(done);
    });

    it('should get election page', function(done){
      request(app)
      .get('/api/v1/elections')
      .expect(200)
      .end(done);
    });

    it('should get election page', function(done){
      request(app)
      .get('/api/v1/elections')
      .expect(200)
      .end(done);
    });

  });

  describe('Database table checking', function(){
    // Delete test data from tables
    after(function(done){
      // User.forge({email: "1019@test.com"})
      // .fetch()
      // .then(function(user, error) {
      //   if (error) {
      //     console.log(error);
      //   }
      //   console.log("about to destroy", user.toJSON());
      //   user.destroy();
      //   done();
      // });

      // Group.forge({name: "Hack_Reactor9"})
      // .fetch()
      // .then(function(group, error) {
      //   if (error) {
      //     console.log(error);
      //   }
      //   console.log("about to destroy", group.toJSON());
      //   group.destroy();
      //   // done();
      // }).end(done);

      // Poll.forge({name: "8th floor"})
      // .fetch()
      // .then(function(poll, error) {
      //   if (error) {
      //     console.log(error);
      //   }
      //   console.log("about to destroy", poll.toJSON());
      //   poll.destroy();
      //   // done();
      // }).end(done);;

      // Question.forge({name: "Funnest guy in Hack Reactor?"})
      // .fetch()
      // .then(function(question, error) {
      //   if (error) {
      //     console.log(error);
      //   }
      //   console.log("about to destroy", question.toJSON());
      //   question.destroy();
      //   // done();
      // }).end(done);;

      // Election.forge({name: "2015_Election"})
      // .fetch()
      // .then(function(election, error) {
      //   if (error) {
      //     console.log(error);
      //   }
      //   console.log("about to destroy", election.toJSON());
      //   election.destroy();
      //   // done();
      // }).end(done);;

      // Ballot.forge({choices: '{
      //     selections: [
      //     {
      //       question_id: 2,
      //       selection: null
      //     },
      //     {
      //     question_id: 3,
      //     selection: "Marcus"
      //     }
      //   ]
      //   }'})
      // .fetch()
      // .then(function(ballot, error) {
      //   if (error) {
      //     console.log(error);
      //   }
      //   console.log("about to destroy", ballot.toJSON());
      //   ballot.destroy();
      //   done();
      // });

    });


    xit('should create a new user', function(done){
      new User({
      id: uuid.v4(),
      email: "001@test.com",
      password:"1234",
      first_name:"Brian",
      last_name:"Hsu",
      admin_level: 0
      }).save({},{method: 'insert'}).then(function(user, error){
        if (error) {
          console.log(error);
        }
        console.log("User created: ", user.toJSON()["email"]);
        expect(user.toJSON()["email"]).to.equal("001@test.com");
        done();
      });
    });


    xit('should create a new group', function(done){
      new Group({
      id: uuid.v4(),
      name: "Hack_Reactor10",
      }).save({},{method: 'insert'}).then(function(group, error){
        if (error) {
          console.log(error);
        }
        console.log("Group created: ", group.toJSON()["name"]);
        expect(group.toJSON()["name"]).to.equal("Hack_Reactor10");
        // done();
      }).end(done);;
    });


    xit('should create a new poll', function(done){
      new Poll({
      id: uuid.v4(),
      name: "8th floor",
      }).save({},{method: 'insert'}).then(function(poll, error){
        if (error) {
          console.log(error);
        }
        console.log("Poll created: ", poll.toJSON()["name"]);
        expect(poll.toJSON()["name"]).to.equal("8th floor");
        done();
      });
    });

    xit('should create a new question', function(done){
      new Question({
      id: uuid.v4(),
      name: "Funnest guy in Hack Reactor?",
      }).save({},{method: 'insert'}).then(function(question, error){
        if (error) {
          console.log(error);
        }
        console.log("Question created: ", poll.toJSON()["name"]);
        expect(question.toJSON()["name"]).to.equal("Funnest guy in Hack Reactor?");
        done();
      });
    });

    it('should create a new election', function(done){
      new Election({
      id: uuid.v4(),
      name: "2015_Election",
      }).save({},{method: 'insert'}).then(function(election, error){
        if (error) {
          console.log(error);
        }
        console.log("Election created: ", poll.toJSON()["name"]);
        expect(election.toJSON()["name"]).to.equal("2015_Election");
        done();
      });
    });

    // it('should create a new ballot', function(done){
    //   new Ballot({
    //   id: uuid.v4(),
    //   choices: '{
    //     selections: [
    //     {
    //       question_id: 2,
    //       selection: null
    //     }]
    //   }',
    //   }).save({},{method: 'insert'}).then(function(ballot, error){
    //     if (error) {
    //       console.log(error);
    //     }
    //     console.log("Election created: ", ballot.toJSON()["choices"]);
    //     expect(ballot.toJSON()["choices"]).to.equal("{
    //       selections: [
    //       {
    //         question_id: 2,
    //         selection: null
    //       },
    //       {
    //       question_id: 3,
    //       selection: "Marcus"
    //       }
    //     ]
    //     }");
    //     done();
    //   });
    // });

  });
});
