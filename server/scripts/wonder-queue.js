var mongoose = require("mongoose");
MessageModel = new require("../models/message-model")(mongoose);
var message = MessageModel.Message;

/*
* Message Queue manager logic involving CRUD operations with the database
*/

function WonderQ(config){
  mongoose.connect(config.mongoUrl + config.dbName);

  //add a new message to the database
  this.addMessage = function(props){
    message.create(props, function(err, message){
      if(err){
        console.log(err);
        throw err;
      }
    });
    console.log("Message added!");
  };

  //delete a message from the database after the message has been processed or goes beyond failedAttemptsLimit
  this.deleteMessage = function(messageId){
    message.remove({id: messageId}, function(err){
      if(err){
        console.log(err);
        throw err;
      }
    });
  };

  //get as many messages in the db up to the getMessagesLimit sorted by timeCreated oldest to newest
  this.getMessages = function(){
    message.find({}).limit(config.getMessagesLimit).sort({timeCreated : "ascending"}).exec(function(err, messages){
      //do something
    });
  };

  //update an individual message's failedAttempts and/or inProcess props
  this.updateMessage = function(message_id, props){
    //do something
  };

  return this;
};

module.exports = WonderQ;
