// Dependencies
var utils = require('../../utils');
var Crook = require('./prototype');

function ClassMock() {
  // Transform arguments in an array and take out the first argument
  // the first argument is the instance to be mock
  var args = Array.prototype.slice.call(arguments);
  var instance = args.shift();

  return new Crook(utils.constructor(instance, args));
}

module.exports = ClassMock;
