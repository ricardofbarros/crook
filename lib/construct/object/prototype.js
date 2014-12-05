// Dependency
var utils = require('../../utils');

function Crook(self, queue) {
  // Store scope of crooked object
  this.__self = self;

  // Queue methods
  this.__queue = queue || [];

  // Process all methods called
  utils.queueMachine.call(this);
}

module.exports = Crook;
