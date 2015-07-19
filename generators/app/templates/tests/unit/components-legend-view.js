define(function(require) {
  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var chai = require('intern/chai!');
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');
  var View = require('app/components/legend/View');
  var topic = require('dojo/topic');

  chai.use(sinonChai);

  var view;
  var spy;

  registerSuite({
    name: 'components: Legend',
    setup: function() {
      // set up test here
    },
    beforeEach: function() {
      // run before
      sinon.stub(View.prototype, 'onMapReady');
      sinon.stub(View.prototype, 'onMapChange');
      view = new View();
    },
    afterEach: function() {
      // run after
      View.prototype.onMapReady.restore();
      View.prototype.onMapChange.restore();
      if (view && view.destroy) {
        view.destroy();
      }
    },
    teardown: function() {
      // destroy widget
    },
    'Component is valid': function() {
      expect(View).to.not.be.undefined;
    },
    'View creates legend when map is ready': function() {
      var dfd = this.async(5000);
      topic.subscribe('map-ready', dfd.callback(function(data) {
        expect(view.onMapReady).to.have.been.called;
      }));
      topic.publish('map-ready', {map:{}});
    },
    'View updates legend when map is changed': function() {
      var dfd = this.async(5000);
      var map = { id:'map' };
      topic.subscribe('map-change', dfd.callback(function(data) {
          expect(view.onMapChange).to.have.been.called;
      }));
      topic.subscribe('map-ready', function() {
        topic.publish('map-change', map);
      });
      topic.publish('map-ready', {});
    }
  });
});
