/**
 * for details refer to:
 *   - http://resources.arcgis.com/en/help/arcgis-web-map-json/#/Web_map_data/02qt0000000q000000/
 *   - http://resources.arcgis.com/en/help/main/10.1/index.html#//0154000004w8000000
 **/

import arcgisUtils from 'esri/arcgis/utils';

var util = {

  fromWebMapAsJSON(options) {
    if (options.webmapid) {
      return arcgisUtils.createMap(
        options.webmapid, options.node
      );
    } else if (options.webmap) {
      return arcgisUtils.createMap(
        options.webmap,
        options.node,
        { mapOptions: options.mapOptions }
      );
    }
  }

};

export default util;
