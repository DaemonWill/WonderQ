var express = require("express");
var bodyParser = require("body-parser");
var config = require("./config/dev-config");
var bodyParser = require("body-parser");
var path = require("path");
var qManager = new require("./scripts/wonder-queue")(config);
var aliveRouter = new require("./routes/alive-route")(qManager).aliveRouter;
var deadRouter = new require("./routes/dead-route")(qManager).deadRouter;
var mgmtRouter = new require("./routes/management-route")(qManager).mgmtRouter;
var wonderQ = express();

/*
*WonderQ Backend logic
*aliveRouter applies endpoint CRUD functionality to the db containing Messages that are open to being answered
*TODO deadRouter applies endpoint CRUD functionality to the db containing problem Messages that have failed to be processed
*/

wonderQ.use(bodyParser.json());
wonderQ.use("/WonderQ/alive", aliveRouter);
wonderQ.use("/WonderQ/dead", deadRouter);
wonderQ.use("/WonderQ", mgmtRouter);

wonderQ.listen(config.serverPort);
console.log("WonderQ listening on port: "+ config.serverPort);
