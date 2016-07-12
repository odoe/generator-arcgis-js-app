define(function(require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');
  var td = require('testdouble');

  var MapView = require('esri/views/MapView');

  var addWidgets = require('app/components/widgets').addWidgets;

  var view;
  var node = document.createElement('div');
  document.body.appendChild(node);

  registerSuite({
    name: 'components/widgets',
    setup: function() {
      view = new MapView({
        container: node
      });

    },
    beforeEach: function() {
    },
    afterEach: function() {
    },
    teardown: function() {
      // destroy widget
      if (view && view.destroy) {
        view.destroy();
      }
      td.reset();
    },
    'View will add widgets': function() {
      view.ui.add = td.function();
      addWidgets(view);
      td.verify(view.ui.add(td.matchers.anything(), td.matchers.anything()))
    }
  });
});
