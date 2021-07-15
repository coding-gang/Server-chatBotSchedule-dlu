const {
    handleDataScheduleToJSON,
    performSyncScheduleFunctions,
    urlHTMLFile
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
          // res.sendFile(__dirname + urlHTMLFile);
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