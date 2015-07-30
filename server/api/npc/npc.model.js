'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NpcSchema = new Schema({
  name: String,
  info: String,
  active: { type: Boolean, default: true },
  imagePath: String,
  comments: [{
    userId: { type: Schema.Types.ObjectId, ref: 'UserSchema' },
    text: String,
    creation: { type: Date, default: Date.now },
    active: { type: Boolean, default: false }
  }]
});

module.exports = mongoose.model('Npc', NpcSchema);