const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1:27017' 
const dbURI = `mongodb://${host}/travlr`;   
//const dbURI = "mongodb://0.0.0.0:27017/travlr"; 
const readLine = require ('readline');


// avoid depreciation server warning
mongoose.set('useUnifiedTopology', true);
  const connect = ()=>{
      setTimeout(() => mongoose.connect(dbURI, {
          useNewUrlParser: true, 
          useCreateIndex: true
      }), 1000);  
  }         
mongoose.connection.on('connected', () => {                 2
  console.log(`Mongoose connected to ${dbURI}`);            2
});                                                         2
mongoose.connection.on('error', err => {                    2
  console.log(`Mongoose connection error: ${err}`);         2
});                                                         2
mongoose.connection.on('disconnected', () => {              2
  console.log('Mongoose disconnected');                     2
}); 
if (process.platform === 'win32'){
  const rl = readLine.createInterface ({
    input: process.stdin,
    output: process.stdout
  });
  rl.on ('SIGINT', () => {
    process.emit ("SIGINT");
  });
}                                                       2
const gracefulShutdown = (msg, callback) => {               3
  mongoose.connection.close( () => {                        3
    console.log(`Mongoose disconnected through ${msg}`);    3
    callback();                                             3
  });                                                       3
};                                                          3
// For nodemon restarts                                     4
process.once('SIGUSR2', () => {                             4
  gracefulShutdown('nodemon restart', () => {               4
    process.kill(process.pid, 'SIGUSR2');                   4
  });                                                       4
});                                                         4
// For app termination                                      4
process.on('SIGINT', () => {                                4
  gracefulShutdown('app termination', () => {               4
    process.exit(0);                                        4
  });                                                       4
});                                                         4
// For Heroku app termination                               4
process.on('SIGTERM', () => {                               4
  gracefulShutdown('Heroku app shutdown', () => {           4
    process.exit(0);                                        4
  });                                                       4
}); 
connect();
require('./models/travlr');