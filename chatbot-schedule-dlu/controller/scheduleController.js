const Schedule = require("../models/scheduleModel");
const mongoose = require('mongoose');
const {
    handleDataScheduleToJSON,
    performSyncScheduleFunctions
    
  } = require('api-dlu');

exports.getSchedule = async(req, res) =>{

        console.log(Date.now() + " Ping Received");
      
        if (req.query.studentID) {
          await performSyncScheduleFunctions(req.query.studentID, req.query.yearStudy, req.query.termID, req.query.week);
        }
      
        if (req.query.classStudentID) {
          await performSyncScheduleFunctions(req.query.classStudentID, req.query.yearStudy, req.query.termID, req.query.week);
        }
      
        if (req.query.professorID) {
          await performSyncScheduleFunctions(req.query.professorID, req.query.yearStudy, req.query.termID, req.query.week);
        }
      
        if (req.query.studentID || req.query.classStudentID || req.query.professorID) {
          let data = await handleDataScheduleToJSON();
          res.json(data);
          const studentId =req.query.studentID;
          await SaveScheduleFromDB(data,studentId);
          // res.sendFile(__dirname + urlHTMLFile);
         
          //consoleLogAPI("1812866");
        } else {
          const result = {
            example: 'http://localhost:8000/?studentID={yourStudentID}&yearStudy=2019-2020&termID=HK02&week=18',
            quick: 'http://localhost:8000/?studentID=1710289',
            detailExample: {
              "studentID": "yourStudentID | example: 1710289, (default: empty)",
              "yearStudy": "example: 2019-2020, (default: current year)",
              "termID": "example: HK01 | HK02, (default: current termID)",
              "week": "example: 18, (default: current week)"
            }
          }
          res.json(result); 
        }
}

const SaveScheduleFromDB  = async (data , studentId)=>{
   const dateNow  = new Date().toISOString().split("T")[0];
    await Schedule.find({studentId: studentId} , async(err, result)=>{
   
           if(result.length  === 0){
            console.log(studentId);
            const arrSchedule =  data.map( x => ({thu: x[Object.keys(x)[0]] ,
                                                  sang: x.Sáng ,chieu: x.Chiều , toi: x.Tối }));
             const scheduleModel = {
              studentId : studentId,
              schedules :arrSchedule,
              dateCreated :dateNow
             }    
             console.log(scheduleModel);
            await Schedule.create(scheduleModel);
           }else{
            console.log("error");
           }

   });
   
   
}