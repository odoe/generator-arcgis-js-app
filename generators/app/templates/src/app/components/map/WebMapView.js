import declare from 'dojo/_base/declare';

import _WidgetBase from 'dijit/_WidgetBase';
import _TemplatedMixin from 'dijit/_TemplatedMixin';

import topic from 'dojo/topic';

import mapgen from 'app/helpers/mapgenerator';

export default declare([
  _WidgetBase, _TemplatedMixin
], {

  templateString: '<div class="map-node"></div>',

  postCreate() {
    var webmapid = this.get('webmapid');
    var node = this.domNode;
    if (webmapid) {
      mapgen.fromWebMapAsJSON({
        webmapid,
        node
      }).then(response => {
        var map = response.map;
        this.set('map', map);
        topic.publish('map-ready', {map});
      });
    }
  }

});
