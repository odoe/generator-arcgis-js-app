define(function(require) {
  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var chai = require('intern/chai!');
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');
  // var helper = require('app/helpers/zoom');

  chai.use(sinonChai);

  var map = {
    centerAndZoom: function() {},
    centerAt: function() {},
    setExtent: function() {},
    getMaxZoom: function(){ return 10; }
  };

  var geometry = {
    getExtent: function(){}
  };

  registerSuite({
    name: 'helpers: zoom',
    setup: function() {
      // set up test here
      sinon.spy(map, 'setExtent');
      sinon.spy(map, 'centerAndZoom');
      sinon.spy(map, 'centerAt');
      sinon.spy(map, 'getMaxZoom');
      sinon.spy(geometry, 'getExtent');
    },
    beforeEach: function() {
      // run before
    },
    afterEach: function() {
      // run after
    },
    teardown: function() {
      // destroy widget
      map.setExtent.restore();
      map.centerAndZoom.restore();
      map.centerAt.restore();
      map.getMaxZoom.restore();
      geometry.getExtent.restore();
    },
    'helper sets map extent to geometry extent': function() {
      this.skip('wait until dojo 1.11 to make curry AMD');
      var zm = helper(map);
      zm(geometry);
      expect(map.setExtent).to.have.been.calledOnce;
      expect(geometry.getExtent).to.have.been.calledOnce;
    },
  });
});
