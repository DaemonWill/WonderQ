function MessageModel(mongoose){
  this.Message = mongoose.model("Message", {
    "question" : "",
    "timeCreated" : Date.now(),
    "timeDead" : 0,
    "inProcess" : false,
    "failedAttempts" : 0
  });
}

module.exports = MessageModel;
