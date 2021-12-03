const scheduleController = require('./scheduleController');

let yearStudy;
exports.getScheduleByMonth = async (mssv,month,year) =>{
    const dt = new Date(Date.UTC(year, month-1)); // get number month
    const week =  getWeek(dt);
    const arrayWeek = []
    const numberWeekOfMonth = weekCount(year,month);
   for(let i  =1 ; i< numberWeekOfMonth ; i++){
               const weekOfYear = week + i;
                arrayWeek.push(weekOfYear);
   }
    const term =  getYearAndTermStudy(month-1,year);
    const scheduleList = await Promise.all(arrayWeek.map(async (item)=>{
    const schedule =  await scheduleController.getScheduleSpecifyByCalendar(mssv,yearStudy,term,item);
      return schedule;
    }))
    return scheduleList;


}

function weekCount(year, month_number) {
        // month_number is in the range 1..12
        var firstOfMonth = new Date(year, month_number-1, 1);
        var lastOfMonth = new Date(year, month_number, 0);
    
        var used = firstOfMonth.getDay() + lastOfMonth.getDate();
    
        return Math.ceil( used / 7);
    }

const getWeek = d => {
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    console.log(yearStart);
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    const week = weekNo;
     return week;
  }
  


  const getYearAndTermStudy = (month,year) => {
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

  exports.getNumberMonth = (inputText)=>{
      let month;
      let year;
    if(inputText.toLowerCase().includes("tháng")){
        const output = inputText.replace(/\'/g, '').split(/(\d+)/).filter(Boolean); 
        output.forEach(e =>{
            const kq =  TryParseInt(e);
            if(kq !== 0 && kq !== null &&  typeof(kq) != 'undefined'){
            
                   if(kq.toString().length <3 ){
                      const thang = parseInt(kq);
                      month =thang;
                      console.log(month);
                    }
                   else{ 
                      return "Không tìm thấy lịch bạn yêu cầu!"
                   }
            }
          })
    }
    if(inputText.toLowerCase().includes("năm")){
        const output = inputText.replace(/\'/g, '').split(/(\d+)/).filter(Boolean); 
        output.forEach(e =>{
            const kq =  TryParseInt(e);
            console.log(kq)
            if(kq !== 0 && kq !== null &&  typeof(kq) != 'undefined'){
            
                   if(kq.toString().length === 4 ){
                      const nam = parseInt(kq);
                        year = nam;
                   }
                   else{ 
                      return "Không tìm thấy lịch bạn yêu cầu!"
                   }
            }else{
                year =  new Date().getFullYear();
            }
          })
    }else{
        year =  new Date().getFullYear();
    }
    return {
        month:month,
        year:year
    }
  }