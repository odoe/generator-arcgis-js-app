define(function(require) {
  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var View = require('app/components/map/MapView');
  var topic = require('dojo/topic');

  var mapView;

  registerSuite({
    name: 'components: MapView',
    setup: function() {
      // set up test here
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
    },
    'Component is valid': function() {
      expect(View).to.not.be.undefined;
    },
    'View publishes a valid map': function() {
      mapView = new View({
        center: [-118, 34],
        basemap: 'topo',
        zoom: 10
      });
      expect(mapView.map).to.not.be.undefined;
    }
  });
});
