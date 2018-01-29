var mongoose = require("mongoose");
var MessageModel = new require("../models/message-model")(mongoose);
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
    message.remove({"_id": messageId}, function(err){
      if(err){
        console.log(err);
        throw err;
      }
      console.log("Message Deleted!");
    });
  };

  //get as many messages in the db that are not being processed up to the getMessagesLimit
  // sorted by timeCreated oldest to newest
  //set the inProcess prop for each to true
  this.getMessages = function(res){
    message.find({"inProcess": false}).limit(config.getMessagesLimit).sort({timeCreated : "ascending"}).exec(function(err, messages){
      if(err){
        console.log(err);
        throw err;
      }
      for(i in messages){
        messages[i].set({"inProcess": true});
        messages[i].save(function(err, updatedMess){
          if(err){
            throw err;
          }
        });
      }
      res.json(messages);
      setTimeout(()=>{
        for(i in messages){
          messages[i].set({"inProcess": false});
          console.log("beepboop");
          messages[i].save(function(err, updatedMess){
            if(err){
              throw err;
            }
          });
        }},
        config.processTimeLimit
      );
    });
  };

  //update an individual message's failedAttempts and/or inProcess props
  this.updateMessage = function(message_id, props){
    message.update({"_id": message_id}, props, function(err, res){
      console.log(res);
    });
  };

  return this;
};

module.exports = WonderQ;
