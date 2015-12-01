'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CollectionSchema = new Schema({
  name: {type: String, lowercase: true},
  author: String
});

module.exports = mongoose.model('Collection', CollectionSchema);