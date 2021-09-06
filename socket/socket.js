const app = require('../app');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bot = require('../botNlp/bot');
let nlp;
const scheduleController = require('../controller/scheduleController');

(async () => { nlp = await bot.trainBot() })();

let week ="";

const getWeekSchedule = async(mssv,yearStudy,termID,week) =>{
  const result = await scheduleController.getSchedule(mssv,yearStudy,termID,week);
  return result ;
 }

const getTodaySchedule = (schedule,date) =>{
    const result =  scheduleController.getTodaySchedule(schedule,date);
    return result;
}
  
const getWeek = d => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  console.log(yearStart);
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
   week = weekNo+1;
   
}

io.on("connection", socket => {
    // either with send()
    console.log(`connect success ${socket.id}`);
    socket.on("scheduleWeek", async (data) => {
      const kq =  await nlp.process('vi',data.message);
      console.log(kq);
      switch(kq.answer){
            
              case "trong tuần": 
                getWeekSchedule(data.mssv.toString(),undefined,undefined,undefined).then(result =>{            
                socket.emit("send-schedule",result);           
              });
                  break;
              case "tuần tới":
                getWeek(new Date());
                const nextWeek = parseInt(week) +1;
                getWeekSchedule(data.mssv.toString(),undefined,undefined,nextWeek.toString()).then(result =>{         
                socket.emit("send-schedule",result);     
                });
                  break;     
              case "tuần trước":
                getWeek(new Date());
                const previousWeek = parseInt(week) - 1;
                getWeekSchedule(data.mssv.toString(),undefined,undefined,previousWeek.toString()).then(result =>{
                socket.emit("send-schedule",result);
                    });
                      break;    
              case "hôm nay":
                const schedule = await getWeekSchedule(data.mssv.toString(),undefined,undefined,undefined);
                const result = getTodaySchedule(schedule);          
                socket.emit("send-schedule",result);
                      break; 
              case "ngày mai":
                if(scheduleController.hasTomorrowIsNextWeek()){
                  getWeek(new Date());
                  const nextWeek = parseInt(week) +1;
                  const scheduleNextWeek = await getWeekSchedule(data.mssv.toString(),undefined,undefined,nextWeek.toString());
                  const result =  scheduleController.getNextDaySchedule(scheduleNextWeek,"Thứ 2");
                  socket.emit("send-schedule",result);
                }else{
                  const schedule = await getWeekSchedule(data.mssv.toString(),undefined,undefined,undefined);
                  const result =  scheduleController.getNextDaySchedule(schedule,null);
                  socket.emit("send-schedule",result);
                }
                       break; 
              case "hôm qua":
                  if(scheduleController.hasYesterdayIsPreviousWeek()){
                    getWeek(new Date());
                    const previousWeek = parseInt(week) - 1;
                    const schedulePreviousWeek = await getWeekSchedule(data.mssv.toString(),undefined,undefined,previousWeek.toString());
                    const result =  scheduleController.getYesterDaySchedule(schedulePreviousWeek,"Thứ 2");
                    socket.emit("send-schedule",result);
                  }else{
                    const schedule = await getWeekSchedule(data.mssv.toString(),undefined,undefined,undefined);
                    const result =  scheduleController.getYesterDaySchedule(schedule);
                    socket.emit("send-schedule",result);
                  }
                       break;
                case "ngày mốt":
                  const currentNoon = scheduleController.hasAfterTomorrowIsNextWeek();
                  if(currentNoon !== null){
                    
                    getWeek(new Date());
                    const nextWeek = parseInt(week) +1;
                    const scheduleNextWeek = await getWeekSchedule(data.mssv.toString(),undefined,undefined,nextWeek.toString());
                    const result =  scheduleController.getAfterTomorrowSchedule(scheduleNextWeek,currentNoon);
                    socket.emit("send-schedule",result);
                  }else{
                    const schedule = await getWeekSchedule(data.mssv.toString(),undefined,undefined,undefined);
                    const result =  scheduleController.getAfterTomorrowSchedule(schedule);
                    socket.emit("send-schedule",result);
                  }
                     break;      
                case "hôm kia":
                  const currentDate = scheduleController.hasBeforeYesterDayIsPreviousWeek();
                  if(currentDate !== null){                   
                    getWeek(new Date());
                    const previousWeek = parseInt(week) - 1;
                    const schedulePreviousWeek = await getWeekSchedule(data.mssv.toString(),undefined,undefined,previousWeek.toString());
                    const result =  scheduleController.getBeforeYesterDaySchedule(schedulePreviousWeek,currentDate);
                    socket.emit("send-schedule",result);
                  }else{
                    const schedule = await getWeekSchedule(data.mssv.toString(),undefined,undefined,undefined);
                    const result =  scheduleController.getBeforeYesterDaySchedule(schedule);
                    socket.emit("send-schedule",result);
                  }
                  break;
                case "thứ trong tuần":
                  const date = scheduleController.getScheduleByDate(kq.utterance);
                 if(date !== "error"){
                  const scheduleNow = await getWeekSchedule(data.mssv.toString(),undefined,undefined,undefined);
                  const scheduleByDateNow = getTodaySchedule(scheduleNow,date);        
                  socket.emit("send-schedule",scheduleByDateNow);
                 }else{
                  socket.emit("send-schedule","Xin lỗi, tôi không hiểu ý bạn!");
                 }
                  break;      
                case "thứ tuần sau":
                    const dateNextWeek = scheduleController.getScheduleByDate(kq.utterance);
                   if(dateNextWeek === "error"){
                    socket.emit("send-schedule","Xin lỗi, tôi không hiểu ý bạn123!");
                   }else{
                    getWeek(new Date());
                    const nextWeek = parseInt(week) +1;
                    const scheduleNextWeek = await getWeekSchedule(data.mssv.toString(),undefined,undefined,nextWeek.toString());
                    const scheduleByDateNextWeek = getTodaySchedule(scheduleNextWeek,dateNextWeek);        
                    socket.emit("send-schedule",scheduleByDateNextWeek);                  
                   } 
                    break;
                case "thứ tuần trước":
                  const datePreviousWeek = scheduleController.getScheduleByDate(kq.utterance);
                 if(datePreviousWeek === "error"){
                  socket.emit("send-schedule","Xin lỗi, tôi không hiểu ý bạn123!");
                 }else{
                  getWeek(new Date());
                  const previousWeekByDate = parseInt(week) - 1;
                  const schedulePreviousWeekByDate = await getWeekSchedule(data.mssv.toString(),undefined,undefined,previousWeekByDate.toString());
                  const scheduleByDatePreviousWeek = getTodaySchedule(schedulePreviousWeekByDate,datePreviousWeek);        
                  socket.emit("send-schedule",scheduleByDatePreviousWeek);                  
                 } 
                 break;   
                 case "MSSV":
                  socket.emit("send-schedule",`Mã số sinh viên của bạn là:${data.mssv}`);
                   break;
            default:
              socket.emit("send-schedule","Xin lỗi, tôi không hiểu ý bạn!");
              break;

       }
  });
  });
module.exports = server;