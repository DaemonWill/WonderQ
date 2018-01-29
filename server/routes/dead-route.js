var Router = require("router");
var deadRouter = Router();

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

function routeLoader(queueManager){
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

  return this;
}

module.exports = routeLoader;
