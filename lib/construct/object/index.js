// Dependecies
var Crook = require('./prototype');
var utils = require('../../utils');

module.exports = function(methods) {
  methods = utils.methodsBuilder(methods);
  Crook.prototype.__methods = methods;

  for (var method in methods) {
    if (methods.hasOwnProperty(method)) {
      Crook.prototype[method] = utils.queueMethods.call(null, method);
    }
  }

  return Crook;
};
