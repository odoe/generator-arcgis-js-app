import Accessor from 'esri/core/Accessor';
import watchUtils from 'esri/core/watchUtils';
import Query from 'esri/tasks/support/Query';
import EsriMap from 'esri/Map';
import MapView from 'esri/views/MapView';

import Memory from 'dstore/Memory';

const AppStore = Accessor.createSubclass({
  properties: {
    webmap: EsriMap,
    view: MapView
  },

  constructor() {
    this.query = new Query();
    this.map = new Map();
  },

  getAllItems(id) {
    // check if we already have data
    const fSet = this.map.get(id);
    if (fSet) {
      return new Memory({
        idProperty: fSet.objectIdFieldName,
        data: fSet.features.map(x => x.attributes)
      });
    }
    // if no current data, go get it
    const layer = this.webmap.findLayerById(id);
    this.query.where = '1=1';
    this.query.outFields = ['*'];
    this.query.outSpatialReference = this.view.spatialReference;
    this.query.returnGeometry = true;
    return layer.then(lyr => {
      return lyr.queryFeatures(this.query)
        .then(featureSet => {
          const {
            features,
            objectIdFieldName: idProperty
          } = featureSet;
          const data = features.map(x => x.attributes);
          const memory = new Memory({ id, idProperty, data });
          this.map.set(id, featureSet);
          return memory;
        });
    });
  },

  addToUI({ elem, position }) {
    this.view.ui.add(elem, position);
  },

  zoomToItem(layerId, item) {
    const {
      features,
      objectIdFieldName: oid
    } = this.map.get(layerId);
    const { constraints: c } = this.view;
    const feature = features.find(x => x.attributes[oid] === item[oid]);
    this.view.goTo({
      target: feature.geometry,
      zoom: c.effectiveMaxZoom - 5
    });
  }
});

export default new AppStore();