var express = require("express");
var mongoose = require("mongoose");
var config = require("./config/dev-config");
var bodyParser = require("body-parser");
var aliveRouter = require("./routes/alive-route");
var deadRouter = require("./routes/dead-route");
var mgmtRouter = require("./routes/management-route");
var wonderQ = express();

wonderQ.use("/WonderQ", mgmtRouter);
wonderQ.use("/WonderQ/alive", aliveRouter);
wonderQ.use("/WonderQ/dead", deadRouter);
wonderQ.listen(config.serverPort);
console.log("WonderQ listening on port: "+ config.serverPort);
