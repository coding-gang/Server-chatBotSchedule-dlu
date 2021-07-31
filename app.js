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
 const getWeekSchedule = async(mssv,yearStudy,termID,week) =>{
  const result = await scheduleController.getSchedule(mssv,yearStudy,termID,week);
  return result ;
 }
  // getWeekSchedule("1812867","2019-2020","HK02","12").then(result =>{
  //   console.log(result);
  // });
  
module.exports = app;