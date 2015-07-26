define(function(require) {
  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var Model = require('app/models/model<%=_.dasherize(name)%>');

  var model;

  registerSuite({
    name: 'models: model<%=_.dasherize(name)%>',
    setup: function() {
      // set up test here
    },
    beforeEach: function() {
      // run before
    },
    afterEach: function() {
      // run after
    },
    teardown: function() {
      // destroy widget
    },
    'Model is valid': function() {
      expect(Model).to.not.be.undefined;
    }
  });
});
