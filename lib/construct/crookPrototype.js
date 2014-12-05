// Dependency
var utils = require('../utils');

function Crook(self, queue, instance) {
  var $this = this;

  // Store scope of crooked object
  $this.__self = self;

  // Queue methods
  $this.__queue = queue || [];

  $this.__instance = (function(obj) {
    if(typeof obj === 'object') {
      return utils.contructor(obj.instance, obj.args);
    } else {
      return false;
    }
  })(instance);

  if($this.__instance) {
    $this.__type = 'instance';
  } else {
    $this.__type = 'methods';
  }

  // Process all methods called
  process.nextTick(function() {
    if($this.__queue) {
      // Clone queue from object
      var queue = $this.__queue.slice(0);

      // Clean it
      $this.__queue = [];

      // Run the queues
      utils.each(queue,
      function(fn, done) {
        if(fn) {
          fn.method.apply(fn.scope, fn.args.length > 0 ? [fn.args].concat(done) : [done]);
        } else {
          done();
        }
      },
      function() {});
    }
  });
}

module.exports = Crook;
