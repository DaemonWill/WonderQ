var Router = require("router");
var aliveRouter = Router();

aliveRouter.get("/", function(req, res){
  //do something
});
aliveRouter.post("/", function(req, res){
  //do something
});
aliveRouter.delete("/", function(req, res){
  //do something
});

aliveRouter.get("/stats", function(req, res){
  //do something
});

module.exports = aliveRouter;
