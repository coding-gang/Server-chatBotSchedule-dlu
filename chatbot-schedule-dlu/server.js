require("dotenv").config();
const mongoose = require('mongoose');

const server = require('./socket/socket');

const port = process.env.PORT || 8000

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
  console.log(`Server running at http://localhost:${port}/`);
});