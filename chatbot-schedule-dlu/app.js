const express = require("express");
const bodyparser = require("body-parser");
const {
  handleDataScheduleToJSON,
  performSyncScheduleFunctions,
  urlHTMLFile
} = require('api-dlu');
const app = express();
const scheduleRoutes = require('./routes/scheduleRoutes'); 

app.use(bodyparser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/",scheduleRoutes);
module.exports = app;