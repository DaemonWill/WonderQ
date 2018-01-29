var Router = require("router");
var deadRouter = Router();

deadRouter.get("/", function(req, res){
  //do something
});
deadRouter.post("/", function(req, res){
  //do something
});
deadRouter.delete("/", function(req, res){
  //do something
});

deadRouter.get("/stats", function(req, res){
  //do something
});

module.exports = deadRouter;
