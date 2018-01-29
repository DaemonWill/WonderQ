var Router = require("router");
var aliveRouter = Router();

var getPropsFromRequest = function(req){
  var errMessage;
  if(!req || !req.body){
    errMessage = "invalid request";
    console.log(errMessage);
    throw errMessage;
  }
  var props = {};
  if(req.body.question){
    props.question = req.body.question;
  }
  if(req.body._id){
    props._id = req.body._id;
  }
  if(req.body.timeDead){
    props.timeDead = req.body.timeDead;
  }
  if(req.body.failedAttempts){
    props.failedAttempts = req.body.failedAttempts;
  }
  return props;
};

function routeLoader(queueManager){
  this.aliveRouter = aliveRouter;

  this.aliveRouter.get("/", function(req, res){
    queueManager.getMessages(res);
  });
  this.aliveRouter.post("/", function(req, res){
    var props = getPropsFromRequest(req);
    queueManager.addMessage(props);
  });
  this.aliveRouter.delete("/", function(req, res){
    var props = getPropsFromRequest(req);
    queueManager.deleteMessage(props._id);
  });

  this.aliveRouter.get("/stats", function(req, res){
    //do something
  });

  return this;
}

module.exports = routeLoader;
