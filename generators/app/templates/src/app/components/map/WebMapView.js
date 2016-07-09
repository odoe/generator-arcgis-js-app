import _WidgetBase from 'dijit/_WidgetBase';
import _TemplatedMixin from 'dijit/_TemplatedMixin';

import topic from 'dojo/topic';

import arcgisUtils from 'esri/arcgis/utils';
import mapgen from 'app/helpers/mapgenerator';

export default _WidgetBase.createSubclass([_TemplatedMixin], {

  templateString: '<div class="map-node"></div>',

  postCreate() {
    const webmapid = this.get('webmapid');
    const node = this.domNode;
    if (webmapid) {
      mapgen.fromWebMapAsJSON({
        webmapid,
        node
      }).then(response => {
        const map = response.map;
        this.set('map', map);
        const layers = arcgisUtils.getLegendLayers(response);
        topic.publish('map-ready', { map, layers });
      });
    }
  }

});
