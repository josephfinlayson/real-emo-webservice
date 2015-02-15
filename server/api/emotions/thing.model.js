'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  emotion: Object,
  timestampBegin: Date,
  timestampEnd: Date,
  duration: Number,
  userID: String
});

module.exports = mongoose.model('Thing', ThingSchema);
