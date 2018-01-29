var Router = require("router");
var mgmtRouter = Router();

function routeLoader(queueManager){
  this.mgmtRouter = mgmtRouter;

  this.mgmtRouter.get("/ui", function(req, res){
    //do something
  });
  this.mgmtRouter.get("/health", function(req, res){
    //do something
  });
  this.mgmtRouter.get("/explore", function(req, res){
    //do something
  });
  this.mgmtRouter.get("/*", function(req, res){
    res.send("This resource isn't recognized. Discover all the API possibilities at: url/WonderQ/explore !");
  });

  return this;
}

module.exports = routeLoader;
