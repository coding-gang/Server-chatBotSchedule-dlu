const express = require("express");
const route = express.Router();
const scheduleController = require("../controller/scheduleController");

route.get('/',scheduleController.getSchedule);

module.exports = route;
