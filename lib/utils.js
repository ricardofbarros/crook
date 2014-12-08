var utils = {};

/**
* Queue hooks to Crooked function
* @param  {object} self Crook prototype object
* @param  {string} name Method (bribe or extortion) name
* @return {function}
*/
utils.queueMethods = function(name) {
  return function() {
    this.__queue.push({
      method: this.__methods[name],
      scope: this.__self,
      args: arguments
    });

    return this;
  };
};


/**
 * Clone methods, transform them to hooks
 * @param  {object} self Crook prototype object
 * @param  {object} methods Methods object
 * @return {object} Returns bribes or/and extortions
 */
utils.methodsBuilder = function(methods) {
  var methods = methods || '';

  // Cache prototype toString
  var string = Object.prototype.toString;

  // Private method
  //
  // Clones methods
  function extortion(extortions) {
    if(!extortions) {
      return false;
    }

    var ext = {};

    for (var method in extortions) {
      if (extortions.hasOwnProperty(method) && string.call(extortions[method]) === '[object Function]') {
        // Bind self to extortions methods
        // giving it the scope of the crooked object
        ext[method] = extortions[method];
      }
    }

    return ext;
  }

  methods = extortion(methods);

  if(methods) {
    return methods;
  } else {
    // Throw variable for better debuging
    var err = new Error('You didn\'t give Crook any Methods');
    throw err;
  }
};


/**
* Queue machine to run methods synchronously
* @param {[type]} queue [description]
*/
utils.queueMachine = function() {
  var self = this;
  process.nextTick(function() {
    if(self.__queue) {
      // Clone queue from object
      var queue = self.__queue.slice(0);

      // Clean it
      self.__queue = [];

      // Run the queues
      utils.__each(queue,
      function(fn, done) {
        if(fn) {
          fn.method.apply(fn.scope, fn.args.length > 0 ? [fn.args].concat(done) : [done]);
        } else {
          done();
        }
      },
      function(err) {
        if(err) {
          throw err;
        }
      });
    }
  });
};


/**
 * Copy of async.eachSeries method with some modifications
 * @param  {array}    arr      [description]
 * @param  {function} iterator [description]
 * @param  {function} callback [description]
 */
utils.__each = function(arr, iterator, callback) {
  var completed = 0;
  try {
    var iterate = function() {
      iterator(arr[completed], function () {
        completed += 1;
        if (completed >= arr.length) {
          callback();
        }
        else {
          iterate();
        }
      });
    };

    // Call it
    iterate();
  } catch(e) {
    callback(e);
  }
};


// cache Object.prototype.toString
utils.__type = Object.prototype.toString;


/**
 * Get type of object that called crook
 * it can be a function (prototype) or an object
 * @param {[type]} obj [description]
 */
utils.getType = function(obj) {
  if(this.__type.call(obj) === '[object Object]') {
    return 'object';
  } else if(this.__type.call(obj) === '[object Function]') {
    return 'function';
  } else {
    var err = new Error('The argument passed to Crook need to be an object or a function');
    throw err;
  }
};


/**
 * Generic constructor
 * @param  {function} proto object-function with prototype properties or/and methods
 * @param  {array} args  Arguments to apply to that object-function
 * @return {instance}     New instance of proto with the args array as arguments
 */
utils.constructor = function(proto, args) {
  function F() {
    return proto.apply(this, args);
  }
  F.prototype = proto.prototype;
  return new F();
};


module.exports = utils;
