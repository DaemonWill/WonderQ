/*
*Mongoose template for the Message documents in WonderQ databases
*/

function MessageModel(mongoose){
  var Schema = mongoose.Schema;

  /*
  * question - the user's inquiry to WonderQ
  * timeCreated - date stored in ms for the time of creation, used for sorting
  * timeDead - once message fails over the acceptable amount of times, timeDead will be date in ms since
  *            added to the dead-message database - default = 0
  * inProcess - flag to represent if Message is being viewed by another consumer
  * failedAttempts - amount of times message has failed to be processed
  */
  this.messageSchema = new Schema({
    question : { type: String, required: true },
    timeCreated : { type: Date, default: Date.now, required: true},
    timeDead : { type: Date, default: 0},
    inProcess : { type: Boolean, default: false, required: true},
    failedAttempts : { type: Number, default: 0, required: true}
  });

  this.Message = mongoose.model("Message", this.messageSchema);

  return this;
};

module.exports = MessageModel;
