const Schedule = require("../models/scheduleModel");
const mongoose = require('mongoose');
const {
    handleDataScheduleToJSON,
    performSyncScheduleFunctions

  } = require('api-dlu');

  let yearStudy = "";
  let termID = "";
  

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
 // let objDate ={};
  // get today
exports.getSchedule = async(req, res) =>{
        console.log(Date.now() + " Ping Received");
        if (req.query.studentID) {
          const studentId =req.query.studentID;
      await getSchedulefunc(studentId, req.query.yearStudy, req.query.termID, req.query.week);
 
        
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
        res.json("oke"); 
}

const SaveScheduleFromDB  = async (data , studentId , params)=>{
  await Schedule.find({studentId: studentId} , async(err, result)=>{
    if(result.length === 0 || result.length <3 ){    
     
      if(!params.weekId && !params.yearStudy && !params.termId){
        getYearAndTermStudy();
        getWeek(new Date());  
      }else{
          yearStudy =params.yearStudy;
          termID =params.termId;         
      }
     await createSchedule(data,studentId,params);
  }
});
};

const UpdateAndRemoveSchedule = async (studentId,result , weekCurrent) =>{
    let weekUpdate = parseInt(weekCurrent);    
      // check datetime in week
      const weeks = result.map(x => x.week); 
            console.log(weeks);
  if(weeks[0] < weekUpdate && weekUpdate === weeks[2] ){
             console.log(weekUpdate);
  const result =  await Schedule.findOneAndRemove({ studentId: studentId , week: weeks[0] }); 
           
             if(result){
              console.log(weekUpdate);
              weekUpdate = weekUpdate +1;   
          
                 yearStudy =  result.yearStudy;
                 termID = result.termID;
                 await performSyncScheduleFunctions(studentId,yearStudy,termID, weekUpdate.toString());
               let data = await  handleDataScheduleToJSON();
               const time ={
                weekId:weekUpdate,
                yearStudy:yearStudy,
                termId : termID       
            };      
                  await createSchedule(data,studentId,time);     
                  return result;
             }
             else{
              console.log(err);
             }
          
  }

  if(weekUpdate > weeks[2]){
   await Schedule.deleteMany({studentId:studentId} , async ( err , result) =>{
     if(result){
     await getSchedulefunc(studentId,"2019-2020","HK02",weekUpdate);
         // create schedule date now
     }if(err){
      console.log(err);
     }

    
});
  }
}

const getSchedulefunc = async (studentId , yearStudy ,termID, week) =>{
  await Schedule.find({studentId: studentId} , async (err, result)=>{
           
    if(result.length === 3 ){     
        result.sort( (a, b) => a.week - b.week );
        await UpdateAndRemoveSchedule(studentId,result,week);   
    }
    else{
      const weekCurrent =week;
      const timeCurrent ={
        weekId:weekCurrent,
        yearStudy:yearStudy,
        termId : termID       
    };
      await performSyncScheduleFunctions(studentId, timeCurrent.yearStudy, timeCurrent.termId, weekCurrent)
      .then(kq => handleDataScheduleToJSON()).then( async data => {    
     
     
       await SaveScheduleFromDB(data,studentId, timeCurrent);
  
      });
      let nextWeek =week;
         nextWeek  =(parseInt(nextWeek) +1);

         const timeNext ={
          weekId:nextWeek,
          yearStudy:yearStudy,
          termId : termID       
      };
       // save schedule next week
       await performSyncScheduleFunctions(studentId, timeNext.yearStudy, timeNext.termId, nextWeek.toString())
       .then(kq => handleDataScheduleToJSON()).then( async data => {
       
        await SaveScheduleFromDB(data,studentId, timeNext);
     //   scheduleWeek.push(data);
       });        
       let lastWeek =week;
       lastWeek = (parseInt(lastWeek) -1);
       const timeLast ={
        weekId:lastWeek,
        yearStudy:yearStudy,
        termId : termID       
    };
       // save schedule last week
       await performSyncScheduleFunctions(studentId, timeLast.yearStudy, timeLast.termId, lastWeek.toString())
       .then(kq => handleDataScheduleToJSON()).then( async data => {
      
        await SaveScheduleFromDB(data,studentId, timeLast);
       });    
    }
  });    
 
     
}

const createSchedule = async (data , studentId ,params) =>{
  const dateNow = new Date();
  const [,...filterData] = [...data];   
  const arrSchedule =  filterData.map( x => ({thu: x[Object.keys(x)[0]],
                                             sang: x.Sáng ,chieu: x.Chiều, toi: x.Tối }));
  const scheduleModel = {
    studentId : studentId,     
    schedules :  arrSchedule,          
    dateCreated :dateNow,
    week : params.weekId,
    yearStudy:yearStudy,
    termID :termID
   }
  await Schedule.create(scheduleModel);
 
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
