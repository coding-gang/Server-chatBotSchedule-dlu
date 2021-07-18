const Schedule = require("../models/scheduleModel");
const mongoose = require('mongoose');
const {
    handleDataScheduleToJSON,
    performSyncScheduleFunctions

  } = require('api-dlu');

  let yearStudy = "";
  let termID = "";
  let week = "";

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  let objDate;
  
  // get today
exports.getSchedule = async(req, res) =>{
        console.log(Date.now() + " Ping Received");
        if (req.query.studentID) {
          let scheduleWeek =[];
          const studentId =req.query.studentID;

      //   getYearAndTermStudy();
        // getWeek(new Date());   

       await performSyncScheduleFunctions(req.query.studentID, req.query.yearStudy, req.query.termID, req.query.week)
       .then(kq => handleDataScheduleToJSON()).then(data => {    
        const time ={
            weekId:req.query.week,
            yearStudy:req.query.yearStudy,
            termId : req.query.termID        
        };
        objDate = time;
        res.json(data);
        scheduleWeek.push(data);
       });
        // save schedule next week
        await performSyncScheduleFunctions(studentId, objDate.yearStudy, objDate.termId, (parseInt(objDate.weekId) +1).toString())
        .then(kq => handleDataScheduleToJSON()).then(data => {
         scheduleWeek.push(data);
        });        

        // save schedule last week
        await performSyncScheduleFunctions(studentId, objDate.yearStudy, objDate.termId, (parseInt(objDate.weekId) -1).toString())
        .then(kq => handleDataScheduleToJSON()).then(data => {
         scheduleWeek.splice(0,0,data);
         //update week -> lastweek
         objDate.weekId =  (parseInt(objDate.weekId) -1).toString();
       
        });    
        scheduleWeek.forEach( async (x) =>{     
          console.log(x);        
        
          await SaveScheduleFromDB(x,studentId,objDate);    
        
         });     
         
       
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

const SaveScheduleFromDB  = async (data , studentId , params)=>{
  await Schedule.find({studentId: studentId} , async(err, result)=>{
    if(result.length === 0 || result.length <3 ){    
     
      if(!params.weekId && !params.yearStudy && !params.termId){
        getYearAndTermStudy();
        getWeek(new Date());  
      }else{
          week =params.weekId;
          yearStudy =params.yearStudy;
          termID =params.termId;         
      }
      createSchedule(data,studentId);
     

  }
  else{
    await UpdateAndRemoveSchedule(studentId,result);    
  }
  
});

};
const UpdateAndRemoveSchedule = async (studentId,result) =>{
  week =4;
      // check datetime in week
      const weeks = result.map(x => x.week);
  if(weeks[0] < week && week === weeks[2] ){
   await Schedule.findOneAndRemove({ studentId:studentId , week: weeks[0] } , async ( err , result) =>{
             if(result){
                 console.log(result);
                 yearStudy =  result.yearStudy;
                 termID = result.termID;
                 await performSyncScheduleFunctions(studentId,yearStudy,termID, week +1)
                 .then(kq => handleDataScheduleToJSON()).then(data => {
                  week = (week +1).toString();   
                  createSchedule(data,studentId);
                 });        
             }
             console.log(err);
   })
  }

  if(week > weeks[2]){
   await Schedule.deleteMany({studentId:studentId} , async ( err , result) =>{
     if(result){
         console.log("ok");
         // create schedule date now

     }
     console.log(err);
});
  }
}


const createSchedule = (data , studentId) =>{
  const dateNow = new Date();
  const [,...filterData] = [...data];   
  const arrSchedule =  filterData.map( x => ({thu: x[Object.keys(x)[0]],
                                             sang: x.Sáng ,chieu: x.Chiều, toi: x.Tối }));

console.log(objDate.weekId);

  const scheduleModel = {
    studentId : studentId,     
    schedules :  arrSchedule,          
    dateCreated :dateNow,
    week : week,
    yearStudy:yearStudy,
    termID :termID
   }
  Schedule.create(scheduleModel);
  objDate.weekId = (parseInt(objDate.weekId) +1).toString();   
}

const getWeek = d => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  console.log(yearStart);
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
   week = weekNo;
   
}

const getYearAndTermStudy = () => {
  if (
    (month === 0) |
    (month === 1) |
    (month === 2) |
    (month === 3) |
    (month === 4) |
    (month === 5) |
    (month === 6)
  ) {
    yearStudy = `${year - 1}-${year}`;
    termID = `HK02`;
  } else if (month === 7) {
    yearStudy = `${year - 1}-${year}`;
    termID = `HK03`;
  } else {
    yearStudy = `${year}-${year + 1}`;
    termID = `HK01`;
  }
};
