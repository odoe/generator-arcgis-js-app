import _WidgetBase from 'dijit/_WidgetBase';
import _TemplatedMixin from 'dijit/_TemplatedMixin';

import topic from 'dojo/topic';

import Map from 'esri/map';

export default _WidgetBase.createSubclass([_TemplatedMixin], {

  templateString: '<div class="map-node"></div>',

  postCreate() {
    let node = this.domNode;
    let mapOptions = this.get('mapOptions');
    let map = new Map(node, mapOptions);
    map.on('load', () => topic.publish('map-ready', { map }));
    this.set('map', map);
  }

});
