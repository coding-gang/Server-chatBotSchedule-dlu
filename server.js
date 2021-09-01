require("dotenv").config();
const mongoose = require('mongoose');
const server = require('./socket/socket');
const port = process.env.PORT || 9000;

const stringConnect = process.env.URI.replace("{DB_PASSWORD}",process.env.DB_PASSWORD);
mongoose.connect(stringConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => console.log('db connect success'));
 const db = mongoose.connection;


db.on('error', err => {
    console.log('ERROR:');
    if (err.message === 'Authentication failed.')
      console.log('error connection string');
    else {
      console.log('Unspecified error: ' + err.message);
    }
    process.exit(1);
  
  });

server.listen( port, () => {
  const str ="-Môn: Phương pháp nghiên cứu ngôn ngữ (Research Methods) (NN4220D)"
"-Nhóm: 01"+
"-Lớp: AVK42A, AVK42B, AVK42C, AVK42D, AVK42E, AVK42SP"+
"-Tiết: 1->4"+
"-Phòng: Online_001"+
"-GV: Phan Cảnh Minh Thy"+
"-Đã học: 8/45 tiết";

console.log(str.replace("-Môn:","rin"));
  console.log(`Server running at http://localhost:${port}`);
});


  
  


