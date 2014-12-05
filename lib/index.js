// Dependecies
var utils = require('./utils');

module.exports = function(crook) {
  var Crook;
  if(utils.getType(crook) === 'function') {
    Crook = require('./construct/function')(crook);
  } else {
    Crook = require('./construct/object')(crook);
  }
  return Crook;
};
