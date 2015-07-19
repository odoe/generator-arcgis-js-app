define(function(require) {
  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var chai = require('intern/chai!');
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');
  var helper = require('app/helpers/mapgenerator');
  var arcgisUtils = require('esri/arcgis/utils');

  chai.use(sinonChai);

  var spy;

  registerSuite({
    name: 'helpers: mapgenerator',
    setup: function() {
      // set up test here
    },
    beforeEach: function() {
      // run before
      sinon.stub(arcgisUtils, 'createMap').returns({
        then: function(){}
      });
    },
    afterEach: function() {
      // run after
      arcgisUtils.createMap.restore();
    },
    teardown: function() {
      // destroy widget
    },
    'helper attempts to create map': function() {
      var params = { id: 'test', webmapid: '1234' };
      helper.fromWebMapAsJSON(params);
      expect(arcgisUtils.createMap).to.have.been.calledOnce;
    },
  });
});
