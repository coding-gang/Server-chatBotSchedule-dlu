const Schedule = require("../models/scheduleModel");
const {
    handleDataScheduleToJSON,
    performSyncScheduleFunctions

  } = require("../moduleApiDlu/index");

  let yearStudy="";
  let termID ="" ;
  let week ="";

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
    
     await createSchedule(data,studentId,params);
  }
});
};

const UpdateAndRemoveSchedule = async (studentId,result , weekCurrent) =>{

    const weekUpdate = parseInt(weekCurrent);    
      // check datetime in week
    const weeks = result.map(x => x.week); 
     getWeek(new Date());
                  
    if(weeks[0] < weekUpdate && weekUpdate === weeks[2] ){        
  const result =  await Schedule.findOneAndRemove({ studentId: studentId , week: weeks[0] });       
             if(result){        
                const weekNext = weekUpdate +1;   
          
                 yearStudy =  result.yearStudy;
                 termID = result.termID;
                 let data = await performSyncScheduleFunctions(studentId,yearStudy,termID, weekNext.toString());
                    const time ={
                      weekId:weekNext,
                      yearStudy:yearStudy,
                      termId : termID       
                     };      
                    await createSchedule(data,studentId,time);                
             }
             else{
             return  {
              message: 'Error'
            };

             } 
  }
        
 else if(weekUpdate > weeks[2] || weekUpdate === week){
  const result  = await Schedule.deleteMany({studentId:studentId});
     if(result){
  await getSchedulefunc(studentId,result.yearStudy,result.termID,weekUpdate);
      
     }else{
      return  {
        message: 'Error'
      };
     }
   }
  // default current week;
 const res = await performSyncScheduleFunctions(studentId,result[0].yearStudy,result[0].termID, weekCurrent);
  return res;
}

const getSchedulefunc = async (studentId , yearStudys ,termIDs, weeks) =>{
        if(typeof yearStudys === 'undefined' && typeof termIDs === 'undefined'){
          getYearAndTermStudy();
        }else{
          yearStudy =yearStudys;
          termID = termIDs;
        }
        if( typeof weeks === 'undefined')
        {    
          getWeek(new Date());  
        console.log(`${termID}-${yearStudy}-${week}`)
        }
        else{ 
        week = weeks;         
        } 
        const weekCurrent =week;
        const timeCurrent ={
          weekId:weekCurrent,
          yearStudy:yearStudy,
          termId : termID       
        };

        const result = await Schedule.find({studentId: studentId});      
        const schedule = await performSyncScheduleFunctions(studentId, timeCurrent.yearStudy, timeCurrent.termId, weekCurrent);
       
  if(schedule === null && result.length === 3){
      const kq = await getScheduleFromDB(studentId,weekCurrent);
      return kq;
  }
  
  if(schedule !== null){

    if(result.length === 3){     
        result.sort( (a, b) => a.week - b.week );
      const kq =  await UpdateAndRemoveSchedule(studentId,result,weekCurrent);   
        return kq;
    }else{
    
      await SaveScheduleFromDB(schedule,studentId, timeCurrent);

      const nextWeek =(parseInt(weekCurrent) +1);
      const timeNext ={
       weekId:nextWeek,
       yearStudy:yearStudy,
       termId : termID       
   };
    //save schedule next week
    await performSyncScheduleFunctions(studentId, timeNext.yearStudy, timeNext.termId, nextWeek.toString())
    .then( async data => {   
     await SaveScheduleFromDB(data,studentId, timeNext);
    });        
    const lastWeek =(parseInt(weekCurrent) -1);
    const timeLast ={
     weekId:lastWeek,
     yearStudy:yearStudy,
     termId : termID       
 };
  //  save schedule last week
    await performSyncScheduleFunctions(studentId, timeLast.yearStudy, timeLast.termId, lastWeek.toString())
    .then( async data => {
     await SaveScheduleFromDB(data,studentId, timeLast);
    });   
    return schedule;
    }     
    }else{
          return "Xin lỗi bạn, có vấn đề về kết nối bạn hãy thử lại sau";
        }
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
    yearStudy:params.yearStudy,
    termID :params.termId
   }
  await Schedule.create(scheduleModel);
 
}

const getWeek = d => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  console.log(yearStart);
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
   week = weekNo+1;
   
}

const getYearAndTermStudy = () => {
  if (
      (month === 0) |
      (month === 1) |
      (month === 2) |
      (month === 3) |
      (month === 4) |
      (month === 5)
  ) {
      yearStudy = `${year - 1}-${year}`;
      termID = `HK02`;
  } else if (month === 6) {
      yearStudy = `${year - 1}-${year}`;
      termID = `HK03`;
  } else {
      yearStudy = `${year}-${year + 1}`;
      termID = `HK01`;
  }
};


const findDateByNumber = (number) =>{
  let numberOfDay;
 
    switch(number){

  case 2:
    numberOfDay = 'Thứ 2';  
      break;
  case 3:
    numberOfDay = 'Thứ 3';    
      break;
  case 4:
    numberOfDay = 'Thứ 4';    
      break;
  case 5:
    numberOfDay = 'Thứ 5';  
      break;
  case 6:
    numberOfDay = 'Thứ 6';  
      break;
  case 7:
    numberOfDay = 'Thứ 7';
      break;
  default:
    numberOfDay = 'error';
      break;  
  }
  return numberOfDay;
}

exports.getTodaySchedule = (schedule,date=null) =>{
  const currentDay = new Date().getDay();
  let currentNoon; 

  if(date === null){
    currentNoon  =  getScheduleByDay(currentDay);
  }else{
    currentNoon =date;
  }
   const result = schedule.filter(e =>
   e[Object.keys(e)[0]] === "" ||  e[Object.keys(e)[0]] === currentNoon 
);
  return result;
}

exports.getNextDaySchedule = (schedule,nextDay=null) =>{
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  let currentNoon;
  if(nextDay === null){
     currentNoon = getScheduleByDay(tomorrow.getDay());
  }else{
     currentNoon =nextDay;
  }
  const result = schedule.filter(e =>
  e[Object.keys(e)[0]] === "" ||  e[Object.keys(e)[0]] === currentNoon 
);
 return result;
}
exports.getYesterDaySchedule = (schedule,day=null) =>{
  const today = new Date()
  const yesterDay = new Date(today)
  yesterDay.setDate(yesterDay.getDate() - 1)
  let currentNoon;
  if(day === null){
     currentNoon = getScheduleByDay(yesterDay.getDay());
  }else{
     currentNoon =day;
  }
 
  const result = schedule.filter(e =>
  e[Object.keys(e)[0]] === "" ||  e[Object.keys(e)[0]] === currentNoon 
);
 return result;
}

exports.getAfterTomorrowSchedule = (schedule,day=null) =>{
  const today = new Date();
  const afterTomorrow = new Date(today);
  afterTomorrow.setDate(afterTomorrow.getDate() + 2);
  let currentNoon;
  if(day === null){
     currentNoon = getScheduleByDay(afterTomorrow.getDay());
  }else{
     currentNoon =day;
  }
  const result = schedule.filter(e =>
  e[Object.keys(e)[0]] === "" ||  e[Object.keys(e)[0]] === currentNoon 
);
 return result;
}

exports.getBeforeYesterDaySchedule = (schedule,day=null) =>{
  const today = new Date();
  const BeforeYesterDay = new Date(today);
  BeforeYesterDay.setDate(BeforeYesterDay.getDate() - 2);
  let currentNoon;
  if(day === null){
     currentNoon = getScheduleByDay(BeforeYesterDay.getDay());
  }else{
     currentNoon =day;
  }
  const result = schedule.filter(e =>
  e[Object.keys(e)[0]] === "" ||  e[Object.keys(e)[0]] === currentNoon 
);
 return result;
}



exports.hasTomorrowIsNextWeek = () =>{
  const currentDay = new Date().getDay();
  const currentNoon =  getScheduleByDay(currentDay);
  if(currentNoon === "Chủ nhật"){
      return true;
  }
      return false;
}

exports.hasYesterdayIsPreviousWeek = () =>{
  const currentDay = new Date().getDay();
  const currentNoon =  getScheduleByDay(currentDay);
  if(currentNoon === "Thứ 2"){
      return true;
  }
      return false;
}

exports.hasAfterTomorrowIsNextWeek = () =>{
  const currentDay = new Date().getDay();
  let currentNoon =  getScheduleByDay(currentDay);
  if(currentNoon === "Thứ 7"){
      return currentNoon = "Thứ 2";
  }else if(currentNoon === "Chủ nhật"){
    return currentNoon = "Thứ 3";
  }
      return null;
}

exports.hasBeforeYesterDayIsPreviousWeek = () =>{
  const currentDay = new Date().getDay();
  const currentNoon =  getScheduleByDay(currentDay);
  if(currentNoon === "Thứ 3"){
      return currentNoon = "Chủ nhật";
  }else if( currentNoon === "Thứ 2"){
    return currentNoon = "Thứ 7";
  }
      return null;
}

function TryParseInt(str,defaultValue) {
  var retValue = defaultValue;
  if(str !== null) {
      if(str.length > 0) {
          if (!isNaN(str)) {
              retValue = parseInt(str);
          }
      }
  }
  return retValue;
}  

exports.getScheduleByDate = (inputText)=>{
   let date;
   let check =false;
  // check is number;
  if(inputText.toLowerCase().includes("thứ")){
    const output = inputText.replace(/\'/g, '').split(/(\d+)/).filter(Boolean);  
    output.forEach(e =>{
      const kq =  TryParseInt(e);
      if(kq !== 0 && kq !== null &&  typeof(kq) != 'undefined'){
      
             if(kq.toString().length === 1 ){
                const thu = parseInt(kq);
                  date = findDateByNumber(thu);
                  check =true;
             }
             else{ 
                return "Không tìm thấy lịch bạn yêu cầu!"
             }
      }
    })
    if(!check){
      const textDate = output[0].toLowerCase().trim();
      const strSplit =  textDate.split(' ');
      const indexSearch = strSplit.indexOf('thứ');
      if(indexSearch !== -1){
      const strDate = strSplit[indexSearch+1].toString().toLowerCase();
       const numberDate = findNumberDate(strDate);
       date = getScheduleByDay(numberDate);  
        
      }     
    }
   
  }else if(inputText.toLowerCase().includes("chủ nhật")){
     date = getScheduleByDay(0);
   
  }
  else if(inputText.toLowerCase().includes("đầu tuần")){
    date = getScheduleByDay(1);
  
 }
  return date;
}


const getScheduleByDay = (dayOfWeekNumber) =>{
  let nameOfDay;
 
    switch(dayOfWeekNumber){
      case 0: 
          nameOfDay = 'Chủ nhật';    
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
      case 7:
          nameOfDay = 'error';
          break;  
  }
  return nameOfDay;
}

const findNumberDate = (date) =>{
  let numberOfDay;
 
    switch(date){
      case "chủ nhật":
        numberOfDay = 0;
            break;
      case "hai": 
      numberOfDay = 1;    
          break;
      case "ba":
        numberOfDay = 2;  
          break;
      case "tư":
        numberOfDay = 3;    
          break;
      case "năm":
        numberOfDay = 4;    
          break;
      case "sáu":
        numberOfDay = 5;  
          break;
      case "bảy":
        numberOfDay = 6;  
          break; 
      default:
        numberOfDay =7;    
          break; 
  }
  return numberOfDay;
}

function repalceTitle(tab){
      
      let newKeyMappings = {
        thu:  '0',
        sang: 'Sáng',
        chieu:'Chiều',
        toi:  'Tối'
      };

        let mapped = Object.keys(tab).map(oldKey=> {
          let newKey = newKeyMappings[oldKey];
          let result ={};
          result[newKey]=tab[oldKey];
          return result;
        });
        let result = mapped.reduce((result, item)=> {
          let key = Object.keys(item)[0];
          result[key] = item[key];
          return result;
        }, {});

        return result;
}

const getScheduleFromDB = async(studentId,weekCurrent)=>{
  const result = await Schedule.find({studentId: studentId, week:weekCurrent});
  const arrNewValue =[{ '0': '', 'Sáng': 'Sáng', 'Chiều': 'Chiều', 'Tối': 'Tối' }];
   if(result !== []){
  for (const element of  result[0].schedules) {
    const tab = {
      thu: element.thu,
      sang: element.sang,
      chieu: element.chieu,
      toi: element.toi
    };
    const newValue = repalceTitle(tab);
    arrNewValue.push(newValue);
  }
  return arrNewValue;
}
}