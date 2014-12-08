// Dependecies
var ClassMock = require('./mock');

module.exports = function(fn) {
  return ClassMock.bind(null, fn);
};
