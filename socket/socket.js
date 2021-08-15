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
  

io.on("connection", socket => {
  
    // either with send()
    console.log(`connect success ${socket.id}`);
    socket.on("scheduleWeek", async (data) => {
    console.log(data);
    //   const kq =  await nlp.process('vi',data);
     //console.log(kq);
        getWeekSchedule("1812866","2019-2020","HK02","12").then(result =>{
       console.log(result);
       socket.emit("send-schedule",result);
  });
  });
   
  });

module.exports = server;