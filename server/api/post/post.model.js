'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  image: String,
  description: String,
  postCollection: String,
  author: String,
  authorid: String,
  date: String,
  likes: Number
});

module.exports = mongoose.model('Post', PostSchema);