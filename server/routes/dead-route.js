var Router = require("router");
var deadRouter = Router();

/*
* TODO
*Maps to the db containing messages that have failed to be processed more than an acceptible amount of tries
*use cases:
*   admins can view the messages and mark for permanent deletion
*   admins can troubleshoot malformed messages without normal users having to interact with them
*/

var getPropsFromRequest = function(req){
  var errMessage;
  if(!req || !req.body){
    errMessage = "invalid request";
    console.log(errMessage);
    throw errMessage;
  }
  else if(!req.body.question){
    errMessage = "required prop missing for Message";
    console.log(errMessage);
    throw errMessage;
  }
  else{
    var props = {
      "question" : req.body.question
    };
    return props;
  }
};

function routeLoader(queueManager, config){
  this.deadRouter = deadRouter;

  this.deadRouter.get("/", function(req, res){
    //do something
  });
  this.deadRouter.post("/", function(req, res){
    //queueManager.
  });
  this.deadRouter.delete("/", function(req, res){
    //do something
  });

  this.deadRouter.get("/stats", function(req, res){
    //do something
  });

  this.deadRouter.get("/explore", function(req, res){
    res.json(deadRouter.stack);
  });

  return this;
}

module.exports = routeLoader;
