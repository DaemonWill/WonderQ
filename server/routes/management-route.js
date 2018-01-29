var Router = require("router");
var mgmtRouter = Router();

mgmtRouter.get("/ui", function(req, res){
  //do something
});
mgmtRouter.get("/health", function(req, res){
  //do something
});
mgmtRouter.get("/explore", function(req, res){
  //do something
});
mgmtRouter.get("/*", function(req, res){
  res.send("This resource isn't recognized. Discover all the API possibilities at: url/WonderQ/explore !");
});

module.exports = mgmtRouter;
