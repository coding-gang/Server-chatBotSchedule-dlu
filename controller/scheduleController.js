const Schedule = require("../models/scheduleModel");
const {
    handleDataScheduleToJSON,
    performSyncScheduleFunctions

  } = require('api-dlu');

  let yearStudy = "";
  let termID = "";
  

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

exports.getSchedule = async(mssv,yearStudy,termID,week) =>{
        console.log(Date.now() + " Ping Received");

        if (mssv) {
     const kq =  await getSchedulefunc(mssv, yearStudy, termID,week);
     return kq;
        } 
       return  {
            message: 'Bạn phải cung cấp mssv!'
          }  
        
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
          
  if(weeks[0] < weekUpdate && weekUpdate === weeks[2] ){        
  const result =  await Schedule.findOneAndRemove({ studentId: studentId , week: weeks[0] });       
             if(result){        
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
                  return data;
             }
             else{
             return err;
             } 
  }
        
 else if(weekUpdate > weeks[2]){
  const result  = await Schedule.deleteMany({studentId:studentId});
     if(result){
    const kq = await getSchedulefunc(studentId,"2019-2020","HK02",weekUpdate);
        return kq;
     }if(err){
      return err;
     }
  }
 
  // default current week;
  await performSyncScheduleFunctions(studentId,result[0].yearStudy,result[0].termID, weekUpdate.toString());
  let data = await  handleDataScheduleToJSON();
  console.log(weekUpdate);
  return data;
}

const getSchedulefunc = async (studentId , yearStudy ,termID, week) =>{
 const result = await Schedule.find({studentId: studentId}); 
          
    if(result.length === 3 ){     
        result.sort( (a, b) => a.week - b.week );
      const kq =  await UpdateAndRemoveSchedule(studentId,result,week);   
        return kq;
    }
   
      const weekCurrent =week;
      const timeCurrent ={
        weekId:weekCurrent,
        yearStudy:yearStudy,
        termId : termID       
    };
     const schedule = await performSyncScheduleFunctions(studentId, timeCurrent.yearStudy, timeCurrent.termId, weekCurrent)
      .then(kq => handleDataScheduleToJSON()).then( async data => {    
              
       await SaveScheduleFromDB(data,studentId, timeCurrent);
                return data;
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
   return schedule;
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

const getScheduleByDay = (date) =>{
  let nameOfDay;
    const dayOfWeekNumber = new Date().getDay();
    switch(dayOfWeekNumber){
      case 0: 
          nameOfDay = 'Sunday';    
          break;
      case 1:
          nameOfDay = 'Thứ 2';  
          break;
      case 2:
          nameOfDay = 'Thứ 3';    
          break;
      case 3:
          nameOfDay = 'Thứ 4';    
          break;
      case 4:
          nameOfDay = 'Thứ 5';  
          break;
      case 5:
          nameOfDay = 'Thứ 6';  
          break;
      case 6:
          nameOfDay = 'Thứ 7';
          break;
  
  }
}