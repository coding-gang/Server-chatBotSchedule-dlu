const Schedule = require("../models/scheduleModel");

  let yearStudy="";
  let termID ="" ;
  let week ="";

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

exports.getSchedule = async(mssv,yearStudy,termID,week) =>{
    
        if (mssv) {
     const kq =  await getSchedulefunc(mssv, yearStudy, termID,week);
     return kq;
        } 
       return  {
            message: 'Bạn phải cung cấp mssv!'
          }  
        
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

        const result = await Schedule.find({studentId: studentId});      
       
  if(result.length === 3){
      const kq = await getScheduleFromDB(studentId,weekCurrent);
      return kq;
  }else{
          return "Xin lỗi bạn, có vấn đề về kết nối bạn hãy thử lại sau";
        }
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