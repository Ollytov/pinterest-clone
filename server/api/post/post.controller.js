'use strict';

var _ = require('lodash');
var Post = require('./post.model');
var moment = require('moment');

// Get list of posts
exports.index = function(req, res) {
  Post.find(function (err, posts) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(posts);
  });
};

// exports.getPosts = function(req, res) {
//   console.log(req.body);
//   return res.status(200).json();
// }

// Get a single post
exports.show = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    return res.json(post);
  });
};

// Creates a new post in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  var newPost = new Post({
    title: req.body.postTitle,
    image: req.body.postImage,
    description: req.body.postDescription,
    postCollection: req.body.postCollection.name,
    author: req.body.author,
    authorid: req.body.authorid,
    date: moment(Date.now()).format('MMMM Do YYYY'),
    likes: 0
  });

  newPost.save(function(err, post) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(post);
  });


  // Post.create(req.body, function(err, post) {
  //   if(err) { return handleError(res, err); }
  //   return res.status(201).json(post);
  // });
};

// Updates an existing post in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Post.findById(req.params.id, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    var updated = _.merge(post, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(post);
    });
  });
};

// Deletes a post from the DB.
exports.destroy = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    post.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}