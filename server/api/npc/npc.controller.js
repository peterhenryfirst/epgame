'use strict';

var _ = require('lodash');
var Npc = require('./npc.model');

// Get list of npcs
exports.index = function(req, res) {
  Npc.find(function (err, npcs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(npcs);
  });
};

// Get a single npc
exports.show = function(req, res) {
  Npc.findById(req.params.id, function (err, npc) {
    if(err) { return handleError(res, err); }
    if(!npc) { return res.status(404).send('Not Found'); }
    return res.json(npc);
  });
};

// Creates a new npc in the DB.
exports.create = function(req, res) {
  Npc.create(req.body, function(err, npc) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(npc);
  });
};

// Updates an existing npc in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Npc.findById(req.params.id, function (err, npc) {
    if (err) { return handleError(res, err); }
    if(!npc) { return res.status(404).send('Not Found'); }
    var updated = _.merge(npc, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(npc);
    });
  });
};

// Deletes a npc from the DB.
exports.destroy = function(req, res) {
  Npc.findById(req.params.id, function (err, npc) {
    if(err) { return handleError(res, err); }
    if(!npc) { return res.status(404).send('Not Found'); }
    npc.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}