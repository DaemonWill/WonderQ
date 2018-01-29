var express = require("express");
var bodyParser = require("body-parser");
var config = require("./config/dev-config");
var bodyParser = require("body-parser");
var qManager = new require("./scripts/wonder-queue")(config);
var aliveRouter = new require("./routes/alive-route")(qManager).aliveRouter;
var deadRouter = new require("./routes/dead-route")(qManager).deadRouter;
var mgmtRouter = new require("./routes/management-route")(qManager).mgmtRouter;
var wonderQ = express();

wonderQ.use(bodyParser.json());
wonderQ.use("/WonderQ/alive", aliveRouter);
wonderQ.use("/WonderQ/dead", deadRouter);
wonderQ.use("/WonderQ", mgmtRouter);
wonderQ.listen(config.serverPort);
console.log("WonderQ listening on port: "+ config.serverPort);
