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
      console.log(data);
      const kq =  await nlp.process('vi',data);

      switch(kq.answer){
              case "trong tuần": 
              getWeekSchedule("1812866",undefined,undefined,undefined).then(result =>{
                console.log(result);
                socket.emit("send-schedule",result);
             
              });
                  break;
              case "tuần tới":
                getWeek(new Date());
                const nextWeek = parseInt(week) +1;
                getWeekSchedule("1812866",undefined,undefined,nextWeek.toString()).then(result =>{
                  console.log(result);
                  socket.emit("send-schedule",result);
               
                });
                  break;     
                  case "tuần trước":
                    getWeek(new Date());
                    const previousWeek = parseInt(week) - 1;
                    getWeekSchedule("1812866",undefined,undefined,previousWeek.toString()).then(result =>{
                      console.log(result);
                      socket.emit("send-schedule",result);
                   
                    });
                      break;    
            default:
              socket.emit("send-schedule","ko có kq");
              break;

       }
  });
  });
module.exports = server;