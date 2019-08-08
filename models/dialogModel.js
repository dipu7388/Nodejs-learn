const mongoose = require('mongoose');

const { Schema } = mongoose;

const dialogModel = new Schema(
  {
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false },
    displayText: { type: String },
    speech: { type: String }
  }
);

module.exports = mongoose.model('Dialog', dialogModel);
