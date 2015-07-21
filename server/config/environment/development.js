'use strict';

// Development specific configuration
// ==================================
module.exports = {
  ip: '0.0.0.0',
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/epgame-dev'
  },

  seedDB: true
};
