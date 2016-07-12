define(function(require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');
  var td = require('testdouble');
  
  var MapView = require('esri/views/MapView');

  var webmap = require('app/components/webmap').default;

  var node = document.createElement('div');
  document.body.appendChild(node);
  var view;
  var then;
  var t = MapView.prototype.then;
  registerSuite({
    name: 'components/webmap',
    setup: function() {
      then = td.function();
      MapView.prototype.then = then;
    },
    beforeEach: function() {
    },
    afterEach: function() {
    },
    teardown: function() {
      td.reset();
      MapView.prototype.then = t;
    },
    'Will create a MapView': function() {
      var options = {
        params: {},
        node: node
      };
      webmap.create(options);
      td.verify(MapView.prototype.then(td.matchers.anything()));
    },
    'Adds MapView to DOM': function() {
      var options = {
        params: {},
        node: node
      };
      webmap.create(options);
      var elem = document.querySelector('.view-div');
      assert.isOk(elem);
    }
  });
});
