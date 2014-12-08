// Dependency
var utils = require('../../utils');

function Crook(self, queue) {
  // Store scope of crooked object
  // Same scope as methods
  this.__self = this.__methods = self;

  // Queue methods
  this.__queue = queue || [];

  for (var method in self) {
    if (!self.hasOwnProperty(method)) {
      //console.log('Properties from Person ->', method);
      this[method] = utils.queueMethods.call(null, method);
    }
  }

  // Process all methods called
  utils.queueMachine.call(this);
}

module.exports = Crook;
