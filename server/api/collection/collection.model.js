'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CollectionSchema = new Schema({
  name: String,
  author: String
});

module.exports = mongoose.model('Collection', CollectionSchema);