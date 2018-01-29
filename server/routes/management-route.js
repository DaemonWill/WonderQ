var Router = require("router");
var mgmtRouter = Router();
var healthRoute = require("express-healthcheck")();
var statusRoute = require("express-status-monitor")();
var path = require("path");

/*
* Maps to valuable user services in order to monitor/alter the state of the application.
*/

function routeLoader(queueManager){
  this.mgmtRouter = mgmtRouter;

  //TODO managment UI in which user can act as a producer/consumer for the queue (add/view/delete messages)
  this.mgmtRouter.get("/ui", function(req, res){
    res.sendFile(path.resolve(__dirname, '../../client/index.html'));
  });

  //TODO Angualar conroller for the management UI
  this.mgmtRouter.get("/scripts/*", function(req, res){
    res.sendFile(path.resolve(__dirname, '../../client/scripts/management-app.js'));
  });

  //Provides a json containing the uptime of the server
  this.mgmtRouter.get("/health", healthRoute);

  //Provides detailed time-based metrics concerning:
  //server memory usage, local CPU usage, # of requests/responses made since uptime, and resource loading times
  this.mgmtRouter.get("/status", statusRoute);

  //Provides a json containing information for the endpoints/methods mapped from url/WonderQ/
  this.mgmtRouter.get("/explore", function(req, res){
    res.json(mgmtRouter.stack);
  });

  //Catch any additional pathing not defined and inform of other resources available
  this.mgmtRouter.get("/*", function(req, res){
    res.send("This resource isn't recognized. Discover all the API possibilities at: url/WonderQ/explore !");
  });

  return this;
}

module.exports = routeLoader;
