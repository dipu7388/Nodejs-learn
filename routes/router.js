'use strict';
var express = require('express');
module.exports = function(app) {
const bookController = require('../controllers/booksController')
var apiRoutes =  express.Router();
app.get('/',function(req,res){
    res.send('We are happy to see you using Chat Bot Webhook');
  });
}