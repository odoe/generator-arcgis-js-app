define(function(require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');
  var td = require('testdouble');

  var Deferred = require('dojo/Deferred');
  var store = require('app/stores/app').default;
  var allItems = store.getAllItems;
  var addToUI = store.addToUI;
  var zoomTo = store.zoomToItem;

  registerSuite({
    name: 'stores/app',
    setup: function() {
    },
    beforeEach: function() {
    },
    afterEach: function() {
    },
    teardown: function() {
      td.reset();
      store.getAllItems = allItems;
      store.addToUI = addToUI;
      store.zoomToItem = zoomTo;
    },
    'Store will watch for property changes': function() {
      var dfd = this.async(1000);
      var view = { center: [0,0] }
      var map = { basemap: 'streets' };
      store.watch('webmap, view', dfd.callback(function() {
        assert.isOk(true);
      }));
      store.set(
        {
          view: view,
          webmap: map
        }
      );
    },
    'getAllItems - returns all items from a layer': function() {
      var dfd = this.async(1000);
      var def = new Deferred();
      var def2 = new Deferred();
      var fSet = {
        objectIdFieldName: 'oid',
        features: [
          {
            attributes: { oid: 1, name: 'Bob' }
          },
          {
            attributes: { oid: 2, name: 'Sally' }
          }
        ]
      };
      var lyr = {
        queryFeatures: td.function()
      };
      store.webmap.findLayerById = td.function();
      td.when(store.webmap.findLayerById('tri')).thenReturn(def.resolve(lyr));
      td.when(lyr.queryFeatures(td.matchers.anything())).thenReturn(def2.resolve(fSet));
      store.getAllItems('tri').then(dfd.callback(function(mem) {
        td.verify(store.webmap.findLayerById('tri'));
        td.verify(lyr.queryFeatures(store.query));
        assert.equal(store.map.get('tri'), fSet);
        assert.equal(mem.idProperty, fSet.objectIdFieldName);
        assert.equal(mem.data.length, 2);
      }));
    },
    'getAllItems - returns data from a Map if available': function() {
      var fSet = {
        objectIdFieldName: 'oid',
        features: [
          {
            attributes: { oid: 1, name: 'Bob' }
          },
          {
            attributes: { oid: 2, name: 'Sally' }
          }
        ]
      };
      store.map.set('tri', fSet);
      var memory = store.getAllItems('tri');
      assert.isOk(memory);
      assert.equal(memory.idProperty, fSet.objectIdFieldName);
      assert.equal(memory.data.length, 2);
    },
    'addToUI - will add elements to View UI': function() {
      store.view.ui.add = td.function();
      var params = { elem: 'test', position: 'bottom-left' };
      store.addToUI(params);
      td.verify(store.view.ui.add(params.elem, params.position));
    },
    'zoomToItem - zoom to item by layer id': function() {
      var fSet = {
        objectIdFieldName: 'oid',
        features: [
          {
            attributes: { oid: 1, name: 'Bob' }
          },
          {
            attributes: { oid: 2, name: 'Sally' }
          }
        ]
      };
      store.map.set('tri', fSet);
      store.view.goTo = td.function();
      store.zoomToItem('tri', { oid: 2, name: 'Sally' });
      td.verify(store.view.goTo(td.matchers.anything()));
    }
  });
});
