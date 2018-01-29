function MessageModel(mongoose){
  var Schema = mongoose.Schema;

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
