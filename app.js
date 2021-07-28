const express = require("express");
const bodyparser = require("body-parser");

const app = express();

const scheduleController = require("./controller/scheduleController");
app.use(bodyparser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
scheduleController.getSchedule("1812866","2019-2020","HK02","20");

module.exports = app;