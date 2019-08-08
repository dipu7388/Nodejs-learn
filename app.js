const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
// const db = mongoose.connect('mongodb://localhost/bookAPI');
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl);
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const Dialog = require('./models/dialogModel');
const bookRouter = require('./routes/bookRouter')(Book);
const dialogRouter = require('./routes/dialogRouter')(Dialog);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./routes/router'); //importing route
// routes(app);
app.use('/api', bookRouter);
app.use('/apid', dialogRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
