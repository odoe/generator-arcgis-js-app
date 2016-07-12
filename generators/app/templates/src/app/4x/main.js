import Map from 'esri/Map';
import FeatureLayer from 'esri/layers/FeatureLayer';
import {
  mapOptions,
  mapViewOptions,
  layerInfos
} from './config';

import view from './components/webmap';
import dataList from './components/datalist';

const featureInfos = layerInfos.filter(x => x.layerType === 'feature');
const featureLayers = featureInfos.map(x => new FeatureLayer(x));
mapOptions.layers = featureLayers;

const map = new Map(mapOptions);
mapViewOptions.map = map;

dataList.create();

view.create({
  params: mapViewOptions,
  node: document.body
});
