export const webmap = {
  webmapid: 'addawebmapidhere'
};

export const mapOptions = {
  basemap: 'topo'
};

export const mapViewOptions = {
  center: [-118.182, 33.913],
  zoom: 10,
  ui: {
    components: ['zoom', 'attribution']
  }
};

export const layerInfos = [
  {
    id: 'tri',
    title: 'Toxic Release Facilities',
    layerType: 'feature',
    popupTemplate: {
      title: '{FACILITY_NAME}',
      content: '{*}'
    },
    outFields: ['*'],
    url: 'http://services2.arcgis.com/j80Jz20at6Bi0thr/arcgis/rest/services/LosAngelesToxicReleaseLocations/FeatureServer/0'
  }
];
