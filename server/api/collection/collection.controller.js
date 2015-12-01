'use strict';

var _ = require('lodash');
var Collection = require('./collection.model');

// Get list of collections
exports.index = function(req, res) {
  Collection.find(function (err, collections) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(collections);
  });
};

// Get a single collection
exports.show = function(req, res) {
  Collection.findById(req.params.id, function (err, collection) {
    if(err) { return handleError(res, err); }
    if(!collection) { return res.status(404).send('Not Found'); }
    return res.json(collection);
  });
};

// Creates a new collection in the DB.
exports.create = function(req, res) {
  Collection.create(req.body, function(err, collection) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(collection);
  });
};

// Updates an existing collection in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Collection.findById(req.params.id, function (err, collection) {
    if (err) { return handleError(res, err); }
    if(!collection) { return res.status(404).send('Not Found'); }
    var updated = _.merge(collection, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(collection);
    });
  });
};

// Deletes a collection from the DB.
exports.destroy = function(req, res) {
  Collection.findById(req.params.id, function (err, collection) {
    if(err) { return handleError(res, err); }
    if(!collection) { return res.status(404).send('Not Found'); }
    collection.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}