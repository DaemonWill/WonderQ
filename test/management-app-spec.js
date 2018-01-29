const chai = require('chai');
const chaiHttp = require('chai-http');
const wonderQ = require('../server/index');
const should = chai.should();
const mongoose = require("mongoose");
const MessageModel = mongoose.model("message",
  new mongoose.Schema({
    question : { type: String, required: true },
    timeCreated : { type: Date, default: Date.now, required: true},
    timeDead : { type: Date, default: 0},
    inProcess : { type: Boolean, default: false, required: true},
    failedAttempts : { type: Number, default: 0, required: true}
  }));

/*
* Very Basic Testing for API validity, you can do similar tests at projectUrl/WonderQ/ui
*/


chai.use(chaiHttp);
describe('Messages', function(){
  //setting up for each test, clearing the database from objects left over in past tests
  beforeEach((done) => {
      MessageModel.remove({}, function(err){
         done();
      });
  });

  //Test the Get API for the alive endpoint
  it('should return a success after a GET call to alive endpoint', (done) => {
    chai.request(wonderQ)
      .get('/WonderQ/alive')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  //Test the Get API for the alive endpoint
  it('should return an array after a GET call to alive endpoint', (done) => {
    chai.request(wonderQ)
      .get('/WonderQ/alive')
      .end((err, res) => {
        res.body.should.be.a('array');
        done();
      });
  });

  //Test the POST API for the alive endpoint
  it('should return a success after a POST call to alive endpoint', (done) => {
    var question = "why don't people google themselves anymore"
    chai.request(wonderQ)
      .post("/WonderQ/alive")
      .send({"question": question})
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  //Test the POST API for the alive endpoint
  it('should return a Message Document after a POST call to alive endpoint', (done) => {
    var question = "why don't people google themselves anymore";
    chai.request(wonderQ)
      .post("/WonderQ/alive")
      .send({"question": question})
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });

  //Test the DELETE API for the alive endpoint
  it('should successfully remove a message after a delete call to alive endpoint', (done) => {
    var question = "why don't people google themselves anymore"
    var id;
    chai.request(wonderQ)
      .post("/WonderQ/alive")
      .send({"question": question})
      .end((err, res) => {
        id = res.body._id;
        done();
      });
    chai.request(wonderQ)
      .delete("/WonderQ/alive")
      .send({"_id": id})
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
