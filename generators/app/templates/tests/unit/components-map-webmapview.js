define(function(require) {
  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var View = require('app/components/map/WebMapView');
  var topic = require('dojo/topic');
  var config = require('app/config');
  var utils = require('esri/arcgis/utils');
  var chai = require('intern/chai!');
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');

  chai.use(sinonChai);

  var mapView;

  registerSuite({
    name: 'components: WebMapView',
    setup: function() {
      // set up test here
      sinon.stub(utils, 'createMap').returns({
        then: function(){}
      });
    },
    beforeEach: function() {
      // run before
    },
    afterEach: function() {
      // run after
      if (mapView && mapView.destroy) {
        mapView.destroy();
      }
    },
    teardown: function() {
      // destroy widget
      utils.createMap.restore();
    },
    'Component is valid': function() {
      expect(View).to.not.be.undefined;
    },
    'View publishes a valid map given a webmapid': function() {
      mapView = new View({
        webmapid: config.webmap.webmapid
      });
      expect(mapView.webmapid).to.equal(config.webmap.webmapid);
    }
  });
});
