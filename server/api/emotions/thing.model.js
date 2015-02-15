'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  emotion: Object,
  timestampBegin: String,
  timestampEnd: String
});

module.exports = mongoose.model('Thing', ThingSchema);
