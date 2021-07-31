const app = require('../app');
const server = require('http').Server(app);
const io = require('socket.io')(server);


io.on("connection", socket => {
  
    // either with send()
    console.log(`connect success${socket.id}`);
  socket.on("hi", (data) => {
        console.log(data);
    });
    // // or with emit() and custom event names
    // socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));
  
    // // handle the event sent with socket.send()
    // socket.on("message", (data) => {
    //     console.log(data);
    // });
  
    // // handle the event sent with socket.emit()
    
  });

module.exports = server;