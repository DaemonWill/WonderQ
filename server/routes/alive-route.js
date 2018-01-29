var Router = require("router");
var aliveRouter = Router();

var getPropsFromRequest = function(req){
  var errMessage;
  if(!req || !req.body){
    errMessage = "invalid request";
    console.log(errMessage);
    throw errMessage;
  }
  else if(!req.body.question){
    console.log("req body: " + JSON.stringify(req.body));
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
  this.aliveRouter = aliveRouter;

  this.aliveRouter.get("/", function(req, res){
    //do something
  });
  this.aliveRouter.post("/", function(req, res){
    console.log(typeof req.body);
    var props = getPropsFromRequest(req);
    queueManager.addMessage(props);
  });
  this.aliveRouter.delete("/", function(req, res){
    //do something
  });

  this.aliveRouter.get("/stats", function(req, res){
    //do something
  });

  return this;
}

module.exports = routeLoader;
