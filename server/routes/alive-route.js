var Router = require("router");
var aliveRouter = Router();

/*
* Maps to the primary db in which users can add messages, view messages, and delete them upon processing
*/

//strip request object of useful information partaking to Message attributes
//@param{object} req - request object
//@returns{object} props - injected into mongoose Message queries
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

  /*
  *fetch a configured amount of messages from the db that are not flagged as "inProcess"
  *returns a json containing a list of those Message objects
  *upon returning the list, each Message retrieved is flagged as "inProcess" in the db
  */
  this.aliveRouter.get("/", function(req, res){
    queueManager.getMessages(res);
  });

  //creates a new Message in the db
  //requires a "question" prop be set in the post query for the request
  this.aliveRouter.post("/", function(req, res){
    var props = getPropsFromRequest(req);
    queueManager.addMessage(props, res);
  });

  //removes a single Message from the database
  //requires an _id prop be set in the req.body
  this.aliveRouter.delete("/", function(req, res){
    var props = getPropsFromRequest(req);
    queueManager.deleteMessage(props._id);
  });

  //TODO will provide statistics on how many consumers and producers are utilizing the alive database
  //will also provide a ratio of the messages that are inProcess vs not inProcess, would have been implemented
  //with ui
  this.aliveRouter.get("/stats", function(req, res){
    //do something
  });

  //Provides a json containing information for the endpoints/methods mapped from url/WonderQ/alive
  this.aliveRouter.get("/explore", function(req, res){
    res.json(aliveRouter.stack);
  });

  return this;
}

module.exports = routeLoader;
