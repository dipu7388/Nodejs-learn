const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const cors =require('cors')

const app = express();
// const db = mongoose.connect('mongodb://localhost/bookAPI');
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
process.env.DEBUG = 'dialogflow:debug';
// mongoose.connect(config.dbUrl);
const port = process.env.PORT || 3000;
let hostAvl=false;
if(process.env && process.env.HOST && process.env.HOST.trim()==''){
    hostAvl=true;
}
const host = process.env.HOST || 'localhost';
if(process.argv.length < 4){
 console.warn(" throw Error('Please enter deployment ip:port as well as deployment url')");
}
var url = process.argv[2] || '127.0.0.1:8080'
process.env.url = url
var parts = url.split(':')
const Book = require('./models/bookModel');
const Dialog = require('./models/dialogModel');
const bookRouter = require('./routes/bookRouter')(Book);
const dialogRouter = require('./routes/dialogRouter')(Dialog);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var routes = require('./routes/router'); //importing route
// routes(app);
// app.use('/api', bookRouter);
app.use('/api', dialogRouter);


app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});


if(process.argv.length < 4){
  if(hostAvl){
    app.listen(port, host, () => {
    console.log(`Running on port ${host+':'+port}`);
  });
  }else{
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    }
    )
  }
}else{
  app.listen(+parts[1], parts[0], () => {
    console.log(`Running on port ${host+':'+port}`);
  });
}
// app.listen(port, host, () => {
//   console.log(`Running on port ${host+':'+port}`);
// });
