const app = require('../app');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bot = require('../botNlp/bot');
let nlp;
const scheduleController = require('../controller/scheduleController');
const ScheduleFromDB = require("../controller/scheduleFromDBController");

const ERRORMESSAGE ="Xin lỗi bạn, có vấn đề về kết nối bạn hãy thử lại sau";
(async () => { nlp = await bot.trainBot()})();

const getScheduleByCalendar =async (data)=>{
  if(data.hasOwnProperty('dataCalendar')){
    const termId =  getTermStudy(data.dataCalendar.month);
    const day = data.dataCalendar.dayName;
   const schedule =  await scheduleController.getScheduleSpecifyByCalendar(data.mssv.toString(),data.dataCalendar.year,termId,data.dataCalendar.week);
   const result =  getTodaySchedule(schedule,day);
   return result; 
  }
 }

const getWeekSchedule = async(mssv,yearStudy,termID,week) =>{
  await scheduleController.getSchedule(mssv,yearStudy,termID,week);
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

const getTermStudy = (month,yearStudy) => {
  var termID ="";
  if (
      (month === 0) |
      (month === 1) |
      (month === 2) |
      (month === 3) |
      (month === 4) |
      (month === 5)
  ) {
      termID = `HK02`; 
  } else if (month === 6) {
      termID = `HK03`;
  } else {
      termID = `HK01`;
  }
  return termID;
};


io.on("connection", socket => {
    // either with send()
    console.log(`connect success ${socket.id}`);
    const sendWaiter =()=>{
      socket.emit("send-schedule","Bạn đợi tí...!");
    }
    socket.on("scheduleWeek", async (data) => {
      
       if(data.hasOwnProperty("dataCalendar")){
      sendWaiter();
      getScheduleByCalendar(data).then(result => socket.emit("send-schedule",result));
       }else{
        const kq =  await nlp.process('vi',data.message);
        console.log(kq);
  
    
        switch(kq.answer){
              
                case "trong tuần": 
                sendWaiter();           
                 const schedules = await scheduleController.getScheduleSpecifyByCalendar(data.mssv.toString(),undefined,undefined,undefined);
                 if(schedules === null){
                  const kqFromDB = await ScheduleGetDB.getSchedule(data.mssv.toString(),undefined,undefined,undefined);
                  socket.emit("send-schedule",kqFromDB);    
                 }else{
                  socket.emit("send-schedule",schedules);   
                 }
                 await getWeekSchedule(data.mssv.toString(),undefined,undefined,undefined);
                 break;

                case "tuần tới":
                  sendWaiter();
                 const nextWeek = getWeek(new Date()) +1;
                const schedulesNextWeek = await scheduleController.getScheduleSpecifyByCalendar(data.mssv.toString(),undefined,undefined,nextWeek);
                 if(schedulesNextWeek === null){
                  const kqFromDB = await ScheduleGetDB.getSchedule(data.mssv.toString(),undefined,undefined,nextWeek);
                  socket.emit("send-schedule",kqFromDB);    
                 }else{
                  socket.emit("send-schedule",schedulesNextWeek); 
                 }
                 await getWeekSchedule(data.mssv.toString(),undefined,undefined,nextWeek);
                    break;     
                case "tuần trước":
                  sendWaiter();
                  const previousWeek =  getWeek(new Date()) - 1;
                  const schedulesPreviousWeek = await scheduleController.getScheduleSpecifyByCalendar(data.mssv.toString(),undefined,undefined,previousWeek);
                 if(schedulesPreviousWeek === null){
                  const kqFromDB = await ScheduleGetDB.getSchedule(data.mssv.toString(),undefined,undefined,previousWeek);
                  socket.emit("send-schedule",kqFromDB);    
                 }else{
                  socket.emit("send-schedule",schedulesPreviousWeek); 
                 }
                 await getWeekSchedule(data.mssv.toString(),undefined,undefined,previousWeek);
                        break;    
                case "hôm nay":
                  sendWaiter();
                  const schedule = await scheduleController.getScheduleSpecifyByCalendar(data.mssv.toString(),undefined,undefined,undefined);
                  if(schedule === null){
                    const kqFromDB = await ScheduleGetDB.getSchedule(data.mssv.toString(),undefined,undefined,undefined);
                    if(Array.isArray(kqFromDB)){                        
                      const result = getTodaySchedule(kqFromDB);  
                     socket.emit("send-schedule",result);
                       }else{
                         socket.emit("send-schedule",ERRORMESSAGE);
                       }
                   }else{
                    if(Array.isArray(schedule)){
                      const result = getTodaySchedule(schedule);          
                      socket.emit("send-schedule",result);
                    }else{
                      socket.emit("send-schedule",ERRORMESSAGE);
                    }   
                   } 
                   await getWeekSchedule(data.mssv.toString(),undefined,undefined,undefined);
                        break; 
                case "ngày mai":
                  sendWaiter();
                  if(scheduleController.hasTomorrowIsNextWeek()){
                    getWeek(new Date());        
                 const nextWeek =  getWeek(new Date()) +1;
                 const scheduleNextWeek = await scheduleController.getScheduleSpecifyByCalendar(data.mssv.toString(),undefined,undefined,nextWeek.toString());
                 if(scheduleNextWeek === null){
                  const kqFromDB = await ScheduleGetDB.getSchedule(data.mssv.toString(),undefined,undefined,nextWeek.toString());
                  if(Array.isArray(kqFromDB)){
                    const result =  scheduleController.getNextDaySchedule(kqFromDB,"Thứ 2");
                    socket.emit("send-schedule",result);
                  }else{
                    socket.emit("send-schedule",ERRORMESSAGE);
                  }  
                }else{
                  if(Array.isArray(scheduleNextWeek)){
                    const result =  scheduleController.getNextDaySchedule(scheduleNextWeek,"Thứ 2");
                    socket.emit("send-schedule",result);
                  }else{
                    socket.emit("send-schedule",ERRORMESSAGE);
                  }   
                }    
                await getWeekSchedule(data.mssv.toString(),undefined,undefined,nextWeek.toString());
                  }else{
                    const scheduleNextWeek = await scheduleController.getScheduleSpecifyByCalendar(data.mssv.toString(),undefined,undefined,undefined);
                    if(scheduleNextWeek === null){
                     const kqFromDB = await ScheduleGetDB.getSchedule(data.mssv.toString(),undefined,undefined,undefined);
                     if(Array.isArray(kqFromDB)){
                       const result =  scheduleController.getNextDaySchedule(kqFromDB,"Thứ 2");
                       socket.emit("send-schedule",result);
                     }else{
                       socket.emit("send-schedule",ERRORMESSAGE);
                     }  
                   }else{
                    if(Array.isArray(scheduleNextWeek)){
                      const result =  scheduleController.getNextDaySchedule(scheduleNextWeek,null);
                      socket.emit("send-schedule",result);
                    }else{
                      socket.emit("send-schedule",ERRORMESSAGE);
                    }
                   }   
                   await getWeekSchedule(data.mssv.toString(),undefined,undefined,undefined);                          
                  }
                        break; 
                case "hôm qua":
                    sendWaiter();
                    if(scheduleController.hasYesterdayIsPreviousWeek()){
                      const previousWeek =  getWeek(new Date()) - 1;
                      const schedulePreviousWeek = await scheduleController.getScheduleSpecifyByCalendar(data.mssv.toString(),undefined,undefined,previousWeek.toString());            
                       if(schedulePreviousWeek === null){
                        const kqFromDB = await ScheduleGetDB.getSchedule(data.mssv.toString(),undefined,undefined,previousWeek.toString());
                        if(Array.isArray(kqFromDB)){
                          const result =  scheduleController.getYesterDaySchedule(kqFromDB,"Thứ 2");
                        socket.emit("send-schedule",result);
                        }else{
                          socket.emit("send-schedule",ERRORMESSAGE);
                        }
                       }else{
                        if(Array.isArray(schedulePreviousWeek)){
                          const result =  scheduleController.getYesterDaySchedule(schedulePreviousWeek,"Thứ 2");
                        socket.emit("send-schedule",result);
                        }else{
                          socket.emit("send-schedule",ERRORMESSAGE);
                        }
                       }
                       await getWeekSchedule(data.mssv.toString(),undefined,undefined,previousWeek.toString()); 
                    }   
                    else{
                      const schedule = await scheduleController.getScheduleSpecifyByCalendar(data.mssv.toString(),undefined,undefined,undefined);            
                      if(schedule === null){
                        const kqFromDB = await ScheduleGetDB.getSchedule(data.mssv.toString(),undefined,undefined,undefined);
                        if(Array.isArray(kqFromDB)){
                          const result =  scheduleController.getYesterDaySchedule(kqFromDB);
                          socket.emit("send-schedule",result);
                        }else{
                          socket.emit("send-schedule",ERRORMESSAGE);
                        }  
                       }else{
                        if(Array.isArray(schedule)){
                          const result =  scheduleController.getYesterDaySchedule(schedule);
                          socket.emit("send-schedule",result);
                        }else{
                          socket.emit("send-schedule",ERRORMESSAGE);
                        }  
                       }
                       await getWeekSchedule(data.mssv.toString(),undefined,undefined,undefined); 
                    }
                         break;
                  case "ngày mốt":
                    sendWaiter();
                    const currentNoon = scheduleController.hasAfterTomorrowIsNextWeek();
                    if(currentNoon !== null){             
                      const nextWeek =  getWeek(new Date()) +1;
                      const scheduleNextWeek = await scheduleController.getScheduleSpecifyByCalendar(data.mssv.toString(),undefined,undefined,nextWeek.toString());               
                       if(scheduleNextWeek === null){
                        const kqFromDB = await ScheduleGetDB.getSchedule(data.mssv.toString(),undefined,undefined,nextWeek.toString());
                        if(Array.isArray(kqFromDB)){            
                          const result =  scheduleController.getAfterTomorrowSchedule(kqFromDB,currentNoon);
                          socket.emit("send-schedule",result);
                          }else{
                            socket.emit("send-schedule",ERRORMESSAGE);
                          }  
                      }else{
                        if(Array.isArray(scheduleNextWeek)){            
                          const result =  scheduleController.getAfterTomorrowSchedule(scheduleNextWeek,currentNoon);
                          socket.emit("send-schedule",result);
                          }else{
                            socket.emit("send-schedule",ERRORMESSAGE);
                          }    
                      }
                      await getWeekSchedule(data.mssv.toString(),undefined,undefined,nextWeek.toString());          
                    }else{
                      const schedule = await scheduleController.getScheduleSpecifyByCalendar(data.mssv.toString(),undefined,undefined,undefined);               
                      if(schedule === null){
                        const kqFromDB = await ScheduleGetDB.getSchedule(data.mssv.toString(),undefined,undefined,undefined);
                        if(Array.isArray(kqFromDB)){            
                          const result =  scheduleController.getAfterTomorrowSchedule(kqFromDB);
                          socket.emit("send-schedule",result);
                          }else{
                            socket.emit("send-schedule",ERRORMESSAGE);
                          } 
                      }else{
                        if(Array.isArray(schedule)){            
                          const result =  scheduleController.getAfterTomorrowSchedule(schedule);
                          socket.emit("send-schedule",result);
                          }else{
                            socket.emit("send-schedule",ERRORMESSAGE);
                          }  
                      }
                      await getWeekSchedule(data.mssv.toString(),undefined,undefined,undefined); 
                    }
                       break;      
                  case "hôm kia":
                    sendWaiter();
                    const currentDate = scheduleController.hasBeforeYesterDayIsPreviousWeek();
                    if(currentDate !== null){                   
                      const previousWeek =  getWeek(new Date()) - 1;

                      const schedulePreviousWeek = await scheduleController.getScheduleSpecifyByCalendar(data.mssv.toString(),undefined,undefined,previousWeek.toString());               
                      if(schedulePreviousWeek === null){
                        const kqFromDB = await ScheduleGetDB.getSchedule(data.mssv.toString(),undefined,undefined,previousWeek.toString());
                        if(Array.isArray(kqFromDB)){                        
                          const result =  scheduleController.getBeforeYesterDaySchedule(kqFromDB,currentDate);
                          socket.emit("send-schedule",result);
                            }else{
                              socket.emit("send-schedule",ERRORMESSAGE);
                            }  
                      
                      }else{
                        if(Array.isArray(schedulePreviousWeek)){                        
                          const result =  scheduleController.getBeforeYesterDaySchedule(schedulePreviousWeek,currentDate);
                          socket.emit("send-schedule",result);
                            }else{
                              socket.emit("send-schedule",ERRORMESSAGE);
                            }  
                      }
                      await getWeekSchedule(data.mssv.toString(),undefined,undefined,previousWeek.toString()); 
                    }else{
                      const schedule = await scheduleController.getScheduleSpecifyByCalendar(data.mssv.toString(),undefined,undefined,undefined);               
                          if(schedule === null){
                            const kqFromDB = await ScheduleGetDB.getSchedule(data.mssv.toString(),undefined,undefined,undefined);
                            if(Array.isArray(kqFromDB)){                        
                              const result =  scheduleController.getBeforeYesterDaySchedule(kqFromDB);
                              socket.emit("send-schedule",result);
                                }else{
                                  socket.emit("send-schedule",ERRORMESSAGE);
                                } 
                          }else{
                            if(Array.isArray(schedule)){                        
                              const result =  scheduleController.getBeforeYesterDaySchedule(schedule);
                              socket.emit("send-schedule",result);
                                }else{
                                  socket.emit("send-schedule",ERRORMESSAGE);
                                } 
                          }
                          await getWeekSchedule(data.mssv.toString(),undefined,undefined,undefined);               
                    }
                    break;
                  case "thứ trong tuần":
                    sendWaiter();
                    const date = scheduleController.getScheduleByDate(kq.utterance);
                   if(date !== "error"){
                    const scheduleNow = await scheduleController.getScheduleSpecifyByCalendar(data.mssv.toString(),undefined,undefined,undefined);
                    if(scheduleNow === null){
                     const kqFromDB = await ScheduleGetDB.getSchedule(data.mssv.toString(),undefined,undefined,undefined);
                     if(Array.isArray(kqFromDB)){                        
                      const scheduleByDateNow = getTodaySchedule(kqFromDB,date);        
                      socket.emit("send-schedule",scheduleByDateNow);
                        }else{
                          socket.emit("send-schedule",ERRORMESSAGE);
                        }
                    }else{
                      if(Array.isArray(scheduleNow)){                        
                        const scheduleByDateNow = getTodaySchedule(scheduleNow,date);        
                        socket.emit("send-schedule",scheduleByDateNow);
                          }else{
                            socket.emit("send-schedule",ERRORMESSAGE);
                          }  
                    }        
                    await getWeekSchedule(data.mssv.toString(),undefined,undefined,undefined);   
                   }else{
                    socket.emit("send-schedule","Xin lỗi, tôi không hiểu ý bạn!");
                   }
                 
                    break;      
                  case "thứ tuần sau":
                    sendWaiter();
                      const dateNextWeek = scheduleController.getScheduleByDate(kq.utterance);
                     if(dateNextWeek === "error"){
                      socket.emit("send-schedule","Xin lỗi, tôi không hiểu ý bạn!");
                     }else{
                      const nextWeek =  getWeek(new Date()) +1;
                      const scheduleNextWeek = await scheduleController.getScheduleSpecifyByCalendar(data.mssv.toString(),undefined,undefined,nextWeek.toString());
                      if(scheduleNextWeek === null){
                        const kqFromDB = await ScheduleGetDB.getSchedule(data.mssv.toString(),undefined,undefined,nextWeek.toString());
                        if(Array.isArray(kqFromDB)){                                 
                          const scheduleByDateNextWeek = getTodaySchedule(kqFromDB,dateNextWeek);        
                          socket.emit("send-schedule",scheduleByDateNextWeek);       
                            }else{
                              socket.emit("send-schedule",ERRORMESSAGE);
                            } 
                      }else{
                        if(Array.isArray(scheduleNextWeek)){                                 
                          const scheduleByDateNextWeek = getTodaySchedule(scheduleNextWeek,dateNextWeek);        
                          socket.emit("send-schedule",scheduleByDateNextWeek);       
                            }else{
                              socket.emit("send-schedule",ERRORMESSAGE);
                            }  
                      }
                      await getWeekSchedule(data.mssv.toString(),undefined,undefined,nextWeek.toString());         
                     }
                    
                      break;
                  case "thứ tuần trước":
                    sendWaiter();
                    const datePreviousWeek = scheduleController.getScheduleByDate(kq.utterance);
                   if(datePreviousWeek === "error"){
                    socket.emit("send-schedule","Xin lỗi, tôi không hiểu ý bạn!");
                   }else{
                    const previousWeekByDate =  getWeek(new Date()) - 1;
                    const schedulePreviousWeekByDate = await scheduleController.getScheduleSpecifyByCalendar(data.mssv.toString(),undefined,undefined,previousWeekByDate.toString());
                    if(schedulePreviousWeekByDate === null){
                      const kqFromDB = await ScheduleGetDB.getSchedule(data.mssv.toString(),undefined,undefined,previousWeekByDate.toString());
                      if(Array.isArray(kqFromDB)){                                 
                        const scheduleByDatePreviousWeek = getTodaySchedule(kqFromDB,datePreviousWeek);        
                        socket.emit("send-schedule",scheduleByDatePreviousWeek);            
                          }else{
                            socket.emit("send-schedule",ERRORMESSAGE);
                          }                          
                    }else{
                      if(Array.isArray(schedulePreviousWeekByDate)){                                 
                        const scheduleByDatePreviousWeek = getTodaySchedule(schedulePreviousWeekByDate,datePreviousWeek);        
                        socket.emit("send-schedule",scheduleByDatePreviousWeek);            
                          }else{
                            socket.emit("send-schedule",ERRORMESSAGE);
                          }  
                    }
                    await getWeekSchedule(data.mssv.toString(),undefined,undefined,previousWeekByDate.toString());
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
       }
     
  });
  });
module.exports = server;