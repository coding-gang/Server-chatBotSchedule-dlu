const app = require('../app');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bot = require('../botNlp/bot');
let nlp;
const scheduleController = require('../controller/scheduleController');

(async () => { nlp = await bot.trainBot() })();



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
  const week = weekNo+1;
   return week;
}

io.on("connection", socket => {
    // either with send()
    console.log(`connect success ${socket.id}`);
    socket.on("scheduleWeek", async (data) => {
      const kq =  await nlp.process('vi',data.message);
      console.log(kq);

      const sendWaiter =()=>{
        socket.emit("send-schedule","Bạn đợi tí...!");
      }

      
      switch(kq.answer){
            
              case "trong tuần": 
              sendWaiter();
                getWeekSchedule(data.mssv.toString(),undefined,undefined,undefined).then(result =>{            
                socket.emit("send-schedule",result);           
              });
                  break;
              case "tuần tới":
                sendWaiter();
               const nextWeek =  getWeek(new Date()) +1;
                getWeekSchedule(data.mssv.toString(),undefined,undefined,nextWeek.toString()).then(result =>{         
                socket.emit("send-schedule",result);     
                });
                  break;     
              case "tuần trước":
                sendWaiter();
                const previousWeek =  getWeek(new Date()) - 1;
                getWeekSchedule(data.mssv.toString(),undefined,undefined,previousWeek.toString()).then(result =>{
                socket.emit("send-schedule",result);
                    });
                      break;    
              case "hôm nay":
                sendWaiter();
                const schedule = await getWeekSchedule(data.mssv.toString(),undefined,undefined,undefined);
                const result = getTodaySchedule(schedule);          
                socket.emit("send-schedule",result);
                      break; 
              case "ngày mai":
                sendWaiter();
                if(scheduleController.hasTomorrowIsNextWeek()){
                  getWeek(new Date());        
               const nextWeek =  getWeek(new Date()) +1;
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
                sendWaiter();
                  if(scheduleController.hasYesterdayIsPreviousWeek()){
                    const previousWeek =  getWeek(new Date()) - 1;
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
                  sendWaiter();
                  const currentNoon = scheduleController.hasAfterTomorrowIsNextWeek();
                  if(currentNoon !== null){
                    
                    const nextWeek =  getWeek(new Date()) +1;
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
                  sendWaiter();
                  const currentDate = scheduleController.hasBeforeYesterDayIsPreviousWeek();
                  if(currentDate !== null){                   
                    const previousWeek =  getWeek(new Date()) - 1;
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
                  sendWaiter();
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
                  sendWaiter();
                    const dateNextWeek = scheduleController.getScheduleByDate(kq.utterance);
                   if(dateNextWeek === "error"){
                    socket.emit("send-schedule","Xin lỗi, tôi không hiểu ý bạn123!");
                   }else{
                    const nextWeek =  getWeek(new Date()) +1;
                    const scheduleNextWeek = await getWeekSchedule(data.mssv.toString(),undefined,undefined,nextWeek.toString());
                    const scheduleByDateNextWeek = getTodaySchedule(scheduleNextWeek,dateNextWeek);        
                    socket.emit("send-schedule",scheduleByDateNextWeek);                  
                   } 
                    break;
                case "thứ tuần trước":
                  sendWaiter();
                  const datePreviousWeek = scheduleController.getScheduleByDate(kq.utterance);
                 if(datePreviousWeek === "error"){
                  socket.emit("send-schedule","Xin lỗi, tôi không hiểu ý bạn123!");
                 }else{
                  const previousWeekByDate =  getWeek(new Date()) - 1;
                  const schedulePreviousWeekByDate = await getWeekSchedule(data.mssv.toString(),undefined,undefined,previousWeekByDate.toString());
                  const scheduleByDatePreviousWeek = getTodaySchedule(schedulePreviousWeekByDate,datePreviousWeek);        
                  socket.emit("send-schedule",scheduleByDatePreviousWeek);                  
                 } 
                   break;   
                case "MSSV":
                  socket.emit("send-schedule",`Mã số sinh viên của bạn là:${data.mssv}`);
                   break;
                case "xin chao":
                  socket.emit("send-schedule","Chào bạn! Tôi có thể cho bạn xem thời khóa biểu của bạn");
                   break;
                case "hỗ trợ":
                    socket.emit("send-schedule","Chào bạn! Tôi là bot-dlu\n"+
                                                "Chức năng chính mà tôi có thể hỗ trợ cho bạn:\n"+
                                                "-Xem mssv mà bạn cung cấp cho bot\n"+
                                                "-Xem TKB khi cung cấp mssv cho tôi\n"+
                                                "-Xem TKB theo mssv chỉ định\n"+
                                                "-Cập nhật lại mssv cho bot\n"+
                                                "-Xóa các tin nhắn");
                   break;    
            default:
              socket.emit("send-schedule","Xin lỗi, tôi không hiểu ý bạn!");
              break;

       }
  });
  });
module.exports = server;