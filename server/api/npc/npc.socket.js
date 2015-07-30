/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Npc = require('./npc.model');

exports.register = function(socket) {
  Npc.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Npc.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('npc:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('npc:remove', doc);
}